"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar, Dumbbell, Clock, TrendingUp, LogIn, X, Trash2, ChevronRight } from "lucide-react"

interface WorkoutExercise {
  id: string
  exerciseId: string
  orderIndex: number
  plannedSets: number
  plannedReps: number
  actualSets: number
  actualReps: string
  weight: number | null
  completed: boolean
  skipped: boolean
  exercise: {
    id: string
    name: string
    muscleGroup: string
  }
}

interface WorkoutData {
  id: string
  completedAt: string
  duration: number
  muscleGroups: string
  totalVolume: number | null
  exercises: WorkoutExercise[]
}

const muscleGroupColors: Record<string, string> = {
  back: "bg-blue-500/20 text-blue-400",
  biceps: "bg-purple-500/20 text-purple-400",
  chest: "bg-red-500/20 text-red-400",
  triceps: "bg-orange-500/20 text-orange-400",
  glutes: "bg-pink-500/20 text-pink-400",
  shoulders: "bg-cyan-500/20 text-cyan-400",
  flexibility: "bg-green-500/20 text-green-400",
  mobility: "bg-[#FF0099]/20 text-[#FF0099]",
  core: "bg-yellow-500/20 text-yellow-400",
}

export default function HistoryPage() {
  const { data: session } = useSession()
  const [view, setView] = useState<"list" | "calendar">("list")
  const [workouts, setWorkouts] = useState<WorkoutData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutData | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    if (session?.user?.id) {
      fetchWorkouts()
    } else {
      setIsLoading(false)
    }
  }, [session])

  const fetchWorkouts = async () => {
    try {
      const response = await fetch("/api/workouts")
      if (response.ok) {
        const data = await response.json()
        setWorkouts(data)
      }
    } catch (error) {
      console.error("Failed to fetch workouts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteWorkout = async (workoutId: string) => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/workouts/${workoutId}`, {
        method: "DELETE"
      })

      if (response.ok) {
        setWorkouts(prev => prev.filter(w => w.id !== workoutId))
        setSelectedWorkout(null)
        setDeleteConfirm(null)
      } else {
        console.error("Failed to delete workout")
      }
    } catch (error) {
      console.error("Error deleting workout:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-2xl font-bold mb-2">Track Your Progress</h1>
          <p className="text-zinc-400 mb-6">
            Sign in to save your workouts and track your progress over time.
          </p>
          <Button asChild>
            <Link href="/login">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF0099]/30 border-t-[#FF0099] rounded-full animate-spin" />
      </div>
    )
  }

  const completedWorkouts = workouts.filter(w => w.completedAt)
  const thisWeekWorkouts = completedWorkouts.filter(w => {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return new Date(w.completedAt) >= weekAgo
  })

  const totalWorkouts = completedWorkouts.length
  const totalMinutes = completedWorkouts.reduce((sum, w) => sum + w.duration, 0)
  const avgDuration = totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/5 via-zinc-950 to-zinc-950" />

      <div className="relative max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Workout History</h1>
            <p className="text-zinc-400">Track your kettlebell journey</p>
          </div>
          <div className="flex gap-1 p-1 bg-zinc-800/50 rounded-lg">
            <button
              onClick={() => setView("list")}
              className={cn(
                "px-3 py-1.5 rounded text-sm font-medium transition-colors",
                view === "list" ? "bg-zinc-700 text-zinc-100" : "text-zinc-400 hover:text-zinc-300"
              )}
            >
              List
            </button>
            <button
              onClick={() => setView("calendar")}
              className={cn(
                "px-3 py-1.5 rounded text-sm font-medium transition-colors",
                view === "calendar" ? "bg-zinc-700 text-zinc-100" : "text-zinc-400 hover:text-zinc-300"
              )}
            >
              Calendar
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF0099]/20 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-[#FF0099]" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalWorkouts}</div>
                <div className="text-xs text-zinc-500">Total Workouts</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{thisWeekWorkouts.length}</div>
                <div className="text-xs text-zinc-500">This Week</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{avgDuration}</div>
                <div className="text-xs text-zinc-500">Avg Duration (min)</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalMinutes}</div>
                <div className="text-xs text-zinc-500">Total Minutes</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Workout List */}
        {view === "list" && (
          <div className="space-y-4">
            {completedWorkouts.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-4xl mb-4">🏋️</div>
                <h2 className="text-xl font-semibold mb-2">No workouts yet</h2>
                <p className="text-zinc-400 mb-4">Complete your first workout to start tracking!</p>
                <Button asChild>
                  <Link href="/">Start Workout</Link>
                </Button>
              </Card>
            ) : (
              completedWorkouts.map((workout, index) => {
                const muscleGroupsArray = workout.muscleGroups.split(",")
                const totalSets = workout.exercises.reduce((sum, ex) => sum + (ex.actualSets || 0), 0)
                const totalReps = workout.exercises.reduce((sum, ex) => {
                  try {
                    const reps = JSON.parse(ex.actualReps || "[]") as number[]
                    return sum + reps.reduce((a, b) => a + b, 0)
                  } catch {
                    return sum
                  }
                }, 0)

                return (
                  <Card
                    key={workout.id}
                    className={cn(
                      "p-4 hover:border-zinc-700 transition-colors cursor-pointer animate-slide-up group",
                      `stagger-${index + 1}`
                    )}
                    onClick={() => setSelectedWorkout(workout)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg font-semibold">
                            {new Date(workout.completedAt).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric"
                            })}
                          </span>
                          <span className="text-sm text-zinc-500">
                            {workout.duration} min
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {muscleGroupsArray.map(group => (
                            <span
                              key={group}
                              className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                                muscleGroupColors[group] || "bg-zinc-700 text-zinc-300"
                              )}
                            >
                              {group}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex gap-6 text-center">
                          <div>
                            <div className="text-xl font-bold text-[#FF0099]">{workout.exercises.length}</div>
                            <div className="text-xs text-zinc-500">Exercises</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold">{totalSets}</div>
                            <div className="text-xs text-zinc-500">Sets</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold">{totalReps}</div>
                            <div className="text-xs text-zinc-500">Reps</div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                      </div>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        )}

        {/* Calendar View */}
        {view === "calendar" && (
          <Card className="p-6">
            <div className="text-center text-zinc-400">
              <div className="text-4xl mb-4">📅</div>
              <p>Calendar view coming soon!</p>
              <p className="text-sm mt-2">Track your workout consistency at a glance.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Workout Detail Modal */}
      {selectedWorkout && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Workout Details</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  {new Date(selectedWorkout.completedAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </p>
              </div>
              <button
                onClick={() => setSelectedWorkout(null)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Workout Summary */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-[#FF0099]">{selectedWorkout.exercises.length}</div>
                  <div className="text-xs text-zinc-500 mt-1">Exercises</div>
                </div>
                <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                  <div className="text-2xl font-bold">{selectedWorkout.duration}</div>
                  <div className="text-xs text-zinc-500 mt-1">Minutes</div>
                </div>
                <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                  <div className="text-2xl font-bold">{selectedWorkout.totalVolume || 0}</div>
                  <div className="text-xs text-zinc-500 mt-1">Total Volume</div>
                </div>
              </div>

              {/* Muscle Groups */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-zinc-400 mb-2">Muscle Groups</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedWorkout.muscleGroups.split(",").map(group => (
                    <span
                      key={group}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium capitalize",
                        muscleGroupColors[group] || "bg-zinc-700 text-zinc-300"
                      )}
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </div>

              {/* Exercises */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-400">Exercises</h3>
                {selectedWorkout.exercises
                  .sort((a, b) => a.orderIndex - b.orderIndex)
                  .map((exercise, idx) => {
                    const reps = JSON.parse(exercise.actualReps || "[]") as number[]
                    return (
                      <Card key={exercise.id} className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-white">{exercise.exercise.name}</h4>
                            <p className="text-xs text-zinc-500 capitalize">{exercise.exercise.muscleGroup}</p>
                          </div>
                          {exercise.skipped && (
                            <span className="text-xs px-2 py-1 bg-zinc-700 text-zinc-400 rounded">Skipped</span>
                          )}
                          {!exercise.skipped && exercise.completed && (
                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Completed</span>
                          )}
                        </div>

                        {!exercise.skipped && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-zinc-400">
                                Sets: <span className="text-white font-medium">{exercise.actualSets}</span>
                              </span>
                              {exercise.weight && (
                                <span className="text-zinc-400">
                                  Weight: <span className="text-white font-medium">{exercise.weight} kg</span>
                                </span>
                              )}
                            </div>

                            {reps.length > 0 && (
                              <div>
                                <p className="text-xs text-zinc-500 mb-2">Reps per set:</p>
                                <div className="flex flex-wrap gap-2">
                                  {reps.map((rep, repIdx) => (
                                    <span
                                      key={repIdx}
                                      className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded text-sm font-mono"
                                    >
                                      {rep}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Card>
                    )
                  })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-zinc-800">
              {deleteConfirm === selectedWorkout.id ? (
                <div className="space-y-3">
                  <p className="text-sm text-zinc-400 text-center">
                    Are you sure you want to delete this workout? This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setDeleteConfirm(null)}
                      disabled={isDeleting}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-red-500 hover:bg-red-600"
                      onClick={() => handleDeleteWorkout(selectedWorkout.id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Workout
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedWorkout(null)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
                    onClick={() => setDeleteConfirm(selectedWorkout.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
