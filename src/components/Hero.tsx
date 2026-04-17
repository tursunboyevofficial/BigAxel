import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowDown, Plane } from 'lucide-react'
import { useT } from '@/lib/i18n'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const t = useT()
  return (
    <section
      id="hero"
      className="relative isolate min-h-[620px] lg:min-h-[92vh] pt-24 lg:pt-36 flex items-end overflow-hidden bg-brand"
    >
      {/* 4K aviation wallpaper — Unsplash, commercial-use OK */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fm=webp&fit=crop&w=1600&q=75"
          srcSet="
            https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fm=webp&fit=crop&w=900&q=75 900w,
            https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fm=webp&fit=crop&w=1600&q=75 1600w
          "
          sizes="100vw"
          alt="Aircraft silhouetted against a golden sunset sky"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
        />
        {/* Editorial dark gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(10,10,12,0.88) 0%, rgba(10,10,12,0.55) 38%, rgba(10,10,12,0.15) 72%, rgba(10,10,12,0.05) 100%), linear-gradient(180deg, rgba(10,10,12,0.45) 0%, rgba(10,10,12,0) 28%, rgba(10,10,12,0) 60%, rgba(10,10,12,0.45) 100%)',
          }}
        />
        {/* Red atmospheric glow — brand accent */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 75% 55% at 100% 15%, rgba(226,42,38,0.28) 0%, rgba(226,42,38,0) 65%)',
          }}
        />
        {/* Subtle dotted grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage:
              'radial-gradient(ellipse 90% 80% at 50% 60%, #000 0%, transparent 90%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 80% at 50% 60%, #000 0%, transparent 90%)',
          }}
        />
      </div>

      {/* Corner brackets */}
      <CornerBrackets />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-[2] w-full pb-16 lg:pb-32">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } } }}
          className="max-w-[1100px]"
        >
          <motion.p
            variants={{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
            }}
            className="inline-flex items-center gap-3 text-white/85 m-0 mb-7 font-semibold uppercase"
            style={{ fontSize: 12, letterSpacing: '0.22em' }}
          >
            <span className="h-px w-10 bg-white/85" />
            <Plane size={14} className="text-brand-accent" strokeWidth={2} />
            {t('hero.eyebrow')}
          </motion.p>

          <h1
            className="font-medium text-white uppercase m-0 max-w-[15ch]"
            style={{
              fontFamily: '"Metropolis Medium", Arial, sans-serif',
              fontSize: 'clamp(2.75rem, 11.5vw, 200px)',
              lineHeight: 0.84,
              letterSpacing: '-0.05em',
            }}
          >
            <Line>{t('hero.titleLine1')}</Line>
            <Line>{t('hero.titleLine2')}<span className="text-brand-accent">{t('hero.titleAccent')}</span></Line>
          </h1>

          <motion.p
            variants={{
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.2 } },
            }}
            className="text-white/85 mt-10 m-0 max-w-[52ch]"
            style={{ fontSize: 19, lineHeight: '29px', letterSpacing: '-0.15px' }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { duration: 0.6, delay: 0.45 } },
            }}
            className="mt-12 flex items-center justify-between gap-6 flex-wrap"
          >
            <div className="flex items-center gap-4">
              <Link
                to="/careers/apply"
                className="inline-flex items-center gap-2.5 h-12 px-7 bg-white text-brand text-[12px] font-semibold uppercase tracking-[0.18em] rounded-full hover:bg-brand-accent hover:text-white transition-colors"
              >
                {t('hero.ctaApply')}
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/companies"
                className="group inline-flex items-center gap-3 text-white text-[12px] font-semibold uppercase tracking-[0.18em] pb-2 border-b border-white/60 hover:border-white hover:text-brand-accent transition-colors"
              >
                {t('hero.ctaCompanies')}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-3 text-white/70 text-[11px] uppercase tracking-[0.22em]">
              <span>{t('hero.scroll')}</span>
              <span className="inline-flex animate-arrow-bounce" aria-hidden>
                <ArrowDown size={14} />
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Vertical year marker */}
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-[2] flex-col items-center gap-3 text-white/60">
        <span className="h-12 w-px bg-white/40" />
        <span
          className="text-[10px] uppercase font-semibold"
          style={{ writingMode: 'vertical-rl', letterSpacing: '0.4em' }}
        >
          ©{new Date().getFullYear()} · {t('hero.yearMark')}
        </span>
        <span className="h-12 w-px bg-white/40" />
      </div>

      {/* Soft slanted bottom cut */}
      <div
        className="absolute z-[5] bg-white pointer-events-none"
        style={{
          width: '104%',
          height: 68,
          left: -8,
          bottom: -38,
          transform: 'rotate(-1.6deg)',
        }}
      />
    </section>
  )
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        variants={{
          initial: { y: '108%' },
          animate: { y: 0, transition: { duration: 0.95, ease } },
        }}
        className="inline-block will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  )
}

function CornerBrackets() {
  const common = 'absolute w-10 h-10 border-white/30 z-[3] hidden md:block'
  return (
    <>
      <span className={`${common} top-32 left-6 border-l border-t`} aria-hidden />
      <span className={`${common} top-32 right-6 border-r border-t`} aria-hidden />
    </>
  )
}
