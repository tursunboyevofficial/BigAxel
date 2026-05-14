export type ApplicationPayload = {
  fullName: string
  email: string
  phone: string
  role: string
  branch: string
  company?: string
  experience?: string
  portfolio?: string
  about: string
  website?: string
  job_opening_id?: number
  elapsedMs?: number
}

export type PublicJobOpening = {
  id: number
  title: string
  slug?: string | null
  department?: string | null
  branch?: string | null
  branch_slug?: string | null
  location?: string | null
  employment_type?: string | null
  remote?: boolean
}

export type SubmitPayload = ApplicationPayload & {
  /** Honeypot field — must be empty. Bots typically fill every input. */
  website?: string
  /** Milliseconds between form mount and submit. Server rejects < 3000. */
  elapsedMs?: number
  resume?: File | null
}

type ApplyConfig = {
  hcaptcha_site_key: string
}

type ApiApplicationPayload = {
  name: string
  email: string
  phone?: string
  job_opening_id?: number
  position: string
  region?: string
  institution_name?: string
  employment_status?: string
  how_heard?: string
  website_url?: string
  company_website?: string
  website?: string
}

export type SubmitResult = {
  id: number
  name: string
  email: string | null
  phone: string | null
  status: string
  source: string
  job_opening_id: number | null
}

const MISSING_DETAIL_MESSAGE = 'Malformed response from server'

type ImportMetaEnvLike = Record<string, string | undefined>

function getApiFallbackBases(): string[] {
  const env = ((import.meta.env ?? {}) as ImportMetaEnvLike)

  const bases: string[] = []
  const directBackend = (env.VITE_RECRUITING_BACKEND_URL || env.VITE_RECRUITING_API_BASE || '').trim()
  const legacyBackends = (env.VITE_RECRUITING_API_BASES || '').trim()
  const extraBackends = (env.VITE_RECRUITING_API_FALLBACKS || '').trim()
  const explicitVercelHost = (env.VITE_RECRUITING_BACKEND_ON_VERCEL || '').trim()

  const inferredVercelBackend = typeof window !== 'undefined' &&
    window.location.hostname.endsWith('.vercel.app')
    ? (explicitVercelHost || 'https://roycrm.wework.uz')
    : ''

  const pushBase = (value: string) => {
    const base = value.trim().replace(/\/$/, '')
    if (base) {
      bases.push(base)
    }
  }

  if (directBackend) {
    pushBase(directBackend)
  }

  legacyBackends.split(',').forEach(pushBase)
  extraBackends.split(',').forEach(pushBase)
  pushBase(inferredVercelBackend)

  const uniqueBases = [...new Set(bases)]

  if (uniqueBases.length === 0) {
    return ['']
  }

  return ['', ...uniqueBases]
}

function makeApiUrlCandidates(path: string): string[] {
  const bases = getApiFallbackBases()

  return bases.map((base) => (base ? `${base}${path}` : path))
}

async function fetchFromCareerApi(path: string, init?: RequestInit): Promise<Response> {
  const candidates = makeApiUrlCandidates(path)
  let lastError: Error | null = null

  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i]
    try {
      const res = await fetch(candidate, init)
      if (res.status !== 404) {
        return res
      }

      // Retry another candidate if this one is a 404 (mainly helps local
      // dev when /api is not proxied, but absolute backend exists).
      if (i + 1 >= candidates.length) {
        return res
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (i + 1 >= candidates.length) {
        throw lastError
      }
    }
  }

  throw lastError || new Error('Failed to fetch from API')
}

