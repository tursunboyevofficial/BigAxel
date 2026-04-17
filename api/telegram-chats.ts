// Helper endpoint for the site owner to discover chat IDs.
// Protected by a shadow secret: pass `?key=<ADMIN_KEY>` matching the
// TELEGRAM_ADMIN_KEY env var. Returns recent chats that interacted with
// the bot (last 24h) — copy the ids you want into TELEGRAM_CHAT_IDS.
//
// Usage after deploy:
//   1. Press /start in DM with the bot (or add it to a group and write anything).
//   2. Visit: https://<your-domain>/api/telegram-chats?key=<ADMIN_KEY>
//   3. Copy chat ids into the TELEGRAM_CHAT_IDS env var, redeploy.

export const config = { runtime: 'edge' }

type TgChat = {
  id: number
  type: 'private' | 'group' | 'supergroup' | 'channel'
  title?: string
  username?: string
  first_name?: string
  last_name?: string
}

export default async function handler(request: Request): Promise<Response> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const adminKey = process.env.TELEGRAM_ADMIN_KEY

  if (!token) return json({ error: 'Missing TELEGRAM_BOT_TOKEN' }, 500)
  if (!adminKey) return json({ error: 'Missing TELEGRAM_ADMIN_KEY' }, 500)

  const url = new URL(request.url)
  const providedKey = url.searchParams.get('key')
  if (providedKey !== adminKey) return json({ error: 'Unauthorized' }, 401)

  const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?limit=100`)
  const data = (await res.json()) as { ok: boolean; result?: Array<Record<string, { chat?: TgChat }>> }

  if (!data.ok || !Array.isArray(data.result)) {
    return json({ error: 'Telegram getUpdates failed', raw: data }, 502)
  }

  const seen = new Map<number, TgChat>()
  for (const update of data.result) {
    const chat: TgChat | undefined =
      update.message?.chat ||
      update.my_chat_member?.chat ||
      update.channel_post?.chat ||
      update.edited_message?.chat
    if (chat?.id && !seen.has(chat.id)) seen.set(chat.id, chat)
  }

  return json(
    {
      chats: [...seen.values()].map((c) => ({
        id: c.id,
        type: c.type,
        label: c.title || [c.first_name, c.last_name].filter(Boolean).join(' ') || c.username || '',
      })),
    },
    200
  )
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
