import { Eyebrow } from '@/components/Eyebrow'
import { useT } from '@/lib/i18n'

export function Contact() {
  const t = useT()
  const FIELDS = [
    { label: t('contact.fields.emailLabel'), value: t('contact.fields.emailValue') },
    { label: t('contact.fields.instagramLabel'), value: t('contact.fields.instagramValue') },
    { label: t('contact.fields.locationLabel'), value: t('contact.fields.locationValue') },
    { label: t('contact.fields.socialLabel'), value: t('contact.fields.socialValue') },
  ]
  return (
    <section id="contact" className="py-[88px] lg:py-[117px] bg-brand-soft">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-start">
        <div>
          <Eyebrow>{t('contact.eyebrow')}</Eyebrow>
          <h2
            className="font-semibold uppercase text-brand m-0 mb-6"
            style={{
              fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 60px)',
              lineHeight: 0.94,
              letterSpacing: '-0.035em',
              fontWeight: 'normal',
            }}
          >
            {t('contact.title')}
          </h2>
          <p
            className="text-brand-muted m-0 max-w-[480px]"
            style={{ fontSize: 20, lineHeight: '29px', letterSpacing: '-0.2px' }}
          >
            {t('contact.description')}
          </p>
        </div>

        <div className="bg-white p-8 lg:p-10">
          {FIELDS.map((f, i) => (
            <div
              key={f.label}
              className={cn(
                'pb-5 mb-5',
                i < FIELDS.length - 1 && 'border-b border-brand-line'
              )}
              style={i === FIELDS.length - 1 ? { paddingBottom: 0, marginBottom: 0 } : {}}
            >
              <strong
                className="block mb-1.5 text-brand-muted font-semibold uppercase"
                style={{ fontSize: 13.1, letterSpacing: '0.06em', fontWeight: 'normal' }}
              >
                {f.label}
              </strong>
              <span className="text-brand" style={{ fontSize: 17, lineHeight: '26px' }}>
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function cn(...args: (string | false | undefined)[]) {
  return args.filter(Boolean).join(' ')
}
