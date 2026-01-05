"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { exercises, type ExerciseData } from "@/lib/exercises"
import type { MuscleGroup } from "@/types"
import { 
  X, 
  Search, 
  ArrowRight,
  Dumbbell,
  Check
} from "lucide-react"

interface SwapExerciseModalProps {
  currentExercise: ExerciseData
  onSwap: (newExercise: ExerciseData) => void
  onClose: () => void
}

export function SwapExerciseModal({ 
  currentExercise, 
  onSwap, 
  onClose 
}: SwapExerciseModalProps) {
  const [search, setSearch] = useState("")
  const [selectedExercise, setSelectedExercise] = useState<ExerciseData | null>(null)

  // Get alternative exercises - same muscle group but different exercise
  const alternatives = useMemo(() => {
    const muscleGroup = currentExercise.muscleGroup
    
    return exercises.filter(e => {
      // Must be same muscle group
      const sameMuscleGroup = e.muscleGroup === muscleGroup
      // Must not be the current exercise
      const notCurrent = e.name !== currentExercise.name
      // Must match search if provided
      const matchesSearch = search === "" || 
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase())
      
      return sameMuscleGroup && notCurrent && matchesSearch
    })
  }, [currentExercise, search])

  // Also show exercises that work this muscle as secondary
  const relatedExercises = useMemo(() => {
    if (search === "") return []
    
    return exercises.filter(e => {
      const hasAsSecondary = e.secondaryMuscles?.includes(currentExercise.muscleGroup)
      const notCurrent = e.name !== currentExercise.name
      const notAlternative = e.muscleGroup !== currentExercise.muscleGroup
      const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase())
      
      return hasAsSecondary && notCurrent && notAlternative && matchesSearch
    })
  }, [currentExercise, search])

  const handleConfirmSwap = () => {
    if (selectedExercise) {
      onSwap(selectedExercise)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[80vh] flex flex-col bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Swap Exercise</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Current Exercise */}
          <div className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
            <span>Replacing:</span>
            <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-200 font-medium">
              {currentExercise.name}
            </span>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search alternatives..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>
        </div>

        {/* Alternatives List */}
        <div className="flex-1 overflow-y-auto p-4">
          {alternatives.length === 0 && relatedExercises.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">
              <p>No alternatives found</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Main Alternatives */}
              {alternatives.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">
                    Same Muscle Group ({alternatives.length})
                  </h3>
                  <div className="space-y-2">
                    {alternatives.map(exercise => (
                      <ExerciseOption
                        key={exercise.name}
                        exercise={exercise}
                        isSelected={selectedExercise?.name === exercise.name}
                        onSelect={() => setSelectedExercise(exercise)}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Related Exercises */}
              {relatedExercises.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">
                    Also Works {currentExercise.muscleGroup} ({relatedExercises.length})
                  </h3>
                  <div className="space-y-2">
                    {relatedExercises.map(exercise => (
                      <ExerciseOption
                        key={exercise.name}
                        exercise={exercise}
                        isSelected={selectedExercise?.name === exercise.name}
                        onSelect={() => setSelectedExercise(exercise)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
          {selectedExercise ? (
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 text-sm">
                <span className="text-zinc-400 truncate">{currentExercise.name}</span>
                <ArrowRight className="w-4 h-4 text-[#FF0099] shrink-0" />
                <span className="text-zinc-200 font-medium truncate">{selectedExercise.name}</span>
              </div>
              <Button onClick={handleConfirmSwap} className="shrink-0">
                <Check className="w-4 h-4 mr-1" />
                Confirm
              </Button>
            </div>
          ) : (
            <p className="text-sm text-zinc-500 text-center">
              Select an exercise to swap
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function ExerciseOption({ 
  exercise, 
  isSelected, 
  onSelect 
}: { 
  exercise: ExerciseData
  isSelected: boolean
  onSelect: () => void 
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full p-3 rounded-lg text-left transition-all",
        isSelected
          ? "bg-[#FF0099]/20 ring-1 ring-[#FF0099]"
          : "bg-zinc-800/50 hover:bg-zinc-800"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium truncate">{exercise.name}</span>
            <span className={cn(
              "px-1.5 py-0.5 rounded text-xs shrink-0",
              exercise.difficulty === "beginner" && "bg-green-500/20 text-green-400",
              exercise.difficulty === "intermediate" && "bg-yellow-500/20 text-yellow-400",
              exercise.difficulty === "advanced" && "bg-red-500/20 text-red-400"
            )}>
              {exercise.difficulty}
            </span>
          </div>
          <p className="text-xs text-zinc-400 line-clamp-1">{exercise.description}</p>
          <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <Dumbbell className="w-3 h-3" />
              {exercise.equipment}
            </span>
            <span>•</span>
            <span>{exercise.defaultSets} × {exercise.defaultReps}</span>
          </div>
        </div>
        {isSelected && (
          <div className="shrink-0 w-5 h-5 rounded-full bg-[#FF0099] flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    </button>
  )
}

