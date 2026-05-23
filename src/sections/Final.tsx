import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { finalMessages } from '../data/content'
import { useWindowSize } from '../hooks/useWindowSize'

type Props = {
  mood: string
}

const lines = [
  { text: 'And honestly…',                                         delay: 0,   size: 'small'  },
  { text: "I think I'd like to know you more intentionally.",   delay: 0.9, size: 'large'  },
  { text: 'Would you let me court you properly?',               delay: 1.8, size: 'medium' },
]

export default function Final({ mood: _mood }: Props) {
  const [answer, setAnswer] = useState<'yes' | 'slow' | null>(null)
  const { width, height } = useWindowSize()

  return (
    <section className="relative min-h-[100dvh] flex items-center px-5 py-20 md:px-20 z-10">
      {answer === 'yes' && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={90}
          gravity={0.06}
          colors={['#f9a8b8', '#fce8ec', '#fdd8a8', '#c8e8d8', '#e8d0f8']}
        />
      )}

      {/* Ambient glow after answer */}
      <AnimatePresence>
        {answer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                answer === 'yes'
                  ? 'radial-gradient(ellipse at 50% 40%, rgba(255,182,193,0.14) 0%, transparent 65%)'
                  : 'radial-gradient(ellipse at 50% 40%, rgba(180,220,200,0.11) 0%, transparent 65%)',
            }}
          />
        )}
      </AnimatePresence>

      <div className="mx-auto w-full max-w-2xl text-center space-y-10">
        {/* Sequential text reveal */}
        <div className="space-y-5">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
              className={
                line.size === 'small'
                  ? 'text-neutral-400 text-base sm:text-lg'
                  : line.size === 'large'
                  ? 'font-display text-3xl sm:text-4xl md:text-5xl text-neutral-800 leading-tight'
                  : 'text-lg sm:text-xl text-neutral-500'
              }
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        {/* Buttons */}
        {!answer && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.7 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            <motion.button
              onClick={() => setAnswer('yes')}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-neutral-800 px-9 py-4 text-white text-sm tracking-wider shadow-warm min-h-[52px]"
            >
              Yes 😄
            </motion.button>
            <motion.button
              onClick={() => setAnswer('slow')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-neutral-300 px-9 py-4 text-neutral-600 text-sm tracking-wider min-h-[52px]"
            >
              Let's take it slow 🌱
            </motion.button>
          </motion.div>
        )}

        {/* Outcome */}
        <AnimatePresence mode="wait">
          {answer && (
            <motion.div
              key={answer}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong rounded-3xl px-7 py-10 sm:px-10 sm:py-12 shadow-warm space-y-4"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-display text-xl sm:text-2xl md:text-3xl text-neutral-800 leading-snug"
              >
                {finalMessages[answer].headline}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-neutral-500 text-sm sm:text-base leading-relaxed"
              >
                {finalMessages[answer].body}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-xs text-neutral-400 italic"
              >
                {finalMessages[answer].sub}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 0.9 }}
          className="text-xs text-neutral-300 pt-2"
        >
          made with intent, for Ni 🌷
        </motion.p>
      </div>
    </section>
  )
}
