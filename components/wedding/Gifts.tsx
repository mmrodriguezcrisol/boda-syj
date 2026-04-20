'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Copy, Check, Gift } from 'lucide-react'

const ALIAS = 'BodaJYS2026'
const ACCOUNT_HOLDER = 'Josefina Roig'

export function Gifts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ALIAS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = ALIAS
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-[#F6F4EE] overflow-hidden">
      {/* Decorative botanical */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#8A9A7C]">
          <ellipse cx="50" cy="80" rx="60" ry="90" fill="currentColor" transform="rotate(-20 50 80)" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-80 h-80 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#2D3D2E]">
          <ellipse cx="150" cy="120" rx="70" ry="100" fill="currentColor" transform="rotate(25 150 120)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Gift className="w-10 h-10 md:w-12 md:h-12 text-[#A8533E] mx-auto mb-4" />
          <h2 className="font-[family-name:var(--font-cormorant-sc)] text-sm md:text-base tracking-[0.3em] text-[#8A9A7C] uppercase mb-4">
            Regalos
          </h2>
        </motion.div>

        {/* Message */}
        <motion.p
          className="font-[family-name:var(--font-fraunces)] text-xl md:text-2xl lg:text-3xl text-[#2D3D2E] leading-relaxed mb-10 max-w-2xl mx-auto text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Tu presencia es nuestro mejor regalo
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-[#5A5A52] leading-relaxed mb-10 max-w-xl mx-auto text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Si además querés acompañarnos con una contribución para nuestra luna de miel y los gastos del matrimonio, lo vamos a recibir con muchísimo cariño.
        </motion.p>

        {/* Alias box */}
        <motion.div
          className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8E6E0] max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-sm text-[#8A9A7C] font-[family-name:var(--font-cormorant-sc)] tracking-widest uppercase mb-2">
            Alias
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <span className="font-mono text-xl md:text-2xl tracking-wide text-[#2D3D2E]">
              {ALIAS}
            </span>
            
            <motion.button
              onClick={copyToClipboard}
              className={`p-3 rounded-xl transition-all ${
                copied 
                  ? 'bg-[#8A9A7C] text-white' 
                  : 'bg-[#F6F4EE] text-[#2D3D2E] hover:bg-[#E8E6E0]'
              }`}
              whileTap={{ scale: 0.95 }}
              aria-label="Copiar alias"
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </motion.button>
          </div>
          
          <p className="text-sm text-[#5A5A52] mt-4">
            Titular: <span className="font-medium">{ACCOUNT_HOLDER}</span>
          </p>
        </motion.div>

        {/* Copy confirmation toast */}
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-[#2D3D2E] text-[#F6F4EE] rounded-full shadow-lg z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            Alias copiado
          </span>
        </motion.div>
      </div>
    </section>
  )
}
