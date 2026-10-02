import { motion } from 'framer-motion'
import { person, pillars } from '../data/portfolioData'
import { fadeUp, clipReveal, stagger, inView } from '../lib/motion'
export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-32">
      <motion.h2 {...inView} variants={clipReveal} className="max-w-3xl text-4xl font-light leading-tight sm:text-6xl">
        I turn <b className="font-semibold text-signal">React</b> and <b className="font-semibold text-signal">APIs</b> into interfaces people can run a business on.
      </motion.h2>
      <motion.dl {...inView} variants={stagger(0.12)} className="mt-16 grid gap-10 sm:grid-cols-2">
        {pillars.map(([t, d]) => <motion.div key={t} variants={fadeUp} className="border-t border-line pt-4"><dt className="text-sm text-signal">{t}</dt><dd className="mt-2 max-w-sm text-mute">{d}</dd></motion.div>)}
      </motion.dl>
      <p className="mt-12 text-sm text-mute">{person.seeking} Languages: {person.languages}.</p>
    </section>
  )
}
