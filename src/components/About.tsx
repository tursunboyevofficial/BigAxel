import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  IconArrowUpRight,
  IconBriefcase,
  IconBuildingSkyscraper,
  IconPlaneTilt,
  IconWorld,
} from '@tabler/icons-react'
import { Eyebrow } from '@/components/Eyebrow'
import { NumberTicker } from '@/components/ui/number-ticker'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

const PILLARS = [
  {
    icon: IconWorld,
    title: 'Global reach',
    text: '50 countries served from 5 offices across Central Asia, South Asia, MENA and Europe.',
  },
  {
    icon: IconPlaneTilt,
    title: 'Travel first',
    text: 'Airline ticket consolidation is our craft — built on a decade of carrier relationships.',
  },
  {
    icon: IconBuildingSkyscraper,
    title: 'Four companies',
    text: 'SummitStone, Lumovia India, Lumovia Egypt and Bigaxel Tech — one shared operating system.',
  },
  {
    icon: IconBriefcase,
    title: 'People-first',
    text: 'Most of our team started here and grew with us. Mentorship is a daily practice, not a policy.',
  },
]

export function About() {
  return (
    <section id="about" className="relative py-[88px] lg:py-[117px] overflow-hidden">
      {/* Dotted grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #D2D5D9 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 35%, #000 0%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 35%, #000 0%, transparent 90%)',
        }}
      />

      <div className="container mx-auto px-6 relative">
        {/* Top meta rail — full width */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease }}
          className="relative pt-8 mb-12"
        >
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-brand-line">
            <span className="absolute -top-1 left-0 h-2 w-px bg-brand-line" />
            <span className="absolute -top-1 right-0 h-2 w-px bg-brand-line" />
          </div>
          <div className="flex items-center justify-between gap-x-4 gap-y-2 flex-wrap">
            <Eyebrow>Who we are</Eyebrow>
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] font-semibold tabular-nums">
              <span className="text-brand">01</span>
              <span className="text-brand-muted">— Section</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Left: heading + copy + pillars */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease, delay: 0.05 }}
              className="m-0 font-medium uppercase text-brand"
              style={{
                fontFamily: '"Metropolis Medium", Arial, sans-serif',
                fontSize: 'clamp(2.4rem, 5.6vw, 76px)',
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
              }}
            >
              Sales experts
              <br />
              in the airline
              <br />
              industry<span className="text-brand-accent">.</span>
            </motion.h2>

            {/* Accent bar */}
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease, delay: 0.25 }}
              className="block mt-7 mb-8 h-[2px] w-16 bg-brand-accent origin-left"
            />

            <div className="relative pl-6 max-w-[56ch]">
              <span aria-hidden className="absolute left-0 top-0 bottom-0 w-px bg-brand-line">
                <span className="absolute left-0 top-0 h-5 w-px bg-brand-accent" />
              </span>
              <p className="m-0 text-brand" style={{ fontSize: 18, lineHeight: '28px', letterSpacing: '-0.15px' }}>
                Big Axel is a network of companies serving travel, finance, entertainment and
                technology across 50 countries. From our Tashkent headquarters we built a group
                that puts people before process — and lets that decision compound for a decade.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-line border border-brand-line">
              {PILLARS.map(({ icon: Icon, title, text }, i) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className="bg-white p-6 lg:p-7 flex flex-col gap-3"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Icon size={18} stroke={1.6} />
                  </span>
                  <h3
                    className="m-0 mt-2 font-semibold uppercase text-brand"
                    style={{ fontSize: 15, letterSpacing: '-0.005em', fontWeight: 'normal' }}
                  >
                    {title}
                  </h3>
                  <p className="m-0 text-brand-muted" style={{ fontSize: 14, lineHeight: '22px' }}>
                    {text}
                  </p>
                </motion.article>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-6">
              <Link
                to="/companies"
                className="inline-flex items-center gap-2.5 h-12 px-7 bg-brand text-white text-[12px] font-semibold uppercase tracking-[0.18em] rounded-full hover:bg-brand-accent transition-colors"
              >
                Explore our companies
                <IconArrowUpRight size={16} />
              </Link>
              <Link
                to="/careers/apply"
                className="text-[12px] uppercase tracking-[0.18em] font-semibold text-brand pb-1 border-b border-brand hover:text-brand-accent hover:border-brand-accent transition-colors"
              >
                Join the team →
              </Link>
            </div>
          </div>

          {/* Right: image + floating stat card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease }}
            className="relative lg:sticky lg:top-28"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-brand">
              <img
                src="https://wework.uz/assets/imgs/about/3/1.jpg"
                alt="Big Axel team at work"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(37,36,41,0) 55%, rgba(37,36,41,0.55) 100%)',
                }}
              />
              {/* Floating year badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3">
                <p className="m-0 text-[10px] uppercase tracking-[0.22em] font-semibold text-brand-muted">
                  Since
                </p>
                <p className="m-0 mt-1 font-medium text-brand tabular-nums"
                   style={{ fontFamily: '"Metropolis Medium", Arial, sans-serif', fontSize: 32, lineHeight: 1 }}>
                  2014
                </p>
              </div>
            </div>

            {/* Floating metrics card */}
            <div className="relative lg:absolute lg:-bottom-10 lg:-left-10 mt-[-40px] lg:mt-0 mx-4 lg:mx-0 bg-white border border-brand-line p-6 lg:p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.3)] w-auto lg:w-[320px] z-10">
              <p className="m-0 text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-accent">
                In numbers
              </p>
              <div className="mt-5 grid grid-cols-3 gap-4">
                <StatBlock value={50} suffix="+" label="Countries" />
                <StatBlock value={200} suffix="+" label="Team members" />
                <StatBlock value={10} suffix="y" label="Years" />
              </div>
              <div className="mt-5 pt-5 border-t border-brand-line flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-muted">
                  Headquartered in
                </span>
                <span className="text-[12px] uppercase tracking-[0.14em] font-semibold text-brand">
                  Tashkent, UZ
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatBlock({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  return (
    <div>
      <p
        className="m-0 font-medium text-brand tabular-nums inline-flex items-baseline"
        style={{
          fontFamily: '"Metropolis Medium", Arial, sans-serif',
          fontSize: 'clamp(1.6rem, 2.6vw, 32px)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          fontWeight: 'normal',
        }}
      >
        <NumberTicker value={value} delay={0.3} className="text-brand tracking-[-0.03em]" />
        {suffix && <span className="text-brand-accent">{suffix}</span>}
      </p>
      <p className={cn('m-0 mt-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-muted')}>
        {label}
      </p>
    </div>
  )
}
