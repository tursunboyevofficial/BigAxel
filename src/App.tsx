import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Loader } from '@/components/Loader'
import { Reveal } from '@/components/Reveal'
import { ScrollProgress } from '@/components/ScrollProgress'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Home } from '@/pages/Home'

// Route-based code splitting — only the homepage is in the initial bundle
const BranchDetail = lazy(() => import('@/pages/BranchDetail').then((m) => ({ default: m.BranchDetail })))
const CompaniesIndex = lazy(() => import('@/pages/CompaniesIndex').then((m) => ({ default: m.CompaniesIndex })))
const CompanyDetail = lazy(() => import('@/pages/CompanyDetail').then((m) => ({ default: m.CompanyDetail })))
const CareersApply = lazy(() => import('@/pages/CareersApply').then((m) => ({ default: m.CareersApply })))
const JobsIndex = lazy(() => import('@/pages/JobsIndex').then((m) => ({ default: m.JobsIndex })))
const JobDetail = lazy(() => import('@/pages/JobDetail').then((m) => ({ default: m.JobDetail })))
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))

const pageEase = [0.22, 1, 0.36, 1] as const

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

function RouteFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-32">
      <span className="h-6 w-6 rounded-full border-2 border-brand-line border-t-brand animate-spin" />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: pageEase } }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.25, ease: pageEase } }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/branches/:slug" element={<BranchDetail />} />
            <Route path="/companies" element={<CompaniesIndex />} />
            <Route path="/companies/:slug" element={<CompanyDetail />} />
            <Route path="/jobs" element={<JobsIndex />} />
            <Route path="/jobs/:slug" element={<JobDetail />} />
            <Route path="/careers/apply" element={<CareersApply />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Loader />
      <ScrollProgress />
      <SiteHeader />
      <main>
        <AnimatedRoutes />
      </main>
      <Reveal><SiteFooter /></Reveal>
    </BrowserRouter>
  )
}

export default App
