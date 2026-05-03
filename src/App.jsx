import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import BottomNav from './components/Layout/BottomNav'
import XPPopup from './components/HUD/XPPopup'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Quests from './pages/Quests'
import Schedule from './pages/Schedule'
import Chat from './pages/Chat'
import Vault from './pages/Vault'
import Profile from './pages/Profile'
import { useLocation } from 'react-router-dom'

function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingBottom: 80 }}>
        {children}
      </main>
      <BottomNav />
    </>
  )
}

export default function App() {
  const location = useLocation()
  const noNavRoutes = ['/', '/onboarding']
  const showNav = !noNavRoutes.includes(location.pathname)

  return (
    <>
      <XPPopup />
      {showNav ? (
        <AppLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </AppLayout>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  )
}
