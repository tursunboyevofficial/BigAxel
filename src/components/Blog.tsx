import { motion } from 'motion/react'
import { IconArrowUpRight, IconCalendar } from '@tabler/icons-react'
import { SectionHeading } from '@/components/Eyebrow'
import { BLOG } from '@/data/content'
import { useT } from '@/lib/i18n'

const META_COLORS = ['#3477FF', '#E53D2E', '#70991F']
const ease = [0.22, 1, 0.36, 1] as const

export function Blog() {
  const t = useT()
  const posts = t<{ meta: string; title: string; text: string }[]>('blog.posts')
  const list = Array.isArray(posts) ? posts : BLOG
  return (
    <section id="blog" className="py-[88px] lg:py-[117px] bg-brand-soft">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow={t('blog.eyebrow')}
          number="07"
          title={t('blog.title')}
          accent={t('blog.titleAccent')}
          description={t('blog.description')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-line border border-brand-line">
          {list.map((post, i) => {
            const color = META_COLORS[i % META_COLORS.length]
            const sep = post.meta.includes(' · ') ? ' · ' : ' . '
            const [kind, date] = post.meta.split(sep)
            return (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="group relative bg-white p-7 lg:p-8 flex flex-col gap-5 min-h-[320px] hover:bg-white/80 transition-colors cursor-pointer"
              >
                {/* Top meta row */}
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold"
                    style={{ color }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                    {kind}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-muted">
                    <IconCalendar size={13} stroke={1.5} />
                    {date}
                  </span>
                </div>

                <h3
                  className="m-0 font-medium uppercase text-brand mt-2"
                  style={{
                    fontFamily: '"Metropolis Medium", Arial, sans-serif',
                    fontSize: 'clamp(1.2rem, 1.7vw, 22px)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.02em',
                    fontWeight: 400,
                  }}
                >
                  {post.title}
                </h3>

                <p className="m-0 text-brand-muted" style={{ fontSize: 15, lineHeight: '23px' }}>
                  {post.text}
                </p>

                <div className="mt-auto pt-5 border-t border-brand-line flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-brand pb-1 border-b border-brand group-hover:text-brand-accent group-hover:border-brand-accent transition-colors">
                    {t('blog.readMore')}
                  </span>
                  <span
                    className="h-9 w-9 rounded-full bg-brand-soft text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors"
                  >
                    <IconArrowUpRight size={14} />
                  </span>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
