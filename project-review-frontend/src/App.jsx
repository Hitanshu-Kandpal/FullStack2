import { BrowserRouter, Routes, Route } from 'react-router-dom'

import TopNav from './components/TopNav.jsx'
import SubmitPage from './pages/SubmitPage.jsx'
import MyProjectsPage from './pages/MyProjectsPage.jsx'
import AllProjectsPage from './pages/AllProjectsPage.jsx'
import ReviewPage from './pages/ReviewPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <TopNav />
        <main className="container">
          <Routes>
            <Route path="/" element={<SubmitPage />} />
            <Route path="/my" element={<MyProjectsPage />} />
            <Route path="/all" element={<AllProjectsPage />} />
            <Route path="/review/:id" element={<ReviewPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

