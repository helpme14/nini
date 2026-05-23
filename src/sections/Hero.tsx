import { motion } from 'framer-motion'
import { moodHeroSubtext } from '../data/content'

type Props = {
  mood: string
  onNext?: () => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.16,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function Hero({ mood, onNext }: Props) {
  return (
    <section className="relative min-h-[100dvh] flex items-center px-5 py-20 md:px-20 z-10">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[360px] rounded-full bg-rose-100/22 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[280px] h-[280px] rounded-full bg-amber-100/18 blur-[70px] pointer-events-none" />

      <div className="mx-auto w-full max-w-4xl space-y-8">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-sm tracking-[0.18em] uppercase text-neutral-400"
        >
          Hi Ni 😄
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-display text-[2.6rem] sm:text-5xl md:text-7xl leading-[1.1] text-neutral-800"
        >
          I wanted to make you{' '}
          <em className="not-italic text-rose-300/90">something small.</em>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-base sm:text-lg text-neutral-500 max-w-sm leading-relaxed"
        >
          {moodHeroSubtext[mood] ?? moodHeroSubtext['']}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <motion.button
            onClick={() => onNext?.()}
            className="rounded-full bg-neutral-800 px-9 py-4 text-white text-sm tracking-wider shadow-warm min-h-[52px]"
            whileHover={{ scale: 1.05, backgroundColor: '#111' }}
            whileTap={{ scale: 0.96 }}
          >
            Start →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

