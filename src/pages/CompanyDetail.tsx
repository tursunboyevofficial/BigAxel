import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { IconArrowLeft, IconArrowUpRight, IconCheck } from '@tabler/icons-react'
import { COMPANIES, getCompany } from '@/data/companies'
import { getBranch } from '@/data/branches'
import { AmbientFillTile } from '@/components/ui/ambient-tile'
import { NotFound } from '@/pages/NotFound'
import { useT } from '@/lib/i18n'

const ease = [0.22, 1, 0.36, 1] as const

type CompanyT = {
  tagline: string
  sector: string
  description: string
  services: { title: string; text: string }[]
  statLabels: string[]
}
type BranchT = { tagline: string; description: string; focus: string[] }

export function CompanyDetail() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const t = useT()
  const company = getCompany(slug)
  if (!company) return <NotFound />

  const cT = t<CompanyT>(`companies.items.${company.slug}`)
  const tagline = cT?.tagline ?? company.tagline
  const sector = cT?.sector ?? company.sector
  const description = cT?.description ?? company.description
  const services = cT?.services ?? company.services
  const statLabels = cT?.statLabels ?? company.stats.map((s) => s.label)

  const others = COMPANIES.filter((c) => c.slug !== company.slug)
  const goBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/companies')
  }

  return (
    <>
      <section
        className="relative pt-32 lg:pt-44 pb-16 lg:pb-24 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${company.color}1a 0%, #F7F8FA 50%, ${company.color}0d 100%)`,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(#D2D5D9 1px, transparent 1px), linear-gradient(90deg, #D2D5D9 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, #000 0%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, #000 0%, transparent 85%)',
          }}
        />

        <div className="container mx-auto px-6 relative">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 text-brand text-[12px] uppercase tracking-[0.22em] font-semibold hover:text-brand-accent transition-colors"
          >
            <IconArrowLeft size={14} /> {t('companies.back')}
          </button>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mt-10 max-w-5xl"
          >
            <p className="inline-flex items-center gap-3 m-0 mb-6 font-semibold uppercase"
               style={{ fontSize: 12, letterSpacing: '0.22em', color: company.color }}>
              <span className="w-8 h-px" style={{ backgroundColor: company.color }} />
              {sector}
            </p>
            <h1
              className="font-medium text-brand m-0 uppercase"
              style={{
                fontFamily: '"Metropolis Medium", Arial, sans-serif',
                fontSize: 'clamp(3rem, 9vw, 140px)',
                lineHeight: 0.86,
                letterSpacing: '-0.045em',
              }}
            >
              {company.name}
              <span style={{ color: company.color }}>.</span>
            </h1>
            <p className="text-brand m-0 mt-4 max-w-[62ch]"
               style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.55, letterSpacing: '-0.01em', opacity: 0.85 }}>
              {tagline}
            </p>
            <p className="text-brand m-0 mt-6 max-w-[62ch]"
               style={{ fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.5, letterSpacing: '-0.01em' }}>
              {description}
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-px bg-brand-line border border-brand-line max-w-3xl">
            {company.stats.map((s, i) => (
              <div key={s.label} className="bg-white p-6">
                <p
                  className="m-0 font-medium tabular-nums"
                  style={{
                    fontFamily: '"Metropolis Medium", Arial, sans-serif',
                    fontSize: 'clamp(2rem, 3.6vw, 40px)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                    color: company.color,
                    fontWeight: 'normal',
                  }}
                >
                  {s.value}
                </p>
                <p className="m-0 mt-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-muted">
                  {statLabels[i] ?? s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[88px] lg:py-[117px]">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          <div>
            <p className="inline-flex items-center gap-3 m-0 mb-6 text-[12px] uppercase tracking-[0.22em] font-semibold text-brand">
              <span className="w-7 h-px bg-brand" />
              {t('companies.whatWeDoEyebrow')}
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
              {t('companies.servicesTitle')}
            </h2>
            <p className="text-brand-muted m-0" style={{ fontSize: 18, lineHeight: '28px' }}>
              {t('companies.servicesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-line border border-brand-line">
            {services.map((s, i) => (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="bg-white p-7 lg:p-8 flex flex-col gap-3"
              >
                <span
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full"
                  style={{ backgroundColor: `${company.color}15`, color: company.color }}
                >
                  <IconCheck size={18} stroke={2} />
                </span>
                <h3
                  className="m-0 mt-2 font-semibold uppercase text-brand"
                  style={{
                    fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                    fontSize: 20,
                    letterSpacing: '-0.01em',
                    fontWeight: 'normal',
                  }}
                >
                  {s.title}
                </h3>
                <p className="m-0 text-brand-muted" style={{ fontSize: 15, lineHeight: '23px' }}>
                  {s.text}
                </p>
              </motion.article>
            ))}
            {services.length % 2 !== 0 && (
              <AmbientFillTile
                minHeight={200}
                title={t('companies.fillServicesTitle')}
                subtitle={t('companies.fillServicesSubtitle', { name: company.name })}
              />
            )}
          </div>
        </div>
      </section>

      {/* Where we operate */}
      {company.branches.length > 0 && (
        <section className="py-[88px] lg:py-[117px] bg-brand-soft">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-10">
              <div>
                <p className="inline-flex items-center gap-3 m-0 mb-4 text-[12px] uppercase tracking-[0.22em] font-semibold text-brand">
                  <span className="w-7 h-px bg-brand" />
                  {t('companies.footprintEyebrow')}
                </p>
                <h2
                  className="m-0 font-semibold uppercase text-brand"
                  style={{
                    fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                    fontSize: 'clamp(2rem, 4.4vw, 48px)',
                    lineHeight: 0.96,
                    letterSpacing: '-0.035em',
                    fontWeight: 'normal',
                  }}
                >
                  {t('companies.footprintTitle', { name: company.name })}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-line border border-brand-line">
              {company.branches.map((bslug) => {
                const b = getBranch(bslug)
                if (!b) return null
                const bT = t<BranchT>(`branches.items.${bslug}`)
                const bTagline = bT?.tagline ?? b.tagline
                const bCountry = t<string>(`branches.countries.${b.country}`) || b.country
                return (
                  <Link
                    key={bslug}
                    to={`/branches/${bslug}`}
                    className="group bg-white p-7 flex flex-col gap-3 hover:bg-white/80 transition-colors"
                  >
                    <p className="m-0 text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-muted">
                      {bCountry}
                    </p>
                    <h3
                      className="m-0 font-semibold uppercase text-brand"
                      style={{
                        fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                        fontSize: 26,
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                        fontWeight: 'normal',
                      }}
                    >
                      {b.city}
                    </h3>
                    <span className="text-[12px] uppercase tracking-[0.14em] font-semibold text-brand-muted inline-flex items-center gap-1.5 group-hover:text-brand-accent transition-colors">
                      {bTagline} <IconArrowUpRight size={12} />
                    </span>
                  </Link>
                )
              })}
              {Array.from({ length: Math.max(0, 3 - company.branches.length) }).map((_, i) => (
                <AmbientFillTile
                  key={`fill-${i}`}
                  delay={i * 0.2}
                  minHeight={200}
                  title={t('companies.fillBranchTitle')}
                  subtitle={t('companies.fillBranchSubtitle', { name: company.name })}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other companies */}
      <section className="py-[88px] lg:py-[117px]">
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
              {t('companies.otherTitle')}
            </h2>
            <Link to="/companies" className="text-[12px] uppercase tracking-[0.22em] font-semibold text-brand hover:text-brand-accent">
              {t('companies.viewAll')} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-line border border-brand-line">
            {others.map((o) => {
              const oT = t<CompanyT>(`companies.items.${o.slug}`)
              const oSector = oT?.sector ?? o.sector
              const oTagline = oT?.tagline ?? o.tagline
              return (
                <Link
                  key={o.slug}
                  to={`/companies/${o.slug}`}
                  className="group bg-white p-7 flex flex-col gap-3 hover:bg-brand-soft transition-colors"
                >
                  <p className="m-0 text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: o.color }}>
                    {oSector}
                  </p>
                  <h3
                    className="m-0 font-semibold uppercase text-brand"
                    style={{
                      fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                      fontSize: 26,
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      fontWeight: 'normal',
                    }}
                  >
                    {o.name}
                  </h3>
                  <span className="mt-2 text-[12px] uppercase tracking-[0.14em] font-semibold text-brand-muted inline-flex items-center gap-1.5 group-hover:text-brand-accent transition-colors">
                    {oTagline} <IconArrowUpRight size={12} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
