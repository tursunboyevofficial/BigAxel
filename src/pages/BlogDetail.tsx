import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { IconArrowLeft, IconArrowUpRight, IconCalendar } from '@tabler/icons-react'
import { BLOG } from '@/data/content'
import { NotFound } from '@/pages/NotFound'
import { useT } from '@/lib/i18n'

const ease = [0.22, 1, 0.36, 1] as const
const META_COLORS = ['#3477FF', '#E53D2E', '#70991F']

type BlogPostT = { meta: string; title: string; text: string }

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const t = useT()

  const index = BLOG.findIndex((p) => p.slug === slug)
  if (index < 0) return <NotFound />

  const post = BLOG[index]
  const postT = t<BlogPostT[]>('blog.posts')
  const localized = Array.isArray(postT) && postT[index] ? postT[index] : null
  const title = localized?.title ?? post.title
  const meta = localized?.meta ?? post.meta
  const [kind, date] = meta.includes(' · ') ? meta.split(' · ') : [meta, '']
  const accent = META_COLORS[index % META_COLORS.length]

  const others = BLOG.map((p, i) => ({ post: p, index: i }))
    .filter(({ index: i }) => i !== index)
    .slice(0, 2)

  return (
    <article className="pt-28 lg:pt-36 pb-20 lg:pb-28">
      {/* Hero cover */}
      <div className="relative h-[40vh] min-h-[320px] lg:h-[56vh] overflow-hidden bg-brand">
        <img
          src={post.image}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(37,36,41,0.45) 0%, rgba(37,36,41,0.2) 55%, rgba(37,36,41,0.9) 100%)',
          }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-10 lg:pb-14">
            <Link
              to="/#blog"
              className="inline-flex items-center gap-2 text-white/80 text-[12px] uppercase tracking-[0.22em] font-semibold hover:text-brand-accent transition-colors"
            >
              <IconArrowLeft size={14} /> {t('blog.backToBlog')}
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease } }}
              className="mt-6 max-w-4xl"
            >
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-white/80">
                <span className="inline-flex items-center gap-2" style={{ color: accent }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                  {kind}
                </span>
                {date && (
                  <>
                    <span className="text-white/30">/</span>
                    <span className="inline-flex items-center gap-1.5 text-white/70">
                      <IconCalendar size={12} stroke={1.5} />
                      {date}
                    </span>
                  </>
                )}
              </div>
              <h1
                className="m-0 mt-5 font-medium uppercase text-white"
                style={{
                  fontFamily: '"Metropolis Medium", Arial, sans-serif',
                  fontSize: 'clamp(2rem, 5.2vw, 64px)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.035em',
                  fontWeight: 400,
                }}
              >
                {title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-6">
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-10 lg:gap-20 items-start">
          {/* Aside */}
          <aside className="lg:sticky lg:top-32">
            <div className="pt-6 border-t border-brand-line">
              <p className="m-0 text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-muted">
                {t('blog.publishedBy')}
              </p>
              <p
                className="m-0 mt-2 font-medium uppercase text-brand"
                style={{
                  fontFamily: '"Metropolis Medium", Arial, sans-serif',
                  fontSize: 18,
                  letterSpacing: '-0.01em',
                }}
              >
                {post.author}
              </p>
              <p className="m-0 mt-4 text-[12px] uppercase tracking-[0.18em] font-semibold text-brand-muted">
                {post.readTime}
              </p>
            </div>
          </aside>

          {/* Content */}
          <div className="max-w-[72ch]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="space-y-7"
            >
              {post.content.map((para, i) => (
                <p
                  key={i}
                  className="m-0 text-brand"
                  style={{
                    fontSize: 19,
                    lineHeight: '31px',
                    letterSpacing: '-0.1px',
                  }}
                >
                  {para}
                </p>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Read next */}
        {others.length > 0 && (
          <div className="mt-24 lg:mt-32 pt-12 border-t border-brand-line">
            <p className="inline-flex items-center gap-3 m-0 mb-8 text-[12px] uppercase tracking-[0.22em] font-semibold text-brand">
              <span className="w-7 h-px bg-brand-accent" />
              {t('blog.readNext')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-line border border-brand-line">
              {others.map(({ post: p, index: i }) => {
                const pT = Array.isArray(postT) && postT[i] ? postT[i] : null
                const pTitle = pT?.title ?? p.title
                const pMeta = pT?.meta ?? p.meta
                const pText = pT?.text ?? p.text
                const pColor = META_COLORS[i % META_COLORS.length]
                return (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group bg-white p-7 lg:p-8 flex flex-col gap-4 hover:bg-brand-soft/50 transition-colors"
                  >
                    <span
                      className="text-[11px] uppercase tracking-[0.18em] font-semibold inline-flex items-center gap-2"
                      style={{ color: pColor }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: pColor }} />
                      {pMeta}
                    </span>
                    <h3
                      className="m-0 font-medium uppercase text-brand"
                      style={{
                        fontFamily: '"Metropolis Medium", Arial, sans-serif',
                        fontSize: 'clamp(18px, 1.8vw, 22px)',
                        lineHeight: 1.15,
                        letterSpacing: '-0.015em',
                        fontWeight: 400,
                      }}
                    >
                      {pTitle}
                    </h3>
                    <p className="m-0 text-brand-muted" style={{ fontSize: 15, lineHeight: '23px' }}>
                      {pText}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-brand pb-1 border-b border-brand w-fit group-hover:text-brand-accent group-hover:border-brand-accent transition-colors">
                      {t('blog.readMore')} <IconArrowUpRight size={13} />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

