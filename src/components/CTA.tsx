import { motion } from 'motion/react'
import { IconArrowUpRight, IconBriefcase, IconMapPin, IconSparkles } from '@tabler/icons-react'

const PERKS = [
  { icon: IconBriefcase, label: 'Full-time & hybrid roles' },
  { icon: IconMapPin, label: 'Tashkent · 50 countries' },
  { icon: IconSparkles, label: 'Mentorship from day one' },
]

const ease = [0.22, 1, 0.36, 1] as const

export function CTA() {
  return (
    <section id="cta" className="py-[88px] lg:py-[117px]">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-sm bg-brand">
          {/* Radial spotlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 85% 75% at 15% 0%, rgba(226,42,38,0.32) 0%, rgba(226,42,38,0) 55%), radial-gradient(ellipse 60% 70% at 90% 100%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)',
            }}
          />

          {/* Dotted grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.85) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
              maskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)',
            }}
          />

          {/* Animated scan line */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(226,42,38,0.9) 50%, transparent 100%)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.6 }}
          />

          <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 sm:gap-14 items-end">
            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="inline-flex items-center gap-3 m-0 mb-7 text-white/80 font-semibold uppercase"
                 style={{ fontSize: 12, letterSpacing: '0.22em' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
                </span>
                Now hiring · Join Us
              </p>

              <h2
                className="font-medium text-white m-0 uppercase"
                style={{
                  fontFamily: '"Metropolis Medium", Arial, sans-serif',
                  fontSize: 'clamp(2.4rem, 6vw, 80px)',
                  lineHeight: 0.94,
                  letterSpacing: '-0.04em',
                }}
              >
                Let's make
                <br />
                something
                <br />
                <span className="relative inline-block">
                  great together
                  <motion.span
                    aria-hidden
                    className="absolute left-0 right-0 bottom-1 h-[6px] bg-brand-accent/85"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, delay: 0.45, ease }}
                  />
                </span>
                .
              </h2>

              <p
                className="text-white/70 m-0 mt-8 max-w-[52ch]"
                style={{ fontSize: 18, lineHeight: '28px', letterSpacing: '-0.15px' }}
              >
                We're always looking for people who want to build something real — in sales, tech,
                and travel. Send us your story and let's talk.
              </p>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {PERKS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2.5 text-white/75 text-[13px] uppercase tracking-[0.14em] font-semibold"
                  >
                    <Icon size={16} stroke={1.6} className="text-brand-accent" />
                    {label}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="relative"
            >
              <a
                href="#contact"
                className="group relative block overflow-hidden rounded-sm bg-white text-brand p-6 sm:p-9 transition-colors hover:bg-brand-soft"
              >
                {/* Shimmer on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform"
                  style={{
                    background:
                      'linear-gradient(120deg, transparent 0%, rgba(226,42,38,0.18) 50%, transparent 100%)',
                    transitionDuration: '1100ms',
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />

                <p className="m-0 mb-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-accent">
                  Careers
                </p>
                <h3
                  className="m-0 font-semibold uppercase text-brand"
                  style={{
                    fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                    fontSize: 'clamp(1.6rem, 2.6vw, 34px)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.025em',
                    fontWeight: 'normal',
                  }}
                >
                  Apply now →
                </h3>

                <div className="mt-8 pt-6 border-t border-brand-line flex items-center justify-between">
                  <span className="text-[12px] uppercase tracking-[0.18em] font-semibold text-brand-muted">
                    Takes 2 minutes
                  </span>
                  <span className="relative h-11 w-11 rounded-full bg-brand text-white overflow-hidden">
                    <IconArrowUpRight
                      size={20}
                      className="absolute inset-0 m-auto transition-transform duration-500 group-hover:translate-x-5 group-hover:-translate-y-5"
                    />
                    <IconArrowUpRight
                      size={20}
                      className="absolute inset-0 m-auto -translate-x-5 translate-y-5 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0"
                    />
                  </span>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
