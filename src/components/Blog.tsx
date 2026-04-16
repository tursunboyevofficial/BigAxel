import { SectionHeading } from '@/components/Eyebrow'
import { BLOG } from '@/data/content'
import { cn } from '@/lib/utils'

const META_COLORS = ['text-[#3477FF]', 'text-[#C90]', 'text-[#BA49F2]']

export function Blog() {
  return (
    <section id="blog" className="py-[88px] lg:py-[117px]">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Recent Blog"
          title="Read updated journal"
          description="A compact editorial block using the same data shape as the source homepage."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {BLOG.map((post, i) => (
            <article
              key={post.title}
              className="pt-4 border-t border-brand-line flex flex-col min-h-[260px] transition-opacity hover:opacity-85"
            >
              <span
                className={cn('block mb-5 font-semibold uppercase', META_COLORS[i % 3])}
                style={{ fontSize: 13.1, lineHeight: '17px', letterSpacing: '-0.1px' }}
              >
                {post.meta}
              </span>
              <h3
                className="m-0 mb-auto font-semibold uppercase text-brand"
                style={{ fontSize: 23.3, lineHeight: '28px', letterSpacing: '-0.02em', fontWeight: 'normal' }}
              >
                {post.title}
              </h3>
              <p className="m-0 mt-6 text-brand-muted" style={{ fontSize: 17, lineHeight: '26px' }}>
                {post.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
