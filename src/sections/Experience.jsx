import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience } from '../data/portfolioData'
import { fadeUp, clipReveal, stagger, inView } from '../lib/motion'
export default function Experience() {
  const ref = useRef(null); const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] }); const h = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-28">
      <motion.h2 {...inView} variants={clipReveal} className="text-4xl font-semibold sm:text-6xl">Experience</motion.h2>
      <div ref={ref} className="relative mt-16 pl-8 sm:pl-12">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line" aria-hidden><motion.div style={{ scaleY: h }} className="h-full origin-top bg-signal" /></div>
        {experience.map(e => (
          <motion.article key={e.role} {...inView} variants={stagger(0.12)} className="relative pb-16 last:pb-0">
            <motion.span variants={{ hidden: { scale: 0 }, show: { scale: 1 } }} className="absolute -left-8 top-2 h-[15px] w-[15px] rounded-full border-2 border-signal bg-ink sm:-left-12" aria-hidden />
            <motion.p variants={fadeUp} className="font-mono text-sm text-signal">{e.when}</motion.p>
            <motion.h3 variants={fadeUp} className="mt-2 text-3xl font-medium">{e.role}</motion.h3>
            <motion.p variants={fadeUp} className="text-mute">{e.org}</motion.p>
            <ul className="mt-5 space-y-3">{e.points.map(p => <motion.li key={p} variants={fadeUp} className="max-w-2xl text-paper/80">{p}</motion.li>)}</ul>
          </motion.article>))}
      </div>
    </section>
  )
}
