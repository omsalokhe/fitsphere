import StatCard from './StatCard'
import useGameStore from '../../store/useGameStore'

export default function StatsPanel() {
  const stats = useGameStore(s => s.stats)
  const trainStat = useGameStore(s => s.trainStat)

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 12,
    }}>
      {Object.entries(stats).map(([key, value]) => (
        <StatCard
          key={key}
          stat={key}
          value={value}
          onTrain={() => trainStat(key)}
        />
      ))}
    </div>
  )
}
