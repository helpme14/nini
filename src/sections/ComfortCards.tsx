import { useState } from 'react'
import { motion } from 'framer-motion'
import { prompts } from '../data/content'

type Props = {
  onNext?: () => void
}

export default function ComfortCards({ onNext }: Props) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [seen, setSeen] = useState<Set<number>>(new Set([0]))

  const current = prompts[index]

  const nextCard = () => {
    const next = (index + 1) % prompts.length
    setIndex(next)
    setFlipped(false)
    setSeen(prev => new Set([...prev, next]))
  }

  return (
    <section className="relative min-h-[100dvh] flex items-center px-5 py-20 md:px-20 z-10">
      <div className="mx-auto w-full max-w-2xl space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-1.5"
        >
          <p className="text-[11px] tracking-[0.22em] uppercase text-neutral-400">
            Comfort Cards
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-neutral-800">
            Let me ask you something.
          </h2>
        </motion.div>

        {/* Flip card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="relative"
          style={{ perspective: '1400px' }}
          onClick={() => setFlipped(f => !f)}
        >
          <motion.div
            className="relative w-full min-h-[240px] sm:min-h-[270px] cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-warm flex flex-col items-center justify-center text-center space-y-4"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <p className="text-xs text-neutral-400 italic">{current.microcopy}</p>
              <h3 className="font-display text-xl sm:text-2xl text-neutral-800 leading-snug">
                {current.question}
              </h3>
              <p className="text-[11px] text-neutral-300 tracking-wider">tap to reflect</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-warm flex flex-col items-center justify-center text-center space-y-3"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(135deg, #fce8ec 0%, #fdf5ee 100%)',
              }}
            >
              <p className="font-display text-xl sm:text-2xl text-neutral-700">take your time. 🌿</p>
              <p className="text-sm text-neutral-400 max-w-xs">
                no need to answer out loud. just sit with it.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Progress + Next card */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 items-center">
            {prompts.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1 rounded-full ${seen.has(i) ? 'bg-rose-300' : 'bg-neutral-200'}`}
                animate={{ width: seen.has(i) ? 20 : 6 }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextCard}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-neutral-300 px-5 py-3 text-sm text-neutral-600 transition hover:border-rose-300 hover:text-rose-400 min-h-[44px]"
          >
            next →
          </motion.button>
        </div>

        {/* Continue to next section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-end pt-2"
        >
          <motion.button
            onClick={() => onNext?.()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-neutral-800 px-8 py-3.5 text-white text-sm tracking-wide shadow-warm min-h-[48px]"
          >
            okay, enough 😆 →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
