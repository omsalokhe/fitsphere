export const DAILY_QUESTS = [
  { id: 'dq1', title: '100 Push-ups', description: 'Complete 100 push-ups throughout the day', xp: 250, type: 'daily', icon: '💪' },
  { id: 'dq2', title: '10,000 Steps', description: 'Walk at least 10,000 steps today', xp: 250, type: 'daily', icon: '🚶' },
  { id: 'dq3', title: 'Drink 3L Water', description: 'Stay hydrated — drink at least 3 liters', xp: 250, type: 'daily', icon: '💧' },
  { id: 'dq4', title: 'Morning Stretch', description: '15 minutes of stretching after waking up', xp: 250, type: 'daily', icon: '🧘' },
  { id: 'dq5', title: 'Log All Meals', description: 'Track every meal you eat today', xp: 250, type: 'daily', icon: '🥗' },
  { id: 'dq6', title: 'Sleep 8 Hours', description: 'Get a full 8 hours of quality sleep', xp: 250, type: 'daily', icon: '😴' },
]

export const WEEKLY_QUESTS = [
  { id: 'wq1', title: '5 Workout Sessions', description: 'Complete 5 full workout sessions this week', xp: 400, type: 'weekly', icon: '🏋️', target: 5 },
  { id: 'wq2', title: 'Meal Prep Sunday', description: 'Prepare all meals for the upcoming week', xp: 400, type: 'weekly', icon: '🍱', target: 1 },
  { id: 'wq3', title: '35km Running', description: 'Run a total of 35km this week', xp: 400, type: 'weekly', icon: '🏃', target: 35 },
]

export const BOSS_QUESTS = [
  { id: 'bq1', title: '🔥 7-Day Streak', description: 'Log a workout every day for 7 consecutive days. Unlocks Fire Skin!', xp: 800, type: 'boss', icon: '🔥', target: 7, reward: 'Fire Skin' },
  { id: 'bq2', title: '⚡ Iron Will', description: 'Complete ALL daily quests for 5 consecutive days', xp: 1000, type: 'boss', icon: '⚡', target: 5, reward: 'Lightning Aura' },
]
