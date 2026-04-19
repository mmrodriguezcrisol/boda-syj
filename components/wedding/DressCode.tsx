'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function DressCode() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Decorative botanical background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="absolute top-0 right-0 w-96 h-96" viewBox="0 0 400 400">
          <ellipse cx="350" cy="100" rx="100" ry="150" fill="#2D3D2E" transform="rotate(20 350 100)" />
          <ellipse cx="320" cy="200" rx="70" ry="120" fill="#8A9A7C" transform="rotate(35 320 200)" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-80 h-80" viewBox="0 0 400 400">
          <ellipse cx="80" cy="320" rx="90" ry="130" fill="#2D3D2E" transform="rotate(-15 80 320)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[family-name:var(--font-cormorant-sc)] text-sm md:text-base tracking-[0.3em] text-[#8A9A7C] uppercase mb-4">
            Código de Vestimenta
          </h2>
        </motion.div>

        {/* Main title */}
        <motion.h3
          className="font-[family-name:var(--font-fraunces)] text-4xl md:text-5xl lg:text-6xl text-[#2D3D2E] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Elegante Sport
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-[#5A5A52] leading-relaxed max-w-2xl mx-auto text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Queremos que estés cómodo/a pero con un toque especial. 
          Pensá en colores sobrios y telas elegantes, sin necesidad de vestimenta formal.
        </motion.p>
      </div>
    </section>
  )
}
