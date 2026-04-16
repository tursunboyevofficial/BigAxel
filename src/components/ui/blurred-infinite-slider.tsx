'use client'
import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { InfiniteSlider } from '@/components/ui/infinite-slider'

type InfiniteSliderProps = React.ComponentProps<typeof InfiniteSlider>

export type BlurredInfiniteSliderProps = InfiniteSliderProps & {
  fadeWidth?: number
  containerClassName?: string
}

export function BlurredInfiniteSlider({
  children,
  fadeWidth = 80,
  containerClassName,
  ...sliderProps
}: BlurredInfiniteSliderProps) {
  const maskStyle: CSSProperties = {
    maskImage: `linear-gradient(to right, transparent, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent)`,
    WebkitMaskImage: `linear-gradient(to right, transparent, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent)`,
  }

  return (
    <div className={cn('relative w-full', containerClassName)} style={maskStyle}>
      <InfiniteSlider {...sliderProps}>{children}</InfiniteSlider>
    </div>
  )
}