function isArrayObjectPayload(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

type ArrayPayloadKey = 'jobs' | 'roles' | 'items' | 'data'

function getArrayPayload(payload: unknown, keys: ArrayPayloadKey[]): unknown[] {
  if (isArrayObjectPayload(payload)) return payload

  if (payload && typeof payload === 'object') {
    const container = payload as { [key: string]: unknown }
    for (const key of keys) {
      const nested = container[key]
      if (isArrayObjectPayload(nested)) {
        return nested
      }
    }

    const firstArray = Object.values(container).find((value) => isArrayObjectPayload(value))
    if (isArrayObjectPayload(firstArray)) {
      return firstArray
    }
  }

  return []
}

function getStringValue(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : null
}

function getBooleanValue(value: unknown): boolean | undefined {
  return typeof value === 'boolean' ? value : undefined
}

function parseJobId(rawId: unknown): number | null {
  if (typeof rawId === 'number' && Number.isFinite(rawId)) {
    return Math.trunc(rawId)
  }
  if (typeof rawId === 'string') {
    const parsed = Number(rawId.trim())
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

function parsePublicJobPayload(item: unknown): PublicJobOpening | null {
  if (!item || typeof item !== 'object') return null
  const raw = item as Record<string, unknown>

  const id = parseJobId(raw.id)
  const title = typeof raw.title === 'string'
    ? raw.title.trim()
    : typeof raw.title === 'number'
      ? String(raw.title).trim()
      : null

  if (typeof id !== 'number' || !Number.isInteger(id) || !title || title.length === 0) {
    return null
  }

  return {
    id,
    title,
    slug: getStringValue(raw.slug),
    department: getStringValue(raw.department),
    branch: getStringValue(raw.branch),
    branch_slug: getStringValue(raw.branch_slug),
    location: getStringValue(raw.location),
    employment_type: getStringValue(raw.employment_type),
    remote: getBooleanValue(raw.remote),
  }
}

export async function fetchPublicJobOpenings(): Promise<PublicJobOpening[]> {
  const endpointCandidates = ['/api/job-openings/public', '/api/public/jobs']
  let lastResponse: Response | null = null
  let lastError: Error | null = null

  for (let i = 0; i < endpointCandidates.length; i++) {
    const endpoint = endpointCandidates[i]
    let response: Response

    try {
      response = await fetchFromCareerApi(endpoint, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      })
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      if (i + 1 < endpointCandidates.length) {
        continue
      }
      throw lastError
    }

    if (!response.ok && i + 1 < endpointCandidates.length) {
      continue
    }

    lastResponse = response
    if (!response.ok) {
      break
    }

    let payload: unknown
    try {
      payload = await response.json()
    } catch {
      if (i + 1 < endpointCandidates.length) {
        continue
      }
      break
    }

    const rows = getArrayPayload(payload, ['jobs', 'roles', 'items', 'data'])

    // If this endpoint returns no list-like payload, move to fallback endpoint.
    if (!Array.isArray(rows) || rows.length === 0) {
      if (i + 1 < endpointCandidates.length) {
        continue
      }
      return []
    }

    const parsed = rows
      .map(parsePublicJobPayload)
      .filter((row): row is PublicJobOpening => row !== null)

    // If rows were present but none were parseable, try fallback.
    if (parsed.length === 0 && i + 1 < endpointCandidates.length) {
      continue
    }

    return parsed
  }

  const res = lastResponse
  if (!res) {
    throw lastError || new Error('Failed to fetch public job openings')
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch public job openings (${res.status})`)
  }

  throw new Error('Malformed job openings response')
}

export async function getApplyConfig(): Promise<ApplyConfig | null> {
  const res = await fetchFromCareerApi('/api/recruiting/apply-config', {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) {
    return null
  }

  try {
    return (await res.json()) as ApplyConfig
  } catch {
    return null
  }
}

export async function submitApplication(
  form: SubmitPayload
): Promise<SubmitResult> {
  const notes: string[] = []
  const about = form.about?.trim()
  const portfolio = form.portfolio?.trim()

  if (about) notes.push(about)
  if (portfolio) notes.push(`Portfolio: ${portfolio}`)

  const honeypot = form.website?.trim()
  const apiPayload: ApiApplicationPayload = {
    name: form.fullName.trim(),
    email: form.email.trim(),
    phone: form.phone?.trim(),
    position: form.role.trim(),
    region: form.branch.trim(),
    institution_name: form.company?.trim(),
    employment_status: form.experience?.trim(),
    how_heard: notes.length > 0 ? notes.join('\n\n') : undefined,
  }

  if (honeypot) {
    apiPayload.website_url = honeypot
    apiPayload.company_website = honeypot
    apiPayload.website = honeypot
  }

  if (form.job_opening_id && Number.isInteger(form.job_opening_id)) {
    apiPayload.job_opening_id = form.job_opening_id
  }

  const hasResume = form.resume instanceof File
  let res: Response
  if (hasResume) {
    const formData = new FormData()
    const { resume } = form

    Object.entries(apiPayload).forEach(([key, value]) => {
      if (value === undefined || value === null) return
      formData.append(key, String(value))
    })
    if (resume instanceof File) {
      formData.append('resume', resume)
    }

    res = await fetchFromCareerApi('/api/recruiting/apply', {
      method: 'POST',
      body: formData,
    })
  } else {
    res = await fetchFromCareerApi('/api/recruiting/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiPayload),
    })
  }

  let data: { detail?: string; error?: string; id?: number; [key: string]: unknown } = {}
  try {
    data = await res.json()
  } catch {
    /* empty */
  }

  if (!res.ok) {
    const detail = data.detail || data.error || `Request failed (${res.status})`
    throw new Error(typeof detail === 'string' ? detail : `Request failed (${res.status})`)
  }

  if (!data || typeof data.id !== 'number') {
    throw new Error(MISSING_DETAIL_MESSAGE)
  }

  return data as SubmitResult
}
