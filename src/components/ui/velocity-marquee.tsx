import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import type { ReactNode } from 'react'

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  const mod = ((v - min) % range + range) % range
  return mod + min
}

interface Props {
  children: ReactNode
  baseSpeed?: number
  direction?: 1 | -1
  className?: string
}

export function VelocityMarquee({
  children,
  baseSpeed = 60,
  direction = 1,
  className,
}: Props) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 320,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  const directionRef = useRef<1 | -1>(direction)
  const pausedRef = useRef(false)

  useAnimationFrame((_t, delta) => {
    if (pausedRef.current) return
    let moveBy = directionRef.current * baseSpeed * (delta / 1000)

    const v = velocityFactor.get()
    if (v < -0.05) directionRef.current = -direction as 1 | -1
    else if (v > 0.05) directionRef.current = direction

    moveBy += directionRef.current * moveBy * Math.abs(v)
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      className={className}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <motion.div className="flex shrink-0 whitespace-nowrap" style={{ x }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  )
}
