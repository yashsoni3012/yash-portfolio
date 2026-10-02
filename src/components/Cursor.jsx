import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
export default function Cursor() {
  const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 }), sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const [label, setLabel] = useState(''), [down, setDown] = useState(false)
  useEffect(() => {
    if (!fine) return
    document.documentElement.classList.add('has-cursor')
    const mv = e => { x.set(e.clientX); y.set(e.clientY); const t = e.target.closest?.('[data-cursor]'); setLabel(t ? t.dataset.cursor : e.target.closest?.('a,button,input') ? ' ' : '') }
    const d = () => setDown(true), u = () => setDown(false)
    addEventListener('pointermove', mv); addEventListener('pointerdown', d); addEventListener('pointerup', u)
    return () => { removeEventListener('pointermove', mv); removeEventListener('pointerdown', d); removeEventListener('pointerup', u); document.documentElement.classList.remove('has-cursor') }
  }, [fine, x, y])
  if (!fine) return null
  const big = label !== ''
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[100]">
      <motion.div animate={{ width: big ? 76 : down ? 8 : 12, height: big ? 76 : down ? 8 : 12 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/90 mix-blend-difference flex items-center justify-center text-[10px] font-mono tracking-widest text-ink">
        {big && label.trim()}
      </motion.div>
    </motion.div>
  )
}
