import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const workout = await db.workout.findUnique({
      where: {
        id: params.id
      },
      include: {
        exercises: {
          include: {
            exercise: true
          },
          orderBy: {
            orderIndex: "asc"
          }
        }
      }
    })

    if (!workout) {
      return NextResponse.json(
        { error: "Workout not found" },
        { status: 404 }
      )
    }

    // Verify ownership
    if (workout.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    return NextResponse.json(workout)
  } catch (error) {
    console.error("Error fetching workout:", error)
    return NextResponse.json(
      { error: "Failed to fetch workout" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { exercises, completedAt, notes, rating } = body

    // Verify ownership
    const existingWorkout = await db.workout.findUnique({
      where: { id: params.id }
    })

    if (!existingWorkout) {
      return NextResponse.json(
        { error: "Workout not found" },
        { status: 404 }
      )
    }

    if (existingWorkout.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    // Update workout exercises if provided
    if (exercises) {
      await Promise.all(
        exercises.map((ex: any) =>
          db.workoutExercise.update({
            where: {
              workoutId_exerciseId_orderIndex: {
                workoutId: params.id,
                exerciseId: ex.exerciseId,
                orderIndex: ex.orderIndex
              }
            },
            data: {
              actualSets: ex.actualSets,
              actualReps: JSON.stringify(ex.actualReps),
              weight: ex.weight,
              completed: ex.completed,
              skipped: ex.skipped
            }
          })
        )
      )

      // Recalculate total volume
      const totalVolume = exercises.reduce((sum: number, ex: any) => {
        const volume = (ex.weight || 0) * ex.actualSets *
          (ex.actualReps?.reduce((a: number, b: number) => a + b, 0) || 0)
        return sum + volume
      }, 0)

      await db.workout.update({
        where: { id: params.id },
        data: {
          totalVolume: Math.round(totalVolume)
        }
      })
    }

    // Update workout metadata
    const workout = await db.workout.update({
      where: { id: params.id },
      data: {
        completedAt: completedAt ? new Date(completedAt) : undefined,
        notes,
        rating
      },
      include: {
        exercises: {
          include: {
            exercise: true
          }
        }
      }
    })

    return NextResponse.json(workout)
  } catch (error) {
    console.error("Error updating workout:", error)
    return NextResponse.json(
      { error: "Failed to update workout" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Verify ownership
    const workout = await db.workout.findUnique({
      where: { id: params.id }
    })

    if (!workout) {
      return NextResponse.json(
        { error: "Workout not found" },
        { status: 404 }
      )
    }

    if (workout.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    await db.workout.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting workout:", error)
    return NextResponse.json(
      { error: "Failed to delete workout" },
      { status: 500 }
    )
  }
}
