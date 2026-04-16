import { Eyebrow } from '@/components/Eyebrow'
import { cn } from '@/lib/utils'

type Cell = {
  span?: 'normal' | 'wide' | 'full' | 'tall' | 'large'
  kind: 'image' | 'text' | 'metric' | 'cta' | 'intro'
  eyebrow?: string
  title?: string
  text?: string
  value?: string
  meta?: string
  image?: string
  href?: string
  cta?: string
  hue?: 'gold' | 'purple' | 'blue' | 'red' | 'green' | 'teal' | 'dark' | 'soft'
}

const HUE_TEXT: Record<NonNullable<Cell['hue']>, string> = {
  gold: 'text-[#C90]',
  purple: 'text-[#BA49F2]',
  blue: 'text-[#3477FF]',
  red: 'text-[#E53D2E]',
  green: 'text-[#70991F]',
  teal: 'text-[#009A66]',
  dark: 'text-brand',
  soft: 'text-brand-muted',
}

const CELLS: Cell[] = [
  {
    kind: 'intro',
    span: 'large',
    eyebrow: 'Why Choose Us',
    title: 'High paid job, work-life balance',
    text: 'A team of professionals passionate about sales and customer success — from Tashkent to 50 countries across travel, finance, entertainment and tech.',
    cta: 'Instagram',
    href: 'https://instagram.com/wework.group',
  },
  {
    kind: 'image',
    span: 'normal',
    image: 'https://wework.uz/assets/imgs/about/3/1.jpg',
    eyebrow: 'Who We Are',
    title: 'Sales experts in airline industry',
  },
  {
    kind: 'metric',
    span: 'normal',
    value: '30%',
    title: 'Women on the team',
    text: 'We actively support and invest in our female colleagues.',
    hue: 'red',
  },
  {
    kind: 'metric',
    span: 'normal',
    value: '95%',
    title: 'Grown from day one',
    text: 'Most of the team started their career here and grew with us.',
    hue: 'green',
  },
  {
    kind: 'metric',
    span: 'normal',
    value: '100%',
    title: 'Competitive pay',
    text: 'Transparent salaries aligned with top market benchmarks.',
    hue: 'teal',
  },
  {
    kind: 'cta',
    span: 'full',
    eyebrow: 'Mission',
    title: 'Innovation, collaboration, and growth',
    text: "We're passionate about fostering an environment that helps employees achieve their personal and professional goals across 50 countries.",
    href: '#contact',
    hue: 'soft',
  },
]

const SPAN_CLS: Record<NonNullable<Cell['span']>, string> = {
  normal: 'lg:col-span-1 lg:row-span-1',
  wide: 'lg:col-span-2 lg:row-span-1',
  full: 'md:col-span-2 lg:col-span-4 lg:row-span-1',
  tall: 'lg:col-span-1 lg:row-span-2',
  large: 'lg:col-span-2 lg:row-span-2',
}

