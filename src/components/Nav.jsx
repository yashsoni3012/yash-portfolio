import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
const links = [['about', 'About'], ['projects', 'Projects'], ['experience', 'Experience'], ['stack', 'Stack'], ['contact', 'Contact']]
export default function Nav() {
  const { scrollYProgress } = useScroll(); const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [active, setActive] = useState(''), [open, setOpen] = useState(false), [solid, setSolid] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    links.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    const s = () => setSolid(scrollY > 40); s(); addEventListener('scroll', s, { passive: true })
    return () => { io.disconnect(); removeEventListener('scroll', s) }
  }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? 'bg-ink/80 backdrop-blur-md' : ''}`}>
      <motion.div style={{ scaleX: bar }} className="absolute bottom-0 left-0 h-px w-full origin-left bg-signal" />
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm">yr</a>
          {/* <span className="text-signal">/</span>dev */}
        <ul className="hidden gap-8 md:flex">
          {links.map(([id, l]) => (
            <li key={id} className="relative">
              <a href={`#${id}`} className={`text-sm transition-colors ${active === id ? 'text-paper' : 'text-mute hover:text-paper'}`}>{l}</a>
              {active === id && <motion.span layoutId="dot" className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-signal" />}
            </li>))}
        </ul>
        <button className="md:hidden" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07 } } }} className="flex h-[calc(100dvh-60px)] flex-col justify-center gap-6 px-6 md:hidden">
          {links.map(([id, l]) => (
            <motion.li key={id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <a href={`#${id}`} onClick={() => setOpen(false)} className="text-5xl font-light">{l}</a>
            </motion.li>))}
        </motion.ul>)}
    </header>
  )
}
