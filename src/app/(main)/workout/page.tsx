"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn, formatWeight, getKettlebellWeights } from "@/lib/utils"
import type { ExerciseData } from "@/lib/exercises"
import type { EnergyLevel, MuscleGroup } from "@/types"
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  SkipForward, 
  Minus, 
  Plus,
  Trophy,
  RotateCcw,
  Home
} from "lucide-react"

interface GeneratedExercise {
  exercise: ExerciseData
  sets: number
  reps: number
}

interface WorkoutData {
  exercises: GeneratedExercise[]
  params: {
    energyLevel: EnergyLevel
    duration: number
    muscleGroups: MuscleGroup[]
  }
}

interface ExerciseProgress {
  completedSets: number[]
  weight: number
  reps: number
  skipped: boolean
}

export default function WorkoutPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [workout, setWorkout] = useState<WorkoutData | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState<Map<number, ExerciseProgress>>(new Map())
  const [units, setUnits] = useState<"kg" | "lbs">("lbs")
  const [workoutComplete, setWorkoutComplete] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem("generatedWorkout")
    if (stored) {
      const data = JSON.parse(stored) as WorkoutData
      setWorkout(data)
      
      // Initialize progress for each exercise
      const initialProgress = new Map<number, ExerciseProgress>()
      data.exercises.forEach((ex, i) => {
        initialProgress.set(i, {
          completedSets: [],
          weight: 16, // Default 16kg
          reps: ex.reps,
          skipped: false,
        })
      })
      setProgress(initialProgress)
    } else {
      router.push("/")
    }
  }, [router])

  if (!workout) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF0099]/30 border-t-[#FF0099] rounded-full animate-spin" />
      </div>
    )
  }

  const currentExercise = workout.exercises[currentIndex]
  const currentProgress = progress.get(currentIndex) || {
    completedSets: [],
    weight: 16,
    reps: currentExercise.reps,
    skipped: false,
  }

  const totalExercises = workout.exercises.length
  const completedExercises = Array.from(progress.values()).filter(
    p => p.skipped || p.completedSets.length >= workout.exercises[0]?.sets
  ).length

  const weights = getKettlebellWeights(units)
  const currentWeightIndex = weights.indexOf(
    units === "kg" ? currentProgress.weight : Math.round(currentProgress.weight * 2.205)
  )

  const updateProgress = (updates: Partial<ExerciseProgress>) => {
    setProgress(prev => {
      const newMap = new Map(prev)
      newMap.set(currentIndex, { ...currentProgress, ...updates })
      return newMap
    })
  }

  const completeSet = () => {
    const newCompletedSets = [...currentProgress.completedSets, currentProgress.reps]
    updateProgress({ completedSets: newCompletedSets })
    
    // If all sets done, auto-advance after delay
    if (newCompletedSets.length >= currentExercise.sets) {
      setTimeout(() => {
        if (currentIndex < totalExercises - 1) {
          setCurrentIndex(currentIndex + 1)
        } else {
          setWorkoutComplete(true)
        }
      }, 1000)
    }
  }

  const skipExercise = () => {
    updateProgress({ skipped: true })
    if (currentIndex < totalExercises - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setWorkoutComplete(true)
    }
  }

  const adjustWeight = (direction: "up" | "down") => {
    const newIndex = direction === "up" 
      ? Math.min(currentWeightIndex + 1, weights.length - 1)
      : Math.max(currentWeightIndex - 1, 0)
    const newWeight = units === "kg" ? weights[newIndex] : Math.round(weights[newIndex] / 2.205)
    updateProgress({ weight: newWeight })
  }

  const adjustReps = (direction: "up" | "down") => {
    const newReps = direction === "up"
      ? currentProgress.reps + 1
      : Math.max(1, currentProgress.reps - 1)
    updateProgress({ reps: newReps })
  }

  if (workoutComplete) {
    const totalSets = Array.from(progress.values()).reduce(
      (sum, p) => sum + p.completedSets.length, 0
    )
    const totalReps = Array.from(progress.values()).reduce(
      (sum, p) => sum + p.completedSets.reduce((s, r) => s + r, 0), 0
    )

    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center animate-slide-up">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold mb-2">Workout Complete!</h1>
          <p className="text-zinc-400 mb-6">Great job pushing through today</p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-zinc-800/50">
              <div className="text-2xl font-bold text-[#FF0099]">{completedExercises}</div>
              <div className="text-xs text-zinc-500">Exercises</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-800/50">
              <div className="text-2xl font-bold text-[#FF0099]">{totalSets}</div>
              <div className="text-xs text-zinc-500">Sets</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-800/50">
              <div className="text-2xl font-bold text-[#FF0099]">{totalReps}</div>
              <div className="text-xs text-zinc-500">Reps</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/")}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                setCurrentIndex(0)
                setWorkoutComplete(false)
                const resetProgress = new Map<number, ExerciseProgress>()
                workout.exercises.forEach((ex, i) => {
                  resetProgress.set(i, {
                    completedSets: [],
                    weight: 16,
                    reps: ex.reps,
                    skipped: false,
                  })
                })
                setProgress(resetProgress)
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/5 via-zinc-950 to-zinc-950" />
      
      <div className="relative max-w-2xl mx-auto px-4 py-6">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Exit
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">
              {currentIndex + 1} / {totalExercises}
            </span>
            <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FF0099] transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalExercises) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => setUnits("kg")}
              className={cn(
                "px-2 py-1 text-xs rounded",
                units === "kg" ? "bg-[#FF0099] text-white" : "text-zinc-500"
              )}
            >
              kg
            </button>
            <button
              onClick={() => setUnits("lbs")}
              className={cn(
                "px-2 py-1 text-xs rounded",
                units === "lbs" ? "bg-[#FF0099] text-white" : "text-zinc-500"
              )}
            >
              lbs
            </button>
          </div>
        </div>

        {/* Exercise Card */}
        <Card className="p-6 mb-6 animate-slide-up">
          {/* Exercise Visual Placeholder */}
          <div className="aspect-video bg-zinc-800/50 rounded-xl mb-6 flex items-center justify-center border border-zinc-700/50">
            <div className="text-center">
              <div className="text-6xl mb-2">🏋️</div>
              <p className="text-zinc-500 text-sm">Animation coming soon</p>
            </div>
          </div>

          {/* Exercise Info */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">{currentExercise.exercise.name}</h1>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className={cn(
                "px-2 py-0.5 rounded-full",
                currentExercise.exercise.difficulty === "beginner" && "bg-green-500/20 text-green-400",
                currentExercise.exercise.difficulty === "intermediate" && "bg-yellow-500/20 text-yellow-400",
                currentExercise.exercise.difficulty === "advanced" && "bg-red-500/20 text-red-400"
              )}>
                {currentExercise.exercise.difficulty}
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">{currentExercise.exercise.equipment}</span>
            </div>
            <p className="text-zinc-500 mt-2">{currentExercise.exercise.description}</p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Sets */}
            <div className="text-center">
              <div className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Sets</div>
              <div className="text-3xl font-bold">
                <span className="text-[#FF0099]">{currentProgress.completedSets.length}</span>
                <span className="text-zinc-600"> / {currentExercise.sets}</span>
              </div>
            </div>

            {/* Reps */}
            <div className="text-center">
              <div className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Reps</div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => adjustReps("down")}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-3xl font-bold w-12">{currentProgress.reps}</span>
                <button
                  onClick={() => adjustReps("up")}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weight */}
            <div className="text-center">
              <div className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Weight</div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => adjustWeight("down")}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-2xl font-bold w-16">
                  {formatWeight(currentProgress.weight, units)}
                </span>
                <button
                  onClick={() => adjustWeight("up")}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Set Progress Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: currentExercise.sets }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  i < currentProgress.completedSets.length
                    ? "bg-[#FF0099]"
                    : "bg-zinc-700"
                )}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={skipExercise}
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip
            </Button>
            <Button
              className="flex-[2]"
              onClick={completeSet}
              disabled={currentProgress.completedSets.length >= currentExercise.sets}
            >
              <Check className="w-4 h-4 mr-2" />
              {currentProgress.completedSets.length >= currentExercise.sets
                ? "All Sets Done!"
                : `Complete Set ${currentProgress.completedSets.length + 1}`
              }
            </Button>
          </div>
        </Card>

        {/* Exercise Navigation */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            disabled={currentIndex === totalExercises - 1}
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Instructions */}
        <Card className="p-4 mt-6 animate-slide-up stagger-1">
          <h3 className="font-semibold mb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-zinc-400">
            {currentExercise.exercise.instructions.map((instruction, i) => (
              <li key={i}>{instruction}</li>
            ))}
          </ol>
          {currentExercise.exercise.tips && currentExercise.exercise.tips.length > 0 && (
            <>
              <h4 className="font-medium mt-4 mb-2 text-[#FF0099]">Tips</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-zinc-400">
                {currentExercise.exercise.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

