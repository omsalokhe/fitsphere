import useGameStore from '../../store/useGameStore'

export default function XPBar() {
  const totalXP = useGameStore(s => s.totalXP)
  const level = useGameStore(s => s.getLevel())
  const progress = useGameStore(s => s.getLevelProgress())
  const rank = useGameStore(s => s.getRank())
  const phaseColor = useGameStore(s => s.getPhaseColor())
  const nextLevelXP = level * 500

  return (
    <div className="glass-card" style={{ padding: '16px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${phaseColor}33, ${phaseColor}11)`,
            border: `1px solid ${phaseColor}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 800, color: phaseColor,
          }}>
            {level}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{rank}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
              {totalXP.toLocaleString()} XP total
            </div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
          {Math.round(progress)}% → Lvl {level + 1}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        width: '100%', height: 8, borderRadius: 4,
        background: 'rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
        <div className="progress-bar-fill" style={{
          width: `${progress}%`,
          height: '100%',
          borderRadius: 4,
          '--fill-start': phaseColor,
          '--fill-end': phaseColor + 'aa',
        }} />
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginTop: 6, fontSize: 10, color: 'rgba(255,255,255,0.3)',
      }}>
        <span>{(level - 1) * 500} XP</span>
        <span>{nextLevelXP} XP</span>
      </div>
    </div>
  )
}
