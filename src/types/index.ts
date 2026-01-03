export type MuscleGroup = 
  | 'back'
  | 'biceps'
  | 'chest'
  | 'triceps'
  | 'glutes'
  | 'shoulders'
  | 'core'
  | 'flexibility'
  | 'mobility'

export type EnergyLevel = 'low' | 'medium' | 'high'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type UnitPreference = 'kg' | 'lbs'

export interface Exercise {
  id: string
  name: string
  muscleGroup: MuscleGroup
  secondaryMuscles?: string[]
  difficulty: Difficulty
  equipment: string
  description: string
  instructions: string[]
  tips?: string[]
  defaultReps: number
  defaultSets: number
  imageUrl?: string
}

export interface WorkoutExercise {
  id: string
  exercise: Exercise
  orderIndex: number
  plannedSets: number
  plannedReps: number
  actualSets?: number
  actualReps?: number[]
  weight?: number
  completed: boolean
  skipped: boolean
}

export interface Workout {
  id: string
  userId: string
  createdAt: Date
  completedAt?: Date
  energyLevel: EnergyLevel
  duration: number
  muscleGroups: MuscleGroup[]
  exercises: WorkoutExercise[]
  totalVolume?: number
  notes?: string
  rating?: number
}

export interface WorkoutParams {
  energyLevel: EnergyLevel
  duration: number // in minutes
  muscleGroups: MuscleGroup[]
}

export interface UserPreferences {
  units: UnitPreference
  theme: 'light' | 'dark' | 'system'
}

// Muscle group display configuration
export const MUSCLE_GROUPS: { id: MuscleGroup; label: string; icon: string }[] = [
  { id: 'back', label: 'Back', icon: '🔙' },
  { id: 'biceps', label: 'Biceps', icon: '💪' },
  { id: 'chest', label: 'Chest', icon: '🫁' },
  { id: 'triceps', label: 'Triceps', icon: '💪' },
  { id: 'glutes', label: 'Glutes', icon: '🍑' },
  { id: 'shoulders', label: 'Shoulders', icon: '🤷' },
  { id: 'core', label: 'Core', icon: '🎯' },
  { id: 'flexibility', label: 'Flexibility', icon: '🧘' },
  { id: 'mobility', label: 'Mobility', icon: '🔄' },
]

export const ENERGY_LEVELS: { id: EnergyLevel; label: string; description: string }[] = [
  { id: 'low', label: 'Low', description: 'Easier workout, longer rests' },
  { id: 'medium', label: 'Medium', description: 'Balanced intensity' },
  { id: 'high', label: 'High', description: 'Challenging, shorter rests' },
]

export const DURATION_OPTIONS = [15, 30, 45, 60] as const

