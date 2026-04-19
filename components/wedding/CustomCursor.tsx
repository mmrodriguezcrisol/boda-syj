'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsFinePointer(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!isFinePointer) return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Track hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      
      setIsHovering(isClickable)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousemove', handleElementHover)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Add custom-cursor class to body
    document.body.classList.add('custom-cursor')

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousemove', handleElementHover)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.body.classList.remove('custom-cursor')
    }
  }, [isFinePointer])

  if (!isFinePointer) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#A8533E] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#2D3D2E]/30 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 20,
          mass: 0.8,
        }}
      />
    </>
  )
}
