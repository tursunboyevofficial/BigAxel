import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SectionHeading } from '@/components/Eyebrow'
import { FAQ as FAQ_DATA } from '@/data/content'

export function FAQ() {
  return (
    <section id="faq" className="py-[88px] lg:py-[117px] bg-brand-soft">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="FAQ" title="Be kind to your mind" />
        <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-brand-line">
          {FAQ_DATA.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-brand-line py-2">
              <AccordionTrigger
                className="text-left font-semibold uppercase text-brand hover:text-brand-accent hover:no-underline data-[state=open]:text-brand"
                style={{
                  fontFamily: '"Metropolis Semi Bold", Arial, sans-serif',
                  fontSize: 'clamp(1.05rem, 1.6vw, 24px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  fontWeight: 'normal',
                }}
              >
                {item.q}
              </AccordionTrigger>
              <AccordionContent
                className="text-brand-muted max-w-[760px] pt-3"
                style={{ fontSize: 17, lineHeight: '26px' }}
              >
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
