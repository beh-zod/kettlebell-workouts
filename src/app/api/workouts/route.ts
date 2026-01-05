import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const {
      userId,
      energyLevel,
      duration,
      muscleGroups,
      exercises,
      startTime,
      completedAt
    } = body

    // Verify userId matches session
    if (userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    // Calculate total volume (weight * reps * sets)
    const totalVolume = exercises.reduce((sum: number, ex: any) => {
      const volume = (ex.weight || 0) * ex.actualSets *
        (ex.actualReps?.reduce((a: number, b: number) => a + b, 0) || 0)
      return sum + volume
    }, 0)

    // Create workout with exercises
    const workout = await db.workout.create({
      data: {
        userId,
        energyLevel,
        duration,
        muscleGroups: Array.isArray(muscleGroups)
          ? muscleGroups.join(",")
          : muscleGroups,
        totalVolume: Math.round(totalVolume),
        createdAt: startTime ? new Date(startTime) : new Date(),
        completedAt: completedAt ? new Date(completedAt) : new Date(),
        exercises: {
          create: exercises.map((ex: any) => ({
            exerciseId: ex.exerciseId,
            orderIndex: ex.orderIndex,
            plannedSets: ex.plannedSets,
            plannedReps: ex.plannedReps,
            actualSets: ex.actualSets,
            actualReps: JSON.stringify(ex.actualReps),
            weight: ex.weight,
            completed: ex.completed,
            skipped: ex.skipped
          }))
        }
      },
      include: {
        exercises: true
      }
    })

    return NextResponse.json(workout)
  } catch (error) {
    console.error("Error saving workout:", error)
    return NextResponse.json(
      { error: "Failed to save workout" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get("limit") || "20")
    const offset = parseInt(searchParams.get("offset") || "0")

    const workouts = await db.workout.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        exercises: {
          include: {
            exercise: true
          }
        }
      },
      orderBy: {
        completedAt: "desc"
      },
      take: limit,
      skip: offset
    })

    return NextResponse.json(workouts)
  } catch (error) {
    console.error("Error fetching workouts:", error)
    return NextResponse.json(
      { error: "Failed to fetch workouts" },
      { status: 500 }
    )
  }
}
