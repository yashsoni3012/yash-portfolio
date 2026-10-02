import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { projects } from '../data/portfolioData'
import { fadeUp, clipReveal, stagger, inView, spring } from '../lib/motion'
export default function Projects() {
  const [open, setOpen] = useState(null); const p = projects.find(x => x.id === open)
  useEffect(() => {
    if (!open) return
    const k = e => e.key === 'Escape' && setOpen(null); addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [open])
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <motion.h2 {...inView} variants={clipReveal} className="text-4xl font-semibold sm:text-6xl">Things I've built</motion.h2>
      <p className="mt-4 max-w-lg text-mute">Production and freelance applications. Select one to see my contribution.</p>
      <LayoutGroup>
        <motion.ul {...inView} variants={stagger(0.1)} className="mt-14 divide-y divide-line border-y border-line">
          {projects.map(x => (
            <motion.li key={x.id} variants={fadeUp}>
              <motion.button layoutId={`p-${x.id}`} data-cursor="OPEN" onClick={() => setOpen(x.id)} whileHover={{ x: 12 }} transition={spring}
                className="group grid w-full gap-2 py-8 text-left sm:grid-cols-[1.2fr_1fr_auto] sm:items-center">
                <motion.span layoutId={`t-${x.id}`} className="text-3xl font-medium sm:text-5xl">{x.name}</motion.span>
                <span className="text-mute">{x.kind}</span>
                <ArrowUpRight className="hidden text-line transition group-hover:text-signal sm:block" />
              </motion.button>
            </motion.li>))}
        </motion.ul>
        <AnimatePresence>
          {p && (
            <div className="fixed inset-0 z-[60] overflow-y-auto" role="dialog" aria-modal="true" aria-label={p.name}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} className="fixed inset-0 bg-ink/90 backdrop-blur" />
              <motion.div layoutId={`p-${p.id}`} className="relative mx-auto my-10 max-w-3xl rounded-2xl border border-line bg-deep p-8 sm:p-12" transition={spring}>
                <button autoFocus onClick={() => setOpen(null)} aria-label="Close project" data-cursor="CLOSE" className="absolute right-5 top-5 rounded-full border border-line p-2"><X size={18} /></button>
                <motion.h3 layoutId={`t-${p.id}`} className="pr-10 text-4xl font-semibold sm:text-6xl">{p.name}</motion.h3>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }} className="mt-6 space-y-8">
                  <p className="text-lg text-paper/90">{p.blurb}</p>
                  <div><h4 className="text-sm text-signal">My contribution</h4><p className="mt-1 text-sm text-mute">{p.role}</p><p className="mt-2 text-mute">{p.did}</p></div>
                  <ul className="flex flex-wrap gap-2" aria-label="Technologies">{p.tech.map(t => <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs">{t}</li>)}</ul>
                  <div className="flex flex-wrap gap-3">{p.links.map(([l, u]) => <a key={u} href={u} target="_blank" rel="noopener noreferrer" data-cursor="VISIT" className="inline-flex items-center gap-1 rounded-full bg-signal px-4 py-2 text-sm font-medium text-ink">{l}<ArrowUpRight size={14} /></a>)}</div>
                </motion.div>
              </motion.div>
            </div>)}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  )
}
