import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { moods, moodResponses } from '../data/content'

type Props = {
  mood: string
  setMood: (mood: string) => void
  onNext?: () => void
}

export default function NiMode({ mood, setMood, onNext }: Props) {
  const [hovered, setHovered] = useState('')

  const handleSelect = (label: string) => {
    setMood(label)
    setTimeout(() => onNext?.(), 1400)
  }

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center px-5 py-16 z-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[340px] rounded-full bg-pink-100/30 blur-[80px]" />
      </div>

      <div className="relative w-full max-w-lg space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3 text-center"
        >
          <p className="text-[11px] tracking-[0.22em] uppercase text-neutral-400">
            Ni Mode
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-neutral-800 leading-[1.18]">
            How are you feeling today?
          </h1>
          <p className="text-sm text-neutral-400">
            Be honest. It subtly changes the experience.
          </p>
        </motion.div>

        {/* Mood grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="grid grid-cols-2 gap-3"
        >
          {moods.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={() => handleSelect(item.label)}
              onHoverStart={() => setHovered(item.label)}
              onHoverEnd={() => setHovered('')}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.65 + i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className={`relative overflow-hidden rounded-2xl p-5 text-left transition-shadow min-h-[90px] ${
                mood === item.label
                  ? 'ring-2 ring-rose-300 shadow-warm'
                  : 'glass hover:shadow-warm'
              }`}
              style={{
                background:
                  mood === item.label
                    ? item.color
                    : hovered === item.label
                    ? item.color + 'bb'
                    : undefined,
              }}
            >
              <span className="text-2xl block mb-1.5">
                {item.label.replace(/[^ ]+$/, '').trim()}
              </span>
              <p className="text-sm font-medium capitalize text-neutral-700">
                {item.label.replace(/\s[\S]+$/, '')}
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">{item.description}</p>

              {mood === item.label && (
                <motion.span
                  className="absolute text-xs top-3 right-3 text-rose-400"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Response */}
        <AnimatePresence>
          {mood && (
            <motion.div
              key={mood}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl px-6 py-5 text-center space-y-1.5 shadow-warm"
            >
              <p className="text-sm text-neutral-700 sm:text-base">{moodResponses[mood]}</p>
              <motion.p
                className="text-xs text-neutral-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                taking you there…
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
