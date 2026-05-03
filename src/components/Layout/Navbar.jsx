import { NavLink, useLocation } from 'react-router-dom'
import useGameStore from '../../store/useGameStore'

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: '🎮' },
  { path: '/quests', label: 'Quests', icon: '⚔️' },
  { path: '/schedule', label: 'Schedule', icon: '📋' },
  { path: '/chat', label: 'AI Coach', icon: '🤖' },
  { path: '/vault', label: 'Vault', icon: '🔒' },
  { path: '/profile', label: 'Profile', icon: '👤' },
]

export default function Navbar() {
  const phaseColor = useGameStore(s => s.getPhaseColor())
  const totalXP = useGameStore(s => s.totalXP)
  const level = useGameStore(s => s.getLevel())
  const location = useLocation()

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(2,5,8,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
      }}>
        {/* Logo */}
        <NavLink to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: `linear-gradient(135deg, ${phaseColor}, ${phaseColor}66)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
            boxShadow: `0 0 15px ${phaseColor}44`,
          }}>
            ◆
          </div>
          <span style={{
            fontSize: 16, fontWeight: 700, color: '#fff',
            letterSpacing: '0.05em',
          }}>
            FitSphere<span style={{ color: phaseColor }}> AI</span>
          </span>
        </NavLink>

        {/* Nav Links (Desktop) */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
        }} className="desktop-nav">
          {NAV_ITEMS.map(item => {
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  padding: '8px 14px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 500,
                  color: isActive ? phaseColor : 'rgba(255,255,255,0.5)',
                  background: isActive ? `${phaseColor}12` : 'transparent',
                  border: isActive ? `1px solid ${phaseColor}22` : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
                aria-label={item.label}
              >
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            )
          })}
        </div>

        {/* XP Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            padding: '6px 14px',
            borderRadius: 20,
            background: `${phaseColor}15`,
            border: `1px solid ${phaseColor}33`,
            fontSize: 12,
            fontWeight: 600,
            color: phaseColor,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span style={{ fontSize: 14 }}>⚡</span>
            Lvl {level} • {totalXP.toLocaleString()} XP
          </div>
        </div>
      </div>
    </nav>
  )
}
