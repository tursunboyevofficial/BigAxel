import { cn } from '@/lib/utils'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-3 m-0 mb-5 text-[13.1px] uppercase tracking-widest font-semibold text-brand',
        'before:content-[""] before:w-7 before:h-px before:bg-brand',
        className
      )}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-[1000px] mb-14 pt-7 border-t border-brand-line grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
      <div className="lg:col-span-2">
        <Eyebrow>{eyebrow}</Eyebrow>
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
        {title}
      </h2>
      {description && (
        <p
          className="text-brand-muted m-0 max-w-[560px]"
          style={{ fontSize: 20, lineHeight: '29px', letterSpacing: '-0.2px' }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
