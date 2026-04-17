import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const
const DURATION = 1400

const LETTERS = ['B', 'i', 'g', ' ', 'A', 'x', 'e', 'l']

export function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(false), DURATION)
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(id)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!visible) document.body.style.overflow = ''
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] overflow-hidden bg-brand flex flex-col items-center justify-center px-6"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.55, ease } }}
        >
          {/* Red atmospheric glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(226,42,38,0.22) 0%, rgba(226,42,38,0) 70%)',
            }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            exit={{ opacity: 0, transition: { duration: 0.25, ease } }}
          >
            {/* Eyebrow */}
            <motion.p
              className="inline-flex items-center gap-3 m-0 text-white/75 font-semibold uppercase"
              style={{ fontSize: 10, letterSpacing: '0.32em' }}
              initial={{ opacity: 0, y: 4 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease, delay: 0.05 },
              }}
            >
              <motion.span
                className="h-px bg-brand-accent"
                initial={{ width: 0 }}
                animate={{ width: 24, transition: { duration: 0.4, ease, delay: 0.15 } }}
              />
              Est. 2014 · Tashkent
            </motion.p>

            {/* Logo */}
            <h1
              className="m-0 mt-6 uppercase flex items-baseline"
              style={{
                fontFamily: '"Metropolis Medium", Arial, sans-serif',
                fontSize: 'clamp(3rem, 10vw, 120px)',
                lineHeight: 1,
                letterSpacing: '-0.045em',
                color: '#fff',
              }}
              aria-label="Big Axel"
            >
              {LETTERS.map((ch, i) => (
                <span key={i} className="overflow-hidden inline-block">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{
                      y: 0,
                      transition: { duration: 0.6, ease, delay: 0.2 + i * 0.04 },
                    }}
                    className="inline-block"
                    aria-hidden
                  >
                    {ch === ' ' ? '\u00A0' : ch}
                  </motion.span>
                </span>
              ))}
              <motion.span
                className="inline-block"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.3, ease, delay: 0.55 },
                }}
                style={{ color: '#E22A26' }}
                aria-hidden
              >
                .
              </motion.span>
            </h1>

            {/* Progress bar */}
            <div className="mt-8 h-px w-48 max-w-[56vw] bg-white/15 relative overflow-hidden">
              <motion.span
                className="absolute inset-y-0 left-0 bg-brand-accent"
                initial={{ width: 0 }}
                animate={{
                  width: '100%',
                  transition: { duration: (DURATION - 400) / 1000, ease: 'linear', delay: 0.15 },
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
