import { Reveal } from '@/components/Reveal'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Partners } from '@/components/Partners'
import { Bento } from '@/components/Bento'
import { Team } from '@/components/Team'
import { Stats } from '@/components/Stats'
import { CTA } from '@/components/CTA'
import { FAQ } from '@/components/FAQ'
import { Blog } from '@/components/Blog'
import { Contact } from '@/components/Contact'

export function Home() {
  return (
    <>
      <Hero />
      <Reveal className="cv-section"><About /></Reveal>
      <Reveal className="cv-section"><Partners /></Reveal>
      <Reveal className="cv-section"><Bento /></Reveal>
      <Reveal className="cv-section"><Team /></Reveal>
      <Reveal className="cv-section"><Stats /></Reveal>
      <Reveal className="cv-section"><CTA /></Reveal>
      <Reveal className="cv-section"><FAQ /></Reveal>
      <Reveal className="cv-section"><Blog /></Reveal>
      <Reveal className="cv-section"><Contact /></Reveal>
    </>
  )
}
