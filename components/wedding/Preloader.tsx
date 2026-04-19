'use client'

import { motion } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F6F4EE]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 2500)
      }}
    >
      {/* Botanical Branch SVG Animation */}
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main branch */}
        <motion.path
          d="M100 180 Q100 140 90 120 Q80 100 85 80 Q90 60 100 40"
          fill="none"
          stroke="#2D3D2E"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
        {/* Left leaves */}
        <motion.path
          d="M90 120 Q60 110 50 90 Q60 95 75 100 Q85 105 90 120"
          fill="#8A9A7C"
          fillOpacity="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.path
          d="M85 80 Q55 70 45 50 Q55 55 70 65 Q80 72 85 80"
          fill="#8A9A7C"
          fillOpacity="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
        {/* Right leaves */}
        <motion.path
          d="M95 100 Q125 90 140 70 Q125 80 110 90 Q100 95 95 100"
          fill="#2D3D2E"
          fillOpacity="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        <motion.path
          d="M100 60 Q130 50 145 35 Q125 45 110 52 Q102 56 100 60"
          fill="#2D3D2E"
          fillOpacity="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        />
        {/* Small accent leaf */}
        <motion.circle
          cx="100"
          cy="35"
          r="4"
          fill="#A8533E"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 1.6 }}
        />
      </motion.svg>

      {/* Monogram */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <h1 className="font-[var(--font-fraunces)] text-5xl md:text-6xl text-[#2D3D2E] tracking-wide">
          S <span className="text-[#A8533E]">&</span> J
        </h1>
        <motion.p
          className="font-[var(--font-cormorant-sc)] text-lg md:text-xl text-[#8A9A7C] mt-4 tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          21 · 22 Mayo 2026
        </motion.p>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#8A9A7C]"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
