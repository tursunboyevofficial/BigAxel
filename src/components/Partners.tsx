import { Eyebrow } from '@/components/Eyebrow'
import { BlurredInfiniteSlider } from '@/components/ui/blurred-infinite-slider'
import { AIRLINES } from '@/data/content'

export function Partners() {
  return (
    <section
      id="partners"
      className="py-[88px] lg:py-[117px] bg-brand-soft overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-[1000px] mb-14 pt-7 border-t border-brand-line grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
          <div className="lg:col-span-2">
            <Eyebrow>Partners</Eyebrow>
          </div>
          <h2
            className="font-semibold uppercase text-brand m-0"
            style={{
              fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
              fontSize: 'clamp(2rem, 5.2vw, 64px)',
              lineHeight: 0.94,
              letterSpacing: '-0.035em',
              fontWeight: 'normal',
            }}
          >
            We work with global largest airlines
          </h2>
          <p
            className="text-brand-muted m-0 max-w-[560px]"
            style={{ fontSize: 20, lineHeight: '29px', letterSpacing: '-0.2px' }}
          >
            A selection of airline brands that reflects the original Big Axel homepage and keeps
            the trust-first, enterprise presentation style.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center md:flex-row">
            <div className="flex-shrink-0 text-center md:text-right md:max-w-44 md:border-r md:border-brand-line md:pr-6">
              <p
                className="text-brand-muted font-semibold uppercase m-0"
                style={{ fontSize: 12, letterSpacing: '0.2em', lineHeight: '18px' }}
              >
                Powering the best teams in the air
              </p>
            </div>

            <div className="w-full py-8 md:w-auto md:flex-1 md:pl-6">
              <BlurredInfiniteSlider
                speed={45}
                speedOnHover={18}
                gap={88}
                fadeWidth={96}
              >
                {AIRLINES.map((logo) => (
                  <div key={logo.src} className="flex items-center justify-center h-12">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      loading="lazy"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                ))}
              </BlurredInfiniteSlider>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
