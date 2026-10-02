export const ease = [0.22, 1, 0.36, 1]
export const spring = { type: 'spring', stiffness: 180, damping: 22 }
export const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }
export const clipReveal = { hidden: { clipPath: 'inset(0 0 100% 0)', y: 30 }, show: { clipPath: 'inset(0 0 0% 0)', y: 0, transition: { duration: 0.9, ease } } }
export const stagger = (s = 0.08, d = 0) => ({ hidden: {}, show: { transition: { staggerChildren: s, delayChildren: d } } })
export const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-12% 0px' } }
