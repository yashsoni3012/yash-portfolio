// import { useRef } from 'react'
// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
// import { ArrowDown } from 'lucide-react'
// import { person } from '../data/portfolioData'
// import { ease } from '../lib/motion'
// import Magnetic from '../components/Magnetic'

// // Modules named in the resume's Kevelion vendor/admin dashboard description (no invented data)
// const nav = ['Products', 'Inventory', 'Buyers', 'Orders', 'Complaints', 'Subscription']
// const step = (d) => ({ initial: { opacity: 0, y: 28, filter: 'blur(8px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { duration: 0.9, delay: d, ease } })

// // One layout rendered twice: as a dashed blueprint, then as the built interface
// function Dash({ built }) {
//   const box = built ? 'border-line bg-deep' : 'border-dashed border-mute/40'
//   const bar = built ? 'bg-line' : 'border border-dashed border-mute/30'
//   return (
//     <div className="flex h-full gap-3 p-4 text-[10px] sm:p-5 sm:text-xs">
//       <div className={`w-[28%] space-y-1.5 rounded-lg border p-2 ${box}`}>
//         <p className="px-1 pb-1 font-mono text-mute">{built ? 'Vendor' : 'sidebar · role-based'}</p>
//         {nav.map((n, i) => (
//           <div key={n} className={`rounded px-2 py-1.5 ${built ? (i === 3 ? 'bg-signal font-medium text-ink' : 'text-paper/80') : 'border border-dashed border-mute/30 font-mono text-mute'}`}>{n}</div>))}
//       </div>
//       <div className="flex flex-1 flex-col gap-3">
//         <div className={`flex items-center justify-between rounded-lg border px-3 py-2 ${box}`}>
//           <span className={built ? 'font-medium' : 'font-mono text-mute'}>{built ? 'Orders' : 'header · search'}</span>
//           <span className={`h-3 w-1/3 rounded ${bar}`} />
//         </div>
//         <div className={`flex-1 space-y-2 rounded-lg border p-3 ${box}`}>
//           {!built && <p className="font-mono text-mute">table · filters · TanStack Query</p>}
//           {[0, 1, 2, 3].map(r => (
//             <div key={r} className="flex items-center gap-2">
//               <span className={`h-3 flex-1 rounded ${bar}`} />
//               <span className={`h-3 w-1/5 rounded ${bar}`} />
//               <span className={`h-4 w-10 rounded-full ${built ? (r % 2 ? 'bg-ember/80' : 'bg-signal/80') : 'border border-dashed border-mute/30'}`} />
//             </div>))}
//         </div>
//         <div className="flex justify-end gap-1.5">
//           {[0, 1, 2].map(i => <span key={i} className={`h-5 w-5 rounded ${built ? (i === 0 ? 'bg-signal' : 'bg-line') : 'border border-dashed border-mute/30'}`} />)}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function Hero() {
//   const box = useRef(null)
//   const pct = useSpring(useMotionValue(55), { stiffness: 120, damping: 20 })
//   const clip = useTransform(pct, v => `inset(0 0 0 ${v}%)`), line = useTransform(pct, v => `${v}%`)
//   const move = e => { const r = box.current.getBoundingClientRect(); pct.set(Math.min(95, Math.max(5, ((e.clientX - r.left) / r.width) * 100))) }
//   return (
//     <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
//       <div className="grid-bg absolute inset-0" aria-hidden />
//       <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
//         <div>
//           <motion.p {...step(0.3)} className="font-mono text-sm text-signal">{person.location}</motion.p>
//           <h1 className="mt-4 text-6xl font-semibold leading-[0.95] tracking-tight sm:text-8xl">
//             {person.name.split(' ').map((w, i) => (
//               <span key={w} className="block overflow-hidden pb-2"><motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.5 + i * 0.12, ease }}>{w}</motion.span></span>))}
//           </h1>
//           <motion.p {...step(0.9)} className="mt-6 text-2xl font-light text-paper/90">{person.title}, with a React.js focus</motion.p>
//           <motion.p {...step(1.1)} className="mt-4 max-w-md text-mute">{person.summary}</motion.p>
//           <motion.div {...step(1.4)} className="mt-9 flex flex-wrap gap-4">
//             <Magnetic><a data-cursor="VIEW" href="#projects" className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-medium text-ink">See my work <ArrowDown size={16} /></a></Magnetic>
//             <Magnetic><a href="#contact" className="inline-flex rounded-full border border-line px-6 py-3 hover:border-signal">Get in touch</a></Magnetic>
//           </motion.div>
//         </div>
//         <motion.figure {...step(1.6)} className="m-0">
//           <div ref={box} onPointerMove={move} onPointerLeave={() => pct.set(55)} data-cursor="DRAG" role="img" aria-label="Interactive illustration: a dashboard blueprint on the left becomes the finished interface on the right"
//             className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-xl border border-line bg-deep">
//             <div className="absolute inset-0" aria-hidden><Dash built={false} /></div>
//             <motion.div style={{ clipPath: clip }} className="absolute inset-0 bg-ink" aria-hidden><Dash built /></motion.div>
//             <motion.div style={{ left: line }} className="absolute inset-y-0 w-px bg-signal" aria-hidden />
//             <label className="sr-only">Blueprint to interface<input type="range" min="5" max="95" defaultValue="55" onChange={e => pct.set(+e.target.value)} /></label>
//           </div>
//           <figcaption className="mt-3 font-mono text-xs text-mute">Blueprint → interface. Illustrative layout based on the vendor dashboards I build.</figcaption>
//         </motion.figure>
//       </div>
//     </section>
//   )
// }

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, Check } from 'lucide-react'
import { person } from '../data/portfolioData'
import { ease } from '../lib/motion'
import Magnetic from '../components/Magnetic'

