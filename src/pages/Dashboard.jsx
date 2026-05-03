import AvatarPhaseDisplay from '../components/Avatar/AvatarPhaseDisplay'
import XPBar from '../components/HUD/XPBar'
import StatsPanel from '../components/HUD/StatsPanel'
import GlassCard from '../components/Layout/GlassCard'
import useGameStore from '../store/useGameStore'

export default function Dashboard() {
  const logWorkout = useGameStore(s => s.logWorkout)
  const logMeal = useGameStore(s => s.logMeal)
  const logSleep = useGameStore(s => s.logSleep)
  const phaseColor = useGameStore(s => s.getPhaseColor())
  const phaseData = useGameStore(s => s.getPhaseData())
  const totalXP = useGameStore(s => s.totalXP)
  const userName = useGameStore(s => s.userName)

  const quickActions = [
    { label: 'Log Workout', icon: '🏋️', action: logWorkout, color: '#ff5533', xp: '+250 XP' },
    { label: 'Log Meal', icon: '🥗', action: logMeal, color: '#00ff88', xp: '+120 XP' },
    { label: 'Log Sleep', icon: '😴', action: logSleep, color: '#00d4ff', xp: '+120 XP' },
  ]

  return (
    <div className="page-bg" style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          fontSize: 28, fontWeight: 700, letterSpacing: '0.02em',
          marginBottom: 4,
        }}>
          {userName ? `Welcome back, ${userName}` : 'Command Center'} <span style={{ fontSize: 24 }}>⚡</span>
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
          Phase: <span style={{ color: phaseColor, fontWeight: 600 }}>{phaseData.name}</span> • {totalXP.toLocaleString()} XP earned
        </p>
      </div>

      {/* Avatar Display */}
      <GlassCard style={{
        marginBottom: 20,
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${phaseColor}15`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${phaseColor}08, transparent 70%)`,
        }} />
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <span className="label-text" style={{ color: phaseColor }}>
            TAP YOUR AVATAR FOR +50 XP
          </span>
        </div>
        <AvatarPhaseDisplay />
      </GlassCard>

      {/* XP Bar */}
      <div style={{ marginBottom: 20 }}>
        <XPBar />
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        marginBottom: 20,
      }}>
        {quickActions.map(action => (
          <button
            key={action.label}
            onClick={action.action}
            aria-label={action.label}
            style={{
              padding: '18px 16px',
              borderRadius: 14,
              background: `${action.color}08`,
              border: `1px solid ${action.color}22`,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.3s ease',
              color: '#fff',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${action.color}18`
              e.currentTarget.style.borderColor = `${action.color}44`
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = `0 8px 20px ${action.color}22`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `${action.color}08`
              e.currentTarget.style.borderColor = `${action.color}22`
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span style={{ fontSize: 28 }}>{action.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 600 }}>{action.label}</span>
            <span style={{
              fontSize: 10, color: action.color, fontWeight: 700,
              padding: '2px 8px', borderRadius: 8,
              background: `${action.color}15`,
            }}>
              {action.xp}
            </span>
          </button>
        ))}
      </div>

      {/* Stats Panel */}
      <div style={{ marginBottom: 6 }}>
        <h2 style={{
          fontSize: 16, fontWeight: 600, marginBottom: 12,
          letterSpacing: '0.03em',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span>⚙️</span> RPG Stats
        </h2>
        <StatsPanel />
      </div>
    </div>
  )
}
