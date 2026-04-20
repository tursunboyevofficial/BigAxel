import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { IconArrowUpRight } from '@tabler/icons-react'
import { COMPANIES } from '@/data/companies'
import { useT } from '@/lib/i18n'

const ease = [0.22, 1, 0.36, 1] as const

type CompanyT = {
  tagline: string
  sector: string
  description: string
  statLabels: string[]
}

export function CompaniesIndex() {
  const t = useT()
  return (
    <section className="pt-32 pb-24 lg:pt-44 lg:pb-32 min-h-[80vh]">
      <div className="container mx-auto px-6">
        <div className="max-w-[1000px] mb-14 pt-7 border-t border-brand-line grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
          <div className="lg:col-span-2">
            <p className="inline-flex items-center gap-3 m-0 text-[12px] uppercase tracking-[0.22em] font-semibold text-brand">
              <span className="w-7 h-px bg-brand" />
              {t('companies.indexEyebrow')}
            </p>
          </div>
          <h1
            className="font-medium uppercase text-brand m-0"
            style={{
              fontFamily: '"Metropolis Medium", Arial, sans-serif',
              fontSize: 'clamp(2.4rem, 6vw, 80px)',
              lineHeight: 0.94,
              letterSpacing: '-0.04em',
            }}
          >
            {t('companies.indexTitleL1')}<br />{t('companies.indexTitleL2')}
          </h1>
          <p className="text-brand-muted m-0 max-w-[560px]" style={{ fontSize: 19, lineHeight: '28px' }}>
            {t('companies.indexDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-line border border-brand-line">
          {COMPANIES.map((c, i) => {
            const cT = t<CompanyT>(`companies.items.${c.slug}`)
            const sector = cT?.sector ?? c.sector
            const tagline = cT?.tagline ?? c.tagline
            const description = cT?.description ?? c.description
            const statLabels = cT?.statLabels ?? c.stats.map((s) => s.label)
            return (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
            >
              <Link
                to={`/companies/${c.slug}`}
                className="group relative bg-white block h-full overflow-hidden"
                style={{ minHeight: 460 }}
              >
                {/* Image header */}
                <div className="relative h-56 overflow-hidden bg-brand">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, ${c.color}33 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.75) 100%)`,
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5">
                    <p className="m-0 text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: c.color }}>
                      {sector}
                    </p>
                  </div>
                  <span
                    className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white text-brand flex items-center justify-center transition-all duration-500 group-hover:bg-brand group-hover:text-white group-hover:rotate-45"
                  >
                    <IconArrowUpRight size={16} />
                  </span>
                </div>

                {/* Content */}
                <div className="relative p-8 lg:p-10">
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative">
                    <h2
                      className="m-0 font-semibold uppercase text-brand"
                      style={{
                        fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                        fontSize: 'clamp(2rem, 3.6vw, 44px)',
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                        fontWeight: 'normal',
                      }}
                    >
                      {c.name}
                    </h2>
                    <p className="m-0 mt-3 text-brand-muted max-w-[42ch]" style={{ fontSize: 16, lineHeight: '25px' }}>
                      {tagline} — {description.split('.')[0]}.
                    </p>

                    <div className="mt-7 pt-5 border-t border-brand-line flex items-end justify-between gap-4">
                      <ul className="flex flex-wrap gap-x-5 gap-y-2">
                        {c.stats.map((s, j) => (
                          <li key={s.label} className="flex items-baseline gap-1.5">
                            <span
                              className="font-medium tabular-nums"
                              style={{ fontSize: 22, color: c.color, fontWeight: 'normal' }}
                            >
                              {s.value}
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-muted">
                              {statLabels[j] ?? s.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
