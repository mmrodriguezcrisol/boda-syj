'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image with Ken Burns effect */}
      <div className="absolute inset-0">
        {/* Fallback gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D3D2E] via-[#8A9A7C] to-[#2D3D2E]" />
        {/* Image with Ken Burns */}
        <div 
          className="absolute inset-0 animate-kenburns bg-cover bg-top"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-19%20at%204.36.35%20PM-5OkSrH65Sn96Ocb0KQjrtltV3MS9zF.jpeg')`,
          }}
        />
        {/* Overlay gradient for better text contrast */}
        <div className="absolute inset-0 bg-[#1F1F1A]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1F1A]/30 via-[#1F1F1A]/20 to-[#1F1F1A]/60" />
      </div>

      {/* Decorative botanical overlay */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <svg className="absolute top-0 right-0 w-96 h-96 text-[#F6F4EE]" viewBox="0 0 400 400">
          <ellipse cx="350" cy="50" rx="80" ry="120" fill="currentColor" transform="rotate(30 350 50)" />
          <ellipse cx="380" cy="120" rx="60" ry="100" fill="currentColor" transform="rotate(45 380 120)" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-80 h-80 text-[#F6F4EE]" viewBox="0 0 400 400">
          <ellipse cx="50" cy="350" rx="70" ry="110" fill="currentColor" transform="rotate(-20 50 350)" />
          <ellipse cx="20" cy="280" rx="50" ry="90" fill="currentColor" transform="rotate(-35 20 280)" />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Save the Date label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="font-[family-name:var(--font-cormorant-sc)] text-sm md:text-base tracking-[0.4em] text-[#F6F4EE] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            Reserva la Fecha
          </span>
        </motion.div>

        {/* Names */}
        <motion.h1
          className="mt-6 md:mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="font-[family-name:var(--font-fraunces)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F6F4EE] leading-tight block text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            Simón
          </span>
          <span className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl md:text-5xl text-[#A8533E] my-2 md:my-4 block drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            &
          </span>
          <span className="font-[family-name:var(--font-fraunces)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F6F4EE] leading-tight block text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            Josefina
          </span>
        </motion.h1>

        {/* Date */}
        <motion.p
          className="mt-8 md:mt-12 font-[family-name:var(--font-cormorant-sc)] text-xl md:text-2xl lg:text-3xl tracking-[0.2em] text-[#F6F4EE] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          21 · 22 Mayo 2026
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-[family-name:var(--font-cormorant-sc)] text-xs tracking-[0.2em] text-[#F6F4EE]/70 uppercase">
              Deslizá
            </span>
            <ChevronDown className="w-6 h-6 text-[#F6F4EE]/70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
