'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PasswordGateProps {
  onUnlock: () => void
}

const CORRECT_PASSWORD = 'erahorachicos'
const STORAGE_KEY = 'wedding-unlocked'

export function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    const isUnlocked = localStorage.getItem(STORAGE_KEY)
    if (isUnlocked === 'true') {
      onUnlock()
    }
  }, [onUnlock])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password.toLowerCase() === CORRECT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true')
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#F6F4EE] px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative botanical element */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 opacity-20 pointer-events-none"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M180 20 Q160 60 140 80 Q120 100 100 120 Q80 140 60 160 Q40 180 20 200"
            fill="none"
            stroke="#8A9A7C"
            strokeWidth="1"
          />
          <path
            d="M140 80 Q180 60 200 40"
            fill="none"
            stroke="#8A9A7C"
            strokeWidth="1"
          />
          <ellipse cx="170" cy="50" rx="25" ry="40" fill="#8A9A7C" fillOpacity="0.3" transform="rotate(-30 170 50)" />
          <ellipse cx="120" cy="100" rx="20" ry="35" fill="#2D3D2E" fillOpacity="0.2" transform="rotate(-45 120 100)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-48 h-48 md:w-72 md:h-72 opacity-20 pointer-events-none"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <ellipse cx="60" cy="140" rx="40" ry="60" fill="#2D3D2E" fillOpacity="0.3" transform="rotate(20 60 140)" />
          <ellipse cx="30" cy="180" rx="30" ry="50" fill="#8A9A7C" fillOpacity="0.4" transform="rotate(35 30 180)" />
        </svg>
      </motion.div>

      <motion.div
        className="text-center max-w-md w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Monogram */}
        <h1 className="font-[var(--font-fraunces)] text-4xl md:text-5xl text-[#2D3D2E] mb-2">
          S <span className="text-[#A8533E]">&</span> J
        </h1>
        
        <p className="font-[var(--font-cormorant-sc)] text-sm md:text-base text-[#8A9A7C] tracking-[0.2em] mb-12">
          Nos Casamos
        </p>

        <p className="text-[#5A5A52] text-base md:text-lg mb-8 font-light">
          Ingresá la contraseña que te compartieron
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className={`w-full px-6 py-4 text-center text-lg bg-white/50 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8A9A7C] transition-all ${
                error 
                  ? 'border-[#A8533E] text-[#A8533E]' 
                  : 'border-[#D4D2CC] text-[#1F1F1A]'
              }`}
              autoFocus
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[#A8533E] text-sm"
              >
                Contraseña incorrecta. Intentá de nuevo.
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="w-full px-8 py-4 bg-[#2D3D2E] text-[#F6F4EE] font-medium rounded-2xl hover:bg-[#1F1F1A] transition-colors btn-botanical"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Ingresar
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}
