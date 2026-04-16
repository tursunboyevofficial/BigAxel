import { motion } from 'motion/react'
import { ArrowDown } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-[640px] lg:min-h-[760px] flex items-end overflow-hidden bg-brand"
    >
      {/* Background image with slow Ken Burns */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="https://wework.uz/assets/imgs/hero/3/1.jpg"
          alt="Big Axel Group hero"
          className="h-full w-full object-cover object-center"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 14, ease: 'easeOut' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.10) 70%, rgba(0,0,0,0) 100%), linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.30) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-[2] w-full pb-20 lg:pb-28">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } } }}
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
            Big Axel Group · Established in Tashkent
          </motion.p>

          <h1
            className="font-medium text-white uppercase m-0 max-w-[16ch]"
            style={{
              fontFamily: '"Metropolis Medium", Arial, sans-serif',
              fontSize: 'clamp(3.5rem, 11vw, 184px)',
              lineHeight: 0.86,
              letterSpacing: '-0.05em',
            }}
          >
            <Line>Big Axel</Line>
            <Line>Group</Line>
          </h1>

          <motion.p
            variants={{
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.2 } },
            }}
            className="text-white/85 mt-9 m-0 max-w-[48ch]"
            style={{ fontSize: 18, lineHeight: '28px', letterSpacing: '-0.15px' }}
          >
            Sales experts in the airline industry — serving travel, finance, entertainment, and
            technology across 50 countries.
          </motion.p>

          <motion.div
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { duration: 0.6, delay: 0.45 } },
            }}
            className="mt-12 flex items-center justify-between gap-6 flex-wrap"
          >
            <div className="flex items-center gap-7">
              <a
                href="#about"
                className="group inline-flex items-center gap-3 text-white text-[12px] font-semibold uppercase tracking-[0.18em] pb-2 border-b border-white transition-colors hover:text-brand-accent hover:border-brand-accent"
              >
                Explore the group
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 text-white/70 text-[12px] font-semibold uppercase tracking-[0.18em] pb-2 border-b border-white/50 transition-colors hover:text-white hover:border-white"
              >
                Let's talk
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3 text-white/70 text-[11px] uppercase tracking-[0.22em]">
              <span>Scroll</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex"
                aria-hidden
              >
                <ArrowDown size={14} />
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Vertical year marker — subtle editorial detail */}
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-[2] flex-col items-center gap-3 text-white/55">
        <span className="h-12 w-px bg-white/35" />
        <span
          className="text-[10px] uppercase font-semibold"
          style={{ writingMode: 'vertical-rl', letterSpacing: '0.4em' }}
        >
          ©2014 — Present
        </span>
        <span className="h-12 w-px bg-white/35" />
      </div>

      {/* Soft slanted bottom cut */}
      <div
        className="absolute z-[5] bg-white pointer-events-none"
        style={{
          width: '104%',
          height: 64,
          left: -8,
          bottom: -36,
          transform: 'rotate(-1.6deg)',
        }}
      />
    </section>
  )
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
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
