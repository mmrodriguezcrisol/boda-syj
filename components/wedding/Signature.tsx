'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart } from 'lucide-react'

export function Signature() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <footer ref={ref} className="relative py-20 md:py-28 bg-[#2D3D2E] overflow-hidden">
      {/* Decorative botanical background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="100" cy="200" rx="150" ry="200" fill="#F6F4EE" transform="rotate(-10 100 200)" />
          <ellipse cx="700" cy="200" rx="120" ry="180" fill="#F6F4EE" transform="rotate(15 700 200)" />
          <ellipse cx="400" cy="350" rx="180" ry="120" fill="#F6F4EE" transform="rotate(5 400 350)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Heart icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Heart className="w-8 h-8 md:w-10 md:h-10 text-[#A8533E] mx-auto mb-8 fill-current" />
        </motion.div>

        {/* Names */}
        <motion.h2
          className="font-[family-name:var(--font-fraunces)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F6F4EE] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Simón <span className="text-[#A8533E]">&</span> Josefina
        </motion.h2>

        {/* Date */}
        <motion.p
          className="font-[family-name:var(--font-cormorant-sc)] text-lg md:text-xl text-[#8A9A7C] tracking-[0.2em] mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          21 · 22 Mayo 2026
        </motion.p>

        {/* Thank you message */}
        <motion.p
          className="font-[family-name:var(--font-fraunces)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F6F4EE]/90 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          ¡Gracias por acompañarnos!
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="h-px w-12 bg-[#8A9A7C]/30" />
          <span className="text-[#8A9A7C]/50 text-2xl">❧</span>
          <div className="h-px w-12 bg-[#8A9A7C]/30" />
        </motion.div>
      </div>
    </footer>
  )
}
