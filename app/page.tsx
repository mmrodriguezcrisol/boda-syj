'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Preloader } from '@/components/wedding/Preloader'
import { PasswordGate } from '@/components/wedding/PasswordGate'
import { Hero } from '@/components/wedding/Hero'

import { Countdown } from '@/components/wedding/Countdown'
import { Agenda } from '@/components/wedding/Agenda'
import { PhotoBreak } from '@/components/wedding/PhotoBreak'
import { DressCode } from '@/components/wedding/DressCode'
import { RSVP } from '@/components/wedding/RSVP'
import { Gifts } from '@/components/wedding/Gifts'
import { PhotoGallery } from '@/components/wedding/PhotoGallery'
import { Signature } from '@/components/wedding/Signature'
import { ScrollProgress } from '@/components/wedding/ScrollProgress'
import { DustParticles } from '@/components/wedding/DustParticles'
import { CustomCursor } from '@/components/wedding/CustomCursor'
import { Marquee } from '@/components/wedding/Marquee'

type AppState = 'preloading' | 'password' | 'main'

export default function WeddingPage() {
  const [appState, setAppState] = useState<AppState>('preloading')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if already unlocked
    const isUnlocked = localStorage.getItem('wedding-unlocked')
    if (isUnlocked === 'true') {
      setAppState('main')
    }
  }, [])

  const handlePreloaderComplete = () => {
    const isUnlocked = localStorage.getItem('wedding-unlocked')
    if (isUnlocked === 'true') {
      setAppState('main')
    } else {
      setAppState('password')
    }
  }

  const handleUnlock = () => {
    setAppState('main')
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F6F4EE]" />
    )
  }

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {appState === 'preloading' && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}

        {appState === 'password' && (
          <PasswordGate key="password" onUnlock={handleUnlock} />
        )}

        {appState === 'main' && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <ScrollProgress />
            <DustParticles />
            
            <Hero />
            <Countdown />
            <Marquee />
            <Agenda />
            <PhotoBreak imageIndex={1} overlay="sage" />
            <DressCode />
            <RSVP />
            <PhotoBreak imageIndex={2} overlay="rust" />
            <Gifts />
            <PhotoGallery />
            <Signature />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
