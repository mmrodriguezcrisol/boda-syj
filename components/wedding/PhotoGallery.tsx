'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useCallback, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Photo {
  id: number
  src: string
  alt: string
}

const photos: Photo[] = [
  { id: 1, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-19%20at%204.36.35%20PM-5OkSrH65Sn96Ocb0KQjrtltV3MS9zF.jpeg', alt: 'Simón y Josefina abrazados en el parque' },
  { id: 2, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-19%20at%204.36.36%20PM-DUqEXmrKxrJAGdp9FasQ9H44N3Fs8O.jpeg', alt: 'Simón y Josefina al atardecer' },
  { id: 3, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-19%20at%204.36.37%20PM-UmJlxmZjguNRdeK2SAtsFWOLfQFKQl.jpeg', alt: 'Detalle del anillo de compromiso' },
  { id: 4, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-19%20at%204.36.38%20PM-8QLhFi8TduRQeJ4S3rNZTMv1FzeQfR.jpeg', alt: 'Simón y Josefina mostrando el anillo' },
]

export function PhotoGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedPhoto(index)
  const closeLightbox = () => setSelectedPhoto(null)

  const goToPrevious = useCallback(() => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1)
    }
  }, [selectedPhoto])

  const goToNext = useCallback(() => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === photos.length - 1 ? 0 : selectedPhoto + 1)
    }
  }, [selectedPhoto])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhoto === null) return
      
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhoto, goToPrevious, goToNext])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedPhoto !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedPhoto])

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Decorative botanical */}
      <div className="absolute top-20 right-0 w-64 h-64 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#8A9A7C]">
          <ellipse cx="140" cy="80" rx="50" ry="80" fill="currentColor" transform="rotate(15 140 80)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[var(--font-cormorant-sc)] text-sm md:text-base tracking-[0.3em] text-[#8A9A7C] uppercase mb-4">
            Galería
          </h2>
          <p className="font-[var(--font-fraunces)] text-3xl md:text-4xl text-[#2D3D2E]">
            Nuestra Historia
          </p>
        </motion.div>

        {/* Photo grid - asymmetric layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <motion.button
              key={photo.id}
              className={`relative overflow-hidden rounded-3xl aspect-[3/4] bg-[#E8E6E0] group ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              aria-label={`Ver ${photo.alt}`}
            >
              {/* Actual image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${photo.src}')` }}
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#2D3D2E]/0 group-hover:bg-[#2D3D2E]/20 transition-colors duration-300" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center lightbox-overlay bg-[#1F1F1A]/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 p-3 text-[#F6F4EE] hover:text-[#A8533E] transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Cerrar"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation buttons */}
            <button
              className="absolute left-4 md:left-8 p-3 text-[#F6F4EE] hover:text-[#A8533E] transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              className="absolute right-4 md:right-8 p-3 text-[#F6F4EE] hover:text-[#A8533E] transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Photo container */}
            <motion.div
              className="relative max-w-4xl max-h-[80vh] mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Actual photo */}
              <div 
                className="aspect-[3/4] w-full max-w-lg mx-auto rounded-3xl overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url('${photos[selectedPhoto].src}')` }}
              />

              {/* Photo counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className="text-[#F6F4EE]/70 text-sm font-[var(--font-cormorant-sc)] tracking-widest">
                  {selectedPhoto + 1} / {photos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
