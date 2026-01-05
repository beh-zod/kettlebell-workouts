"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MUSCLE_GROUPS, ENERGY_LEVELS, DURATION_OPTIONS, type MuscleGroup, type EnergyLevel } from "@/types"
import { generateWorkout } from "@/lib/workout-generator"
import { Sparkles, Clock, Zap, ChevronRight, Play } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>("medium")
  const [duration, setDuration] = useState<number>(30)
  const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroup[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasActiveWorkout, setHasActiveWorkout] = useState(false)

  // Check for active workout in localStorage
  useEffect(() => {
    const activeWorkout = localStorage.getItem("activeWorkout")
    const generatedWorkout = sessionStorage.getItem("generatedWorkout")
    setHasActiveWorkout(!!(activeWorkout && generatedWorkout))
  }, [])

  const toggleMuscle = (muscle: MuscleGroup) => {
    setSelectedMuscles(prev =>
      prev.includes(muscle)
        ? prev.filter(m => m !== muscle)
        : [...prev, muscle]
    )
  }

  const handleGenerate = async () => {
    if (selectedMuscles.length === 0) return
    
    setIsGenerating(true)
    
    // Generate workout
    const workout = generateWorkout({
      muscleGroups: selectedMuscles,
      energyLevel,
      duration,
    })
    
    // Store in sessionStorage for the workout page
    sessionStorage.setItem("generatedWorkout", JSON.stringify({
      exercises: workout,
      params: { energyLevel, duration, muscleGroups: selectedMuscles }
    }))
    
    // Small delay for animation
    await new Promise(resolve => setTimeout(resolve, 500))
    
    router.push("/workout/preview")
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/5 via-zinc-950 to-zinc-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#FF0099]/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-zinc-100 via-pink-200 to-zinc-100 bg-clip-text text-transparent">
            Today&apos;s Workout
          </h1>
          <p className="text-zinc-400 text-lg">
            Customize your kettlebell session
          </p>
        </div>

        {/* Resume Workout Banner */}
        {hasActiveWorkout && (
          <Card className="p-4 mb-6 bg-gradient-to-r from-[#FF0099]/10 to-purple-500/10 border-[#FF0099]/30 animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF0099]/20 flex items-center justify-center">
                  <Play className="w-5 h-5 text-[#FF0099]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Workout in Progress</h3>
                  <p className="text-sm text-zinc-400">Continue where you left off</p>
                </div>
              </div>
              <Button
                onClick={() => router.push("/workout")}
                size="sm"
                className="bg-[#FF0099] hover:bg-[#FF0099]/90"
              >
                Resume
              </Button>
            </div>
          </Card>
        )}

        {/* Energy Level */}
        <Card className="p-6 mb-6 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[#FF0099]" />
            <h2 className="text-lg font-semibold">Energy Level</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {ENERGY_LEVELS.map((level) => (
              <button
                key={level.id}
                onClick={() => setEnergyLevel(level.id)}
                className={cn(
                  "flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all",
                  energyLevel === level.id
                    ? "border-[#FF0099] bg-[#FF0099]/10 text-[#FF0099]"
                    : "border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-300"
                )}
              >
                <span className="text-2xl">
                  {level.id === "low" ? "🌙" : level.id === "medium" ? "☀️" : "🔥"}
                </span>
                <span className="font-medium">{level.label}</span>
                <span className="text-xs opacity-70 text-center hidden sm:block">
                  {level.description}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* Duration */}
        <Card className="p-6 mb-6 animate-slide-up stagger-1">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[#FF0099]" />
            <h2 className="text-lg font-semibold">Duration</h2>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {DURATION_OPTIONS.map((mins) => (
              <button
                key={mins}
                onClick={() => setDuration(mins)}
                className={cn(
                  "flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all",
                  duration === mins
                    ? "border-[#FF0099] bg-[#FF0099]/10 text-[#FF0099]"
                    : "border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-300"
                )}
              >
                <span className="text-xl font-bold">{mins}</span>
                <span className="text-xs opacity-70">min</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Muscle Groups */}
        <Card className="p-6 mb-8 animate-slide-up stagger-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💪</span>
              <h2 className="text-lg font-semibold">Target Muscles</h2>
            </div>
            {selectedMuscles.length > 0 && (
              <button
                onClick={() => setSelectedMuscles([])}
                className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {MUSCLE_GROUPS.map((muscle, index) => (
              <button
                key={muscle.id}
                onClick={() => toggleMuscle(muscle.id)}
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl border-2 transition-all text-left min-w-0",
                  `stagger-${index + 1}`,
                  selectedMuscles.includes(muscle.id)
                    ? "border-[#FF0099] bg-[#FF0099]/10 text-[#FF0099]"
                    : "border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-300"
                )}
              >
                <span className="text-base sm:text-lg flex-shrink-0">{muscle.icon}</span>
                <span className="text-xs sm:text-sm font-medium truncate">{muscle.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Generate Button */}
        <div className="animate-slide-up stagger-3">
          <Button
            size="xl"
            className={cn(
              "w-full gap-2 text-lg",
              selectedMuscles.length > 0 && "animate-pulse-glow"
            )}
            disabled={selectedMuscles.length === 0 || isGenerating}
            onClick={handleGenerate}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Workout
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </Button>
          
          {selectedMuscles.length === 0 && (
            <p className="text-center text-zinc-500 text-sm mt-3">
              Select at least one muscle group to continue
            </p>
          )}
        </div>

        {/* Quick Stats */}
        {selectedMuscles.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-zinc-500 animate-fade-in">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{duration} min workout</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💪</span>
              <span>{selectedMuscles.length} muscle group{selectedMuscles.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

