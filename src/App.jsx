import { lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import Hero from './sections/Hero'
import About from './sections/About'
const Projects = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const Skills = lazy(() => import('./sections/Skills'))
const Contact = lazy(() => import('./sections/Contact'))
export default function App() {
  return (<><Cursor /><Nav /><main><Hero /><About /><Suspense fallback={null}><Projects /><Experience /><Skills /><Contact /></Suspense></main></>)
}
