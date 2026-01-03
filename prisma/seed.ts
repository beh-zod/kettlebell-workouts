import { PrismaClient } from "@prisma/client"
import { exercises } from "../src/lib/exercises"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding exercises...")
  
  for (const exercise of exercises) {
    await prisma.exercise.upsert({
      where: { 
        id: exercise.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
      },
      update: {},
      create: {
        id: exercise.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        name: exercise.name,
        muscleGroup: exercise.muscleGroup,
        secondaryMuscles: exercise.secondaryMuscles?.join(",") || null,
        difficulty: exercise.difficulty,
        equipment: exercise.equipment,
        description: exercise.description,
        instructions: JSON.stringify(exercise.instructions),
        tips: exercise.tips ? JSON.stringify(exercise.tips) : null,
        defaultReps: exercise.defaultReps,
        defaultSets: exercise.defaultSets,
      },
    })
  }
  
  console.log(`Seeded ${exercises.length} exercises`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

