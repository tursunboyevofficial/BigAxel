export type ApplicationPayload = {
  fullName: string
  email: string
  phone: string
  role: string
  branch: string
  company: string
  experience: string
  portfolio: string
  about: string
}

export async function submitApplication(
  form: ApplicationPayload
): Promise<{ sent: number; total: number }> {
  const res = await fetch('/api/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })

  let data: { sent?: number; total?: number; error?: string } = {}
  try {
    data = await res.json()
  } catch {
    /* non-JSON response — fall through to error below */
  }

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }
  if (typeof data.sent !== 'number' || typeof data.total !== 'number') {
    throw new Error('Malformed response from server')
  }
  return { sent: data.sent, total: data.total }
}
