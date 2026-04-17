import { NumberTicker } from '@/components/ui/number-ticker'
import { STATS } from '@/data/content'
import { useT } from '@/lib/i18n'

export function Stats() {
  const t = useT()
  const items = t<{ value: string; label: string }[]>('stats.items')
  const list = Array.isArray(items) ? items : STATS
  return (
    <section className="py-[88px] lg:py-[117px] bg-brand-soft">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-7">
          {list.map((s) => (
            <article key={s.label} className="pt-4 border-t border-brand-line">
              <strong
                className="block font-medium uppercase text-brand"
                style={{
                  fontFamily: '"Metropolis Medium", Arial, sans-serif',
                  fontSize: 'clamp(2.4rem, 4.6vw, 68px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  fontWeight: 'normal',
                }}
              >
                <NumberTicker value={Number(s.value)} className="text-brand" />
                <span className="text-brand-muted">+</span>
              </strong>
              <span
                className="block mt-4 text-brand-muted font-semibold uppercase"
                style={{ fontSize: 13.1, lineHeight: '17px', letterSpacing: '-0.1px' }}
              >
                {s.label}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
