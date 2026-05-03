import { NavLink, useLocation } from 'react-router-dom'
import useGameStore from '../../store/useGameStore'

const ITEMS = [
  { path: '/dashboard', label: 'Home', icon: '🎮' },
  { path: '/quests', label: 'Quests', icon: '⚔️' },
  { path: '/chat', label: 'Coach', icon: '🤖' },
  { path: '/vault', label: 'Vault', icon: '🔒' },
  { path: '/profile', label: 'Profile', icon: '👤' },
]

export default function BottomNav() {
  const phaseColor = useGameStore(s => s.getPhaseColor())
  const location = useLocation()

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(2,5,8,0.92)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '6px 0 env(safe-area-inset-bottom, 6px)',
      display: 'none',
    }} className="mobile-bottom-nav">
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        maxWidth: 500,
        margin: '0 auto',
      }}>
        {ITEMS.map(item => {
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: '4px 12px',
                borderRadius: 12,
                color: isActive ? phaseColor : 'rgba(255,255,255,0.4)',
                transition: 'all 0.2s ease',
              }}
              aria-label={item.label}
            >
              <span style={{
                fontSize: 20,
                filter: isActive ? `drop-shadow(0 0 6px ${phaseColor})` : 'none',
              }}>
                {item.icon}
              </span>
              <span style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {item.label}
              </span>
              {isActive && (
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: phaseColor,
                  boxShadow: `0 0 8px ${phaseColor}`,
                  marginTop: 1,
                }} />
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
