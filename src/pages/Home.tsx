import { lazy } from 'react'
import { Reveal } from '@/components/Reveal'
import { DeferredSection } from '@/components/DeferredSection'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'

const Partners = lazy(() =>
  import('@/components/Partners').then((m) => ({ default: m.Partners }))
)
const Bento = lazy(() =>
  import('@/components/Bento').then((m) => ({ default: m.Bento }))
)
const Team = lazy(() =>
  import('@/components/Team').then((m) => ({ default: m.Team }))
)
const Stats = lazy(() =>
  import('@/components/Stats').then((m) => ({ default: m.Stats }))
)
const CTA = lazy(() => import('@/components/CTA').then((m) => ({ default: m.CTA })))
const FAQ = lazy(() => import('@/components/FAQ').then((m) => ({ default: m.FAQ })))
const Blog = lazy(() =>
  import('@/components/Blog').then((m) => ({ default: m.Blog }))
)
const Contact = lazy(() =>
  import('@/components/Contact').then((m) => ({ default: m.Contact }))
)

export function Home() {
  return (
    <>
      <Hero />
      <Reveal className="cv-section"><About /></Reveal>
      <DeferredSection><Partners /></DeferredSection>
      <DeferredSection><Bento /></DeferredSection>
      <DeferredSection><Team /></DeferredSection>
      <DeferredSection minHeight={320}><Stats /></DeferredSection>
      <DeferredSection><CTA /></DeferredSection>
      <DeferredSection><FAQ /></DeferredSection>
      <DeferredSection><Blog /></DeferredSection>
      <DeferredSection><Contact /></DeferredSection>
    </>
  )
}
