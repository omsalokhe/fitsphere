import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DAILY_QUESTS, WEEKLY_QUESTS, BOSS_QUESTS } from '../data/quests'

const getPhase = (xp) => xp >= 7000 ? 2 : xp >= 3000 ? 1 : 0
const getLevel = (xp) => Math.floor(xp / 500) + 1
const getLevelProgress = (xp) => (xp % 500) / 500 * 100

const getRank = (level) => {
  if (level >= 9) return 'Legend'
  if (level >= 7) return 'Beast'
  if (level >= 5) return 'Shredder'
  if (level >= 3) return 'Grinder'
  return 'Rookie'
}

const getMuscleScale = (xp) => 1 + Math.min(xp / 12000, 0.12)

const PHASE_COLORS = [
  { color: '#00e5ff', name: 'Starter', skin: '#a8f0f4', hair: '#00bcd4', pant: '#00acc1' },
  { color: '#7c4dff', name: 'Shredded', skin: '#c9b8ff', hair: '#6200ea', pant: '#4527a0' },
  { color: '#ffd600', name: 'Legendary', skin: '#ffe0a0', hair: '#ff6d00', pant: '#e65100' },
]

const initQuests = () => {
  const now = Date.now()
  return {
    daily: DAILY_QUESTS.map(q => ({ ...q, completed: false, lastReset: now })),
    weekly: WEEKLY_QUESTS.map(q => ({ ...q, completed: false, progress: 0, lastReset: now })),
    boss: BOSS_QUESTS.map(q => ({ ...q, completed: false, progress: 0 })),
  }
}

