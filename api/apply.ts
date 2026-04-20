// Vercel Edge Function — runs on the server, token is never shipped to browser.
// Required Vercel env vars:
//   TELEGRAM_BOT_TOKEN   — bot token from @BotFather
//   TELEGRAM_CHAT_IDS    — comma-separated chat IDs (private or group, e.g. "123,-100456")

export const config = { runtime: 'edge' }

type ApplicationPayload = {
  fullName: string
  email: string
  phone?: string
  role: string
  branch: string
  company?: string
  experience?: string
  portfolio?: string
  about: string
  website?: string
  elapsedMs?: number
}

const REQUIRED_FIELDS: ('fullName' | 'email' | 'role' | 'branch' | 'about')[] = [
  'fullName',
  'email',
  'role',
  'branch',
  'about',
]

const MIN_ELAPSED_MS = 3000

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const rawChats = process.env.TELEGRAM_CHAT_IDS || ''
  const chatIds = rawChats.split(',').map((s) => s.trim()).filter(Boolean)

  if (!token) return json({ error: 'Server misconfigured: missing TELEGRAM_BOT_TOKEN' }, 500)
  if (chatIds.length === 0) return json({ error: 'Server misconfigured: missing TELEGRAM_CHAT_IDS' }, 500)

  let body: ApplicationPayload
  try {
    body = (await request.json()) as ApplicationPayload
  } catch {
    return json({ error: 'Invalid JSON payload' }, 400)
  }

  // Bot checks — fail closed, but return 400 so the UI can show a generic
  // error. Honeypot and time gate are silent to avoid teaching bots.
  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return json({ error: 'Rejected' }, 400)
  }
  if (typeof body.elapsedMs === 'number' && body.elapsedMs < MIN_ELAPSED_MS) {
    return json({ error: 'Rejected' }, 400)
  }

  for (const key of REQUIRED_FIELDS) {
    const value = body[key]
    if (typeof value !== 'string' || value.trim().length === 0) {
      return json({ error: `Missing required field: ${key}` }, 400)
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return json({ error: 'Invalid email address' }, 400)
  }
  if (body.about.trim().length < 20) {
    return json({ error: 'About field is too short' }, 400)
  }

  // Simple size guard against abuse
  const totalLength = Object.values(body).reduce(
    (n, v) => n + (typeof v === 'string' ? v.length : 0),
    0
  )
  if (totalLength > 6000) return json({ error: 'Payload too large' }, 413)

  const message = formatApplication(body)

  const results = await Promise.all(
    chatIds.map(async (chat_id) => {
      try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id,
            text: message,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
        })
        const data = (await res.json()) as { ok?: boolean }
        return data.ok === true
      } catch {
        return false
      }
    })
  )

  const sent = results.filter(Boolean).length
  if (sent === 0) {
    return json({ error: 'Telegram delivery failed for all chats' }, 502)
  }

  return json({ sent, total: results.length }, 200)
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function formatApplication(form: ApplicationPayload): string {
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
