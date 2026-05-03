const SCHEDULE_TEMPLATES = {
  muscle_gain: {
    macroTargets: { protein: 200, carbs: 300, fats: 70, calories: 2640 },
    aiInsight: "Your STR stats are climbing! I've designed a progressive overload program focusing on compound movements. Increase weight by 2.5kg when you can complete all sets with good form.",
    weeklyPlan: [
      { day: 'Monday', focus: 'Chest & Triceps', exercises: [
        { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '75s' },
        { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Overhead Tricep Extension', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', rest: '60s' },
      ]},
      { day: 'Tuesday', focus: 'Back & Biceps', exercises: [
        { name: 'Deadlift', sets: 4, reps: '6-8', rest: '120s' },
        { name: 'Barbell Rows', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Lat Pulldowns', sets: 3, reps: '10-12', rest: '75s' },
        { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Hammer Curls', sets: 3, reps: '12-15', rest: '60s' },
      ]},
      { day: 'Wednesday', focus: 'Rest & Recovery', exercises: [
        { name: 'Light Stretching', sets: 1, reps: '15 min', rest: '-' },
        { name: 'Foam Rolling', sets: 1, reps: '10 min', rest: '-' },
        { name: 'Walk', sets: 1, reps: '30 min', rest: '-' },
      ]},
      { day: 'Thursday', focus: 'Shoulders & Arms', exercises: [
        { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Lateral Raises', sets: 4, reps: '12-15', rest: '60s' },
        { name: 'Face Pulls', sets: 3, reps: '15-20', rest: '60s' },
        { name: 'Dips', sets: 3, reps: '10-12', rest: '75s' },
        { name: 'Preacher Curls', sets: 3, reps: '10-12', rest: '60s' },
      ]},
      { day: 'Friday', focus: 'Legs & Core', exercises: [
        { name: 'Barbell Squats', sets: 4, reps: '8-10', rest: '120s' },
        { name: 'Romanian Deadlift', sets: 3, reps: '10-12', rest: '90s' },
        { name: 'Leg Press', sets: 3, reps: '12-15', rest: '75s' },
        { name: 'Hanging Leg Raises', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Planks', sets: 3, reps: '60s hold', rest: '45s' },
      ]},
      { day: 'Saturday', focus: 'Full Body Power', exercises: [
        { name: 'Power Cleans', sets: 4, reps: '5-6', rest: '120s' },
        { name: 'Weighted Pull-ups', sets: 3, reps: '6-8', rest: '90s' },
        { name: 'Bulgarian Split Squats', sets: 3, reps: '10-12', rest: '75s' },
        { name: 'Dumbbell Bench Press', sets: 3, reps: '10-12', rest: '75s' },
      ]},
      { day: 'Sunday', focus: 'Active Recovery', exercises: [
        { name: 'Yoga / Mobility', sets: 1, reps: '30 min', rest: '-' },
        { name: 'Light Cardio Walk', sets: 1, reps: '20 min', rest: '-' },
      ]},
    ]
  },
  fat_loss: {
    macroTargets: { protein: 180, carbs: 180, fats: 55, calories: 1920 },
    aiInsight: "We're in a cutting phase! Caloric deficit is set at 400 kcal below maintenance. Protein stays high to preserve muscle mass. HIIT sessions will torch fat while keeping your metabolism elevated.",
    weeklyPlan: [
      { day: 'Monday', focus: 'Upper Body + HIIT', exercises: [
        { name: 'Dumbbell Bench Press', sets: 4, reps: '10-12', rest: '75s' },
        { name: 'Bent-Over Rows', sets: 4, reps: '10-12', rest: '75s' },
        { name: 'Shoulder Press', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'HIIT Sprints', sets: 10, reps: '20s on / 40s off', rest: '-' },
      ]},
      { day: 'Tuesday', focus: 'Lower Body + Core', exercises: [
        { name: 'Goblet Squats', sets: 4, reps: '12-15', rest: '75s' },
        { name: 'Walking Lunges', sets: 3, reps: '12/leg', rest: '60s' },
        { name: 'Glute Bridges', sets: 3, reps: '15-20', rest: '60s' },
        { name: 'Mountain Climbers', sets: 3, reps: '30s', rest: '30s' },
        { name: 'Bicycle Crunches', sets: 3, reps: '20', rest: '45s' },
      ]},
      { day: 'Wednesday', focus: 'Cardio & Mobility', exercises: [
        { name: 'Steady-State Cardio', sets: 1, reps: '40 min', rest: '-' },
        { name: 'Dynamic Stretching', sets: 1, reps: '15 min', rest: '-' },
      ]},
      { day: 'Thursday', focus: 'Full Body Circuit', exercises: [
        { name: 'Kettlebell Swings', sets: 4, reps: '15', rest: '45s' },
        { name: 'Push-ups', sets: 3, reps: '15-20', rest: '45s' },
        { name: 'Jump Squats', sets: 3, reps: '12', rest: '45s' },
        { name: 'Burpees', sets: 3, reps: '10', rest: '60s' },
        { name: 'Plank Hold', sets: 3, reps: '45s', rest: '30s' },
      ]},
      { day: 'Friday', focus: 'Upper Body + LISS', exercises: [
        { name: 'Pull-ups', sets: 4, reps: '8-10', rest: '75s' },
        { name: 'Incline Push-ups', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Lateral Raises', sets: 3, reps: '15', rest: '45s' },
        { name: 'LISS Cardio (Incline Walk)', sets: 1, reps: '25 min', rest: '-' },
      ]},
      { day: 'Saturday', focus: 'HIIT + Abs', exercises: [
        { name: 'Battle Ropes', sets: 6, reps: '30s', rest: '30s' },
        { name: 'Box Jumps', sets: 4, reps: '10', rest: '45s' },
        { name: 'Hanging Leg Raises', sets: 3, reps: '12', rest: '60s' },
        { name: 'Russian Twists', sets: 3, reps: '20', rest: '45s' },
      ]},
      { day: 'Sunday', focus: 'Rest', exercises: [
        { name: 'Light Walk', sets: 1, reps: '30 min', rest: '-' },
        { name: 'Foam Rolling', sets: 1, reps: '15 min', rest: '-' },
      ]},
    ]
  },
  endurance: {
    macroTargets: { protein: 150, carbs: 350, fats: 60, calories: 2540 },
    aiInsight: "Endurance mode activated! Higher carb intake fuels long-duration activities. We'll progressively increase training volume each week. Your END stat will see major gains!",
    weeklyPlan: [
      { day: 'Monday', focus: 'Tempo Run + Core', exercises: [
        { name: 'Tempo Run', sets: 1, reps: '35 min', rest: '-' },
        { name: 'Plank Variations', sets: 3, reps: '45s each', rest: '30s' },
        { name: 'Dead Bugs', sets: 3, reps: '12/side', rest: '30s' },
      ]},
      { day: 'Tuesday', focus: 'Strength Endurance', exercises: [
        { name: 'Circuit: Squats → Push-ups → Rows', sets: 5, reps: '15 each', rest: '60s' },
        { name: 'Step-ups', sets: 3, reps: '15/leg', rest: '45s' },
        { name: 'Bodyweight Dips', sets: 3, reps: '12-15', rest: '45s' },
      ]},
      { day: 'Wednesday', focus: 'Long Slow Distance', exercises: [
        { name: 'Easy Run / Jog', sets: 1, reps: '50 min', rest: '-' },
        { name: 'Stretching', sets: 1, reps: '10 min', rest: '-' },
      ]},
      { day: 'Thursday', focus: 'Interval Training', exercises: [
        { name: 'Warm-up Jog', sets: 1, reps: '10 min', rest: '-' },
        { name: 'Intervals: 400m fast / 200m walk', sets: 8, reps: '-', rest: '60s' },
        { name: 'Cool-down Walk', sets: 1, reps: '10 min', rest: '-' },
      ]},
      { day: 'Friday', focus: 'Cross-Training', exercises: [
        { name: 'Swimming or Cycling', sets: 1, reps: '45 min', rest: '-' },
        { name: 'Mobility Work', sets: 1, reps: '15 min', rest: '-' },
      ]},
      { day: 'Saturday', focus: 'Long Run', exercises: [
        { name: 'Long Distance Run', sets: 1, reps: '60-75 min', rest: '-' },
        { name: 'Post-Run Stretch', sets: 1, reps: '15 min', rest: '-' },
      ]},
      { day: 'Sunday', focus: 'Active Recovery', exercises: [
        { name: 'Yoga', sets: 1, reps: '30 min', rest: '-' },
        { name: 'Light Walk', sets: 1, reps: '20 min', rest: '-' },
      ]},
    ]
  }
}

export default SCHEDULE_TEMPLATES
