import { motion } from 'motion/react'
import { IconSparkles } from '@tabler/icons-react'

const ease = [0.22, 1, 0.36, 1] as const

export function AmbientFillTile({
  delay = 0,
  title = 'More coming soon',
  subtitle = 'Expanding the group, one market at a time.',
  minHeight = 340,
}: {
  delay?: number
  title?: string
  subtitle?: string
  minHeight?: number
}) {
  return (
    <div
      className="relative bg-brand-soft overflow-hidden flex items-center justify-center"
      style={{ minHeight }}
      aria-hidden
    >
      {/* Rotating conic gradient blob */}
      <motion.span
        className="absolute -inset-16 rounded-full blur-3xl opacity-60"
        style={{
          background:
            'conic-gradient(from 0deg, #E53D2E22, #70991F22, #009A6622, #3477FF22, #E53D2E22)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear', delay }}
      />

      {/* Dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #D2D5D9 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 0%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 0%, transparent 85%)',
        }}
      />

      {/* Dashed ring */}
      <motion.span
        className="absolute h-44 w-44 rounded-full border border-dashed border-brand-line"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay }}
      />

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease }}
        className="relative flex flex-col items-center text-center px-6"
      >
        <motion.span
          animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-accent border border-brand-line shadow-md"
        >
          <IconSparkles size={22} stroke={1.5} />
        </motion.span>
        <p className="m-0 mt-5 text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-accent">
          {title}
        </p>
        <p
          className="m-0 mt-3 font-semibold uppercase text-brand"
          style={{
            fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
            fontSize: 18,
            lineHeight: 1.2,
            letterSpacing: '-0.015em',
            fontWeight: 'normal',
            maxWidth: '22ch',
          }}
        >
          {subtitle}
        </p>
      </motion.div>
    </div>
  )
}
