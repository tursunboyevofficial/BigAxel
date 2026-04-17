import { motion, useScroll, useSpring } from 'motion/react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 32,
    mass: 0.2,
    restDelta: 0.002,
  })

  return (
    <motion.span
      aria-hidden
      style={{ scaleX, willChange: 'transform' }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-brand-accent pointer-events-none"
    />
  )
}
