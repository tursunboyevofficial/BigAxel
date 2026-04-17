import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
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
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))

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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Loader />
      <ScrollProgress />
      <SiteHeader />
      <main>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/branches/:slug" element={<BranchDetail />} />
            <Route path="/companies" element={<CompaniesIndex />} />
            <Route path="/companies/:slug" element={<CompanyDetail />} />
            <Route path="/careers/apply" element={<CareersApply />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Reveal><SiteFooter /></Reveal>
    </BrowserRouter>
  )
}

export default App
