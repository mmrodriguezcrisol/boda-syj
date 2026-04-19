'use client'

import { useMemo } from 'react'

interface Particle {
  id: number
  left: string
  delay: string
  duration: string
  size: string
  opacity: number
}

export function DustParticles() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${15 + Math.random() * 20}s`,
      size: `${2 + Math.random() * 3}px`,
      opacity: 0.3 + Math.random() * 0.4,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bottom-0 rounded-full bg-[#8A9A7C] dust-particle"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  )
}
