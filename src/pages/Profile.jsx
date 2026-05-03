import GlassCard from '../components/Layout/GlassCard'
import HolographicAvatar from '../components/Avatar/HolographicAvatar'
import useGameStore, { PHASE_COLORS } from '../store/useGameStore'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'

export default function Profile() {
  const { totalXP, stats, userName, userGoal, bodyStats } = useGameStore()
  const level = useGameStore(s => s.getLevel())
  const rank = useGameStore(s => s.getRank())
  const phase = useGameStore(s => s.getPhase())
  const muscleScale = useGameStore(s => s.getMuscleScale())
  const phaseColor = useGameStore(s => s.getPhaseColor())
  const phaseData = useGameStore(s => s.getPhaseData())
  const resetAll = useGameStore(s => s.resetAll)

  const radarData = [
    { stat: 'STR', value: stats.str, fullMark: 99 },
    { stat: 'END', value: stats.end, fullMark: 99 },
    { stat: 'AGI', value: stats.agi, fullMark: 99 },
    { stat: 'VIT', value: stats.vit, fullMark: 99 },
  ]

  const milestones = [
    { xp: 500, label: 'First Level Up', icon: '⭐' },
    { xp: 1500, label: 'Getting Serious', icon: '🔥' },
    { xp: 3000, label: 'Shredded Phase', icon: '💪' },
    { xp: 5000, label: 'Halfway Legend', icon: '⚡' },
    { xp: 7000, label: 'Legendary Phase', icon: '👑' },
    { xp: 10000, label: 'Transcendent', icon: '🌟' },
  ]

  const goalLabels = { muscle_gain: '💪 Muscle Gain', fat_loss: '🔥 Fat Loss', endurance: '🏃 Endurance' }

  return (
    <div className="page-bg" style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      {/* Profile Header */}
      <GlassCard style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', border: `1px solid ${phaseColor}15` }}>
        <HolographicAvatar phase={phase} muscleScale={muscleScale} size={180} />
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{userName || 'Champion'}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            <span style={{ padding: '4px 12px', borderRadius: 20, background: `${phaseColor}15`, border: `1px solid ${phaseColor}33`, fontSize: 11, fontWeight: 600, color: phaseColor }}>
              {phaseData.name} Phase
            </span>
            <span style={{ padding: '4px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
              Level {level} • {rank}
            </span>
            <span style={{ padding: '4px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
              {goalLabels[userGoal] || '💪 Muscle Gain'}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Total XP', value: totalXP.toLocaleString(), color: phaseColor },
              { label: 'Height', value: `${bodyStats.height}cm`, color: 'rgba(255,255,255,0.6)' },
              { label: 'Weight', value: `${bodyStats.weight}kg`, color: 'rgba(255,255,255,0.6)' },
            ].map(s => (
              <div key={s.label}>
                <div className="label-text">{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {/* Radar Chart */}
        <GlassCard>
          <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>📊 Stat Radar</h2>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="stat" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
              <Radar name="Stats" dataKey="value" stroke={phaseColor} fill={phaseColor} fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Milestones */}
        <GlassCard>
          <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>🏆 Milestones</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {milestones.map(m => {
              const reached = totalXP >= m.xp
              return (
                <div key={m.xp} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: reached ? 1 : 0.35 }}>
                  <span style={{ fontSize: 18 }}>{reached ? m.icon : '🔒'}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{m.xp.toLocaleString()} XP</div>
                  </div>
                  {reached && <span style={{ color: '#00ff88', fontSize: 12, fontWeight: 700 }}>✓</span>}
                </div>
              )
            })}
          </div>
        </GlassCard>
      </div>

      {/* Reset */}
      <GlassCard style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 12 }}>Want to start fresh?</p>
        <button onClick={() => { if (confirm('Reset all progress? This cannot be undone!')) resetAll() }} aria-label="Reset all progress"
          style={{ padding: '10px 24px', borderRadius: 12, background: 'rgba(255,83,51,0.1)', border: '1px solid rgba(255,83,51,0.3)', color: '#ff5533', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          Reset All Progress
        </button>
      </GlassCard>
    </div>
  )
}
