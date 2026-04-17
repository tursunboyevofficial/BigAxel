import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IconArrowLeft, IconArrowRight, IconQuote } from '@tabler/icons-react'
import { SectionHeading } from '@/components/Eyebrow'
import { TEAM } from '@/data/content'
import { cn } from '@/lib/utils'

const ROLE_COLORS = ['#E53D2E', '#70991F', '#009A66']

const PHOTOS = [
  'https://wework.uz/assets/imgs/testimonial/3/2.png',
  'https://wework.uz/assets/imgs/testimonial/3/3.png',
  'https://wework.uz/assets/imgs/testimonial/3/4.png',
  'https://wework.uz/assets/imgs/testimonial/3/5.png',
  'https://wework.uz/assets/imgs/testimonial/3/6.png',
]

type PhotoTile = { src: string; className: string; rotate: number }

const PHOTO_TILES: PhotoTile[] = [
  { src: PHOTOS[0], className: 'left-[2%] top-[6%] w-[170px] h-[210px]', rotate: -4 },
  { src: PHOTOS[1], className: 'left-[4%] bottom-[8%] w-[160px] h-[195px]', rotate: 3 },
  { src: PHOTOS[2], className: 'right-[2%] top-[8%] w-[170px] h-[210px]', rotate: 3.5 },
  { src: PHOTOS[3], className: 'right-[4%] bottom-[6%] w-[160px] h-[195px]', rotate: -3 },
]

const ease = [0.22, 1, 0.36, 1] as const

export function Team() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState(1)

  const total = TEAM.length
  const go = (next: number) => {
    const idx = ((next % total) + total) % total
    setDirection(idx >= active ? 1 : -1)
    setActive(idx)
  }

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setDirection(1)
      setActive((i) => (i + 1) % total)
    }, 7000)
    return () => clearInterval(id)
  }, [paused, total])

  const current = TEAM[active]
  const accent = ROLE_COLORS[active % ROLE_COLORS.length]

  return (
    <section id="team" className="py-[88px] lg:py-[117px] bg-brand-soft overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Testimonials"
          number="04"
          title="People-first stories, straight from the team."
          accent="People-first"
          description="Personal reflections from the people who make Big Axel tick — browse each story."
        />

        <div
          className="relative mx-auto max-w-5xl pt-6 lg:pt-10 pb-10 lg:pb-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Decorative backing grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage:
                'linear-gradient(#D2D5D9 1px, transparent 1px), linear-gradient(90deg, #D2D5D9 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage:
                'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 85%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 85%)',
            }}
          />

          {/* Scattered photos — xl screens only */}
          {PHOTO_TILES.map((tile, i) => (
            <figure
              key={tile.src}
              aria-hidden
              className={cn(
                'absolute hidden xl:block overflow-hidden bg-white border border-brand-line shadow-[0_18px_44px_-18px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:!rotate-0 hover:scale-[1.04]',
                tile.className
              )}
              style={{ transform: `rotate(${tile.rotate}deg)`, zIndex: i + 1 }}
            >
              <img
                src={tile.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover grayscale contrast-[1.05]"
              />
              <span
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(37,36,41,0) 55%, rgba(37,36,41,0.2) 100%)',
                }}
              />
            </figure>
          ))}

          {/* Mobile / tablet photo strip */}
          <div className="xl:hidden mb-10 flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 snap-x snap-mandatory">
            {PHOTOS.map((src) => (
              <figure
                key={src}
                aria-hidden
                className="shrink-0 w-[150px] h-[180px] sm:w-[180px] sm:h-[210px] overflow-hidden bg-white border border-brand-line shadow-md snap-start"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover grayscale contrast-[1.05]"
                />
              </figure>
            ))}
          </div>

          {/* Centered carousel card */}
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="relative bg-white border border-brand-line shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] px-8 sm:px-12 pt-10 pb-9 sm:pt-14 sm:pb-11 overflow-hidden min-h-[400px] sm:min-h-[440px] flex flex-col">
              {/* Progress accent bar */}
              <motion.span
                aria-hidden
                className="absolute top-0 left-0 h-1"
                style={{ backgroundColor: accent }}
                key={`bar-${active}`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 7, ease: 'linear' }}
              />

              <IconQuote
                aria-hidden
                size={48}
                stroke={1.2}
                className="text-brand-line mb-6"
                style={{ transform: 'scaleX(-1)' }}
              />

              <div className="relative flex-1">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.blockquote
                    key={current.name}
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({ opacity: 0, x: dir * 32 }),
                      center: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
                      exit: (dir: number) => ({ opacity: 0, x: -dir * 32, transition: { duration: 0.3, ease } }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="m-0"
                  >
                    {/* Quote — large serif-weighted display type */}
                    <p
                      className="m-0 text-brand"
                      style={{
                        fontFamily: '"Metropolis Medium", Arial, sans-serif',
                        fontSize: 'clamp(20px, 2.2vw, 26px)',
                        lineHeight: 1.4,
                        letterSpacing: '-0.015em',
                        fontWeight: 400,
                      }}
                    >
                      <span style={{ color: accent, fontWeight: 500 }}>“</span>
                      {current.quote}
                      <span style={{ color: accent, fontWeight: 500 }}>”</span>
                    </p>

                    {/* Author */}
                    <footer className="mt-9 flex items-center gap-5">
                      <span
                        className="inline-flex items-center justify-center h-12 w-12 rounded-full text-white font-semibold uppercase shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
                          fontSize: 16,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {current.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span
                          className="font-medium uppercase text-brand truncate"
                          style={{
                            fontFamily: '"Metropolis Medium", Arial, sans-serif',
                            fontSize: 18,
                            lineHeight: 1.1,
                            letterSpacing: '-0.015em',
                          }}
                        >
                          {current.name}
                        </span>
                        <span
                          className="mt-1.5 text-[11px] uppercase tracking-[0.22em] font-semibold"
                          style={{ color: accent }}
                        >
                          {current.role}
                        </span>
                      </span>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-7 flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(active - 1)}
                  aria-label="Previous testimonial"
                  className="group h-11 w-11 rounded-full border border-brand-line bg-white flex items-center justify-center transition-colors hover:bg-brand hover:border-brand"
                >
                  <IconArrowLeft size={18} className="text-brand transition-colors group-hover:text-white" />
                </button>
                <button
                  type="button"
                  onClick={() => go(active + 1)}
                  aria-label="Next testimonial"
                  className="group h-11 w-11 rounded-full border border-brand-line bg-white flex items-center justify-center transition-colors hover:bg-brand hover:border-brand"
                >
                  <IconArrowRight size={18} className="text-brand transition-colors group-hover:text-white" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                {TEAM.map((m, i) => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === active}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-500',
                      i === active ? 'w-10' : 'w-4 bg-brand-line hover:bg-brand-muted'
                    )}
                    style={i === active ? { backgroundColor: accent } : undefined}
                  />
                ))}
                <span className="ml-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-muted tabular-nums">
                  {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
