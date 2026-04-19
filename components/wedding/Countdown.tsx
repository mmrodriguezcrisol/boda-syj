'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WEDDING_DATE = new Date('2026-05-21T10:30:00-03:00') // ART timezone

interface TimeUnit {
  value: number
  label: string
}

export function Countdown() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 0, label: 'Días' },
    { value: 0, label: 'Horas' },
    { value: 0, label: 'Minutos' },
    { value: 0, label: 'Segundos' },
  ])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = WEDDING_DATE.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeLeft([
          { value: days, label: 'Días' },
          { value: hours, label: 'Horas' },
          { value: minutes, label: 'Minutos' },
          { value: seconds, label: 'Segundos' },
        ])
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-[#F6F4EE] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#8A9A7C]">
          <ellipse cx="60" cy="100" rx="50" ry="80" fill="currentColor" transform="rotate(-20 60 100)" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#2D3D2E]">
          <ellipse cx="140" cy="100" rx="45" ry="70" fill="currentColor" transform="rotate(25 140 100)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Date display */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2D3D2E] mb-2">
            21 y 22 de Mayo
          </h2>
          <span className="font-[family-name:var(--font-cormorant-sc)] text-xl md:text-2xl text-[#A8533E] tracking-[0.3em]">
            2026
          </span>
        </motion.div>

        <motion.h3
          className="text-center font-[family-name:var(--font-cormorant-sc)] text-sm md:text-base tracking-[0.3em] text-[#8A9A7C] uppercase mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Faltan
        </motion.h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {timeLeft.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative">
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8E6E0]">
                  <motion.span
                    key={unit.value}
                    className="font-[family-name:var(--font-fraunces)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#2D3D2E] block"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.span>
                </div>
                <span className="font-[family-name:var(--font-cormorant-sc)] text-xs md:text-sm tracking-[0.2em] text-[#8A9A7C] mt-3 block uppercase">
                  {unit.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center mt-12 font-[family-name:var(--font-cormorant-sc)] text-base md:text-lg text-[#5A5A52] tracking-wide"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          para el gran día
        </motion.p>
      </div>
    </section>
  )
}
