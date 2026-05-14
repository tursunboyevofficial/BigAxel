#!/usr/bin/env node

import http from 'node:http'

const PORT = Number(process.env.PORT || 3006)
const ROYCRM_API_BASE = (process.env.RECRUITING_BACKEND_URL || 'http://127.0.0.1:8877').replace(/\/$/, '')

const TELEGRAM_REQUIRED_FIELDS = ['fullName', 'email', 'role', 'branch', 'about']
const MIN_ELAPSED_MS = 3000
const ALLOWED_API_PREFIXES = new Set([
  '/api/recruiting/apply',
  '/api/recruiting/apply-config',
  '/api/job-openings/public',
  '/api/public/jobs',
])

function sendJson(res, status, data, extraHeaders = {}) {
  const body = JSON.stringify(data)
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
    ...extraHeaders,
  })
  res.end(body)
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function formatApplication(form) {
  const lines = [
    '<b>📥 New Application — Big Axel Careers</b>',
    '',
    `<b>Name:</b> ${escapeHtml(form.fullName)}`,
    `<b>Email:</b> ${escapeHtml(form.email)}`,
  ]

  if (form.phone?.trim()) lines.push(`<b>Phone:</b> ${escapeHtml(form.phone)}`)
  lines.push(`<b>Role:</b> ${escapeHtml(form.role)}`)
  lines.push(`<b>Branch:</b> ${escapeHtml(form.branch)}`)
  if (form.company?.trim()) lines.push(`<b>Company:</b> ${escapeHtml(form.company)}`)
  if (form.experience?.trim()) lines.push(`<b>Experience:</b> ${escapeHtml(form.experience)}`)
  if (form.portfolio?.trim()) lines.push(`<b>Portfolio:</b> ${escapeHtml(form.portfolio)}`)

  lines.push('', '<b>About:</b>', escapeHtml(form.about))
  lines.push('', `<i>Submitted: ${new Date().toISOString()}</i>`)

  return lines.join('\n')
}

function extractBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    extractBody(req).then((body) => {
      if (!body) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(body))
      } catch (error) {
        reject(error)
      }
    }, reject)
  })
}

function cloneHeaders(reqHeaders) {
  const headers = {}
  for (const [key, value] of Object.entries(reqHeaders)) {
    if (key.toLowerCase() === 'host') continue
    if (key.toLowerCase() === 'content-length') continue
    if (value === undefined) continue
    headers[key] = Array.isArray(value) ? value.join(', ') : value
  }
  return headers
}

function safeJsonParse(payload) {
  try {
    return JSON.parse(payload)
  } catch {
    return null
  }
}

async function proxyToRoyCRM(req, res) {
  const incomingUrl = new URL(req.url || '/', 'http://localhost')
  const normalizedUpstreamPath =
    incomingUrl.pathname.endsWith('/') && incomingUrl.pathname.length > 1
      ? incomingUrl.pathname.slice(0, -1)
      : incomingUrl.pathname
  const targetUrl = `${ROYCRM_API_BASE}${normalizedUpstreamPath}${incomingUrl.search}`

  const headers = cloneHeaders(req.headers)
  headers['x-forwarded-host'] = req.headers.host || ''

  let bodyText = null
  if (!['GET', 'HEAD'].includes(req.method || 'GET')) {
    bodyText = await extractBody(req)
    if (bodyText) headers['content-length'] = Buffer.byteLength(bodyText)
  }

  let upstreamRes
  try {
    upstreamRes = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: bodyText ?? undefined,
    })
  } catch (error) {
    sendJson(res, 502, {
      error: 'Upstream unavailable',
      raw: error instanceof Error ? error.message : 'Unknown error',
    })
    return
  }

  const upstreamBody = await upstreamRes.arrayBuffer()
  const responseText = new TextDecoder().decode(upstreamBody)
  const responseHeaders = {}
  for (const [key, value] of upstreamRes.headers.entries()) {
    if (key.toLowerCase() === 'transfer-encoding') continue
    if (key.toLowerCase() === 'content-encoding') continue
    if (key.toLowerCase() === 'content-length') continue
    if (key.toLowerCase() === 'connection') continue
    responseHeaders[key] = value
  }

  const parsedResponse = safeJsonParse(responseText)
  if (parsedResponse !== null) {
    sendJson(res, upstreamRes.status, parsedResponse, responseHeaders)
    return
  }

  res.writeHead(upstreamRes.status, {
    ...responseHeaders,
    'Content-Length': Buffer.byteLength(responseText),
  })
  res.end(responseText)
}

