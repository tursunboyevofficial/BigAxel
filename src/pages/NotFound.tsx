import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="min-h-[70vh] pt-32 pb-24 flex items-center">
      <div className="container mx-auto px-6 text-center">
        <p className="text-[12px] uppercase tracking-[0.22em] font-semibold text-brand-accent mb-6">
          404 · Page not found
        </p>
        <h1
          className="font-medium text-brand uppercase m-0"
          style={{
            fontFamily: '"Metropolis Medium", Arial, sans-serif',
            fontSize: 'clamp(3rem, 9vw, 120px)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
          }}
        >
          Off route.
        </h1>
        <p className="text-brand-muted m-0 mt-6 max-w-[44ch] mx-auto" style={{ fontSize: 18, lineHeight: '28px' }}>
          The page you're looking for doesn't exist or has been moved. Head back to the main site.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 mt-10 h-12 px-7 border border-brand text-brand text-[12px] font-semibold uppercase tracking-[0.18em] rounded-full hover:bg-brand hover:text-white transition-colors"
        >
          Back home <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  )
}
