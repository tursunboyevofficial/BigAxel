import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Visual height reserved before the chunk mounts. Prevents layout shift. */
  minHeight?: number
  /** Start loading when the placeholder is within this many px of viewport. */
  rootMargin?: string
  /** Safety net — mount after this many ms regardless of viewport, so nav
   *  hashes and deep links still work even if the user never scrolls. */
  idleFallbackMs?: number
}

declare global {
  interface Window {
    requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number
    cancelIdleCallback?: (id: number) => void
  }
}

export function DeferredSection({
  children,
  minHeight = 560,
  rootMargin = '600px',
  idleFallbackMs = 2500,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) return
    const node = ref.current
    if (!node) return

    let cancelled = false
    const trigger = () => {
      if (!cancelled) setShow(true)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          trigger()
          io.disconnect()
        }
      },
      { rootMargin }
    )
    io.observe(node)

    let idleId: number | null = null
    let timeoutId: number | null = null
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(trigger, { timeout: idleFallbackMs })
    } else {
      timeoutId = window.setTimeout(trigger, idleFallbackMs)
    }

    return () => {
      cancelled = true
      io.disconnect()
      if (idleId != null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId != null) clearTimeout(timeoutId)
    }
  }, [show, rootMargin, idleFallbackMs])

  return (
    <div ref={ref} style={show ? undefined : { minHeight }}>
      <Suspense fallback={<div style={{ minHeight }} />}>
        {show ? children : null}
      </Suspense>
    </div>
  )
}
