import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { IconArrowUpRight, IconMapPin, IconUsers, IconBriefcase } from '@tabler/icons-react'
import { BRANCHES } from '@/data/branches'
import { COMPANIES } from '@/data/companies'
import { JOBS, JOB_TEAMS, JOB_TYPES, type Job } from '@/data/jobs'
import { cn } from '@/lib/utils'
import { useT } from '@/lib/i18n'

const ease = [0.22, 1, 0.36, 1] as const

type TeamFilter = (typeof JOB_TEAMS)[number] | 'All'
type TypeFilter = (typeof JOB_TYPES)[number] | 'All'
type BranchFilter = string | 'All'

export function JobsIndex() {
  const t = useT()
  const [team, setTeam] = useState<TeamFilter>('All')
  const [type, setType] = useState<TypeFilter>('All')
  const [branch, setBranch] = useState<BranchFilter>('All')

  const filtered = useMemo(
    () =>
      JOBS.filter((j) => (team === 'All' || j.team === team))
        .filter((j) => (type === 'All' || j.type === type))
        .filter((j) => (branch === 'All' || j.branch === branch)),
    [team, type, branch]
  )

  const anyFilter = team !== 'All' || type !== 'All' || branch !== 'All'
  const branchMap = Object.fromEntries(BRANCHES.map((b) => [b.slug, b]))

  return (
    <section className="pt-32 pb-24 lg:pt-44 lg:pb-32 min-h-[80vh]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-[1100px] mb-12 pt-7 border-t border-brand-line">
          <p className="inline-flex items-center gap-3 m-0 text-[12px] uppercase tracking-[0.22em] font-semibold text-brand">
            <span className="w-7 h-px bg-brand" />
            {t('jobs.indexEyebrow')}
          </p>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-14 items-end">
            <h1
              className="font-medium uppercase text-brand m-0"
              style={{
                fontFamily: '"Metropolis Medium", Arial, sans-serif',
                fontSize: 'clamp(2.4rem, 5.6vw, 76px)',
                lineHeight: 0.94,
                letterSpacing: '-0.04em',
              }}
            >
              {t('jobs.indexTitleL1')}<br />{t('jobs.indexTitleL2')}
            </h1>
            <p className="text-brand-muted m-0 max-w-[46ch]" style={{ fontSize: 17, lineHeight: '27px' }}>
              {t('jobs.indexDescription')}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <FilterSelect
            label={t('jobs.filterTeam')}
            value={team}
            onChange={(v) => setTeam(v as TeamFilter)}
            options={['All', ...JOB_TEAMS]}
            allLabel={t('jobs.filterAll')}
          />
          <FilterSelect
            label={t('jobs.filterBranch')}
            value={branch}
            onChange={(v) => setBranch(v as BranchFilter)}
            options={['All', ...BRANCHES.map((b) => b.slug)]}
            allLabel={t('jobs.filterAll')}
            getLabel={(v) =>
              v === 'All' ? t('jobs.filterAll') : `${branchMap[v]?.city}, ${branchMap[v]?.countryCode}`
            }
          />
          <FilterSelect
            label={t('jobs.filterType')}
            value={type}
            onChange={(v) => setType(v as TypeFilter)}
            options={['All', ...JOB_TYPES]}
            allLabel={t('jobs.filterAll')}
          />
          <button
            type="button"
            onClick={() => {
              setTeam('All')
              setType('All')
              setBranch('All')
            }}
            disabled={!anyFilter}
            className={cn(
              'h-12 px-5 border text-[12px] uppercase tracking-[0.18em] font-semibold transition-colors',
              anyFilter
                ? 'border-brand text-brand hover:bg-brand hover:text-white'
                : 'border-brand-line text-brand-muted cursor-not-allowed'
            )}
          >
            {t('jobs.clearFilters')}
          </button>
        </div>

        {/* Count */}
        <p className="mb-6 text-[12px] uppercase tracking-[0.18em] font-semibold text-brand-muted">
          {t('jobs.showing')} <span className="text-brand tabular-nums">{filtered.length}</span>{' '}
          {t('jobs.of')} <span className="tabular-nums">{JOBS.length}</span> {t('jobs.openings')}
        </p>

        {/* List */}
        <div className="border-t border-brand-line">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <p className="m-0 text-brand-muted text-[15px]">{t('jobs.noResults')}</p>
              </motion.div>
            ) : (
              filtered.map((job, i) => (
                <JobRow key={job.slug} job={job} index={i} />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* How we hire */}
        <HowWeHire />
      </div>
    </section>
  )
}

function JobRow({ job, index }: { job: Job; index: number }) {
  const t = useT()
  const branch = BRANCHES.find((b) => b.slug === job.branch)
  const company = job.company ? COMPANIES.find((c) => c.slug === job.company) : null

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: Math.min(index * 0.04, 0.3), ease } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="group border-b border-brand-line"
    >
      <Link
        to={`/jobs/${job.slug}`}
        className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_0.9fr_auto] gap-4 lg:gap-8 items-center py-5 lg:py-6 transition-colors hover:bg-brand-soft/50 px-1"
      >
        {/* Title + summary */}
        <div>
          <h3
            className="m-0 font-medium uppercase text-brand group-hover:text-brand-accent transition-colors"
            style={{
              fontFamily: '"Metropolis Medium", Arial, sans-serif',
              fontSize: 'clamp(18px, 1.8vw, 22px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              fontWeight: 400,
            }}
          >
            {job.title}
          </h3>
          <p className="m-0 mt-1.5 text-brand-muted text-[13px] leading-[19px] max-w-[56ch]">
            {job.summary}
          </p>
        </div>

        {/* Team + company */}
        <div className="flex flex-col gap-1">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-brand">
            <IconUsers size={13} stroke={1.6} className="text-brand-muted" />
            {job.team}
          </span>
          {company && (
            <span className="text-[11px] uppercase tracking-[0.14em] text-brand-muted">
              {company.name}
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-brand">
            <IconMapPin size={13} stroke={1.6} className="text-brand-muted" />
            {branch?.city ?? job.branch}
          </span>
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-brand-muted">
            <IconBriefcase size={12} stroke={1.6} />
            {job.type}
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3 lg:justify-end">
          <span className="text-[12px] uppercase tracking-[0.18em] font-semibold text-brand pb-1 border-b border-brand group-hover:text-brand-accent group-hover:border-brand-accent transition-colors">
            {t('jobs.viewRole')}
          </span>
          <span className="h-9 w-9 rounded-full bg-brand-soft text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
            <IconArrowUpRight size={14} />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  allLabel,
  getLabel,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: readonly string[]
  allLabel: string
  getLabel?: (v: string) => string
}) {
  return (
    <label className="relative flex items-center h-12 border border-brand-line bg-white focus-within:border-brand transition-colors">
      <span className="px-4 text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-muted shrink-0">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none text-[13px] uppercase tracking-[0.1em] font-semibold text-brand pr-9 appearance-none cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === 'All' ? allLabel : getLabel ? getLabel(o) : o}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-4 text-brand-muted">
        ▾
      </span>
    </label>
  )
}

function HowWeHire() {
  const t = useT()
  const steps = t<string[]>('jobs.hireSteps')
  const list = Array.isArray(steps) ? steps : []
  return (
    <div className="mt-20 pt-14 border-t border-brand-line">
      <p className="inline-flex items-center gap-3 m-0 mb-5 text-[12px] uppercase tracking-[0.22em] font-semibold text-brand">
        <span className="w-7 h-px bg-brand-accent" />
        {t('jobs.howWeHire')}
      </p>
      <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-line border border-brand-line">
        {list.map((step, i) => (
          <li key={i} className="bg-white p-6 flex gap-4">
            <span className="shrink-0 h-8 w-8 rounded-full bg-brand-soft text-brand text-[12px] font-semibold flex items-center justify-center tabular-nums">
              {i + 1}
            </span>
            <p className="m-0 text-[14px] text-brand leading-[21px]">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