async function handleApply(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' })
    return
  }

  let payload

  try {
    payload = await readJson(req)
  } catch {
    sendJson(res, 400, { error: 'Invalid JSON payload' })
    return
  }

  if (!payload || typeof payload !== 'object') {
    sendJson(res, 400, { error: 'Invalid payload' })
    return
  }

  const token = process.env.TELEGRAM_BOT_TOKEN || ''
  const rawChats = process.env.TELEGRAM_CHAT_IDS || ''
  const chatIds = rawChats
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)

  if (!token) {
    sendJson(res, 500, { error: 'Server misconfigured: missing TELEGRAM_BOT_TOKEN' })
    return
  }

  if (chatIds.length === 0) {
    sendJson(res, 500, { error: 'Server misconfigured: missing TELEGRAM_CHAT_IDS' })
    return
  }

  if (typeof payload.website === 'string' && payload.website.trim().length > 0) {
    sendJson(res, 400, { error: 'Rejected' })
    return
  }

  if (typeof payload.elapsedMs === 'number' && payload.elapsedMs < MIN_ELAPSED_MS) {
    sendJson(res, 400, { error: 'Rejected' })
    return
  }

  for (const field of TELEGRAM_REQUIRED_FIELDS) {
    const value = payload[field]
    if (typeof value !== 'string' || value.trim().length === 0) {
      sendJson(res, 400, { error: `Missing required field: ${field}` })
      return
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    sendJson(res, 400, { error: 'Invalid email address' })
    return
  }

  if (payload.about.trim().length < 20) {
    sendJson(res, 400, { error: 'About field is too short' })
    return
  }

  const totalLength = Object.values(payload).reduce((total, value) => {
    return total + (typeof value === 'string' ? value.length : 0)
  }, 0)

  if (totalLength > 6000) {
    sendJson(res, 413, { error: 'Payload too large' })
    return
  }

  const message = formatApplication(payload)
  const sentStatuses = await Promise.all(
    chatIds.map(async (chatId) => {
      try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
        })

        const json = await response.json().catch(() => null)
        return json?.ok === true
      } catch {
        return false
      }
    })
  )

  const sent = sentStatuses.filter(Boolean).length

  if (sent === 0) {
    sendJson(res, 502, { error: 'Telegram delivery failed for all chats' })
    return
  }

  sendJson(res, 200, { sent, total: sentStatuses.length })
}

async function handleTelegramChats(req, res) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' })
    return
  }

  const token = process.env.TELEGRAM_BOT_TOKEN || ''
  const adminKey = process.env.TELEGRAM_ADMIN_KEY || ''

  if (!token) {
    sendJson(res, 500, { error: 'Missing TELEGRAM_BOT_TOKEN' })
    return
  }

  if (!adminKey) {
    sendJson(res, 500, { error: 'Missing TELEGRAM_ADMIN_KEY' })
    return
  }

  const url = new URL(req.url, 'http://localhost')
  const providedKey = url.searchParams.get('key')

  if (providedKey !== adminKey) {
    sendJson(res, 401, { error: 'Unauthorized' })
    return
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates?limit=100`)
  const data = await response
    .json()
    .catch(() => ({ ok: false, result: [] }))

  if (!data?.ok || !Array.isArray(data.result)) {
    sendJson(res, 502, { error: 'Telegram getUpdates failed', raw: data })
    return
  }

  const seen = new Map()

  for (const update of data.result) {
    const chat =
      update.message?.chat ||
      update.my_chat_member?.chat ||
      update.channel_post?.chat ||
      update.edited_message?.chat

    if (chat?.id && !seen.has(chat.id)) {
      seen.set(chat.id, {
        id: chat.id,
        type: chat.type,
        title: chat.title || [chat.first_name, chat.last_name].filter(Boolean).join(' ') || chat.username || '',
      })
    }
  }

  const chats = [...seen.values()].map((chat) => ({
    id: chat.id,
    type: chat.type,
    label: chat.title,
  }))

  sendJson(res, 200, { chats })
}

const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url || '/', 'http://localhost').pathname
  const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname

  if (pathname === '/api/apply') {
    await handleApply(req, res)
    return
  }

  if (pathname === '/api/telegram-chats') {
    await handleTelegramChats(req, res)
    return
  }

  if (ALLOWED_API_PREFIXES.has(normalizedPath)) {
    await proxyToRoyCRM(req, res)
    return
  }

  if (pathname.startsWith('/api/')) {
    sendJson(res, 404, { error: 'Not found' })
    return
  }

  sendJson(res, 404, { error: 'Not found' })
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`BigAxel API server is running on 127.0.0.1:${PORT}`)
})
