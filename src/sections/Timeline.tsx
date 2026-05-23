import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { timeline } from '../data/content'

const EASTER_EGG_ID = 6
const TRIGGER_COUNT = 3

type Props = {
  onNext?: () => void
}

export default function Timeline({ onNext }: Props) {
  const [eggTaps, setEggTaps] = useState(0)
  const [eggRevealed, setEggRevealed] = useState(false)

  const handleCardClick = (id: number) => {
    if (id !== EASTER_EGG_ID) return
    const next = eggTaps + 1
    setEggTaps(next)
    if (next >= TRIGGER_COUNT) setEggRevealed(true)
  }

  return (
    <section className="relative min-h-[100dvh] flex items-start px-5 py-16 md:px-20 z-10">
      <div className="mx-auto w-full max-w-4xl space-y-10 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-1.5 pt-4"
        >
          <p className="text-[11px] tracking-[0.22em] uppercase text-neutral-400">
            Mini Timeline
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-800">
            How we got here.
          </h2>
        </motion.div>

        {/* Polaroid grid */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
          {timeline.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 36, rotate: item.rotation * 0.3 }}
              animate={{ opacity: 1, y: 0, rotate: item.rotation }}
              transition={{
                duration: 0.65,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.04, rotate: 0, y: -4 }}
              onClick={() => handleCardClick(item.id)}
              className={`glass-strong rounded-2xl p-4 pb-6 shadow-warm cursor-pointer space-y-3 ${
                item.isLast ? 'ring-1 ring-rose-200' : ''
              }`}
            >
              {/* Image area */}
              <div className="w-full h-16 sm:h-20 rounded-xl bg-gradient-to-br from-rose-50 to-pink-100/60 flex items-center justify-center text-2xl sm:text-3xl">
                {item.emoji}
              </div>

              <div className="space-y-1">
                <p className="font-display text-sm sm:text-base text-neutral-800 leading-snug">
                  {item.label}
                </p>
                <p className="text-[11px] sm:text-xs text-neutral-400 italic leading-relaxed">
                  {item.note}
                </p>
              </div>

              {item.id === EASTER_EGG_ID && eggTaps > 0 && !eggRevealed && (
                <motion.p
                  className="text-[10px] text-rose-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {TRIGGER_COUNT - eggTaps} more…
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Continue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex justify-end"
        >
          <motion.button
            onClick={() => onNext?.()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-neutral-800 px-8 py-3.5 text-white text-sm tracking-wide shadow-warm min-h-[48px]"
          >
            and here we are →
          </motion.button>
        </motion.div>
      </div>

      {/* Easter egg — centered modal overlay, tap anywhere to dismiss */}
      <AnimatePresence>
        {eggRevealed && (
          <motion.div
            key="egg-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            onClick={() => setEggRevealed(false)}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-sm bg-white rounded-3xl px-7 py-9 text-center shadow-glow border border-rose-100 space-y-3"
              onClick={e => e.stopPropagation()}
            >
              <p className="text-[10px] tracking-[0.22em] uppercase text-neutral-400">you found it ✨</p>
              <p className="font-display text-xl text-neutral-800 leading-snug">
                "You've been on my mind a lot longer than Date 5."
              </p>
              <p className="text-xs text-neutral-400 italic">— now you know, Ni.</p>
              <button
                onClick={() => setEggRevealed(false)}
                className="mt-1 text-[11px] text-neutral-300 hover:text-neutral-400 transition"
              >
                tap to close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
