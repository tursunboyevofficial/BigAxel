import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-3 m-0 mb-5 text-[12px] uppercase tracking-[0.22em] font-semibold text-brand',
        'before:content-[""] before:w-7 before:h-px before:bg-brand',
        className
      )}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  accent,
  number,
  align = 'left',
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  /** Highlight word(s) inside a string title — rendered italic, brand-accent color. Ignored when title is a ReactNode. */
  accent?: string
  /** Section counter shown at top (e.g. "03 / 09") */
  number?: string
  align?: 'left' | 'center'
}) {
  const center = align === 'center'

  // Auto-highlight accent if title is a string and accent is given
  const renderedTitle =
    typeof title === 'string' && accent && title.toLowerCase().includes(accent.toLowerCase())
      ? highlight(title, accent)
      : title

  return (
    <div
      className={cn(
        'mb-14 pt-6 border-t border-brand-line',
        center ? 'text-center max-w-3xl mx-auto' : 'max-w-[1100px]'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-x-4 gap-y-2 flex-wrap',
          center && 'justify-center'
        )}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
        {number && (
          <span
            className={cn(
              'text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-muted tabular-nums',
              center && 'hidden'
            )}
          >
            {number}
          </span>
        )}
      </div>

      <div
        className={cn(
          'grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-14 items-end',
          center && 'lg:grid-cols-1 place-items-center'
        )}
      >
        <div className="relative">
          <h2
            className="font-medium uppercase text-brand m-0"
            style={{
              fontFamily: '"Metropolis Medium", Arial, sans-serif',
              fontSize: 'clamp(1.9rem, 4vw, 52px)',
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              fontWeight: 400,
            }}
          >
            {renderedTitle}
          </h2>

          {/* Animated accent underline */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className={cn(
              'block mt-6 h-[2px] bg-brand-accent origin-left',
              center ? 'mx-auto w-16' : 'w-16'
            )}
          />
        </div>

        {description && (
          <p
            className={cn(
              'text-brand-muted m-0',
              center ? 'max-w-[540px] mx-auto' : 'max-w-[44ch] lg:pb-2'
            )}
            style={{ fontSize: 17, lineHeight: '27px', letterSpacing: '-0.1px' }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

function highlight(text: string, accent: string) {
  const lower = text.toLowerCase()
  const lowerAccent = accent.toLowerCase()
  const idx = lower.indexOf(lowerAccent)
  if (idx < 0) return text
  const before = text.slice(0, idx)
  const match = text.slice(idx, idx + accent.length)
  const after = text.slice(idx + accent.length)
  return (
    <>
      {before}
      <em
        className="not-italic text-brand-accent"
        style={{
          fontFamily: '"Metropolis Medium", Arial, sans-serif',
          fontStyle: 'italic',
        }}
      >
        {match}
      </em>
      {after}
    </>
  )
}
