import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Music2, VolumeX } from 'lucide-react'

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    const audio = new Audio('/music.mp3')
    audio.loop = true
    audio.volume = 0.35
    audio.addEventListener('canplaythrough', () => setAvailable(true))
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  return (
    <motion.button
      onClick={toggle}
      title={playing ? 'Pause music' : 'Play ambient music'}
      className="fixed right-5 top-5 z-50 glass rounded-full p-3.5 shadow-card transition"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.6 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      {playing ? (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        >
          <Music2 size={17} className="text-rose-400" />
        </motion.div>
      ) : (
        <VolumeX size={17} className="text-neutral-400" />
      )}
    </motion.button>
  )
}
