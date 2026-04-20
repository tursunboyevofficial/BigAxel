import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IconBuildingAirport, IconExternalLink, IconPlaneTilt, IconUsersGroup, IconX } from '@tabler/icons-react'
import { SectionHeading } from '@/components/Eyebrow'
import { AIRLINES, type Airline } from '@/data/content'
import { useT } from '@/lib/i18n'

const ALLIANCE_COLOR: Record<string, string> = {
  'Star Alliance': '#3477FF',
  SkyTeam: '#009A66',
  Oneworld: '#E53D2E',
  Independent: '#777A80',
}

const ease = [0.22, 1, 0.36, 1] as const

export function Partners() {
  const t = useT()
  const [selected, setSelected] = useState<Airline | null>(null)

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected])

  return (
    <section id="partners" className="relative py-[88px] lg:py-[117px] bg-brand-soft overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow={t('partners.eyebrow')}
          number="02"
          title={t('partners.title')}
          accent={t('partners.titleAccent')}
          description={t('partners.description')}
        />

        {/* Airline grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-brand-line border border-brand-line">
          <AnimatePresence mode="popLayout">
            {AIRLINES.map((a, i) => (
              <motion.button
                key={a.code}
                type="button"
                onClick={() => setSelected(a)}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.02, ease }}
                className="group relative bg-white h-[138px] flex flex-col items-center justify-center p-5 text-left"
              >
                <img
                  src={a.src}
                  alt={a.name}
                  loading="lazy"
                  decoding="async"
                  className="relative max-h-[52px] max-w-[70%] object-contain grayscale opacity-80 transition-[filter,opacity,transform] duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
                <div className="relative mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] font-semibold text-brand-muted">
                  <span className="tabular-nums">{a.code}</span>
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: ALLIANCE_COLOR[a.alliance ?? 'Independent'] }}
                  />
                  <span className="truncate">{a.alliance === 'Independent' ? 'Indie' : a.alliance?.split(' ')[0]}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <p className="mt-6 text-[12px] uppercase tracking-[0.18em] font-semibold text-brand-muted">
          {t('partners.showing')} <span className="text-brand tabular-nums">{AIRLINES.length}</span>{' '}
          {t('partners.carriers')}
        </p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <AirlineModal airline={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

function AirlineModal({ airline, onClose }: { airline: Airline; onClose: () => void }) {
  const t = useT()
  const color = ALLIANCE_COLOR[airline.alliance ?? 'Independent']
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        role="dialog"
        aria-modal
        aria-label={`${airline.name} partnership details`}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.3, ease }}
        className="relative bg-white w-full max-w-lg shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 h-9 w-9 rounded-full bg-brand-soft text-brand flex items-center justify-center hover:bg-brand hover:text-white transition-colors"
        >
          <IconX size={16} />
        </button>

        <div
          className="relative h-36 flex items-center justify-center p-6"
          style={{
            background: `linear-gradient(135deg, ${color}12 0%, #F7F8FA 60%, ${color}08 100%)`,
          }}
        >
          <img
            src={airline.src}
            alt={airline.name}
            className="max-h-[72px] max-w-[60%] object-contain"
          />
        </div>

        <div className="p-7 lg:p-8">
          <p className="m-0 text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color }}>
            {airline.alliance} · {airline.code}
          </p>
          <h3
            className="m-0 mt-3 font-semibold uppercase text-brand"
            style={{
              fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
              fontSize: 28,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              fontWeight: 'normal',
            }}
          >
            {airline.name}
          </h3>

          <dl className="mt-6 space-y-px bg-brand-line border border-brand-line">
            <Row icon={IconBuildingAirport} label={t('partners.modal.hub')} value={airline.hub} />
            <Row icon={IconPlaneTilt} label={t('partners.modal.fleet')} value={airline.fleet} />
            <Row icon={IconUsersGroup} label={t('partners.modal.alliance')} value={airline.alliance ?? 'Independent'} />
          </dl>

          <div className="mt-7 flex items-center justify-end gap-4">
            <a
              href={airline.website}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 h-10 px-4 bg-brand text-white text-[11px] font-semibold uppercase tracking-[0.18em] rounded-full hover:bg-brand-accent transition-colors"
            >
              {t('partners.modal.visit')}
              <IconExternalLink size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="bg-white flex items-center gap-4 px-4 py-3">
      <Icon size={16} stroke={1.6} className="text-brand-muted" />
      <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-muted flex-1">
        {label}
      </span>
      <span className="text-[13px] text-brand text-right">{value}</span>
    </div>
  )
}
