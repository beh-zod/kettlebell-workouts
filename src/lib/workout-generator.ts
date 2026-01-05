import { exercises, type ExerciseData } from "./exercises"
import type { MuscleGroup, EnergyLevel } from "@/types"

interface GenerateWorkoutParams {
  muscleGroups: MuscleGroup[]
  energyLevel: EnergyLevel
  duration: number // in minutes
}

interface GeneratedExercise {
  exercise: ExerciseData
  sets: number
  reps: number
}

// Approximate time per exercise based on sets and energy level
function getTimePerExercise(sets: number, energyLevel: EnergyLevel): number {
  const restTimes = {
    low: 90,    // 90 seconds rest
    medium: 60, // 60 seconds rest
    high: 30,   // 30 seconds rest
  }
  
  const timePerSet = 45 // seconds to complete a set
  const restTime = restTimes[energyLevel]
  
  return ((timePerSet + restTime) * sets) / 60 // return in minutes
}

// Adjust sets based on energy level
function getSetsForEnergyLevel(defaultSets: number, energyLevel: EnergyLevel): number {
  switch (energyLevel) {
    case "low":
      return Math.max(2, defaultSets - 1)
    case "medium":
      return defaultSets
    case "high":
      return defaultSets + 1
  }
}

// Adjust reps based on energy level
function getRepsForEnergyLevel(defaultReps: number, energyLevel: EnergyLevel): number {
  switch (energyLevel) {
    case "low":
      return Math.max(6, Math.floor(defaultReps * 0.75))
    case "medium":
      return defaultReps
    case "high":
      return Math.ceil(defaultReps * 1.25)
  }
}

// Filter exercises by difficulty based on energy level
function getDifficultyFilter(energyLevel: EnergyLevel): string[] {
  switch (energyLevel) {
    case "low":
      return ["beginner"]
    case "medium":
      return ["beginner", "intermediate"]
    case "high":
      return ["beginner", "intermediate", "advanced"]
  }
}

// Shuffle array
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function generateWorkout(params: GenerateWorkoutParams): GeneratedExercise[] {
  const { muscleGroups, energyLevel, duration } = params
  const workout: GeneratedExercise[] = []
  let totalTime = 0
  const targetTime = duration - 5 // Leave 5 min buffer for warmup/cooldown
  
  // Get allowed difficulty levels
  const allowedDifficulties = getDifficultyFilter(energyLevel)
  
  // Calculate exercises per muscle group
  const exercisesPerGroup = Math.ceil(targetTime / (muscleGroups.length * 4)) // ~4 min per exercise avg
  
  // For each muscle group, select exercises
  for (const muscleGroup of muscleGroups) {
    // Get exercises for this muscle group
    const groupExercises = exercises.filter(
      e => e.muscleGroup === muscleGroup && allowedDifficulties.includes(e.difficulty)
    )
    
    if (groupExercises.length === 0) continue
    
    // Shuffle and pick exercises
    const shuffled = shuffle(groupExercises)
    const selected = shuffled.slice(0, exercisesPerGroup)
    
    for (const exercise of selected) {
      const sets = getSetsForEnergyLevel(exercise.defaultSets, energyLevel)
      const reps = getRepsForEnergyLevel(exercise.defaultReps, energyLevel)
      const exerciseTime = getTimePerExercise(sets, energyLevel)
      
      // Check if we have time for this exercise
      if (totalTime + exerciseTime > targetTime) break
      
      workout.push({
        exercise,
        sets,
        reps,
      })
      
      totalTime += exerciseTime
    }
  }
  
  // If we still have time, add more exercises
  while (totalTime < targetTime - 3) {
    // Get all exercises from selected muscle groups that we haven't used
    const usedNames = new Set(workout.map(w => w.exercise.name))
    const remaining = exercises.filter(
      e => 
        muscleGroups.includes(e.muscleGroup) && 
        !usedNames.has(e.name) &&
        allowedDifficulties.includes(e.difficulty)
    )
    
    if (remaining.length === 0) break
    
    const exercise = shuffle(remaining)[0]
    const sets = getSetsForEnergyLevel(exercise.defaultSets, energyLevel)
    const reps = getRepsForEnergyLevel(exercise.defaultReps, energyLevel)
    const exerciseTime = getTimePerExercise(sets, energyLevel)
    
    if (totalTime + exerciseTime > targetTime) break
    
    workout.push({
      exercise,
      sets,
      reps,
    })
    
    totalTime += exerciseTime
  }
  
  // Shuffle final workout to mix muscle groups
  return shuffle(workout)
}

// Get estimated workout duration
export function estimateWorkoutDuration(workout: GeneratedExercise[], energyLevel: EnergyLevel): number {
  return workout.reduce((total, w) => {
    return total + getTimePerExercise(w.sets, energyLevel)
  }, 0)
}


