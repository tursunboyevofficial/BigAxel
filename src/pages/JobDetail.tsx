import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconBriefcase,
  IconBuildingSkyscraper,
  IconCalendar,
  IconCircleCheck,
  IconMapPin,
  IconUsers,
} from '@tabler/icons-react'
import { BRANCHES } from '@/data/branches'
import { COMPANIES } from '@/data/companies'
import { JOBS, getJob, getJobsByBranch } from '@/data/jobs'
import { NotFound } from '@/pages/NotFound'
import { useT } from '@/lib/i18n'

const ease = [0.22, 1, 0.36, 1] as const

export function JobDetail() {
  const { slug } = useParams<{ slug: string }>()
  const t = useT()
  const job = slug ? getJob(slug) : undefined

  if (!job) return <NotFound />

  const branch = job.branch ? BRANCHES.find((b) => b.slug === job.branch) : undefined
  const company = job.company ? COMPANIES.find((c) => c.slug === job.company) : null
  const related = (job.branch
    ? getJobsByBranch(job.branch)
    : JOBS.filter((j) => j.location === job.location)
  )
    .filter((j) => j.slug !== job.slug)
    .slice(0, 3)
  const applyHref = `/careers/apply?role=${encodeURIComponent(job.title)}${
    job.branch ? `&branch=${encodeURIComponent(job.branch)}` : ''
  }`

  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-28 min-h-[85vh]">
      <div className="container mx-auto px-6">
        {/* Back link */}
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-brand text-[12px] uppercase tracking-[0.22em] font-semibold hover:text-brand-accent transition-colors"
        >
          <IconArrowLeft size={14} /> {t('jobs.backToJobs')}
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
          className="mt-10 pt-7 border-t border-brand-line grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14 items-start"
        >
          <div>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-muted">
              <span className="inline-flex items-center gap-1.5 text-brand-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                {job.team}
              </span>
              <span className="text-brand-line">/</span>
              <span>{job.type}</span>
              {company && (
                <>
                  <span className="text-brand-line">/</span>
                  <span>{company.name}</span>
                </>
              )}
            </div>

            <h1
              className="m-0 mt-5 font-medium uppercase text-brand"
              style={{
                fontFamily: '"Metropolis Medium", Arial, sans-serif',
                fontSize: 'clamp(2rem, 5.2vw, 64px)',
                lineHeight: 0.96,
                letterSpacing: '-0.035em',
                fontWeight: 400,
              }}
            >
              {job.title}
              <span className="text-brand-accent">.</span>
            </h1>

            <p className="mt-6 text-brand-muted m-0 max-w-[56ch]" style={{ fontSize: 18, lineHeight: '28px' }}>
              {job.summary}
            </p>

            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <Link
                to={applyHref}
                className="inline-flex items-center gap-2.5 h-12 px-7 bg-brand text-white text-[12px] font-semibold uppercase tracking-[0.18em] rounded-full hover:bg-brand-accent transition-colors"
              >
                {t('jobs.applyForJob')}
                <IconArrowUpRight size={16} />
              </Link>
              {branch && (
                <Link
                  to={`/branches/${branch.slug}`}
                  className="inline-flex items-center gap-2 h-12 px-5 border border-brand-line text-brand text-[12px] font-semibold uppercase tracking-[0.18em] hover:border-brand transition-colors"
                >
                  <IconMapPin size={14} stroke={1.6} />
                  {branch.city}, {branch.countryCode}
                </Link>
              )}
            </div>
          </div>

          {/* Meta card */}
          <aside className="bg-brand-soft border border-brand-line p-6 lg:p-7 lg:sticky lg:top-32">
            <p className="m-0 text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-accent">
              {t('jobs.apply')}
            </p>
            <MetaRow
              icon={IconMapPin}
              label={t('jobs.branchLabel')}
              value={branch ? `${branch.city}, ${branch.country}` : job.location}
            />
            <MetaRow icon={IconUsers} label={t('jobs.teamLabel')} value={job.team} />
            <MetaRow icon={IconBriefcase} label={t('jobs.typeLabel')} value={job.type} />
            {company && (
              <MetaRow icon={IconBuildingSkyscraper} label={t('jobs.companyLabel')} value={company.name} />
            )}
            <MetaRow
              icon={IconCalendar}
              label={t('jobs.postedOn')}
              value={new Date(job.postedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            />

            <Link
              to={applyHref}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 h-11 bg-brand text-white text-[12px] font-semibold uppercase tracking-[0.18em] rounded-full hover:bg-brand-accent transition-colors"
            >
              {t('jobs.apply')}
              <IconArrowUpRight size={14} />
            </Link>
          </aside>
        </motion.div>

        {/* Body */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14 items-start">
          <div>
            <Block title={t('jobs.responsibilities')} items={job.description} />
            <Block title={t('jobs.requirements')} items={job.requirements} />
            {job.benefits && job.benefits.length > 0 && (
              <Block title={t('jobs.benefits')} items={job.benefits} />
            )}
          </div>
        </div>

        {/* Related jobs */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-brand-line">
            <div className="flex items-end justify-between gap-4 mb-8">
              <p className="inline-flex items-center gap-3 m-0 text-[12px] uppercase tracking-[0.22em] font-semibold text-brand">
                <span className="w-7 h-px bg-brand-accent" />
                {t('jobs.openPositions')}{' '}
                {t('jobs.atLocation', { location: branch?.city ?? job.location })}
              </p>
              <Link
                to="/jobs"
                className="text-[12px] uppercase tracking-[0.18em] font-semibold text-brand pb-1 border-b border-brand hover:text-brand-accent hover:border-brand-accent transition-colors"
              >
                {t('jobs.viewAll')} →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-line border border-brand-line">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/jobs/${r.slug}`}
                  className="group bg-white p-6 flex flex-col gap-3 hover:bg-brand-soft transition-colors"
                >
                  <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-accent">
                    {r.team}
                  </span>
                  <h3
                    className="m-0 font-medium uppercase text-brand"
                    style={{
                      fontFamily: '"Metropolis Medium", Arial, sans-serif',
                      fontSize: 18,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {r.title}
                  </h3>
                  <p className="m-0 text-brand-muted text-[13px] leading-[20px]">{r.summary}</p>
                  <span className="mt-auto text-[11px] uppercase tracking-[0.18em] font-semibold text-brand pb-1 border-b border-brand w-fit group-hover:text-brand-accent group-hover:border-brand-accent transition-colors">
                    {t('jobs.viewRole')} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="mt-5 flex items-start gap-3">
      <Icon size={15} stroke={1.6} className="text-brand-muted mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="m-0 text-[10px] uppercase tracking-[0.22em] font-semibold text-brand-muted">
          {label}
        </p>
        <p className="m-0 mt-1 text-[14px] text-brand leading-[20px]">{value}</p>
      </div>
    </div>
  )
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-12">
      <h2
        className="m-0 mb-5 font-semibold uppercase text-brand"
        style={{
          fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
          fontSize: 20,
          letterSpacing: '-0.01em',
          fontWeight: 'normal',
        }}
      >
        {title}
      </h2>
      <ul className="m-0 p-0 list-none space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[15.5px] text-brand leading-[24px]">
            <IconCircleCheck size={18} stroke={1.6} className="text-brand-accent mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
