import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  IconAlertTriangle,
  IconArrowLeft,
  IconCheck,
  IconCircleCheck,
  IconLoader2,
  IconMail,
  IconPaperclip,
  IconSend,
  IconUser,
  IconX,
} from '@tabler/icons-react'
import { BRANCHES } from '@/data/branches'
import { COMPANIES } from '@/data/companies'
import { cn } from '@/lib/utils'
import { fetchPublicJobOpenings, submitApplication, type PublicJobOpening } from '@/lib/telegram'
import { useT } from '@/lib/i18n'

const ease = [0.22, 1, 0.36, 1] as const
const RESUME_MAX_BYTES = 100 * 1024 * 1024
const RESUME_ACCEPT = '.pdf,.doc,.docx,.txt,.rtf'
const RESUME_EXTENSIONS = ['.pdf', '.doc', '.docx', '.txt', '.rtf']

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 B'
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }
  return `${bytes} B`
}

function isAllowedResumeFile(file: File): boolean {
  const lower = file.name.toLowerCase()
  return RESUME_EXTENSIONS.some((ext) => lower.endsWith(ext))
}

type FormState = {
  fullName: string
  email: string
  phone: string
  role: string
  branch: string
  company: string
  experience: string
  portfolio: string
  about: string
  resume: File | null
}

const INITIAL: FormState = {
  fullName: '',
  email: '',
  phone: '',
  role: '',
  branch: '',
  company: '',
  experience: '',
  portfolio: '',
  about: '',
  resume: null,
}

