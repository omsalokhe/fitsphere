const STAT_CONFIG = {
  str: { name: 'Strength', color: '#ff5533', icon: '⚔️' },
  end: { name: 'Endurance', color: '#00d4ff', icon: '🛡️' },
  agi: { name: 'Agility', color: '#ffd700', icon: '⚡' },
  vit: { name: 'Vitality', color: '#00ff88', icon: '💚' },
}

export default function StatCard({ stat, value, onTrain }) {
  const config = STAT_CONFIG[stat]
  const pct = (value / 99) * 100

  return (
    <div className="glass-card glass-card-hover" style={{
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: -20, right: -20,
        width: 80, height: 80,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${config.color}15, transparent)`,
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>{config.icon}</span>
          <div>
            <div style={{
              fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: config.color,
            }}>
              {stat.toUpperCase()}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
              {config.name}
            </div>
          </div>
        </div>
        <div style={{
          fontSize: 24, fontWeight: 800, color: config.color,
          textShadow: `0 0 15px ${config.color}50`,
        }}>
          {value}
        </div>
      </div>

      {/* Stat bar */}
      <div style={{
        width: '100%', height: 4, borderRadius: 2,
        background: 'rgba(255,255,255,0.06)',
      }}>
        <div style={{
          width: `${pct}%`, height: '100%', borderRadius: 2,
          background: `linear-gradient(90deg, ${config.color}, ${config.color}88)`,
          transition: 'width 0.5s ease',
        }} />
      </div>

      {onTrain && (
        <button
          onClick={onTrain}
          aria-label={`Train ${config.name}`}
          style={{
            padding: '6px 12px',
            borderRadius: 8,
            background: `${config.color}15`,
            border: `1px solid ${config.color}33`,
            color: config.color,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.05em',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textTransform: 'uppercase',
          }}
          onMouseEnter={e => {
            e.target.style.background = `${config.color}25`
            e.target.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.target.style.background = `${config.color}15`
            e.target.style.transform = 'translateY(0)'
          }}
        >
          Train +60 XP
        </button>
      )}
    </div>
  )
}
