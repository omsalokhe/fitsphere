const RESPONSE_MAP = [
  {
    keywords: ['hi', 'hello', 'hey', 'sup', 'yo', 'greetings'],
    reply: "Hey Champion! 💪 I'm your FitSphere AI coach. Ask me about workouts, nutrition, recovery, or your progress!"
  },
  {
    keywords: ['workout', 'exercise', 'gym', 'training', 'push', 'pull', 'leg day', 'lift'],
    reply: "Based on your current STR stats, I recommend a Push-Pull-Legs split. Today is a PUSH day — bench press 4x8, overhead press 3x10, tricep dips 3x12. Rest 90s between sets. 🔥"
  },
  {
    keywords: ['diet', 'food', 'eat', 'nutrition', 'meal', 'protein', 'calories', 'macro', 'carb'],
    reply: "At your current phase, target 2,400 kcal/day: 180g protein, 250g carbs, 65g fats. Pre-workout: oats + banana. Post-workout: whey + rice. Stay consistent! 🥗"
  },
  {
    keywords: ['fat', 'weight', 'lose', 'cut', 'cutting', 'shred', 'lean'],
    reply: "For fat loss, maintain a 300–500 kcal deficit. Keep protein HIGH (2g per kg bodyweight) to preserve muscle. Add 20 mins LISS cardio post-weights. You've got this! 🎯"
  },
  {
    keywords: ['muscle', 'bulk', 'gain', 'mass', 'build', 'bulking', 'grow'],
    reply: "To build mass, eat in a 300 kcal surplus. Prioritize compound lifts — squat, deadlift, bench. Sleep 8hrs minimum. Your STR stat will shoot up! 💥"
  },
  {
    keywords: ['sleep', 'rest', 'recover', 'recovery', 'sore', 'tired'],
    reply: "Recovery is where gains happen! Aim for 7–9hrs sleep. On rest days, do light stretching or a 20-min walk. Consider magnesium glycinate before bed for deeper sleep. 😴"
  },
  {
    keywords: ['xp', 'level', 'avatar', 'rank', 'phase', 'evolve', 'unlock'],
    reply: "You need 3,000 XP to unlock your Shredded phase and 7,000 XP for Legendary! Log workouts, complete quests, and tap your avatar daily for bonus XP. Let's go! ⚡"
  },
  {
    keywords: ['motivat', 'give up', 'hard', 'struggle', "can't", 'quit', 'stop'],
    reply: "Every rep counts. Every meal counts. The avatar doesn't lie — it reflects YOUR real effort. You're building something permanent. Stay locked in. 🔒🔥"
  },
  {
    keywords: ['form', 'technique', 'correct', 'posture', 'injury', 'hurt', 'pain'],
    reply: "Form first, weight second — always. For squats: chest up, knees tracking toes, depth to parallel. For deadlift: neutral spine, bar close to body. Never ego-lift. 🧠"
  },
  {
    keywords: ['stretch', 'flexibility', 'warm', 'cool', 'mobility'],
    reply: "Dynamic stretching before workouts (leg swings, arm circles), static stretching after. Spend 5-10 mins on mobility daily — your joints will thank you in 10 years. 🧘"
  },
  {
    keywords: ['supplement', 'creatine', 'whey', 'vitamin', 'bcaa'],
    reply: "The basics: Creatine monohydrate (5g/day), whey protein post-workout, vitamin D3 if you're indoors a lot. Skip BCAAs if your protein intake is solid. 💊"
  },
  {
    keywords: ['water', 'hydrat', 'drink', 'thirst'],
    reply: "Aim for 3-4 liters daily, more on training days. Drink 500ml 30 mins before your workout. Add a pinch of salt for electrolytes during intense sessions. 💧"
  },
  {
    keywords: ['cardio', 'run', 'jog', 'sprint', 'hiit'],
    reply: "For fat loss: 20-30 min LISS post-weights. For conditioning: 2x/week HIIT (20s sprint, 40s rest × 10 rounds). Don't overdo it — recovery matters! 🏃"
  },
  {
    keywords: ['abs', 'core', 'six pack', 'stomach'],
    reply: "Abs are made in the kitchen! Get to 12-15% body fat for visibility. Train core 3x/week: hanging leg raises, cable crunches, planks. Progressive overload applies here too! 🎯"
  },
  {
    keywords: ['thank', 'thanks', 'awesome', 'great', 'cool', 'nice'],
    reply: "That's what I'm here for! Keep pushing, keep logging, and watch your avatar evolve. You're doing amazing! 🌟"
  },
]

const DEFAULT_REPLY = "Great question! Keep tracking your workouts and nutrition — consistency is the real cheat code. Anything specific I can help you with? 💬"

export function getBotReply(userInput) {
  const input = userInput.toLowerCase()
  for (const entry of RESPONSE_MAP) {
    if (entry.keywords.some(k => input.includes(k))) return entry.reply
  }
  return DEFAULT_REPLY
}

export default RESPONSE_MAP
