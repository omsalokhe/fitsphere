import { useState, useCallback } from 'react'
import { PHASE_COLORS } from '../../store/useGameStore'

export default function HolographicAvatar({ phase = 0, muscleScale = 1, size = 280, interactive = false, onTap }) {
  const [isPulsing, setIsPulsing] = useState(false)
  const p = PHASE_COLORS[phase]

  const bodyW = 44 + (muscleScale - 1) * 80
  const armW = 13 + (muscleScale - 1) * 30
  const chestW = bodyW * 1.12
  const absCount = 6

  const handleClick = useCallback(() => {
    if (!interactive) return
    setIsPulsing(true)
    onTap?.()
    setTimeout(() => setIsPulsing(false), 600)
  }, [interactive, onTap])

  const svgW = 120
  const svgH = 200
  const cx = svgW / 2

  return (
    <div
      onClick={handleClick}
      style={{
        width: size,
        height: size * 1.2,
        cursor: interactive ? 'pointer' : 'default',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className={interactive ? 'animate-breathe' : ''}
      role={interactive ? 'button' : undefined}
      aria-label={interactive ? 'Tap avatar for bonus XP' : `${p.name} phase avatar`}
    >
      {/* Glow aura behind avatar */}
      <div style={{
        position: 'absolute',
        width: '70%',
        height: '70%',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${p.color}20 0%, transparent 70%)`,
        filter: isPulsing ? `blur(30px) brightness(2)` : 'blur(25px)',
        transition: 'all 0.4s ease',
        zIndex: 0,
      }} />

      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width={size * 0.7}
        height={size * 1.05}
        style={{
          position: 'relative', zIndex: 1,
          filter: `drop-shadow(0 0 12px ${p.color}66)`,
          transition: 'all 0.4s ease',
          transform: isPulsing ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        <defs>
          <linearGradient id={`bodyGrad-${phase}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.skin} stopOpacity="0.9" />
            <stop offset="100%" stopColor={p.color} stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id={`pantGrad-${phase}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.pant} />
            <stop offset="100%" stopColor={p.pant} stopOpacity="0.7" />
          </linearGradient>
          <filter id={`glow-${phase}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Scan-line pattern */}
          <pattern id="scanlines" patternUnits="userSpaceOnUse" width="100" height="4">
            <rect width="100" height="2" fill="transparent" />
            <rect y="2" width="100" height="2" fill="rgba(255,255,255,0.04)" />
          </pattern>
        </defs>

        {/* Ground shadow */}
        <ellipse cx={cx} cy={188} rx={28} ry={5} fill={p.color} opacity="0.25" filter={`url(#glow-${phase})`} />

        {/* LEGS */}
        {/* Left leg */}
        <rect x={cx - bodyW/2 + 3} y={132} width={bodyW/2 - 6} height={48} rx={6}
          fill={`url(#pantGrad-${phase})`} />
        {/* Right leg */}
        <rect x={cx + 3} y={132} width={bodyW/2 - 6} height={48} rx={6}
          fill={`url(#pantGrad-${phase})`} />
        {/* Ankle cuffs */}
        <rect x={cx - bodyW/2 + 2} y={172} width={bodyW/2 - 4} height={6} rx={3}
          fill={p.color} opacity="0.5" />
        <rect x={cx + 2} y={172} width={bodyW/2 - 4} height={6} rx={3}
          fill={p.color} opacity="0.5" />

        {/* TORSO */}
        <rect x={cx - bodyW/2} y={70} width={bodyW} height={65} rx={8}
          fill={`url(#bodyGrad-${phase})`} stroke={p.color} strokeWidth="0.5" strokeOpacity="0.3" />

        {/* Chest / Pecs */}
        <ellipse cx={cx - bodyW/5} cy={82} rx={chestW/5} ry={6}
          fill={p.skin} opacity="0.4" />
        <ellipse cx={cx + bodyW/5} cy={82} rx={chestW/5} ry={6}
          fill={p.skin} opacity="0.4" />

        {/* Abs */}
        {Array.from({ length: absCount }).map((_, i) => {
          const row = Math.floor(i / 2)
          const col = i % 2
          const absX = cx + (col === 0 ? -6 : 3)
          const absY = 92 + row * 10
          return (
            <rect key={i} x={absX} y={absY} width={5} height={7} rx={2}
              fill={p.color} opacity={0.2 + (muscleScale - 1) * 3}
              filter={`url(#glow-${phase})`} />
          )
        })}

        {/* Scanline overlay on body */}
        <rect x={cx - bodyW/2} y={70} width={bodyW} height={65} rx={8}
          fill="url(#scanlines)" />

        {/* ARMS */}
        {/* Left arm */}
        <rect x={cx - bodyW/2 - armW} y={73} width={armW} height={44} rx={armW/2}
          fill={`url(#bodyGrad-${phase})`} stroke={p.color} strokeWidth="0.4" strokeOpacity="0.3" />
        {/* Right arm */}
        <rect x={cx + bodyW/2} y={73} width={armW} height={44} rx={armW/2}
          fill={`url(#bodyGrad-${phase})`} stroke={p.color} strokeWidth="0.4" strokeOpacity="0.3" />

        {/* NECK */}
        <rect x={cx - 5} y={58} width={10} height={14} rx={4}
          fill={p.skin} opacity="0.7" />

        {/* HEAD */}
        <ellipse cx={cx} cy={40} rx={18} ry={20}
          fill={p.skin} opacity="0.85" stroke={p.color} strokeWidth="0.5" strokeOpacity="0.3" />

        {/* Hair */}
        <path d={`M ${cx-16} 32 Q ${cx-14} 10, ${cx} 14 Q ${cx+5} 8, ${cx+8} 16 Q ${cx+12} 8, ${cx+16} 18 Q ${cx+18} 10, ${cx+17} 28`}
          fill={p.hair} opacity="0.9" />
        {/* Spiky top hair */}
        <path d={`M ${cx-10} 24 L ${cx-8} 10 L ${cx-4} 20 L ${cx} 6 L ${cx+4} 18 L ${cx+8} 8 L ${cx+10} 22`}
          fill={p.hair} opacity="0.85" />

        {/* EYES */}
        {/* Left eye */}
        <ellipse cx={cx - 7} cy={39} rx={4.5} ry={3.5} fill="#fff" opacity="0.95" />
        <circle cx={cx - 6.5} cy={39} r={2.2} fill={p.color} />
        <circle cx={cx - 6} cy={38.5} r={0.8} fill="#fff" />
        {/* Eye glow rim */}
        <ellipse cx={cx - 7} cy={39} rx={5} ry={4} fill="none" stroke={p.color} strokeWidth="0.5" opacity="0.6" />

        {/* Right eye */}
        <ellipse cx={cx + 7} cy={39} rx={4.5} ry={3.5} fill="#fff" opacity="0.95" />
        <circle cx={cx + 7.5} cy={39} r={2.2} fill={p.color} />
        <circle cx={cx + 8} cy={38.5} r={0.8} fill="#fff" />
        <ellipse cx={cx + 7} cy={39} rx={5} ry={4} fill="none" stroke={p.color} strokeWidth="0.5" opacity="0.6" />

        {/* Smile */}
        <path d={`M ${cx-5} 47 Q ${cx} 52, ${cx+5} 47`} fill="none" stroke={p.color} strokeWidth="0.8" opacity="0.5" />

        {/* Shoes */}
        <ellipse cx={cx - bodyW/4 + 1} cy={182} rx={8} ry={4} fill={p.pant} opacity="0.9" />
        <ellipse cx={cx + bodyW/4 - 1} cy={182} rx={8} ry={4} fill={p.pant} opacity="0.9" />
      </svg>

      {/* Phase flash overlay on pulse */}
      {isPulsing && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${p.color}40 0%, transparent 70%)`,
          animation: 'phaseFlash 0.6s ease-out forwards',
          zIndex: 2,
        }} />
      )}
    </div>
  )
}
