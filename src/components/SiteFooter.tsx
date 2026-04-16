const LINKS = [
  { href: '#about', label: 'About us' },
  { href: '#contact', label: 'Contact' },
  { href: '#blog', label: 'Career' },
  { href: '#faq', label: 'FAQ' },
]

export function SiteFooter() {
  return (
    <footer className="bg-brand-soft border-t border-brand-line mt-24 pt-7 pb-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 pt-10">
          <div className="max-w-md">
            <p
              className="m-0 mb-3 text-brand font-semibold uppercase"
              style={{ fontSize: 13.1, letterSpacing: '0.1em', fontWeight: 'normal' }}
            >
              BIG AXEL GROUP
            </p>
            <p
              className="m-0 text-brand-muted"
              style={{ fontSize: 13.1, lineHeight: '19px', letterSpacing: '0.2px' }}
            >
              We strive to make people's dreams a reality through our daily operations.
            </p>
          </div>
          <div className="flex flex-wrap gap-7">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-brand font-semibold uppercase transition-colors hover:text-brand-accent"
                style={{ fontSize: 13.1, lineHeight: '14px' }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