// Plain-language view of real projects from the resume (nothing invented)
const stories = [
  { id: 'shop', who: 'A shop owner', project: 'Kevelion', need: 'Run an online store from one screen.',
    does: ['Add and update products', 'Keep track of stock', 'See buyers and their orders', 'Handle customer complaints'] },
  { id: 'hiring', who: 'A recruiter', project: 'Hire Me Jobs', need: 'Hire people without losing track of anyone.',
    does: ['Post and manage jobs', 'Review candidates', 'Follow every application', 'Search and filter long lists'] },
  { id: 'firm', who: 'An accounting firm', project: 'CA Management System', need: 'Keep clients and their paperwork in one place.',
    does: ['Separate access for admin, staff and clients', 'Manage tasks', 'Store GST, TDS and KYC documents', 'Handle invoices'] },
  { id: 'ngo', who: 'A community foundation', project: 'Gram Ekta Foundation', need: 'Show its work and keep the website current.',
    does: ['Present programs in education and clean water', 'Present farmer empowerment initiatives', 'Update content from an admin panel'] },
  { id: 'taxi', who: 'A taxi service', project: 'Only Meter India', need: 'Tell riders about the service and its app.',
    does: ['Explain services and app features', 'Show ride booking information', 'Work on phones and desktops'] },
]
const step = (d) => ({ initial: { opacity: 0, y: 28, filter: 'blur(8px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { duration: 0.9, delay: d, ease } })

function Stories() {
  const [i, setI] = useState(0)
  const s = stories[i]
  return (
    <div>
      <div role="tablist" aria-label="Who I build for" className="flex flex-wrap gap-2">
        {stories.map((x, n) => (
          <button key={x.id} role="tab" aria-selected={n === i} aria-controls="story-panel" id={`tab-${x.id}`} onClick={() => setI(n)} data-cursor="PICK"
            className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${n === i ? 'border-signal text-ink' : 'border-line text-mute hover:text-paper'}`}>
            {n === i && <motion.span layoutId="story-pill" className="absolute inset-0 rounded-full bg-signal" transition={{ type: 'spring', stiffness: 300, damping: 28 }} />}
            <span className="relative">{x.who}</span>
          </button>))}
      </div>
      <div id="story-panel" role="tabpanel" aria-labelledby={`tab-${s.id}`} className="mt-5 min-h-[21rem] rounded-xl border border-line bg-deep p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div key={s.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease }}>
            <p className="text-sm text-mute">{s.who} needs to</p>
            <p className="mt-1 text-2xl font-medium leading-snug sm:text-3xl">{s.need}</p>
            <p className="mt-6 text-sm text-signal">What I helped build for them</p>
            <ul className="mt-3 space-y-3">
              {s.does.map((d, n) => (
                <motion.li key={d} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + n * 0.1, ease }} className="flex items-start gap-3 text-paper/90">
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.25 + n * 0.1, type: 'spring', stiffness: 400, damping: 15 }}
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-ink"><Check size={13} strokeWidth={3} /></motion.span>
                  {d}
                </motion.li>))}
            </ul>
            <a href="#projects" data-cursor="VIEW" className="mt-7 inline-block text-sm text-mute underline decoration-line underline-offset-4 hover:text-paper">See the project: {s.project}</a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.p {...step(0.3)} className="font-mono text-sm text-signal">{person.location}</motion.p>
          <h1 className="mt-4 text-6xl font-semibold leading-[0.95] tracking-tight sm:text-8xl">
            {person.name.split(' ').map((w, i) => (
              <span key={w} className="block overflow-hidden pb-2"><motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.5 + i * 0.12, ease }}>{w}</motion.span></span>))}
          </h1>
          <motion.p {...step(0.9)} className="mt-6 text-2xl font-light text-paper/90">{person.title}, with a React.js focus</motion.p>
          <motion.p {...step(1.1)} className="mt-4 max-w-md text-mute">{person.summary}</motion.p>
          <motion.div {...step(1.4)} className="mt-9 flex flex-wrap gap-4">
            <Magnetic><a data-cursor="VIEW" href="#projects" className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-medium text-ink">See my work <ArrowDown size={16} /></a></Magnetic>
            <Magnetic><a href="#contact" className="inline-flex rounded-full border border-line px-6 py-3 hover:border-signal">Get in touch</a></Magnetic>
          </motion.div>
        </div>
        <motion.div {...step(1.6)}><Stories /></motion.div>
      </div>  
    </section>
  )
}