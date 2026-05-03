import HolographicAvatar from './HolographicAvatar'
import useGameStore, { PHASE_COLORS } from '../../store/useGameStore'

export default function AvatarPhaseDisplay() {
  const totalXP = useGameStore(s => s.totalXP)
  const addXP = useGameStore(s => s.addXP)
  const currentPhase = useGameStore(s => s.getPhase())
  const muscleScale = useGameStore(s => s.getMuscleScale())

  const phases = [
    { phase: 0, threshold: 0 },
    { phase: 1, threshold: 3000 },
    { phase: 2, threshold: 7000 },
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, padding: '20px 0' }}>
      {phases.map(({ phase, threshold }) => {
        const isActive = phase === currentPhase
        const isLocked = totalXP < threshold
        const p = PHASE_COLORS[phase]

        return (
          <div key={phase} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            position: 'relative',
            transition: 'all 0.4s ease',
            transform: isActive ? 'scale(1.08)' : 'scale(0.85)',
            opacity: isLocked ? 0.35 : 1,
            filter: isLocked ? 'grayscale(0.5)' : 'none',
          }}>
            <HolographicAvatar
              phase={phase}
              muscleScale={isActive ? muscleScale : 1 + phase * 0.04}
              size={isActive ? 260 : 180}
              interactive={isActive}
              onTap={() => addXP(50, 'Avatar Tap')}
            />

            {/* Phase name badge */}
            <div style={{
              padding: '4px 14px',
              borderRadius: 20,
              background: isActive ? `${p.color}22` : 'rgba(255,255,255,0.05)',
              border: `1px solid ${isActive ? p.color + '44' : 'rgba(255,255,255,0.1)'}`,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: isActive ? p.color : 'rgba(255,255,255,0.4)',
              boxShadow: isActive ? `0 0 15px ${p.color}33` : 'none',
              transition: 'all 0.4s ease',
            }}>
              {p.name}
            </div>

            {/* Lock overlay */}
            {isLocked && (
              <div style={{
                position: 'absolute',
                top: '40%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}>
                <span style={{ fontSize: 28 }}>🔒</span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: '0.05em',
                }}>
                  {(threshold - totalXP).toLocaleString()} XP
                </span>
              </div>
            )}

            {/* Active indicator */}
            {isActive && (
              <div style={{
                fontSize: 10,
                color: p.color,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                ▲ ACTIVE
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
