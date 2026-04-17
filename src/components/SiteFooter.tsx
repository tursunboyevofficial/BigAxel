import { Link } from 'react-router-dom'
import { BRANCHES } from '@/data/branches'
import { COMPANIES } from '@/data/companies'
import { useT } from '@/lib/i18n'

const CURRENT_YEAR = new Date().getFullYear()

export function SiteFooter() {
  const t = useT()
  return (
    <footer className="bg-brand text-white pt-20 pb-10 mt-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          <div className="col-span-2 lg:col-span-2">
            <p
              className="m-0 font-medium uppercase"
              style={{
                fontFamily: '"Metropolis Medium", Arial, sans-serif',
                fontSize: 'clamp(1.8rem, 3vw, 36px)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              Big Axel
              <span className="text-brand-accent">.</span>
            </p>
            <p className="m-0 mt-5 text-white/60 max-w-[38ch]" style={{ fontSize: 14, lineHeight: '22px' }}>
              {t('footer.description')}
            </p>
            <Link
              to="/careers/apply"
              className="mt-7 inline-flex items-center gap-2 h-10 px-5 border border-white/70 text-[11px] uppercase tracking-[0.18em] font-semibold rounded-full hover:bg-white hover:text-brand transition-colors"
            >
              {t('footer.ctaApply')}
            </Link>
          </div>

          <FooterCol title={t('footer.company')}>
            <FooterLink to="/" hash="#about">{t('nav.about')}</FooterLink>
            <FooterLink to="/" hash="#team">{t('nav.team')}</FooterLink>
            <FooterLink to="/" hash="#faq">{t('nav.faq')}</FooterLink>
            <FooterLink to="/" hash="#contact">{t('footer.contact')}</FooterLink>
          </FooterCol>

          <FooterCol title={t('footer.companies')}>
            {COMPANIES.map((c) => (
              <FooterLink key={c.slug} to={`/companies/${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={t('footer.branches')}>
            {BRANCHES.map((b) => (
              <FooterLink key={b.slug} to={`/branches/${b.slug}`}>
                {b.city}, {b.country}
              </FooterLink>
            ))}
          </FooterCol>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="m-0 text-[11px] uppercase tracking-[0.18em] text-white/50">
            {t('footer.copyright', { year: CURRENT_YEAR })}
          </p>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-white/50">
            <a href="mailto:info@wework.uz" className="hover:text-white transition-colors">
              info@wework.uz
            </a>
            <a
              href="https://instagram.com/wework.group"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="m-0 mb-5 text-[11px] uppercase tracking-[0.22em] font-semibold text-white/70">
        {title}
      </p>
      <ul className="m-0 p-0 list-none space-y-2.5">{children}</ul>
    </div>
  )
}

function FooterLink({
  to,
  hash,
  children,
}: {
  to: string
  hash?: string
  children: React.ReactNode
}) {
  const target = to + (hash ?? '')
  const handleClick = (e: React.MouseEvent) => {
    if (window.location.pathname === to && hash) {
      e.preventDefault()
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <li>
      <Link
        to={target}
        onClick={handleClick}
        className="text-[13px] text-white/80 hover:text-brand-accent transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}