export function CareersApply() {
  const t = useT()
  const [searchParams] = useSearchParams()
  const ROLES = t<string[]>('apply.roles')
  const roleList = useMemo(() => (Array.isArray(ROLES) ? ROLES : []), [ROLES])
  const [publicRoles, setPublicRoles] = useState<PublicJobOpening[]>([])
  const nextItems = t<string[]>('apply.nextItems')
  const nextList = Array.isArray(nextItems) ? nextItems : []

  const prefillRole = searchParams.get('role') ?? ''
  const prefillBranch = searchParams.get('branch') ?? ''

  const roleOptions = useMemo(() => {
    if (publicRoles.length === 0) {
      return roleList
    }

    const seen = new Set<string>()
    const deduped = publicRoles
      .map((role) => role.title.trim())
      .filter((title) => title.length > 0)
      .filter((title) => {
        if (seen.has(title)) return false
        seen.add(title)
        return true
      })

    return deduped.length > 0 ? deduped : roleList
  }, [publicRoles, roleList])

  const initial: FormState = {
    ...INITIAL,
    // If the role is in the ROLES dropdown use it; otherwise keep blank and
    // show it in the about field as context.
    role: roleOptions.includes(prefillRole) ? prefillRole : '',
    branch: BRANCHES.some((b) => b.slug === prefillBranch) ? prefillBranch : '',
    about: prefillRole && !roleOptions.includes(prefillRole)
      ? `Applying for: ${prefillRole}\n\n`
      : '',
  }

  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [applicationId, setApplicationId] = useState<number | null>(null)

  useEffect(() => {
    if (!prefillRole || form.role) return
    setForm((prev) => {
      if (roleOptions.includes(prefillRole)) {
        return {
          ...prev,
          role: prefillRole,
          about: prev.about.startsWith(`Applying for: ${prefillRole}`) ? '' : prev.about,
        }
      }

      const marker = `Applying for: ${prefillRole}`
      if (prev.about.includes(marker)) {
        return prev
      }

      return {
        ...prev,
        about: `${marker}\n\n${prev.about}`,
      }
    })
  }, [prefillRole, roleOptions, form.role])

  // Bot protection:
  //  1. Visible math captcha — blocks the laziest bots
  //  2. Honeypot field `website` — hidden, humans never fill it
  //  3. Time gate — the form is rejected if submitted within 3s of mount
  const captcha = useMemo(
    () => ({ a: 2 + Math.floor(Math.random() * 8), b: 1 + Math.floor(Math.random() * 7) }),
    // intentionally static per mount
    []
  )
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [captchaError, setCaptchaError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const mountedAt = useRef(Date.now())

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const jobs = await fetchPublicJobOpenings()
        if (!cancelled) {
          setPublicRoles(jobs)
        }
      } catch {
        // no-op: fallback to static role list
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const filled = useMemo(() => {
    const required: (keyof Omit<FormState, 'resume'>)[] = ['fullName', 'email', 'phone', 'role', 'branch', 'about']
    const total = required.length
    const done = required.filter((k) => form[k].trim().length > 0).length
    return Math.round((done / total) * 100)
  }, [form])

  const progressColor =
    filled === 100 ? '#70991F' : filled >= 50 ? '#E8B90B' : '#E22A26'
  const progressLabel =
    filled === 100 ? 'text-[#70991F]' : filled >= 50 ? 'text-[#C99500]' : 'text-brand-accent'

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (!file) {
      setForm((f) => ({ ...f, resume: null }))
      setErrors((prev) => {
        if (!prev.resume) return prev
        const next = { ...prev }
        delete next.resume
        return next
      })
      return
    }

    if (file.size > RESUME_MAX_BYTES) {
      setErrors((prev) => ({ ...prev, resume: t('apply.errors.resumeSize') }))
      setForm((f) => ({ ...f, resume: null }))
      return
    }

    if (!isAllowedResumeFile(file)) {
      setErrors((prev) => ({ ...prev, resume: t('apply.errors.resumeType') }))
      setForm((f) => ({ ...f, resume: null }))
      return
    }

    setErrors((prev) => {
      if (!prev.resume) return prev
      const next = { ...prev }
      delete next.resume
      return next
    })
    setForm((f) => ({ ...f, resume: file }))
  }

  const clearResume = () => {
    setForm((f) => ({ ...f, resume: null }))
    setErrors((prev) => {
      if (!prev.resume) return prev
      const next = { ...prev }
      delete next.resume
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.fullName.trim()) next.fullName = t('apply.errors.required')
    if (!form.email.trim()) next.email = t('apply.errors.required')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t('apply.errors.invalidEmail')
    if (!form.phone.trim()) next.phone = t('apply.errors.required')
    if (!form.role.trim()) next.role = t('apply.errors.pickRole')
    if (!form.branch.trim()) next.branch = t('apply.errors.pickBranch')
    if (!form.about.trim() || form.about.trim().length < 20) next.about = t('apply.errors.aboutTooShort')
    setErrors(next)

    // Captcha check
    const expected = captcha.a + captcha.b
    const captchaOk = Number(captchaAnswer.trim()) === expected
    setCaptchaError(captchaOk ? null : t('apply.captchaError'))

    if (Object.keys(next).length > 0 || !captchaOk) return

    // Honeypot + time gate — silently bail (don't tip off the bot)
    const elapsed = Date.now() - mountedAt.current
    if (honeypot.trim() !== '' || elapsed < 3000) {
      setSendError(t('apply.botDetected'))
      return
    }

    setSending(true)
    setSendError(null)
    try {
      const selectedBranch = BRANCHES.find((branch) => branch.slug === form.branch)
      const company = COMPANIES.find((c) => c.slug === form.company)
      const selectedJobOpening = publicRoles.find((role) => role.title === form.role)

      const { id } = await submitApplication({
        ...form,
        branch: selectedBranch ? `${selectedBranch.city}, ${selectedBranch.country}` : form.branch,
        company: company?.name || form.company,
        job_opening_id: selectedJobOpening?.id,
        website: honeypot,
        elapsedMs: elapsed,
      })
      setApplicationId(id)
      setSubmitted(true)
    } catch (err) {
      setSendError(err instanceof Error ? err.message : t('apply.errors.generic'))
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-brand-soft min-h-[90vh]">
      <div className="container mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-brand text-[12px] uppercase tracking-[0.22em] font-semibold hover:text-brand-accent transition-colors"
        >
          <IconArrowLeft size={14} /> {t('apply.backHome')}
        </Link>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          {/* Left: intro */}
          <div className="lg:sticky lg:top-28">
            <p className="inline-flex items-center gap-3 m-0 mb-6 text-[12px] uppercase tracking-[0.22em] font-semibold text-brand-accent">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
              </span>
              {t('apply.eyebrow')}
            </p>
            <h1
              className="m-0 font-medium uppercase text-brand"
              style={{
                fontFamily: '"Metropolis Medium", Arial, sans-serif',
                fontSize: 'clamp(2.6rem, 6vw, 88px)',
                lineHeight: 0.9,
                letterSpacing: '-0.045em',
              }}
            >
              {t('apply.titleL1')}<br />{t('apply.titleL2')}
            </h1>
            <p className="text-brand-muted m-0 mt-7 max-w-[46ch]" style={{ fontSize: 18, lineHeight: '28px' }}>
              {t('apply.description')}
            </p>

            <div className="mt-10 bg-white border border-brand-line p-6">
              <p className="m-0 text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-muted">
                {t('apply.nextTitle')}
              </p>
              <ol className="m-0 mt-4 p-0 list-none space-y-3">
                {nextList.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-[14px] text-brand leading-[22px]">
                    <span className="mt-0.5 h-5 w-5 rounded-full bg-brand text-white text-[11px] font-semibold flex items-center justify-center tabular-nums shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: form */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease } }}
                  className="bg-white border border-brand-line p-10 lg:p-14 text-center"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 180, damping: 14 } }}
                    className="mx-auto h-16 w-16 rounded-full bg-brand-accent/15 text-brand-accent flex items-center justify-center"
                  >
                    <IconCircleCheck size={40} stroke={1.5} />
                  </motion.span>
                  <h2
                    className="m-0 mt-6 font-semibold uppercase text-brand"
                    style={{
                      fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                      fontSize: 'clamp(1.8rem, 3vw, 36px)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      fontWeight: 'normal',
                    }}
                  >
                    {t('apply.success.title')}
                  </h2>
                  <p className="m-0 mt-4 text-brand-muted max-w-[46ch] mx-auto" style={{ fontSize: 17, lineHeight: '26px' }}>
                    {t('apply.success.message', {
                      name: form.fullName.split(' ')[0] || '',
                      email: form.email,
                    })}
                  </p>
                  {applicationId !== null && (
                    <p className="m-0 mt-3 text-[12px] uppercase tracking-[0.18em] font-semibold text-brand-muted">
                      {`Application ID: ${applicationId}`}
                    </p>
                  )}
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setForm(INITIAL)
                        setSubmitted(false)
                        setApplicationId(null)
                        setSendError(null)
                      }}
                      className="text-[12px] uppercase tracking-[0.18em] font-semibold text-brand pb-1 border-b border-brand hover:text-brand-accent hover:border-brand-accent transition-colors"
                    >
                      {t('apply.success.sendAnother')}
                    </button>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 h-11 px-6 bg-brand text-white text-[12px] font-semibold uppercase tracking-[0.18em] rounded-full hover:bg-brand-accent transition-colors"
                    >
                      {t('apply.success.backHome')}
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
                  className="bg-white border border-brand-line"
                >
                  {/* Progress */}
                  <div className="px-5 sm:px-6 lg:px-10 pt-5 pb-4 border-b border-brand-line flex items-center justify-between gap-3 flex-wrap">
                    <p className="m-0 text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-muted">
                      {t('apply.formLabel')}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="relative h-1.5 w-32 bg-brand-line/70 rounded-full overflow-hidden">
                        <motion.span
                          animate={{ width: `${filled}%`, backgroundColor: progressColor }}
                          transition={{ duration: 0.45, ease }}
                          className="absolute inset-y-0 left-0 rounded-full"
                        />
                      </div>
                      <motion.span
                        animate={{ color: progressColor }}
                        transition={{ duration: 0.3, ease }}
                        className={cn(
                          'text-[11px] uppercase tracking-[0.18em] font-semibold tabular-nums',
                          progressLabel
                        )}
                      >
                        {filled}%
                      </motion.span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 lg:p-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label={t('apply.fields.fullName')} error={errors.fullName} className="sm:col-span-2">
                      <InputWrapper>
                        <IconUser size={16} stroke={1.6} className="text-brand-muted" />
                        <input
                          type="text"
                          value={form.fullName}
                          onChange={update('fullName')}
                          placeholder={t('apply.placeholders.fullName')}
                          className="flex-1 bg-transparent outline-none text-[15px] text-brand placeholder:text-brand-muted/60"
                        />
                      </InputWrapper>
                    </Field>

                    <Field label={t('apply.fields.email')} error={errors.email}>
                      <InputWrapper>
                        <IconMail size={16} stroke={1.6} className="text-brand-muted" />
                        <input
                          type="email"
                          value={form.email}
                          onChange={update('email')}
                          placeholder={t('apply.placeholders.email')}
                          className="flex-1 bg-transparent outline-none text-[15px] text-brand placeholder:text-brand-muted/60"
                        />
                      </InputWrapper>
                    </Field>

                    <Field label={t('apply.fields.phone')}>
                      <InputWrapper>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={update('phone')}
                          placeholder={t('apply.placeholders.phone')}
                          className="flex-1 bg-transparent outline-none text-[15px] text-brand placeholder:text-brand-muted/60"
                        />
                      </InputWrapper>
                    </Field>

                    <Field label={t('apply.fields.role')} error={errors.role}>
                      <SelectWrapper>
                        <select
                          value={form.role}
                          onChange={update('role')}
                          className="w-full bg-transparent outline-none text-[15px] text-brand"
                        >
                          <option value="">{t('apply.placeholders.rolePick')}</option>
                          {roleOptions.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </SelectWrapper>
                    </Field>

                    <Field label={t('apply.fields.branch')} error={errors.branch}>
                      <SelectWrapper>
                        <select
                          value={form.branch}
                          onChange={update('branch')}
                          className="w-full bg-transparent outline-none text-[15px] text-brand"
                        >
                          <option value="">{t('apply.placeholders.branchPick')}</option>
                          {BRANCHES.map((b) => (
                            <option key={b.slug} value={b.slug}>{b.city}, {b.country}</option>
                          ))}
                        </select>
                      </SelectWrapper>
                    </Field>

                    <Field label={t('apply.fields.companyOptional')}>
                      <SelectWrapper>
                        <select
                          value={form.company}
                          onChange={update('company')}
                          className="w-full bg-transparent outline-none text-[15px] text-brand"
                        >
                          <option value="">{t('apply.placeholders.companyNone')}</option>
                          {COMPANIES.map((c) => (
                            <option key={c.slug} value={c.slug}>{c.name}</option>
                          ))}
                        </select>
                      </SelectWrapper>
                    </Field>

                    <Field label={t('apply.fields.experience')}>
                      <InputWrapper>
                        <input
                          type="text"
                          value={form.experience}
                          onChange={update('experience')}
                          placeholder={t('apply.placeholders.experience')}
                          className="flex-1 bg-transparent outline-none text-[15px] text-brand placeholder:text-brand-muted/60"
                        />
                      </InputWrapper>
                    </Field>

                    <Field label={t('apply.fields.portfolioOptional')} className="sm:col-span-2">
                      <InputWrapper>
                        <IconPaperclip size={16} stroke={1.6} className="text-brand-muted" />
                        <input
                          type="url"
                          value={form.portfolio}
                          onChange={update('portfolio')}
                          placeholder={t('apply.placeholders.portfolio')}
                          className="flex-1 bg-transparent outline-none text-[15px] text-brand placeholder:text-brand-muted/60"
                        />
                      </InputWrapper>
                    </Field>

                    <Field label={t('apply.fields.cvOptional')} error={errors.resume} className="sm:col-span-2">
                      <div className="space-y-2">
                        <InputWrapper>
                          <IconPaperclip size={16} stroke={1.6} className="text-brand-muted" />
                          <input
                            type="file"
                            accept={RESUME_ACCEPT}
                            onChange={handleResumeChange}
                            className="flex-1 bg-transparent outline-none text-[13px] text-brand file:mr-3 file:rounded-full file:border-0 file:bg-brand-soft file:px-3 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-[0.08em] file:text-brand"
                          />
                        </InputWrapper>
                        {form.resume ? (
                          <div className="flex items-center justify-between gap-3 text-[11px] text-brand-muted">
                            <span className="truncate">
                              {form.resume.name} ({formatBytes(form.resume.size)})
                            </span>
                            <button
                              type="button"
                              onClick={clearResume}
                              className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] font-semibold text-brand-muted hover:text-brand-accent"
                            >
                              <IconX size={12} stroke={1.8} /> {t('apply.clear')}
                            </button>
                          </div>
                        ) : (
                          <p className="m-0 text-[11px] text-brand-muted">
                            {t('apply.placeholders.cv')}
                          </p>
                        )}
                      </div>
                    </Field>

                    <Field label={t('apply.fields.about')} error={errors.about} className="sm:col-span-2">
                      <div className={cn(
                        'border border-brand-line bg-brand-soft/40 px-4 py-3 transition-colors focus-within:border-brand focus-within:bg-white',
                        errors.about && 'border-brand-accent'
                      )}>
                        <textarea
                          value={form.about}
                          onChange={update('about')}
                          rows={5}
                          placeholder={t('apply.placeholders.about')}
                          className="w-full bg-transparent outline-none text-[15px] text-brand placeholder:text-brand-muted/60 resize-none"
                        />
                      </div>
                    </Field>
                  </div>

                  {/* Honeypot — invisible to humans, most bots fill every input */}
                  <div
                    aria-hidden
                    className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
                  >
                    <label>
                      Website (leave this empty)
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </label>
                  </div>

                  {/* Visible math captcha */}
                  <div className="px-5 sm:px-6 lg:px-10 pb-3 pt-1">
                    <div className="bg-brand-soft/60 border border-brand-line px-4 py-3 flex items-center gap-3 flex-wrap">
                      <div className="flex-1 min-w-[180px]">
                        <p className="m-0 text-[10px] uppercase tracking-[0.22em] font-semibold text-brand-muted">
                          {t('apply.captchaLabel')}
                        </p>
                        <p className="m-0 mt-1 text-[13px] font-semibold text-brand tabular-nums">
                          {t('apply.captchaPrompt', { a: captcha.a, b: captcha.b })}
                        </p>
                      </div>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={captchaAnswer}
                        onChange={(e) => {
                          setCaptchaAnswer(e.target.value)
                          if (captchaError) setCaptchaError(null)
                        }}
                        placeholder={t('apply.captchaPlaceholder')}
                        className={cn(
                          'h-11 w-28 px-3 text-center text-[15px] font-semibold text-brand bg-white border outline-none tabular-nums transition-colors',
                          captchaError
                            ? 'border-brand-accent focus:border-brand-accent'
                            : 'border-brand-line focus:border-brand'
                        )}
                        aria-invalid={!!captchaError}
                        aria-label={t('apply.captchaPrompt', { a: captcha.a, b: captcha.b })}
                      />
                    </div>
                    {captchaError && (
                      <p className="m-0 mt-2 text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-accent">
                        {captchaError}
                      </p>
                    )}
                  </div>

                  {sendError && (
                    <div className="mx-5 sm:mx-6 lg:mx-10 mb-2 flex items-start gap-2.5 border border-brand-accent/40 bg-brand-accent/5 px-4 py-3 text-[12px] text-brand">
                      <IconAlertTriangle size={16} className="shrink-0 mt-0.5 text-brand-accent" />
                      <span>{sendError}</span>
                    </div>
                  )}

                  <div className="px-5 sm:px-6 lg:px-10 pb-7 pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="m-0 text-[12px] text-brand-muted inline-flex items-center gap-2">
                      <IconCheck size={14} className="text-brand-accent" />
                      {t('apply.privacy')}
                    </p>
                    <button
                      type="submit"
                      disabled={sending}
                      className="group inline-flex items-center justify-center gap-3 h-12 px-8 bg-brand text-white text-[12px] font-semibold uppercase tracking-[0.18em] rounded-full hover:bg-brand-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <>
                          {t('apply.sending')}
                          <IconLoader2 size={16} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          {t('apply.submit')}
                          <IconSend size={16} className="transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={cn('flex flex-col gap-2', className)}>
      <span className="flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-brand">
          {label}
        </span>
        {error && (
          <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-brand-accent">
            {error}
          </span>
        )}
      </span>
      {children}
    </label>
  )
}

function InputWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 h-11 px-4 border border-brand-line bg-brand-soft/40 transition-colors focus-within:border-brand focus-within:bg-white">
      {children}
    </div>
  )
}

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center h-11 px-4 border border-brand-line bg-brand-soft/40 transition-colors focus-within:border-brand focus-within:bg-white">
      {children}
      <span aria-hidden className="pointer-events-none text-brand-muted">▾</span>
    </div>
  )
}
