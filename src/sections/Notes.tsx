import { motion } from 'framer-motion'
import { notes } from '../data/content'

type Props = {
  onNext?: () => void
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const rotations = [-1.2, 0.8, -0.4, 1.5, -0.9, 0.5]

export default function Notes({ onNext }: Props) {
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
            Little Things
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-800">
            I like about you.
          </h2>
        </motion.div>

        {/* Notes grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-3 grid-cols-2 sm:grid-cols-3"
        >
          {notes.map((note, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -5, scale: 1.03, rotate: 0 }}
              className="glass rounded-2xl p-5 sm:p-7 shadow-card hover:shadow-warm transition-shadow cursor-default group"
              style={{ rotate: `${rotations[i % rotations.length]}deg` }}
            >
              <p className="font-handwritten text-lg sm:text-xl text-neutral-700 leading-snug mb-2 group-hover:text-neutral-800 transition-colors">
                {note.text}
              </p>
              <p className="text-[11px] sm:text-xs text-neutral-400 italic leading-relaxed">
                {note.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Continue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-end"
        >
          <motion.button
            onClick={() => onNext?.()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-neutral-800 px-8 py-3.5 text-white text-sm tracking-wide shadow-warm min-h-[48px]"
          >
            one last thing →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

