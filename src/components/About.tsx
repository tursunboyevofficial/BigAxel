import { Eyebrow } from '@/components/Eyebrow'

export function About() {
  return (
    <section id="about" className="py-[88px] lg:py-[117px]">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="relative h-[420px] lg:h-[560px] overflow-hidden">
          <img
            src="https://wework.uz/assets/imgs/about/3/1.jpg"
            alt="Big Axel about"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute bg-white"
            style={{ width: '101%', height: 56, left: -3, bottom: -26, transform: 'rotate(-2deg)' }}
          />
        </div>

        <div>
          <Eyebrow>Who We Are</Eyebrow>
          <h2
            className="font-semibold uppercase text-brand m-0 mb-7"
            style={{
              fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 60px)',
              lineHeight: 0.94,
              letterSpacing: '-0.035em',
              fontWeight: 'normal',
            }}
          >
            We are sales experts in airline industry.
          </h2>
          <p
            className="text-brand m-0 mb-5"
            style={{ fontSize: 20, lineHeight: '29px', letterSpacing: '-0.2px' }}
          >
            We're passionate about fostering innovation, collaboration, and growth, and we're
            committed to supporting our employees in achieving their personal and professional
            goals. Browse our website to learn more about our products and services, and how we can
            help you achieve your travel and aviation goals.
          </p>
          <p
            className="text-brand-muted m-0 mb-8"
            style={{ fontSize: 17, lineHeight: '26px' }}
          >
            Big Axel stands out as a network of companies serving the travel, finance, entertainment,
            and technology sectors in 50 countries. For the content transfer, this is the core
            message that should remain visible on the new page.
          </p>
          <a
            href="#team"
            className="inline-flex items-center gap-2.5 text-brand text-[13.1px] font-semibold uppercase tracking-wider pb-1 border-b border-brand transition-colors hover:text-brand-accent hover:border-brand-accent"
          >
            Explore the team
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
