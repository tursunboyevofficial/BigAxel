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
      <Reveal><About /></Reveal>
      <Reveal><Partners /></Reveal>
      <Reveal><Bento /></Reveal>
      <Reveal><Team /></Reveal>
      <Reveal><Stats /></Reveal>
      <Reveal><CTA /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Reveal><Blog /></Reveal>
      <Reveal><Contact /></Reveal>
    </>
  )
}
