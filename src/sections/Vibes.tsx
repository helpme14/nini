import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { vibeCards } from '../data/content'

type Props = {
  onNext?: () => void
}

export default function Vibes({ onNext }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [reaction, setReaction] = useState<string | null>(null)

  const handleSelect = (id: string, r: string) => {
    setSelectedId(id)
    setReaction(r)
  }

  return (
    <section className="relative min-h-[100dvh] flex items-center px-5 py-20 md:px-20 z-10">
      <div className="w-full max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-1.5"
        >
          <p className="text-[11px] tracking-[0.22em] uppercase text-neutral-400">
            Our Vibes
          </p>
          <h2 className="text-3xl font-display sm:text-4xl md:text-5xl text-neutral-800">
            Which one feels most{' '}
            <em className="not-italic text-rose-300/80">us</em>?
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {vibeCards.map((card, i) => (
            <motion.button
              key={card.id}
              onClick={() => handleSelect(card.id, card.reaction)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              whileHover={{ y: -5, rotate: 0.5 }}
              whileTap={{ scale: 0.97 }}
              className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-left transition-all min-h-[110px] sm:min-h-[140px] ${
                selectedId === card.id
                  ? 'ring-2 ring-rose-300 shadow-warm'
                  : 'glass hover:shadow-warm'
              }`}
              style={{
                background: selectedId === card.id ? card.color : undefined,
              }}
            >
              <span className="block mb-3 text-2xl sm:text-4xl">{card.emoji}</span>
              <h3 className="text-base leading-tight font-display sm:text-xl text-neutral-800">
                {card.title}
              </h3>

              {selectedId === card.id && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-300/60 origin-left"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Reaction */}
        <AnimatePresence mode="wait">
          {reaction && (
            <motion.div
              key={reaction}
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="px-6 py-5 glass rounded-2xl sm:rounded-3xl shadow-warm"
            >
              <p className="text-sm leading-relaxed sm:text-base text-neutral-700">{reaction}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue */}
        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-end"
            >
              <motion.button
                onClick={() => onNext?.()}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full bg-neutral-800 px-8 py-3.5 text-white text-sm tracking-wide shadow-warm min-h-[48px]"
              >
                sounds about right :)
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
