import { useState } from 'react'
import GlassCard from '../components/Layout/GlassCard'
import useGameStore from '../store/useGameStore'

export default function Quests() {
  const [activeTab, setActiveTab] = useState('daily')
  const quests = useGameStore(s => s.quests)
  const completeQuest = useGameStore(s => s.completeQuest)
  const phaseColor = useGameStore(s => s.getPhaseColor())

  const tabs = [
    { key: 'daily', label: 'Daily', icon: '📅', count: quests.daily.filter(q => !q.completed).length },
    { key: 'weekly', label: 'Weekly', icon: '📆', count: quests.weekly.filter(q => !q.completed).length },
    { key: 'boss', label: 'Boss', icon: '👑', count: quests.boss.filter(q => !q.completed).length },
  ]

  const currentQuests = quests[activeTab] || []

  return (
    <div className="page-bg" style={{ padding: '24px', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4, letterSpacing: '0.02em' }}>
        Quest Board <span style={{ fontSize: 24 }}>⚔️</span>
      </h1>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>
        Complete quests to earn XP and boost your stats
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            aria-label={`${tab.label} quests`}
            style={{
              padding: '10px 20px',
              borderRadius: 12,
              background: activeTab === tab.key ? `${phaseColor}18` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTab === tab.key ? phaseColor + '44' : 'rgba(255,255,255,0.08)'}`,
              color: activeTab === tab.key ? phaseColor : 'rgba(255,255,255,0.5)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
            {tab.count > 0 && (
              <span style={{
                padding: '2px 7px',
                borderRadius: 8,
                background: `${phaseColor}25`,
                fontSize: 10,
                fontWeight: 700,
                color: phaseColor,
              }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Quest List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {currentQuests.map((quest, i) => (
          <GlassCard
            key={quest.id}
            className="glass-card-hover animate-slide-up"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 20px',
              opacity: quest.completed ? 0.5 : 1,
              animationDelay: `${i * 0.05}s`,
              border: quest.type === 'boss' ? '1px solid rgba(255,214,0,0.2)' : undefined,
              background: quest.type === 'boss' ? 'rgba(255,214,0,0.04)' : undefined,
            }}
          >
            {/* Checkbox */}
            <button
              onClick={() => !quest.completed && completeQuest(activeTab, quest.id)}
              disabled={quest.completed}
              aria-label={`Complete quest: ${quest.title}`}
              style={{
                width: 32, height: 32, borderRadius: 10,
                border: `2px solid ${quest.completed ? '#00ff88' : 'rgba(255,255,255,0.2)'}`,
                background: quest.completed ? '#00ff8820' : 'transparent',
                cursor: quest.completed ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
                transition: 'all 0.3s ease',
                flexShrink: 0,
                color: '#00ff88',
              }}
            >
              {quest.completed ? '✓' : ''}
            </button>

            {/* Icon */}
            <span style={{ fontSize: 24, flexShrink: 0 }}>{quest.icon}</span>

            {/* Quest Info */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 14, fontWeight: 600,
                textDecoration: quest.completed ? 'line-through' : 'none',
                color: quest.completed ? 'rgba(255,255,255,0.4)' : '#fff',
              }}>
                {quest.title}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                {quest.description}
              </div>
              {quest.reward && (
                <div style={{
                  fontSize: 10, color: '#ffd600', marginTop: 4,
                  fontWeight: 600,
                }}>
                  🏆 Reward: {quest.reward}
                </div>
              )}
            </div>

            {/* XP Badge */}
            <div style={{
              padding: '6px 12px',
              borderRadius: 10,
              background: quest.completed ? 'rgba(0,255,136,0.1)' : `${phaseColor}10`,
              border: `1px solid ${quest.completed ? 'rgba(0,255,136,0.2)' : phaseColor + '22'}`,
              fontSize: 12,
              fontWeight: 700,
              color: quest.completed ? '#00ff88' : phaseColor,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              {quest.completed ? 'DONE' : `+${quest.xp} XP`}
            </div>
          </GlassCard>
        ))}
      </div>

      {currentQuests.every(q => q.completed) && (
        <div style={{
          textAlign: 'center', padding: 40,
          color: 'rgba(255,255,255,0.3)', fontSize: 14,
        }}>
          <span style={{ fontSize: 40 }}>🎉</span>
          <p style={{ marginTop: 12 }}>All {activeTab} quests completed! You're a legend.</p>
        </div>
      )}
    </div>
  )
}
