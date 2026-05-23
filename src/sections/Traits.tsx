import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { traits } from '../data/content'

type Props = {
  onNext?: () => void
}

const PAGE_SIZE = 6

export default function Traits({ onNext }: Props) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(traits.length / PAGE_SIZE)
  const pageTraits = traits.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const isLastPage = page === totalPages - 1

  const toggle = (globalIdx: number) => {
    setRevealed(prev => {
      const next = new Set(prev)
      if (next.has(globalIdx)) next.delete(globalIdx)
      else next.add(globalIdx)
      return next
    })
  }

  const count = revealed.size
  const allDone = count === traits.length

  return (
    <section className="relative min-h-[100dvh] flex items-center px-5 py-14 md:px-20 z-10">
      <div className="mx-auto w-full max-w-4xl space-y-5">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-1"
        >
          <p className="text-[11px] tracking-[0.22em] uppercase text-neutral-400">
            What I know
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-neutral-800">
            {"I've been paying attention."}
          </h2>
          <p className="text-sm text-neutral-400">tap each card to reveal</p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1 rounded-full bg-neutral-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-rose-300"
              animate={{ width: `${(count / traits.length) * 100}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
          <span className="text-xs text-neutral-400 tabular-nums shrink-0">
            {count} / {traits.length}
          </span>
        </div>

        {/* Cards - 6 per page, fits any phone without scrolling */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
          >
            {pageTraits.map((trait, localIdx) => {
              const globalIdx = page * PAGE_SIZE + localIdx
              const isOn = revealed.has(globalIdx)
              return (
                <motion.button
                  key={globalIdx}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => toggle(globalIdx)}
                  className={`relative rounded-2xl p-3 text-left transition-colors duration-300 ${
                    isOn ? 'bg-rose-50 ring-1 ring-rose-200' : 'glass'
                  }`}
                >
                  <span className={`text-xl leading-none block mb-1.5 transition-all duration-300 ${isOn ? '' : 'grayscale opacity-40'}`}>
                    {trait.emoji}
                  </span>

                  {isOn ? (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22 }}
                      className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed"
                    >
                      {trait.text}
                    </motion.p>
                  ) : (
                    <p className="text-[11px] text-neutral-300 select-none">tap to reveal</p>
                  )}

                  {isOn && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                      className="absolute top-2 right-2 text-[10px] text-rose-400"
                    >
                      &#x2713;
                    </motion.span>
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Page indicator dots */}
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === page ? 16 : 6,
                backgroundColor: i === page ? '#f9a8b8' : '#e5e5e5',
              }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>

        {/* Action button */}
        <div className="flex justify-between items-center">
          {page > 0 ? (
            <motion.button
              onClick={() => setPage(p => p - 1)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-neutral-200 px-5 py-3 text-sm text-neutral-400 hover:text-neutral-600 transition min-h-[48px]"
            >
              ← back
            </motion.button>
          ) : <div />}
          {isLastPage ? (
            <motion.button
              onClick={() => onNext?.()}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full bg-neutral-800 px-8 py-3.5 text-white text-sm tracking-wide shadow-warm min-h-[48px]"
            >
              {allDone ? "see? I've been paying attention. \u2192" : "keep going \u2192"}
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setPage(p => p + 1)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full bg-neutral-800 px-8 py-3.5 text-white text-sm tracking-wide shadow-warm min-h-[48px]"
            >
              next →
            </motion.button>
          )}
        </div>

      </div>
    </section>
  )
}