import { useEffect, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion'

import LoadingScreen from './components/LoadingScreen'
import MusicToggle from './components/MusicToggle'
import Particles from './components/Particles'

import NiMode from './sections/NiMode'
import Hero from './sections/Hero'
import Vibes from './sections/Vibes'
import Timeline from './sections/Timeline'
import ComfortCards from './sections/ComfortCards'
import Traits from './sections/Traits'
import Notes from './sections/Notes'
import Final from './sections/Final'

const sectionVariants = {
  enter: { opacity: 0, y: 22 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
}

const TOTAL_SECTIONS = 8

export default function App() {
  const [loading, setLoading] = useState(true)
  const [mood, setMood] = useState('')
  const [section, setSection] = useState(0)

  // Smooth cursor glow (desktop only)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 70, damping: 18 })
  const springY = useSpring(rawY, { stiffness: 70, damping: 18 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [rawX, rawY])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2700)
    return () => clearTimeout(timer)
  }, [])

  const goNext = () => setSection(s => Math.min(s + 1, TOTAL_SECTIONS - 1))
  const goBack = () => setSection(s => Math.max(s - 1, 0))

  const sections = [
    <NiMode key="ni"       mood={mood} setMood={setMood} onNext={goNext} />,
    <Hero   key="hero"     mood={mood} onNext={goNext} />,
    <Vibes  key="vibes"    onNext={goNext} />,
    <Timeline key="time"   onNext={goNext} />,
    <ComfortCards key="cc" onNext={goNext} />,
    <Traits key="traits"   onNext={goNext} />,
    <Notes  key="notes"    onNext={goNext} />,
    <Final  key="final"    mood={mood} />,
  ]

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <main
        className="relative h-[100dvh] overflow-hidden"
        style={{ visibility: loading ? 'hidden' : 'visible' }}
      >
        {/* Cursor glow — desktop only */}
        <motion.div
          className="cursor-glow hidden md:block"
          style={{ left: springX, top: springY }}
        />

        <Particles />
        <MusicToggle />

        {/* Global back button — shown for all sections except the first */}
        <AnimatePresence>
          {section > 0 && (
            <motion.button
              key="back"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              onClick={goBack}
              className="fixed left-5 top-5 z-50 glass rounded-full px-4 py-2.5 text-xs text-neutral-500 shadow-card transition hover:text-neutral-700 min-h-[40px]"
            >
              ← back
            </motion.button>
          )}
        </AnimatePresence>

        {/* Section progress dots */}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === section ? 20 : 6,
                background: i === section ? '#e8a0a8' : '#d4c4c4',
              }}
              transition={{ duration: 0.35 }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full overflow-y-auto"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {sections[section]}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  )
}