export function Bento() {
  return (
    <section id="benefits" className="py-[88px] lg:py-[117px]">
      <div className="container mx-auto px-6">
        <div className="max-w-[1000px] mb-12 pt-7 border-t border-brand-line grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
          <div className="lg:col-span-2">
            <Eyebrow>About + Why Us</Eyebrow>
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
            Sales experts who put people first
          </h2>
          <p
            className="text-brand-muted m-0 max-w-[560px]"
            style={{ fontSize: 20, lineHeight: '29px', letterSpacing: '-0.2px' }}
          >
            The Big Axel story, values and team KPIs — one bento layout, four
            punchy value statements, one mission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[260px] gap-px bg-brand-line border border-brand-line">
          {CELLS.map((c, i) => (
            <BentoCell key={i} cell={c} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BentoCell({ cell }: { cell: Cell }) {
  const span = cell.span ?? 'normal'
  const hue = HUE_TEXT[cell.hue ?? 'dark']

  if (cell.kind === 'intro') {
    return (
      <div
        className={cn(
          'relative bg-white p-8 lg:p-10 flex flex-col justify-between gap-6 group',
          SPAN_CLS[span]
        )}
      >
        <div>
          {cell.eyebrow && (
            <p
              className="m-0 mb-5 inline-flex items-center gap-3 text-brand-accent font-semibold uppercase"
              style={{ fontSize: 12, letterSpacing: '0.18em' }}
            >
              <span className="w-7 h-px bg-brand-accent" />
              {cell.eyebrow}
            </p>
          )}
          {cell.title && (
            <h3
              className="text-brand m-0 mb-6 font-semibold uppercase max-w-[18ch]"
              style={{
                fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                fontSize: 'clamp(1.8rem, 3.4vw, 48px)',
                lineHeight: 0.98,
                letterSpacing: '-0.03em',
                fontWeight: 'normal',
              }}
            >
              {cell.title}
            </h3>
          )}
          {cell.text && (
            <p
              className="m-0 text-brand-muted max-w-[42ch]"
              style={{ fontSize: 16, lineHeight: '24px' }}
            >
              {cell.text}
            </p>
          )}
        </div>
        {cell.cta && (
          <a
            href={cell.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 self-start h-11 px-5 border border-brand text-brand text-[12px] font-semibold uppercase tracking-wider rounded-full hover:bg-brand hover:text-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            {cell.cta}
          </a>
        )}
      </div>
    )
  }

  if (cell.kind === 'image') {
    return (
      <div className={cn('relative bg-brand overflow-hidden group', SPAN_CLS[span])}>
        <img
          src={cell.image}
          alt={cell.title ?? ''}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-7">
          {cell.eyebrow && (
            <p
              className="text-white/90 m-0 mb-2 font-semibold uppercase"
              style={{ fontSize: 11, letterSpacing: '0.16em' }}
            >
              {cell.eyebrow}
            </p>
          )}
          {cell.title && (
            <h3
              className="text-white m-0 font-semibold uppercase max-w-[20ch]"
              style={{
                fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                fontSize: 'clamp(1.1rem, 1.6vw, 22px)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                fontWeight: 'normal',
              }}
            >
              {cell.title}
            </h3>
          )}
        </div>
      </div>
    )
  }

  if (cell.kind === 'cta') {
    return (
      <div
        className={cn(
          'relative bg-brand-soft overflow-hidden group p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14',
          SPAN_CLS[span]
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(#D2D5D9 1px, transparent 1px), linear-gradient(90deg, #D2D5D9 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse 80% 60% at 80% 50%, #000 0%, transparent 70%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 60% at 80% 50%, #000 0%, transparent 70%)',
          }}
        />
        <div className="relative flex-1 max-w-[42ch]">
          {cell.eyebrow && (
            <p
              className="text-brand-accent m-0 mb-4 font-semibold uppercase inline-flex items-center gap-3"
              style={{ fontSize: 12, letterSpacing: '0.18em' }}
            >
              <span className="w-7 h-px bg-brand-accent" />
              {cell.eyebrow}
            </p>
          )}
          <h3
            className="text-brand m-0 font-semibold uppercase"
            style={{
              fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
              fontSize: 'clamp(1.6rem, 2.8vw, 40px)',
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              fontWeight: 'normal',
            }}
          >
            {cell.title}
          </h3>
        </div>
        {cell.text && (
          <p className="relative text-brand-muted m-0 max-w-[44ch] text-[16px] leading-[25px] lg:flex-1">
            {cell.text}
          </p>
        )}
        {cell.href && (
          <a
            href={cell.href}
            className="relative inline-flex items-center gap-2.5 h-12 px-6 border border-brand text-brand text-[12px] font-semibold uppercase tracking-[0.18em] rounded-full hover:bg-brand hover:text-white transition-colors shrink-0"
          >
            Learn more
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        )}
      </div>
    )
  }

  if (cell.kind === 'metric') {
    return (
      <div
        className={cn(
          'relative bg-white p-7 flex flex-col gap-4 hover:bg-brand-soft transition-colors',
          SPAN_CLS[span]
        )}
      >
        <div
          className={cn(
            'relative w-[104px] h-[104px] rounded-full flex items-center justify-center shrink-0',
            hue
          )}
          style={{
            borderWidth: 1.5,
            borderStyle: 'solid',
            borderColor: 'currentColor',
            backgroundColor: 'color-mix(in srgb, currentColor 6%, white)',
          }}
        >
          <span
            aria-hidden
            className="absolute inset-1 rounded-full border border-dashed opacity-25"
            style={{ borderColor: 'currentColor' }}
          />
          <strong
            className="font-medium uppercase leading-none"
            style={{
              fontFamily: '"Metropolis Medium", Arial, sans-serif',
              fontSize: 'clamp(1.5rem, 2.2vw, 30px)',
              letterSpacing: '-0.03em',
              fontWeight: 'normal',
            }}
          >
            {cell.value}
          </strong>
        </div>
        <h3
          className="text-brand m-0 font-semibold uppercase mt-auto"
          style={{ fontSize: 16, lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: 'normal' }}
        >
          {cell.title}
        </h3>
        {cell.text && (
          <p className="m-0 text-brand-muted text-[14px] leading-[20px]">{cell.text}</p>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative bg-white p-7 flex flex-col gap-3 hover:bg-brand-soft transition-colors',
        SPAN_CLS[span]
      )}
    >
      {cell.eyebrow && (
        <p
          className={cn('m-0 font-semibold uppercase', hue)}
          style={{ fontSize: 12, letterSpacing: '0.14em' }}
        >
          {cell.eyebrow}
        </p>
      )}
      {cell.title && (
        <h3
          className="text-brand m-0 font-semibold uppercase max-w-[24ch]"
          style={{
            fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
            fontSize: 'clamp(1.15rem, 1.8vw, 24px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontWeight: 'normal',
          }}
        >
          {cell.title}
        </h3>
      )}
      {cell.text && (
        <p className="m-0 text-brand-muted text-[15px] leading-[22px] mt-auto">{cell.text}</p>
      )}
    </div>
  )
}
