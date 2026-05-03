import { useState } from 'react'
import GlassCard from '../components/Layout/GlassCard'
import useGameStore from '../store/useGameStore'
import SCHEDULE_TEMPLATES from '../data/scheduleTemplates'

function AddExerciseModal({ onAdd, onClose, phaseColor }) {
  const [name, setName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [rest, setRest] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) return
    onAdd({ name: name.trim(), sets: Number(sets) || 1, reps: reps || '-', rest: rest || '-' })
    onClose()
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
    color: '#fff', fontSize: 13, outline: 'none',
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div className="glass-card animate-slide-up" style={{ padding: 24, maxWidth: 420, width: '100%', border: `1px solid ${phaseColor}33` }} onClick={e => e.stopPropagation()}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>➕</span> Add Exercise
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <label className="label-text" style={{ display: 'block', marginBottom: 4 }}>Exercise Name *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Barbell Squats" style={inputStyle} autoFocus
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <div>
              <label className="label-text" style={{ display: 'block', marginBottom: 4 }}>Sets</label>
              <input value={sets} onChange={e => setSets(e.target.value)} placeholder="4" style={inputStyle} />
            </div>
            <div>
              <label className="label-text" style={{ display: 'block', marginBottom: 4 }}>Reps</label>
              <input value={reps} onChange={e => setReps(e.target.value)} placeholder="8-10" style={inputStyle} />
            </div>
            <div>
              <label className="label-text" style={{ display: 'block', marginBottom: 4 }}>Rest</label>
              <input value={rest} onChange={e => setRest(e.target.value)} placeholder="90s" style={inputStyle} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '10px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={!name.trim()} style={{ flex: 2, padding: '10px 16px', borderRadius: 10, background: name.trim() ? `linear-gradient(135deg, ${phaseColor}, ${phaseColor}cc)` : 'rgba(255,255,255,0.06)', border: 'none', color: name.trim() ? '#000' : 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 700, cursor: name.trim() ? 'pointer' : 'default' }}>
            Add Exercise
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Schedule() {
  const userGoal = useGameStore(s => s.userGoal)
  const [goal, setGoal] = useState(userGoal || 'muscle_gain')
  const [expandedDay, setExpandedDay] = useState(0)
  const [addExerciseDay, setAddExerciseDay] = useState(null) // dayIndex or null
  const [newGoalText, setNewGoalText] = useState('')
  const phaseColor = useGameStore(s => s.getPhaseColor())

  // Store actions
  const customSchedule = useGameStore(s => s.customSchedule)
  const addExerciseToDay = useGameStore(s => s.addExerciseToDay)
  const removeExerciseFromDay = useGameStore(s => s.removeExerciseFromDay)
  const dailyGoals = useGameStore(s => s.dailyGoals)
  const addDailyGoal = useGameStore(s => s.addDailyGoal)
  const toggleDailyGoal = useGameStore(s => s.toggleDailyGoal)
  const removeDailyGoal = useGameStore(s => s.removeDailyGoal)

  const template = SCHEDULE_TEMPLATES[goal]

  // Merge template exercises with user-added custom exercises per day
  const getMergedExercises = (dayIndex) => {
    const base = template.weeklyPlan[dayIndex].exercises
    const custom = customSchedule[goal]?.weeklyPlan?.[dayIndex] || []
    return { base, custom, all: [...base, ...custom] }
  }

  const goals = [
    { key: 'muscle_gain', label: 'Muscle Gain', icon: '💪' },
    { key: 'fat_loss', label: 'Fat Loss', icon: '🔥' },
    { key: 'endurance', label: 'Endurance', icon: '🏃' },
  ]

  const macros = [
    { label: 'Protein', value: template.macroTargets.protein, unit: 'g', color: '#ff5533', icon: '🥩' },
    { label: 'Carbs', value: template.macroTargets.carbs, unit: 'g', color: '#ffd700', icon: '🍚' },
    { label: 'Fats', value: template.macroTargets.fats, unit: 'g', color: '#00d4ff', icon: '🥑' },
    { label: 'Calories', value: template.macroTargets.calories, unit: 'kcal', color: '#00ff88', icon: '⚡' },
  ]

  const completedGoals = dailyGoals.filter(g => g.completed).length
  const totalGoals = dailyGoals.length

  return (
    <div className="page-bg" style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>AI Schedule 📋</h1>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>Your personalized weekly plan — tap exercises to edit</p>

      {/* Goal Selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {goals.map(g => (
          <button key={g.key} onClick={() => setGoal(g.key)} aria-label={`Select ${g.label} goal`}
            style={{ padding: '10px 20px', borderRadius: 12, background: goal === g.key ? `${phaseColor}18` : 'rgba(255,255,255,0.04)', border: `1px solid ${goal === g.key ? phaseColor + '44' : 'rgba(255,255,255,0.08)'}`, color: goal === g.key ? phaseColor : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>{g.icon}</span> {g.label}
          </button>
        ))}
      </div>

      {/* AI Insight */}
      <GlassCard style={{ marginBottom: 20, border: `1px solid ${phaseColor}22`, background: `${phaseColor}06` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🧠</span>
          <div>
            <div className="label-text" style={{ color: phaseColor, marginBottom: 6 }}>AI INSIGHT</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>{template.aiInsight}</p>
          </div>
        </div>
      </GlassCard>

      {/* ═══ MY DAILY GOALS SECTION ═══ */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🎯</span> My Daily Goals
            {totalGoals > 0 && (
              <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 10, background: completedGoals === totalGoals && totalGoals > 0 ? 'rgba(0,255,136,0.15)' : `${phaseColor}15`, color: completedGoals === totalGoals && totalGoals > 0 ? '#00ff88' : phaseColor, fontWeight: 700 }}>
                {completedGoals}/{totalGoals}
              </span>
            )}
          </h2>
        </div>

        {/* Add Goal Input */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            value={newGoalText}
            onChange={e => setNewGoalText(e.target.value)}
            placeholder="Add a daily goal... (e.g. Drink 4L water, Run 5km)"
            aria-label="New daily goal"
            style={{ flex: 1, padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 13, outline: 'none' }}
            onFocus={e => e.target.style.borderColor = `${phaseColor}44`}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            onKeyDown={e => {
              if (e.key === 'Enter' && newGoalText.trim()) {
                addDailyGoal(newGoalText.trim())
                setNewGoalText('')
              }
            }}
          />
          <button
            onClick={() => { if (newGoalText.trim()) { addDailyGoal(newGoalText.trim()); setNewGoalText('') } }}
            disabled={!newGoalText.trim()}
            aria-label="Add daily goal"
            style={{ padding: '12px 20px', borderRadius: 12, background: newGoalText.trim() ? `${phaseColor}20` : 'rgba(255,255,255,0.04)', border: `1px solid ${newGoalText.trim() ? phaseColor + '44' : 'rgba(255,255,255,0.08)'}`, color: newGoalText.trim() ? phaseColor : 'rgba(255,255,255,0.3)', fontSize: 18, fontWeight: 700, cursor: newGoalText.trim() ? 'pointer' : 'default', transition: 'all 0.2s ease' }}
          >+</button>
        </div>

        {/* Goals List */}
        {dailyGoals.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {dailyGoals.map(g => (
              <div key={g.id} className="glass-card" style={{
                padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12,
                opacity: g.completed ? 0.6 : 1, transition: 'all 0.3s ease',
              }}>
                <button onClick={() => toggleDailyGoal(g.id)} aria-label={`Toggle goal: ${g.text}`}
                  style={{ width: 26, height: 26, borderRadius: 8, border: `2px solid ${g.completed ? '#00ff88' : 'rgba(255,255,255,0.2)'}`, background: g.completed ? '#00ff8820' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#00ff88', flexShrink: 0, transition: 'all 0.2s ease' }}>
                  {g.completed ? '✓' : ''}
                </button>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 500, textDecoration: g.completed ? 'line-through' : 'none', color: g.completed ? 'rgba(255,255,255,0.4)' : '#fff' }}>
                  {g.text}
                </span>
                <button onClick={() => removeDailyGoal(g.id)} aria-label={`Remove goal: ${g.text}`}
                  style={{ width: 24, height: 24, borderRadius: 6, background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.25)', fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', flexShrink: 0 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,83,51,0.4)'; e.currentTarget.style.color = '#ff5533' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.25)' }}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.08)', textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
            No daily goals yet — add your first one above! 🎯
          </div>
        )}
      </div>

      {/* Macro Targets */}
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>🥗</span> Daily Macro Targets
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
        {macros.map(m => (
          <GlassCard key={m.label} style={{ padding: 16, textAlign: 'center' }}>
            <span style={{ fontSize: 22 }}>{m.icon}</span>
            <div style={{ fontSize: 24, fontWeight: 800, color: m.color, marginTop: 6 }}>{m.value}<span style={{ fontSize: 12, fontWeight: 500 }}>{m.unit}</span></div>
            <div className="label-text" style={{ marginTop: 4 }}>{m.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Weekly Plan */}
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>📅</span> Weekly Plan
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 400, marginLeft: 4 }}>
          (click + to add custom exercises)
        </span>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {template.weeklyPlan.map((day, i) => {
          const { base, custom, all } = getMergedExercises(i)
          return (
            <GlassCard key={day.day} className="glass-card-hover" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setExpandedDay(expandedDay === i ? -1 : i)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${phaseColor}15`, border: `1px solid ${phaseColor}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: phaseColor }}>{day.day.slice(0, 3)}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{day.focus}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                      {all.length} exercise{all.length !== 1 ? 's' : ''}
                      {custom.length > 0 && <span style={{ color: phaseColor, marginLeft: 4 }}>({custom.length} custom)</span>}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', transform: expandedDay === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}>▼</span>
              </div>
              {expandedDay === i && (
                <div style={{ padding: '0 20px 16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        <th style={{ textAlign: 'left', padding: '10px 0 6px' }}>Exercise</th>
                        <th style={{ textAlign: 'center', padding: '10px 0 6px' }}>Sets</th>
                        <th style={{ textAlign: 'center', padding: '10px 0 6px' }}>Reps</th>
                        <th style={{ textAlign: 'center', padding: '10px 0 6px' }}>Rest</th>
                        <th style={{ width: 36 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Template exercises (not removable) */}
                      {base.map((ex, j) => (
                        <tr key={`base-${j}`} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={{ padding: '8px 0', color: 'rgba(255,255,255,0.8)' }}>{ex.name}</td>
                          <td style={{ textAlign: 'center', color: phaseColor, fontWeight: 600 }}>{ex.sets}</td>
                          <td style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>{ex.reps}</td>
                          <td style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{ex.rest}</td>
                          <td></td>
                        </tr>
                      ))}
                      {/* Custom user-added exercises (removable) */}
                      {custom.map((ex, j) => (
                        <tr key={`custom-${j}`} style={{ borderTop: `1px solid ${phaseColor}15`, background: `${phaseColor}05` }}>
                          <td style={{ padding: '8px 0', color: phaseColor, fontWeight: 500 }}>
                            <span style={{ fontSize: 10, marginRight: 6, opacity: 0.6 }}>★</span>{ex.name}
                          </td>
                          <td style={{ textAlign: 'center', color: phaseColor, fontWeight: 600 }}>{ex.sets}</td>
                          <td style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>{ex.reps}</td>
                          <td style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{ex.rest}</td>
                          <td>
                            <button onClick={(e) => { e.stopPropagation(); removeExerciseFromDay(goal, i, j) }}
                              aria-label={`Remove ${ex.name}`}
                              style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(255,83,51,0.08)', border: '1px solid rgba(255,83,51,0.2)', color: '#ff5533', fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Add Exercise Button */}
                  <button onClick={(e) => { e.stopPropagation(); setAddExerciseDay(i) }}
                    aria-label={`Add exercise to ${day.day}`}
                    style={{ width: '100%', padding: '10px 16px', borderRadius: 10, background: `${phaseColor}08`, border: `1px dashed ${phaseColor}33`, color: phaseColor, fontSize: 12, fontWeight: 600, cursor: 'pointer', marginTop: 10, transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${phaseColor}15` }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${phaseColor}08` }}>
                    <span style={{ fontSize: 16 }}>+</span> Add Exercise to {day.day}
                  </button>
                </div>
              )}
            </GlassCard>
          )
        })}
      </div>

      {/* Add Exercise Modal */}
      {addExerciseDay !== null && (
        <AddExerciseModal
          phaseColor={phaseColor}
          onAdd={(exercise) => addExerciseToDay(goal, addExerciseDay, exercise)}
          onClose={() => setAddExerciseDay(null)}
        />
      )}
    </div>
  )
}
