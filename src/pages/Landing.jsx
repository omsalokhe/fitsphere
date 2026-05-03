import { useNavigate } from 'react-router-dom'
import HolographicAvatar from '../components/Avatar/HolographicAvatar'

export default function Landing() {
  const navigate = useNavigate()

  const features = [
    { icon: '🎮', title: 'RPG Progression', desc: 'Earn XP, level up, and watch your avatar evolve through 3 epic phases' },
    { icon: '🤖', title: 'AI Coach', desc: 'Get personalized workout and nutrition advice from your AI wellness assistant' },
    { icon: '⚔️', title: 'Daily Quests', desc: 'Complete challenges to boost stats and unlock achievements' },
    { icon: '🔒', title: 'Health Vault', desc: 'Store medical records with end-to-end encryption' },
    { icon: '📋', title: 'Smart Schedule', desc: 'AI-generated weekly workout and meal plans tailored to your goals' },
    { icon: '📊', title: 'Stat Tracking', desc: 'Monitor STR, END, AGI, VIT stats and track your fitness journey' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#020508', overflow: 'hidden' }}>
      {/* Hero */}
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Background effects */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 20%, rgba(0,229,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(124,77,255,0.06) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: '10%', left: '15%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(0,229,255,0.03)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: 250, height: 250, borderRadius: '50%', background: 'rgba(124,77,255,0.04)', filter: 'blur(60px)' }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '40px 24px', maxWidth: 900 }}>
          {/* Logo */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32, padding: '8px 20px', borderRadius: 30, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #00e5ff, #7c4dff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>◆</div>
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}>FitSphere <span style={{ color: '#00e5ff' }}>AI</span></span>
          </div>

          <h1 style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
            Level Up Your<br /><span style={{ background: 'linear-gradient(135deg, #00e5ff, #7c4dff, #ffd600)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Body & Mind</span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.6 }}>
            The gamified wellness ecosystem where your real-world fitness transforms a holographic avatar through RPG progression.
          </p>

          {/* Avatar showcase */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 40 }}>
            {[0, 1, 2].map(phase => (
              <div key={phase} className="animate-float" style={{ animationDelay: `${phase * 0.3}s` }}>
                <HolographicAvatar phase={phase} muscleScale={1 + phase * 0.04} size={140 + phase * 20} />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/onboarding')} style={{ padding: '16px 36px', borderRadius: 14, background: 'linear-gradient(135deg, #00e5ff, #7c4dff)', border: 'none', color: '#000', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,229,255,0.3)', transition: 'all 0.3s ease', letterSpacing: '0.02em' }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 30px rgba(0,229,255,0.4)' }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(0,229,255,0.3)' }}>
              Start Your Journey ⚡
            </button>
            <button onClick={() => navigate('/dashboard')} style={{ padding: '16px 36px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.04)' }}>
              Explore Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>Everything You Need</h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 48 }}>A complete gamified fitness ecosystem</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {features.map(f => (
            <div key={f.title} className="glass-card glass-card-hover" style={{ padding: 24 }}>
              <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>{f.icon}</span>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '30px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>FitSphere AI — Built by Antigravity. Powered by Claude.</p>
      </div>
    </div>
  )
}
