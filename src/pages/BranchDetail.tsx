import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconBuilding,
  IconCalendar,
  IconMapPin,
  IconUsers,
} from '@tabler/icons-react'
import { BRANCHES, getBranch } from '@/data/branches'
import { getCompany } from '@/data/companies'
import { AmbientFillTile } from '@/components/ui/ambient-tile'
import { NotFound } from '@/pages/NotFound'

const ease = [0.22, 1, 0.36, 1] as const

export function BranchDetail() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const branch = getBranch(slug)
  if (!branch) return <NotFound />

  const related = BRANCHES.filter((b) => b.slug !== branch.slug).slice(0, 3)
  const goBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/branches')
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden bg-brand">
        <div className="absolute inset-0 z-0">
          <img
            src={branch.image}
            alt={`${branch.city} cityscape`}
            className="h-full w-full object-cover opacity-55"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(37,36,41,0.9) 0%, rgba(37,36,41,0.6) 40%, rgba(37,36,41,0.85) 100%)',
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 text-white/85 text-[12px] uppercase tracking-[0.22em] font-semibold hover:text-brand-accent transition-colors"
          >
            <IconArrowLeft size={14} /> Back
          </button>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mt-10 max-w-4xl"
          >
            <p className="inline-flex items-center gap-3 m-0 mb-6 text-white/80 font-semibold uppercase"
               style={{ fontSize: 12, letterSpacing: '0.22em' }}>
              <span className="w-8 h-px bg-brand-accent" />
              {branch.countryCode} · {branch.tagline}
            </p>
            <h1
              className="font-medium text-white m-0 uppercase"
              style={{
                fontFamily: '"Metropolis Medium", Arial, sans-serif',
                fontSize: 'clamp(3rem, 9vw, 120px)',
                lineHeight: 0.86,
                letterSpacing: '-0.045em',
              }}
            >
              {branch.city}
              <span className="text-brand-accent">.</span>
            </h1>
            <p className="text-white/75 m-0 mt-7 max-w-[58ch]" style={{ fontSize: 19, lineHeight: '29px' }}>
              {branch.description}
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/15">
            {[
              { icon: IconCalendar, label: 'Established', value: branch.established },
              { icon: IconUsers, label: 'Team size', value: branch.staff },
              { icon: IconMapPin, label: 'Country', value: branch.country },
              { icon: IconBuilding, label: 'Companies', value: String(branch.companies.length) },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-brand/80 backdrop-blur-sm p-5 lg:p-6">
                <Icon size={18} stroke={1.5} className="text-brand-accent mb-3" />
                <p className="m-0 text-[11px] uppercase tracking-[0.22em] font-semibold text-white/60">
                  {label}
                </p>
                <p className="m-0 mt-1 font-medium text-white uppercase"
                   style={{ fontSize: 22, letterSpacing: '-0.01em', fontWeight: 'normal' }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-[88px] lg:py-[117px] bg-brand-soft">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20">
          <div>
            <p className="inline-flex items-center gap-3 m-0 mb-6 text-[12px] uppercase tracking-[0.22em] font-semibold text-brand">
              <span className="w-7 h-px bg-brand" />
              What we do here
            </p>
            <h2
              className="m-0 font-semibold uppercase text-brand mb-5"
              style={{
                fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                fontSize: 'clamp(2rem, 4.4vw, 56px)',
                lineHeight: 0.96,
                letterSpacing: '-0.035em',
                fontWeight: 'normal',
              }}
            >
              Focus areas
            </h2>
            <p className="text-brand-muted m-0" style={{ fontSize: 18, lineHeight: '28px' }}>
              Every branch runs a specific mix of services — shaped by local talent, time zones and the markets it serves.
            </p>
          </div>

          <ul className="space-y-px bg-brand-line border border-brand-line">
            {branch.focus.map((f, i) => (
              <li key={f} className="bg-white px-6 lg:px-8 py-5 flex items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <span className="text-[11px] tabular-nums font-semibold text-brand-accent">
                    0{i + 1}
                  </span>
                  <span
                    className="font-semibold uppercase text-brand"
                    style={{ fontSize: 19, letterSpacing: '-0.01em', fontWeight: 'normal' }}
                  >
                    {f}
                  </span>
                </div>
                <span className="h-px w-10 bg-brand-line" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Companies at this branch */}
      {branch.companies.length > 0 && (
        <section className="py-[88px] lg:py-[117px]">
          <div className="container mx-auto px-6">
            <p className="inline-flex items-center gap-3 m-0 mb-6 text-[12px] uppercase tracking-[0.22em] font-semibold text-brand">
              <span className="w-7 h-px bg-brand" />
              Based here
            </p>
            <h2
              className="m-0 mb-10 font-semibold uppercase text-brand"
              style={{
                fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                fontSize: 'clamp(2rem, 4.4vw, 52px)',
                lineHeight: 0.96,
                letterSpacing: '-0.035em',
                fontWeight: 'normal',
              }}
            >
              Companies at {branch.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-line border border-brand-line">
              {branch.companies.map((slug) => {
                const c = getCompany(slug)
                if (!c) return null
                return (
                  <Link
                    key={slug}
                    to={`/companies/${slug}`}
                    className="group relative bg-white overflow-hidden hover:bg-brand-soft transition-colors"
                  >
                    <div className="relative h-36 overflow-hidden bg-brand">
                      <img
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(180deg, ${c.color}1f 0%, rgba(0,0,0,0.5) 100%)`,
                        }}
                      />
                    </div>
                    <div className="p-7 flex flex-col gap-3">
                      <p
                        className="m-0 text-[11px] uppercase tracking-[0.22em] font-semibold"
                        style={{ color: c.color }}
                      >
                        {c.sector}
                      </p>
                      <h3
                        className="m-0 font-semibold uppercase text-brand"
                        style={{
                          fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                          fontSize: 24,
                          lineHeight: 1.05,
                          letterSpacing: '-0.02em',
                          fontWeight: 'normal',
                        }}
                      >
                        {c.name}
                      </h3>
                      <p className="m-0 text-brand-muted" style={{ fontSize: 15, lineHeight: '23px' }}>
                        {c.tagline}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-2 text-brand text-[12px] font-semibold uppercase tracking-[0.18em] pb-1 border-b border-brand w-fit group-hover:text-brand-accent group-hover:border-brand-accent transition-colors">
                        View company <IconArrowUpRight size={14} />
                      </span>
                    </div>
                  </Link>
                )
              })}
              {Array.from({ length: Math.max(0, 3 - branch.companies.length) }).map((_, i) => (
                <AmbientFillTile key={`fill-${i}`} delay={i * 0.2} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other branches */}
      <section className="py-[88px] lg:py-[117px] bg-brand-soft">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2
              className="m-0 font-semibold uppercase text-brand"
              style={{
                fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                fontSize: 'clamp(1.6rem, 3vw, 36px)',
                lineHeight: 0.96,
                letterSpacing: '-0.03em',
                fontWeight: 'normal',
              }}
            >
              Other branches
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-line border border-brand-line">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/branches/${r.slug}`}
                className="group bg-white p-7 flex flex-col gap-3 hover:bg-white/80 transition-colors"
              >
                <p className="m-0 text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-muted">
                  {r.country}
                </p>
                <h3
                  className="m-0 font-semibold uppercase text-brand"
                  style={{
                    fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                    fontSize: 28,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    fontWeight: 'normal',
                  }}
                >
                  {r.city}
                </h3>
                <span className="mt-2 text-[12px] uppercase tracking-[0.14em] font-semibold text-brand-muted group-hover:text-brand-accent transition-colors inline-flex items-center gap-1.5">
                  {r.tagline} <IconArrowUpRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
