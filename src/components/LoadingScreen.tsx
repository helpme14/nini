import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      key="loading"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
    >
      {/* Ambient soft glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-pink-100/40 blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative text-center space-y-5"
      >
        {/* Spinner ring */}
        <motion.div
          className="mx-auto w-10 h-10 rounded-full border-[1.5px] border-pink-200 border-t-rose-300"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
        />

        <motion.p
          className="font-display text-4xl text-neutral-700 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          For Ni
        </motion.p>

        <motion.p
          className="text-[11px] tracking-[0.22em] uppercase text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          loading something small
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
