"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { exercises, type ExerciseData } from "@/lib/exercises"
import { MUSCLE_GROUPS, type MuscleGroup } from "@/types"
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  Dumbbell,
  Info
} from "lucide-react"

export default function LibraryPage() {
  const [search, setSearch] = useState("")
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup | "all">("all")
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null)

  // Filter exercises based on search and muscle group
  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesSearch = search === "" || 
        exercise.name.toLowerCase().includes(search.toLowerCase()) ||
        exercise.description.toLowerCase().includes(search.toLowerCase())
      
      const matchesMuscleGroup = selectedMuscleGroup === "all" || 
        exercise.muscleGroup === selectedMuscleGroup ||
        exercise.secondaryMuscles?.includes(selectedMuscleGroup)
      
      return matchesSearch && matchesMuscleGroup
    })
  }, [search, selectedMuscleGroup])

  // Group exercises by muscle group for the "all" view
  const groupedExercises = useMemo(() => {
    if (selectedMuscleGroup !== "all") return null
    
    const groups: Record<MuscleGroup, ExerciseData[]> = {} as Record<MuscleGroup, ExerciseData[]>
    
    MUSCLE_GROUPS.forEach(mg => {
      groups[mg.id] = filteredExercises.filter(e => e.muscleGroup === mg.id)
    })
    
    return groups
  }, [filteredExercises, selectedMuscleGroup])

  const toggleExpand = (name: string) => {
    setExpandedExercise(expandedExercise === name ? null : name)
  }

  const ExerciseCard = ({ exercise, index }: { exercise: ExerciseData; index: number }) => {
    const isExpanded = expandedExercise === exercise.name
    
    return (
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 animate-slide-up",
          `stagger-${Math.min((index % 8) + 1, 8)}`,
          isExpanded && "ring-1 ring-[#FF0099]/50"
        )}
      >
        <button
          onClick={() => toggleExpand(exercise.name)}
          className="w-full p-4 text-left"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate">{exercise.name}</h3>
                <span className={cn(
                  "px-1.5 py-0.5 rounded text-xs shrink-0",
                  exercise.difficulty === "beginner" && "bg-green-500/20 text-green-400",
                  exercise.difficulty === "intermediate" && "bg-yellow-500/20 text-yellow-400",
                  exercise.difficulty === "advanced" && "bg-red-500/20 text-red-400"
                )}>
                  {exercise.difficulty}
                </span>
              </div>
              <p className="text-sm text-zinc-400 line-clamp-2">{exercise.description}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Dumbbell className="w-3 h-3" />
                  {exercise.equipment}
                </span>
                <span>•</span>
                <span>{exercise.defaultSets} × {exercise.defaultReps} reps</span>
              </div>
            </div>
            <div className="shrink-0 text-zinc-500">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </div>
        </button>
        
        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-zinc-800 pt-4 animate-slide-up">
            {/* Secondary Muscles */}
            {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">
                  Also Works
                </h4>
                <div className="flex flex-wrap gap-1">
                  {exercise.secondaryMuscles.map(muscle => (
                    <span 
                      key={muscle}
                      className="px-2 py-1 rounded-full text-xs bg-zinc-800 text-zinc-300 capitalize"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Instructions */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">
                Instructions
              </h4>
              <ol className="space-y-2">
                {exercise.instructions.map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm text-zinc-300">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#FF0099]/20 text-[#FF0099] text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            {/* Tips */}
            {exercise.tips && exercise.tips.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Tips
                </h4>
                <ul className="space-y-1">
                  {exercise.tips.map((tip, i) => (
                    <li key={i} className="flex gap-2 text-sm text-zinc-400">
                      <span className="text-[#FF0099]">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Card>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/5 via-zinc-950 to-zinc-950" />
      
      <div className="relative max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Exercise Library</h1>
          <p className="text-zinc-400">
            {exercises.length} kettlebell exercises to master
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Muscle Group Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-hide">
          <button
            onClick={() => setSelectedMuscleGroup("all")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              selectedMuscleGroup === "all"
                ? "bg-[#FF0099] text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
            )}
          >
            All ({exercises.length})
          </button>
          {MUSCLE_GROUPS.map(mg => {
            const count = exercises.filter(e => e.muscleGroup === mg.id).length
            return (
              <button
                key={mg.id}
                onClick={() => setSelectedMuscleGroup(mg.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2",
                  selectedMuscleGroup === mg.id
                    ? "bg-[#FF0099] text-white"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                )}
              >
                <span>{mg.icon}</span>
                <span>{mg.label}</span>
                <span className="opacity-60">({count})</span>
              </button>
            )
          })}
        </div>

        {/* Results Count */}
        {search && (
          <p className="text-sm text-zinc-400 mb-4">
            Found {filteredExercises.length} exercise{filteredExercises.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Exercise List */}
        {selectedMuscleGroup === "all" && !search ? (
          // Grouped view when showing all without search
          <div className="space-y-8">
            {MUSCLE_GROUPS.map(mg => {
              const groupExercises = groupedExercises?.[mg.id] || []
              if (groupExercises.length === 0) return null
              
              return (
                <div key={mg.id}>
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span>{mg.icon}</span>
                    <span>{mg.label}</span>
                    <span className="text-sm text-zinc-500 font-normal">
                      ({groupExercises.length})
                    </span>
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {groupExercises.map((exercise, index) => (
                      <ExerciseCard 
                        key={exercise.name} 
                        exercise={exercise} 
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          // Flat list when filtering
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredExercises.map((exercise, index) => (
              <ExerciseCard 
                key={exercise.name} 
                exercise={exercise} 
                index={index}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredExercises.length === 0 && (
          <Card className="p-8 text-center">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-zinc-400 mb-2">No exercises found</p>
            <p className="text-sm text-zinc-500">
              Try a different search term or muscle group
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

