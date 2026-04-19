'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, Calendar } from 'lucide-react'

const WHATSAPP_NUMBER = '5491130137685'
const WHATSAPP_MESSAGE = encodeURIComponent('Hola Jose! Confirmo mi asistencia al casamiento 💕')
const RSVP_DEADLINE = '15 de Mayo de 2026'

export function RSVP() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-[#2D3D2E] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="150" cy="150" rx="200" ry="250" fill="#F6F4EE" transform="rotate(-10 150 150)" />
          <ellipse cx="650" cy="450" rx="150" ry="220" fill="#F6F4EE" transform="rotate(15 650 450)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[var(--font-cormorant-sc)] text-sm md:text-base tracking-[0.3em] text-[#8A9A7C] uppercase mb-4">
            Confirmá tu Asistencia
          </h2>
        </motion.div>

        {/* Main title */}
        <motion.h3
          className="font-[var(--font-fraunces)] text-3xl md:text-4xl lg:text-5xl text-[#F6F4EE] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          ¿Nos acompañás?
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-[#F6F4EE]/80 leading-relaxed mb-8 max-w-xl mx-auto text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Confirmanos por WhatsApp para que podamos organizar todo de la mejor manera.
        </motion.p>

        {/* Deadline notice */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#A8533E]/20 rounded-full mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Calendar className="w-4 h-4 text-[#A8533E]" />
          <span className="text-sm text-[#F6F4EE]/90">
            Confirmá antes del <strong className="text-[#A8533E]">{RSVP_DEADLINE}</strong>
          </span>
        </motion.div>

        {/* WhatsApp button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-2xl hover:bg-[#20BD5A] transition-all transform hover:scale-105 font-medium text-lg shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Confirmar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
