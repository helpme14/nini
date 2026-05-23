import { useMemo } from 'react'
import { motion } from 'framer-motion'

const COUNT = 20

export default function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        size: 48 + (i * 11) % 90,
        left: (i * 19 + 4) % 100,
        top: (i * 23 + 6) % 120,
        duration: 7 + (i % 5) * 1.8,
        delay: (i % 6) * 0.7,
        opacity: 0.08 + (i % 4) * 0.04,
        xDrift: ((i % 3) - 1) * 10,
      })),
    []
  )

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-rose-200"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            filter: 'blur(28px)',
          }}
          animate={{
            y: [0, -18, 4, 0],
            x: [0, p.xDrift, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