const useGameStore = create(
  persist(
    (set, get) => ({
      // User Profile
      userName: '',
      userGoal: 'muscle_gain',
      bodyStats: { height: 175, weight: 75, age: 25 },
      onboarded: false,

      // XP & Progression
      totalXP: 0,

      // Computed getters (call as functions)
      getPhase: () => getPhase(get().totalXP),
      getLevel: () => getLevel(get().totalXP),
      getLevelProgress: () => getLevelProgress(get().totalXP),
      getRank: () => getRank(getLevel(get().totalXP)),
      getMuscleScale: () => getMuscleScale(get().totalXP),
      getPhaseData: () => PHASE_COLORS[getPhase(get().totalXP)],
      getPhaseColor: () => PHASE_COLORS[getPhase(get().totalXP)].color,

      // RPG Stats
      stats: { str: 10, end: 8, agi: 6, vit: 8 },

      // Quests
      quests: initQuests(),

      // Custom Schedule (user edits on top of templates)
      customSchedule: {},  // { [goal]: { weeklyPlan: [...] } }

      // Custom Daily Goals
      dailyGoals: [],

      // Vault
      vaultFiles: [],

      // Chat History
      chatMessages: [],

      // XP Popup queue
      xpPopups: [],

      // Actions
      setProfile: (name, goal, bodyStats) => set({
        userName: name,
        userGoal: goal,
        bodyStats,
        onboarded: true,
      }),

      addXP: (amount, source) => {
        const popup = { id: Date.now(), amount, source }
        set(state => ({
          totalXP: state.totalXP + amount,
          xpPopups: [...state.xpPopups, popup],
        }))
        setTimeout(() => {
          set(state => ({
            xpPopups: state.xpPopups.filter(p => p.id !== popup.id),
          }))
        }, 1500)
      },

      trainStat: (stat) => {
        set(state => {
          const current = state.stats[stat]
          if (current >= 99) return state
          return {
            stats: { ...state.stats, [stat]: Math.min(current + 4, 99) },
          }
        })
        get().addXP(60, `Train ${stat.toUpperCase()}`)
      },

      logWorkout: () => {
        set(state => ({
          stats: { ...state.stats, str: Math.min(state.stats.str + 4, 99) },
        }))
        get().addXP(250, 'Workout')
      },

      logMeal: () => {
        set(state => ({
          stats: { ...state.stats, vit: Math.min(state.stats.vit + 4, 99) },
        }))
        get().addXP(120, 'Nutrition')
      },

      logSleep: () => {
        set(state => ({
          stats: { ...state.stats, end: Math.min(state.stats.end + 4, 99) },
        }))
        get().addXP(120, 'Sleep')
      },

      completeQuest: (type, questId) => {
        set(state => {
          const quests = { ...state.quests }
          const list = quests[type].map(q =>
            q.id === questId ? { ...q, completed: true } : q
          )
          quests[type] = list
          return { quests }
        })
        get().addXP(type === 'boss' ? 400 : type === 'weekly' ? 400 : 250, 'Quest')
        set(state => ({
          stats: { ...state.stats, agi: Math.min(state.stats.agi + 4, 99) },
        }))
      },

      resetDailyQuests: () => {
        set(state => ({
          quests: {
            ...state.quests,
            daily: DAILY_QUESTS.map(q => ({ ...q, completed: false, lastReset: Date.now() })),
          },
        }))
      },

      addChatMessage: (message) => set(state => ({
        chatMessages: [...state.chatMessages, message],
      })),

      // Vault
      uploadFile: (file) => set(state => ({
        vaultFiles: [...state.vaultFiles, {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          size: file.size,
          data: file.data,
          uploadedAt: new Date().toISOString(),
          encrypted: true,
        }],
      })),

      deleteFile: (fileId) => set(state => ({
        vaultFiles: state.vaultFiles.filter(f => f.id !== fileId),
      })),

      // Schedule customization
      updateDayExercises: (goal, dayIndex, exercises) => set(state => {
        const custom = { ...state.customSchedule }
        if (!custom[goal]) custom[goal] = { weeklyPlan: [] }
        custom[goal].weeklyPlan[dayIndex] = exercises
        return { customSchedule: custom }
      }),

      addExerciseToDay: (goal, dayIndex, exercise) => set(state => {
        const custom = { ...state.customSchedule }
        if (!custom[goal]) custom[goal] = { weeklyPlan: [] }
        const existing = custom[goal].weeklyPlan[dayIndex] || null
        // Will be merged with template in the page component
        if (!existing) {
          custom[goal].weeklyPlan[dayIndex] = [exercise]
        } else {
          custom[goal].weeklyPlan[dayIndex] = [...existing, exercise]
        }
        return { customSchedule: custom }
      }),

      removeExerciseFromDay: (goal, dayIndex, exerciseIndex) => set(state => {
        const custom = { ...state.customSchedule }
        if (!custom[goal]?.weeklyPlan?.[dayIndex]) return state
        const updated = [...custom[goal].weeklyPlan[dayIndex]]
        updated.splice(exerciseIndex, 1)
        custom[goal].weeklyPlan[dayIndex] = updated
        return { customSchedule: custom }
      }),

      // Daily Goals
      addDailyGoal: (goal) => set(state => ({
        dailyGoals: [...state.dailyGoals, {
          id: Date.now().toString(),
          text: goal,
          completed: false,
          createdAt: new Date().toISOString(),
        }],
      })),

      toggleDailyGoal: (goalId) => set(state => ({
        dailyGoals: state.dailyGoals.map(g =>
          g.id === goalId ? { ...g, completed: !g.completed } : g
        ),
      })),

      removeDailyGoal: (goalId) => set(state => ({
        dailyGoals: state.dailyGoals.filter(g => g.id !== goalId),
      })),

      // Reset
      resetAll: () => set({
        totalXP: 0,
        stats: { str: 10, end: 8, agi: 6, vit: 8 },
        quests: initQuests(),
        customSchedule: {},
        dailyGoals: [],
        vaultFiles: [],
        chatMessages: [],
        xpPopups: [],
        userName: '',
        userGoal: 'muscle_gain',
        bodyStats: { height: 175, weight: 75, age: 25 },
        onboarded: false,
      }),
    }),
    {
      name: 'fitsphere-game-store',
    }
  )
)

export { PHASE_COLORS, getPhase, getLevel, getRank, getMuscleScale, getLevelProgress }
export default useGameStore
