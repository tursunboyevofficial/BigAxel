import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

export function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(false), 700)
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(id)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] bg-brand flex items-center justify-center"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.55, ease } }}
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.32, ease } }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            className="text-white uppercase font-medium"
            style={{
              fontFamily: '"Metropolis Medium", Arial, sans-serif',
              fontSize: 'clamp(2.4rem, 6vw, 84px)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            Big Axel
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.18 } }}
              className="text-brand-accent"
            >
              .
            </motion.span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
