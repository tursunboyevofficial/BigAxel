import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#partners', label: 'Airlines' },
  { href: '#team', label: 'Team' },
  { href: '#benefits', label: 'Why Us' },
  { href: '#faq', label: 'FAQ' },
  { href: '#blog', label: 'Blog' },
]

export function SiteHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80)
  })

  return (
    <motion.header ref={ref} className="fixed inset-x-0 top-0 z-50 w-full">
      <motion.div
        animate={{
          width: scrolled ? 'min(880px, calc(100% - 24px))' : '100%',
          y: scrolled ? 14 : 0,
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          backgroundColor: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0)',
          borderRadius: scrolled ? 999 : 0,
          boxShadow: scrolled
            ? '0 6px 30px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.6) inset'
            : 'none',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 28 }}
        className={cn(
          'mx-auto h-16 flex items-center justify-between gap-8 px-6',
          !scrolled && 'border-b border-white/30'
        )}
      >
        <a
          href="#hero"
          className={cn(
            'font-semibold text-[20px] uppercase tracking-tight leading-none transition-colors',
            scrolled ? 'text-brand' : 'text-white'
          )}
        >
          BIG AXEL
        </a>

        <nav className="hidden md:flex items-center gap-5">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'text-[12px] font-semibold uppercase tracking-wide transition-colors hover:text-brand-accent',
                scrolled ? 'text-brand' : 'text-white/90'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className={cn(
              'hidden md:inline-flex items-center gap-2 h-9 px-3.5 text-[12px] font-semibold uppercase tracking-wide border transition-all',
              scrolled
                ? 'border-brand text-brand hover:bg-brand hover:text-white'
                : 'border-white/60 text-white hover:border-white hover:text-brand-accent'
            )}
            style={{ borderRadius: scrolled ? 999 : 0 }}
          >
            Let's Talk →
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className={cn(
              'md:hidden inline-flex items-center justify-center h-9 w-9 transition-colors',
              scrolled ? 'text-brand' : 'text-white'
            )}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden mx-3 mt-2 bg-white border border-brand-line shadow-2xl"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3.5 px-5 text-[12px] font-semibold uppercase tracking-wide text-brand border-b border-brand-line last:border-b-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block py-3.5 px-5 text-[12px] font-semibold uppercase tracking-wide text-brand-accent"
            >
              Let's Talk →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
