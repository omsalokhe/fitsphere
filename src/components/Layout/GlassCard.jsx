export default function GlassCard({ children, style, className = '', glow, onClick, ariaLabel }) {
  return (
    <div
      className={`glass-card ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={ariaLabel}
      style={{
        padding: 20,
        ...(glow ? { boxShadow: `0 0 20px ${glow}33, 0 0 40px ${glow}11` } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
