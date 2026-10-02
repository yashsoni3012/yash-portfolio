import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Copy, Download, Phone } from 'lucide-react'
import { person } from '../data/portfolioData'
import { clipReveal, inView } from '../lib/motion'
import Magnetic from '../components/Magnetic'
export default function Contact() {
  const [ok, setOk] = useState(false)
  const copy = async () => { try { await navigator.clipboard.writeText(person.email) } catch {} setOk(true); setTimeout(() => setOk(false), 1800) }
  return (
    <section id="contact" className="relative px-6 py-40 text-center">
      <motion.h2 {...inView} variants={clipReveal} className="mx-auto max-w-4xl text-5xl font-light sm:text-8xl">Let's build something meaningful.</motion.h2>
      <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
        <Magnetic><button onClick={copy} data-cursor="COPY" aria-live="polite" className="inline-flex min-w-64 items-center justify-center gap-2 rounded-full bg-signal px-7 py-4 font-medium text-ink">
          <AnimatePresence mode="wait" initial={false}><motion.span key={ok} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} className="inline-flex items-center gap-2">
            {ok ? <><Check size={16} />Copied</> : <><Copy size={16} />{person.email}</>}</motion.span></AnimatePresence></button></Magnetic>
        <Magnetic><a href={person.resume} download className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 hover:border-signal"><Download size={16} />Download resume</a></Magnetic>
      </div>
      <p className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-mute">
        <a className="hover:text-paper" href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a className="inline-flex items-center gap-1 hover:text-paper" href={`tel:${person.phone}`}><Phone size={14} />{person.phone}</a>
      </p>
      <footer className="mt-32 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-sm text-mute">
        <span>{person.name} · {person.title}</span><a href="#top" className="hover:text-paper">Back to top</a><span>© {new Date().getFullYear()}</span>
      </footer>
    </section>
  )
}
