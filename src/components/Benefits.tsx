import { Eyebrow } from '@/components/Eyebrow'
import { BENEFITS } from '@/data/content'
import { cn } from '@/lib/utils'

const VALUE_COLORS = ['text-[#C90]', 'text-[#BA49F2]', 'text-[#3477FF]']

export function Benefits() {
  return (
    <section id="benefits" className="py-[88px] lg:py-[117px]">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <Eyebrow>Why Choose Us</Eyebrow>
          <h2
            className="font-semibold uppercase text-brand m-0 mb-5"
            style={{
              fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 60px)',
              lineHeight: 0.94,
              letterSpacing: '-0.035em',
              fontWeight: 'normal',
            }}
          >
            High paid job, work-life balance
          </h2>
          <p
            className="text-brand-muted m-0"
            style={{ fontSize: 20, lineHeight: '29px', letterSpacing: '-0.2px' }}
          >
            The original page balances confidence and simplicity. This section keeps the same intent
            while matching the Dyninno language of modular value statements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
          {BENEFITS.map((b, i) => (
            <article key={b.title} className="pt-7 border-t border-brand-line">
              <strong
                className={cn('block font-medium uppercase', VALUE_COLORS[i % 3])}
                style={{
                  fontFamily: '"Metropolis Medium", Arial, sans-serif',
                  fontSize: 'clamp(2.4rem, 5vw, 72px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  fontWeight: 'normal',
                }}
              >
                {b.value}
              </strong>
              <h3
                className="mt-6 mb-3 font-semibold uppercase text-brand"
                style={{ fontSize: 17.46, lineHeight: '17px', letterSpacing: '-0.1px', fontWeight: 'normal' }}
              >
                {b.title}
              </h3>
              <p className="m-0 text-brand-muted" style={{ fontSize: 17, lineHeight: '26px' }}>
                {b.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
