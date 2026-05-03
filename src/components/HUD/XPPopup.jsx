import useGameStore from '../../store/useGameStore'

export default function XPPopup() {
  const xpPopups = useGameStore(s => s.xpPopups)

  return (
    <div style={{
      position: 'fixed',
      top: 80,
      right: 30,
      zIndex: 9999,
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    }}>
      {xpPopups.map(popup => (
        <div
          key={popup.id}
          className="animate-xp-popup"
          style={{
            padding: '8px 16px',
            borderRadius: 12,
            background: 'rgba(0,229,255,0.15)',
            border: '1px solid rgba(0,229,255,0.3)',
            backdropFilter: 'blur(10px)',
            fontSize: 14,
            fontWeight: 700,
            color: '#00e5ff',
            textShadow: '0 0 10px rgba(0,229,255,0.5)',
            whiteSpace: 'nowrap',
          }}
        >
          +{popup.amount} XP
          {popup.source && (
            <span style={{ fontSize: 10, marginLeft: 6, opacity: 0.7 }}>
              {popup.source}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
