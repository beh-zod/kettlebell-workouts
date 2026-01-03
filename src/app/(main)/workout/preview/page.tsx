"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ExerciseData } from "@/lib/exercises"
import type { EnergyLevel, MuscleGroup } from "@/types"
import { 
  ChevronLeft, 
  ChevronUp,
  ChevronDown,
  Play,
  GripVertical,
  X,
  Clock,
  Dumbbell
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

export default function WorkoutPreviewPage() {
  const router = useRouter()
  const [workout, setWorkout] = useState<WorkoutData | null>(null)
  const [exercises, setExercises] = useState<GeneratedExercise[]>([])

  useEffect(() => {
    const stored = sessionStorage.getItem("generatedWorkout")
    if (stored) {
      const data = JSON.parse(stored) as WorkoutData
      setWorkout(data)
      setExercises(data.exercises)
    } else {
      router.push("/")
    }
  }, [router])

  const moveExercise = (index: number, direction: "up" | "down") => {
    const newExercises = [...exercises]
    const newIndex = direction === "up" ? index - 1 : index + 1
    
    if (newIndex < 0 || newIndex >= exercises.length) return
    
    // Swap
    [newExercises[index], newExercises[newIndex]] = [newExercises[newIndex], newExercises[index]]
    setExercises(newExercises)
  }

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const startWorkout = () => {
    if (!workout) return
    
    // Save the reordered exercises
    sessionStorage.setItem("generatedWorkout", JSON.stringify({
      ...workout,
      exercises: exercises
    }))
    
    router.push("/workout")
  }

  if (!workout) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF0099]/30 border-t-[#FF0099] rounded-full animate-spin" />
      </div>
    )
  }

  const totalSets = exercises.reduce((sum, e) => sum + e.sets, 0)
  const totalReps = exercises.reduce((sum, e) => sum + (e.sets * e.reps), 0)

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/5 via-zinc-950 to-zinc-950" />
      
      <div className="relative max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          
          <h1 className="text-xl font-bold">Your Workout</h1>
          
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center gap-2 text-[#FF0099] mb-1">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold">{exercises.length}</div>
            <div className="text-xs text-zinc-500">Exercises</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center gap-2 text-[#FF0099] mb-1">
              <span className="text-sm">📊</span>
            </div>
            <div className="text-2xl font-bold">{totalSets}</div>
            <div className="text-xs text-zinc-500">Total Sets</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center gap-2 text-[#FF0099] mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold">~{workout.params.duration}</div>
            <div className="text-xs text-zinc-500">Minutes</div>
          </Card>
        </div>

        {/* Instructions */}
        <p className="text-sm text-zinc-400 text-center mb-4">
          Drag to reorder or remove exercises you don&apos;t want
        </p>

        {/* Exercise List */}
        <div className="space-y-2 mb-6">
          {exercises.map((item, index) => (
            <Card
              key={`${item.exercise.name}-${index}`}
              className={cn(
                "p-4 animate-slide-up transition-all",
                `stagger-${Math.min(index + 1, 8)}`
              )}
            >
              <div className="flex items-center gap-3">
                {/* Drag Handle & Order */}
                <div className="flex items-center gap-2 text-zinc-500">
                  <GripVertical className="w-4 h-4" />
                  <span className="text-sm font-mono w-5">{index + 1}</span>
                </div>

                {/* Exercise Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.exercise.name}</div>
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-xs",
                      item.exercise.difficulty === "beginner" && "bg-green-500/20 text-green-400",
                      item.exercise.difficulty === "intermediate" && "bg-yellow-500/20 text-yellow-400",
                      item.exercise.difficulty === "advanced" && "bg-red-500/20 text-red-400"
                    )}>
                      {item.exercise.difficulty}
                    </span>
                    <span>•</span>
                    <span>{item.sets} × {item.reps}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveExercise(index, "up")}
                    disabled={index === 0}
                    className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      index === 0 
                        ? "text-zinc-700 cursor-not-allowed" 
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                    )}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveExercise(index, "down")}
                    disabled={index === exercises.length - 1}
                    className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      index === exercises.length - 1 
                        ? "text-zinc-700 cursor-not-allowed" 
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                    )}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeExercise(index)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {exercises.length === 0 && (
          <Card className="p-8 text-center mb-6">
            <div className="text-4xl mb-2">🤷</div>
            <p className="text-zinc-400">No exercises left!</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push("/")}
            >
              Generate New Workout
            </Button>
          </Card>
        )}

        {/* Start Button */}
        {exercises.length > 0 && (
          <Button
            size="xl"
            className="w-full gap-2 text-lg animate-pulse-glow"
            onClick={startWorkout}
          >
            <Play className="w-5 h-5" />
            Start Workout
          </Button>
        )}
      </div>
    </div>
  )
}

