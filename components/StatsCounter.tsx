'use client'

import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface CounterProps {
  target: string
  label: string
}

export default function StatsCounter({ target, label }: CounterProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState<number>(0)
  
  // Extract numeric part and suffix
  const numericMatch = target.match(/\d+/)
  const numericTarget = numericMatch ? parseInt(numericMatch[0], 10) : 0
  const suffix = target.replace(/[0-9,]/g, '')

  useEffect(() => {
    if (isInView && numericTarget > 0) {
      let startTime: number | null = null
      const duration = 2000 // 2s

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4)
        
        setCount(Math.floor(ease * numericTarget))
        
        if (progress < 1) {
          requestAnimationFrame(step)
        }
      }
      requestAnimationFrame(step)
    }
  }, [isInView, numericTarget])

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm" ref={ref}>
      <div className="text-4xl md:text-5xl font-display text-gold mb-2">
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="text-sm text-gray-400 font-sans tracking-wide">{label}</div>
    </div>
  )
}
