import { useState } from 'react'
import { motion } from 'framer-motion'
import { chains } from '../data/portfolioData'
import { clipReveal, inView } from '../lib/motion'
export default function Skills() {
  const [on, setOn] = useState(null); const c = chains.find(x => x.id === on)
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-28">
      <motion.h2 {...inView} variants={clipReveal} className="text-4xl font-semibold sm:text-6xl">How it fits together</motion.h2>
      <p className="mt-4 max-w-lg text-mute">Hover, focus or tap a technology to see the chain it belongs to.</p>
      <div className="mt-14 space-y-10" onMouseLeave={() => setOn(null)}>
        {chains.map(ch => (
          <div key={ch.id} onMouseEnter={() => setOn(ch.id)} onFocus={() => setOn(ch.id)} onClick={() => setOn(ch.id)} className={`transition-opacity duration-500 ${on && on !== ch.id ? 'opacity-30' : ''}`}>
            <h3 className="mb-3 text-sm text-signal">{ch.label}</h3>
            <ul className="relative flex flex-wrap items-center gap-x-2 gap-y-3">
              {ch.nodes.map((n, i) => (
                <li key={n} className="flex items-center gap-2">
                  <button className={`rounded-full border px-4 py-2 text-sm transition-colors ${on === ch.id ? 'border-signal text-paper' : 'border-line text-mute'}`}>{n}</button>
                  {i < ch.nodes.length - 1 && <motion.span aria-hidden className="h-px w-6 origin-left bg-signal sm:w-10" animate={{ scaleX: on === ch.id ? 1 : 0.25, opacity: on === ch.id ? 1 : 0.4 }} transition={{ delay: i * 0.06 }} />}
                </li>))}
            </ul>
          </div>))}
      </div>
      <p aria-live="polite" className="mt-10 min-h-6 max-w-xl text-mute">{c?.note}</p>
    </section>
  )
}
