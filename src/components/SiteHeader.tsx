import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { BRANCHES } from '@/data/branches'
import { COMPANIES } from '@/data/companies'
import { LANGUAGES, useLang, useT, type Lang } from '@/lib/i18n'

type NavItem =
  | { kind: 'link'; label: string; to: string; hash?: string }
  | { kind: 'menu'; label: string; items: { label: string; meta?: string; to: string }[] }

export function SiteHeader() {
  const t = useT()

  const NAV: NavItem[] = [
    { kind: 'link', label: t('nav.about'), to: '/', hash: '#about' },
    {
      kind: 'menu',
      label: t('nav.branches'),
      items: BRANCHES.map((b) => ({
        label: b.city,
        meta: t<string>(`branches.countries.${b.country}`) || b.country,
        to: `/branches/${b.slug}`,
      })),
    },
    {
      kind: 'menu',
      label: t('nav.companies'),
      items: COMPANIES.map((c) => {
        const cT = t<{ sector: string } | undefined>(`companies.items.${c.slug}`)
        return {
          label: c.name,
          meta: cT?.sector ?? c.sector,
          to: `/companies/${c.slug}`,
        }
      }),
    },
    { kind: 'link', label: t('nav.airlines'), to: '/', hash: '#partners' },
    { kind: 'link', label: t('nav.team'), to: '/', hash: '#team' },
    { kind: 'link', label: t('jobs.navLabel'), to: '/jobs' },
    { kind: 'link', label: t('nav.faq'), to: '/', hash: '#faq' },
  ]

  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80)
  })

  // Close dropdowns on route change
  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  // Scroll to hash after navigation
  useEffect(() => {
    const { hash } = window.location
    if (hash) {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [pathname])

  // Transparent dark-over-hero only on home when not scrolled
  const dark = onHome && !scrolled

  return (
    <motion.header ref={ref} className="fixed inset-x-0 top-0 z-50 w-full">
      <motion.div
        animate={{ y: scrolled ? 14 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        style={{
          maxWidth: scrolled ? 1040 : '100%',
          backgroundColor: scrolled
            ? 'rgba(255,255,255,0.88)'
            : dark
              ? 'rgba(255,255,255,0)'
              : 'rgba(255,255,255,0.98)',
          borderRadius: scrolled ? 999 : 0,
          boxShadow: scrolled
            ? '0 6px 30px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.6) inset'
            : 'none',
          backdropFilter: scrolled ? 'blur(8px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(8px) saturate(1.4)' : 'none',
          transition:
            'max-width 300ms cubic-bezier(0.22, 1, 0.36, 1), background-color 200ms ease, border-radius 300ms ease, box-shadow 300ms ease',
          willChange: 'max-width, background-color',
        }}
        className={cn(
          'mx-auto h-16 flex items-center justify-between gap-4 px-5 lg:px-6',
          !scrolled && dark && 'border-b border-white/30',
          !scrolled && !dark && 'border-b border-brand-line'
        )}
      >
        <Link
          to="/"
          className={cn(
            'font-semibold text-[20px] uppercase tracking-tight leading-none transition-colors shrink-0',
            dark ? 'text-white' : 'text-brand'
          )}
        >
          BIG AXEL
        </Link>

        <nav className="hidden xl:flex items-center gap-0.5">
          {NAV.map((item) =>
            item.kind === 'link' ? (
              <HashLink key={item.label} to={item.to} hash={item.hash} dark={dark}>
                {item.label}
              </HashLink>
            ) : (
              <Dropdown
                key={item.label}
                item={item}
                open={openMenu === item.label}
                onOpen={() => setOpenMenu(item.label)}
                onClose={() => setOpenMenu(null)}
                dark={dark}
              />
            )
          )}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher dark={dark} />
          <Link
            to="/careers/apply"
            className={cn(
              'hidden md:inline-flex items-center gap-2 h-9 px-4 text-[11px] font-semibold uppercase tracking-[0.18em] border transition-all',
              scrolled
                ? 'border-brand text-brand hover:bg-brand hover:text-white'
                : dark
                  ? 'border-white/60 text-white hover:border-white hover:bg-white hover:text-brand'
                  : 'border-brand text-brand hover:bg-brand hover:text-white'
            )}
            style={{ borderRadius: scrolled ? 999 : 0 }}
          >
            {t('nav.apply')}
            <span aria-hidden>→</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className={cn(
              'xl:hidden inline-flex items-center justify-center h-9 w-9 transition-colors',
              dark ? 'text-white' : 'text-brand'
            )}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="xl:hidden mx-3 mt-2 bg-white border border-brand-line shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            {NAV.map((item) =>
              item.kind === 'link' ? (
                <HashLink
                  key={item.label}
                  to={item.to}
                  hash={item.hash}
                  mobile
                  onNavigate={() => setMobileOpen(false)}
                >
                  {item.label}
                </HashLink>
              ) : (
                <MobileSection key={item.label} item={item} />
              )
            )}
            <Link
              to="/careers/apply"
              onClick={() => setMobileOpen(false)}
              className="block py-3.5 px-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-accent"
            >
              {t('nav.apply')} →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function LanguageSwitcher({ dark }: { dark?: boolean }) {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        aria-label="Change language"
        className={cn(
          'inline-flex items-center gap-1.5 h-9 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors',
          dark ? 'text-white/90 hover:text-brand-accent' : 'text-brand hover:text-brand-accent'
        )}
      >
        <Globe size={14} />
        {current.short}
        <ChevronDown size={12} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full pt-2 w-[180px] z-[60]"
          >
            <div className="bg-white border border-brand-line shadow-2xl p-1.5">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setLang(l.code as Lang)
                    setOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center justify-between gap-3 px-3 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors rounded-sm',
                    l.code === lang
                      ? 'bg-brand-soft text-brand'
                      : 'text-brand hover:bg-brand-soft'
                  )}
                >
                  <span>{l.label}</span>
                  <span className="text-brand-muted tabular-nums">{l.short}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function HashLink({
  to,
  hash,
  children,
  dark,
  mobile,
  onNavigate,
}: {
  to: string
  hash?: string
  children: React.ReactNode
  dark?: boolean
  mobile?: boolean
  onNavigate?: () => void
}) {
  const { pathname } = useLocation()
  const targetPath = to + (hash ?? '')
  const samePage = pathname === to && hash
  const handleClick = (e: React.MouseEvent) => {
    onNavigate?.()
    if (samePage) {
      e.preventDefault()
      document.querySelector(hash!)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  if (mobile) {
    return (
      <Link
        to={targetPath}
        onClick={handleClick}
        className="block py-3.5 px-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand border-b border-brand-line"
      >
        {children}
      </Link>
    )
  }
  return (
    <Link
      to={targetPath}
      onClick={handleClick}
      className={cn(
        'px-2.5 py-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-brand-accent',
        dark ? 'text-white/90' : 'text-brand'
      )}
    >
      {children}
    </Link>
  )
}

function Dropdown({
  item,
  open,
  onOpen,
  onClose,
  dark,
}: {
  item: Extract<NavItem, { kind: 'menu' }>
  open: boolean
  onOpen: () => void
  onClose: () => void
  dark?: boolean
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        onClick={() => (open ? onClose() : onOpen())}
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-brand-accent',
          dark ? 'text-white/90' : 'text-brand'
        )}
      >
        {item.label}
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[320px]"
          >
            <div className="bg-white border border-brand-line shadow-2xl p-2">
              {item.items.map((i) => (
                <NavLink
                  key={i.to}
                  to={i.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between gap-4 px-4 py-3 transition-colors rounded-sm',
                      isActive ? 'bg-brand-soft text-brand' : 'text-brand hover:bg-brand-soft'
                    )
                  }
                >
                  <span className="text-[13px] font-semibold uppercase tracking-[0.08em]">
                    {i.label}
                  </span>
                  {i.meta && (
                    <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-brand-muted">
                      {i.meta}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileSection({ item }: { item: Extract<NavItem, { kind: 'menu' }> }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-brand-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3.5 px-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand"
      >
        {item.label}
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="bg-brand-soft/60 pb-2">
          {item.items.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              className="flex items-center justify-between py-2.5 px-8 text-[12px] text-brand"
            >
              <span className="uppercase tracking-[0.1em]">{i.label}</span>
              {i.meta && (
                <span className="text-[10px] uppercase tracking-[0.18em] text-brand-muted">
                  {i.meta}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
