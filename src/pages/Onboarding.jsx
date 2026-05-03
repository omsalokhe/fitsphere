import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGameStore from '../store/useGameStore'
import HolographicAvatar from '../components/Avatar/HolographicAvatar'

const STEPS = ['goal', 'stats', 'name']

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState('muscle_gain')
  const [name, setName] = useState('')
  const [height, setHeight] = useState(175)
  const [weight, setWeight] = useState(75)
  const [age, setAge] = useState(25)
  const setProfile = useGameStore(s => s.setProfile)
  const navigate = useNavigate()

  const goals = [
    { key: 'muscle_gain', label: 'Build Muscle', icon: '💪', desc: 'Gain mass and strength', color: '#ff5533' },
    { key: 'fat_loss', label: 'Lose Fat', icon: '🔥', desc: 'Shred and get lean', color: '#ffd600' },
    { key: 'endurance', label: 'Endurance', icon: '🏃', desc: 'Boost stamina and cardio', color: '#00d4ff' },
  ]

  const finish = () => {
    setProfile(name || 'Champion', goal, { height, weight, age })
    navigate('/dashboard')
  }

  return (
    <div className="page-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 520, width: '100%' }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ width: i === step ? 32 : 10, height: 10, borderRadius: 5, background: i <= step ? '#00e5ff' : 'rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }} />
          ))}
        </div>

        {/* Step 0: Goal */}
        {step === 0 && (
          <div className="animate-slide-up">
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ marginBottom: 16 }}><HolographicAvatar phase={0} muscleScale={1} size={160} /></div>
              <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Choose Your Path</h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>What's your primary fitness goal?</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {goals.map(g => (
                <button key={g.key} onClick={() => setGoal(g.key)}
                  style={{ padding: '18px 20px', borderRadius: 14, background: goal === g.key ? `${g.color}12` : 'rgba(255,255,255,0.03)', border: `1px solid ${goal === g.key ? g.color + '44' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s ease', color: '#fff', textAlign: 'left' }}>
                  <span style={{ fontSize: 28 }}>{g.icon}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: goal === g.key ? g.color : '#fff' }}>{g.label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{g.desc}</div>
                  </div>
                  {goal === g.key && <span style={{ marginLeft: 'auto', color: g.color, fontSize: 18 }}>✓</span>}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} style={{ width: '100%', padding: 16, borderRadius: 14, background: 'linear-gradient(135deg, #00e5ff, #7c4dff)', border: 'none', color: '#000', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 20 }}>
              Continue →
            </button>
          </div>
        )}

        {/* Step 1: Body Stats */}
        {step === 1 && (
          <div className="animate-slide-up">
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Body Stats</h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Help us calibrate your avatar & plan</p>
            </div>
            {[
              { label: 'Height (cm)', value: height, set: setHeight, min: 140, max: 220 },
              { label: 'Weight (kg)', value: weight, set: setWeight, min: 40, max: 180 },
              { label: 'Age', value: age, set: setAge, min: 14, max: 80 },
            ].map(field => (
              <div key={field.label} className="glass-card" style={{ padding: 16, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{field.label}</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#00e5ff' }}>{field.value}</span>
                </div>
                <input type="range" min={field.min} max={field.max} value={field.value} onChange={e => field.set(Number(e.target.value))} aria-label={field.label}
                  style={{ width: '100%', accentColor: '#00e5ff' }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button onClick={() => setStep(0)} style={{ flex: 1, padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
              <button onClick={() => setStep(2)} style={{ flex: 2, padding: 16, borderRadius: 14, background: 'linear-gradient(135deg, #00e5ff, #7c4dff)', border: 'none', color: '#000', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Continue →</button>
            </div>
          </div>
        )}

        {/* Step 2: Name */}
        {step === 2 && (
          <div className="animate-slide-up">
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>What's Your Name?</h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Let's personalize your journey</p>
            </div>
            <div className="glass-card" style={{ padding: 20, marginBottom: 20 }}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name..." aria-label="Your name"
                style={{ width: '100%', padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 16, outline: 'none', textAlign: 'center' }}
                onKeyDown={e => e.key === 'Enter' && finish()} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
              <button onClick={finish} style={{ flex: 2, padding: 16, borderRadius: 14, background: 'linear-gradient(135deg, #00e5ff, #7c4dff)', border: 'none', color: '#000', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Launch FitSphere ⚡</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
