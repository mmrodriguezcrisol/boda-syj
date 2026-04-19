'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const photoData: Record<number, { url: string; position: string }> = {
  1: {
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-19%20at%204.36.36%20PM-DUqEXmrKxrJAGdp9FasQ9H44N3Fs8O.jpeg',
    position: 'top',
  },
  2: {
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-19%20at%204.36.38%20PM-8QLhFi8TduRQeJ4S3rNZTMv1FzeQfR.jpeg',
    position: 'center',
  },
}

interface PhotoBreakProps {
  imageIndex: number
  overlay?: 'sage' | 'rust'
}

export function PhotoBreak({ imageIndex, overlay = 'sage' }: PhotoBreakProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const overlayColor = overlay === 'sage' 
    ? 'bg-[#8A9A7C]/20' 
    : 'bg-[#A8533E]/15'

  const photoUrl = (photoData[imageIndex] ?? photoData[1]).url

  return (
    <section ref={ref} className="relative h-[50vh] md:h-[70vh] overflow-hidden">
      {/* Fallback gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D3D2E] via-[#8A9A7C] to-[#2D3D2E]" />
      
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 parallax-bg bg-top"
        style={{
          backgroundImage: `url('${photoUrl}')`,
        }}
      />
      
      {/* Color overlay */}
      <div className={`absolute inset-0 ${overlayColor}`} />

      {/* Decorative botanical overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : {}}
        transition={{ duration: 1 }}
      >
        <svg className="absolute top-0 left-0 w-64 h-64 text-[#F6F4EE]" viewBox="0 0 200 200">
          <ellipse cx="50" cy="50" rx="60" ry="90" fill="currentColor" transform="rotate(-25 50 50)" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-80 h-80 text-[#F6F4EE]" viewBox="0 0 200 200">
          <ellipse cx="150" cy="150" rx="70" ry="100" fill="currentColor" transform="rotate(20 150 150)" />
        </svg>
      </motion.div>

      {/* Decorative monogram */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <span className="font-[var(--font-fraunces)] text-6xl md:text-8xl text-[#F6F4EE]/30">
            S & J
          </span>
        </div>
      </motion.div>
    </section>
  )
}
