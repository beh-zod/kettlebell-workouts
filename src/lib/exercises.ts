import type { MuscleGroup, Difficulty } from "@/types"

export interface ExerciseData {
  id: string
  name: string
  muscleGroup: MuscleGroup
  secondaryMuscles?: MuscleGroup[]
  difficulty: Difficulty
  equipment: string
  description: string
  instructions: string[]
  tips?: string[]
  defaultReps: number
  defaultSets: number
}

// Helper function to generate ID from exercise name (matches seed.ts logic)
function generateExerciseId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

const rawExercises = [
  // BACK EXERCISES
  {
    name: "Single-Arm Row",
    muscleGroup: "back",
    secondaryMuscles: ["biceps"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Bent-over row targeting lats and upper back",
    instructions: [
      "Place one hand on a bench or sturdy surface",
      "Hold kettlebell in opposite hand, arm hanging straight",
      "Pull kettlebell to hip, keeping elbow close to body",
      "Lower with control and repeat"
    ],
    tips: ["Keep back flat", "Don't rotate torso"],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Renegade Row",
    muscleGroup: "back",
    secondaryMuscles: ["chest"],
    difficulty: "advanced",
    equipment: "2 KB",
    description: "Plank position alternating rows for back and core",
    instructions: [
      "Start in plank position with hands on kettlebells",
      "Row one kettlebell to hip while balancing",
      "Lower and repeat on other side",
      "Keep hips square throughout"
    ],
    tips: ["Widen feet for more stability", "Engage core throughout"],
    defaultReps: 8,
    defaultSets: 3
  },
  {
    name: "Gorilla Row",
    muscleGroup: "back",
    secondaryMuscles: ["biceps"],
    difficulty: "intermediate",
    equipment: "2 KB",
    description: "Hinged stance alternating explosive rows",
    instructions: [
      "Place two kettlebells between feet",
      "Hinge at hips, grab both handles",
      "Row one kettlebell explosively while other stays grounded",
      "Alternate sides"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "High Pull",
    muscleGroup: "back",
    secondaryMuscles: ["shoulders"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Explosive pull from floor to chest height",
    instructions: [
      "Start with kettlebell between feet",
      "Hinge and grab handle",
      "Explosively pull to chest height, elbow high",
      "Control the descent"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Kettlebell Deadlift",
    muscleGroup: "back",
    secondaryMuscles: ["glutes"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Hip hinge with kettlebell between legs",
    instructions: [
      "Stand with feet hip-width, kettlebell between feet",
      "Hinge at hips, grab handle with both hands",
      "Drive through heels to stand",
      "Squeeze glutes at top"
    ],
    tips: ["Keep chest proud", "Don't round lower back"],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Sumo Deadlift",
    muscleGroup: "back",
    secondaryMuscles: ["glutes"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Wide stance deadlift targeting inner thighs",
    instructions: [
      "Wide stance, toes pointed out",
      "Kettlebell between feet",
      "Hinge and grab handle",
      "Stand by driving knees out"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Single-Leg Deadlift",
    muscleGroup: "back",
    secondaryMuscles: ["glutes"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Balance-focused hip hinge on one leg",
    instructions: [
      "Hold kettlebell in one hand",
      "Hinge forward on opposite leg",
      "Keep back leg straight, extending behind",
      "Return to standing"
    ],
    tips: ["Use wall for balance if needed", "Keep hips square"],
    defaultReps: 8,
    defaultSets: 3
  },
  {
    name: "Bent-Over Row",
    muscleGroup: "back",
    secondaryMuscles: ["biceps"],
    difficulty: "beginner",
    equipment: "2 KB",
    description: "Both arms rowing simultaneously",
    instructions: [
      "Hold kettlebell in each hand",
      "Hinge forward at hips, back flat",
      "Row both kettlebells to hips",
      "Lower with control"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Upright Row",
    muscleGroup: "back",
    secondaryMuscles: ["shoulders"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Pull kettlebell to chin with elbows high",
    instructions: [
      "Stand holding kettlebell with both hands",
      "Pull straight up to chin level",
      "Elbows lead the movement, going high",
      "Lower with control"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Pendlay Row",
    muscleGroup: "back",
    secondaryMuscles: ["biceps"],
    difficulty: "intermediate",
    equipment: "2 KB",
    description: "Explosive row from floor each rep",
    instructions: [
      "Start with kettlebells on floor",
      "Hinge at hips, grab handles",
      "Explosively row to chest",
      "Return to floor each rep"
    ],
    defaultReps: 8,
    defaultSets: 3
  },

  // BICEPS EXERCISES
  {
    name: "Standing Curl",
    muscleGroup: "biceps",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Standard bicep curl with kettlebell",
    instructions: [
      "Stand with kettlebell held at sides or front",
      "Curl up, keeping elbows pinned",
      "Squeeze at top",
      "Lower with control"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Hammer Curl",
    muscleGroup: "biceps",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Neutral grip curl for brachialis",
    instructions: [
      "Hold kettlebell by horns or handle vertically",
      "Curl up with neutral wrist position",
      "Keep elbows stationary",
      "Lower with control"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Concentration Curl",
    muscleGroup: "biceps",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Seated curl with elbow braced on thigh",
    instructions: [
      "Sit with elbow braced on inner thigh",
      "Hold kettlebell with palm facing up",
      "Curl up, focusing on bicep contraction",
      "Lower slowly"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Zottman Curl",
    muscleGroup: "biceps",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Curl up, rotate, lower with overhand grip",
    instructions: [
      "Curl kettlebell up with palm facing up",
      "At top, rotate to overhand grip",
      "Lower slowly with overhand grip",
      "Rotate back and repeat"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Cross-Body Curl",
    muscleGroup: "biceps",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Curl across the body for different angle",
    instructions: [
      "Hold kettlebell at side",
      "Curl across body toward opposite shoulder",
      "Squeeze at top",
      "Lower and repeat"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Crush Curl",
    muscleGroup: "biceps",
    secondaryMuscles: ["chest"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Squeeze bell with both hands while curling",
    instructions: [
      "Hold kettlebell by bell with both palms",
      "Squeeze palms together throughout",
      "Curl up to chest",
      "Lower with control"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Drag Curl",
    muscleGroup: "biceps",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Elbows pulled back during curl",
    instructions: [
      "Hold kettlebell in front of thighs",
      "Curl while dragging bell up body",
      "Elbows move back behind torso",
      "Squeeze at top"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Preacher Curl",
    muscleGroup: "biceps",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Arm supported on incline for isolation",
    instructions: [
      "Kneel behind incline bench or use arm of couch",
      "Rest upper arm on surface",
      "Curl kettlebell up",
      "Lower with full control"
    ],
    defaultReps: 10,
    defaultSets: 3
  },

  // CHEST EXERCISES
  {
    name: "Floor Press",
    muscleGroup: "chest",
    secondaryMuscles: ["triceps"],
    difficulty: "beginner",
    equipment: "2 KB",
    description: "Pressing from floor with back supported",
    instructions: [
      "Lie on back, kettlebells at chest",
      "Press straight up",
      "Lower until triceps touch floor",
      "Press back up"
    ],
    tips: ["Keep wrists straight", "Squeeze chest at top"],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Single-Arm Floor Press",
    muscleGroup: "chest",
    secondaryMuscles: ["triceps"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Unilateral floor press for imbalance correction",
    instructions: [
      "Lie on back, one kettlebell at chest",
      "Press straight up with one arm",
      "Keep core engaged to prevent rotation",
      "Lower and repeat"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Squeeze Press",
    muscleGroup: "chest",
    difficulty: "intermediate",
    equipment: "2 KB",
    description: "Press with bells touching, squeezing together",
    instructions: [
      "Lie on back, press bells together at chest",
      "Maintain squeeze throughout movement",
      "Press up while keeping bells touching",
      "Lower with control"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Pullover",
    muscleGroup: "chest",
    secondaryMuscles: ["back"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Lying arc motion overhead for chest stretch",
    instructions: [
      "Lie on back holding kettlebell over chest",
      "Lower in arc motion behind head",
      "Feel stretch in chest and lats",
      "Pull back to start"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Close-Grip Press",
    muscleGroup: "chest",
    secondaryMuscles: ["triceps"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Single bell pressed with both hands",
    instructions: [
      "Lie on back, hold kettlebell by horns",
      "Press straight up over chest",
      "Lower to chest",
      "Keep elbows close to body"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Crush Press",
    muscleGroup: "chest",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Press while squeezing bell with both palms",
    instructions: [
      "Lie on back, hold bell between palms",
      "Squeeze palms together hard",
      "Press up while maintaining squeeze",
      "Feel chest engagement throughout"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Svend Press",
    muscleGroup: "chest",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Standing press squeezing bell at chest",
    instructions: [
      "Stand holding kettlebell at chest level",
      "Squeeze with both palms",
      "Press forward while maintaining squeeze",
      "Return to chest"
    ],
    defaultReps: 15,
    defaultSets: 3
  },
  {
    name: "Chest Fly",
    muscleGroup: "chest",
    difficulty: "intermediate",
    equipment: "2 KB",
    description: "Floor-based chest fly for stretch",
    instructions: [
      "Lie on back with kettlebells pressed up",
      "Lower arms out to sides in arc",
      "Feel stretch in chest",
      "Squeeze back to start"
    ],
    tips: ["Keep slight bend in elbows", "Don't go too deep"],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Push-Up on Kettlebells",
    muscleGroup: "chest",
    secondaryMuscles: ["triceps"],
    difficulty: "intermediate",
    equipment: "2 KB",
    description: "Push-ups with hands on bell handles",
    instructions: [
      "Place hands on kettlebell handles",
      "Perform push-up with increased range of motion",
      "Lower chest between bells",
      "Push back up"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Alternating Floor Press",
    muscleGroup: "chest",
    secondaryMuscles: ["triceps"],
    difficulty: "intermediate",
    equipment: "2 KB",
    description: "Alternating single-arm presses on floor",
    instructions: [
      "Lie on back with both kettlebells pressed up",
      "Lower one arm while other stays up",
      "Press back up",
      "Alternate sides"
    ],
    defaultReps: 8,
    defaultSets: 3
  },

  // TRICEPS EXERCISES
  {
    name: "Overhead Extension",
    muscleGroup: "triceps",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Both hands extending behind head",
    instructions: [
      "Stand or sit, hold kettlebell overhead with both hands",
      "Lower behind head by bending elbows",
      "Keep upper arms stationary",
      "Extend back to start"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Single-Arm Extension",
    muscleGroup: "triceps",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Unilateral overhead extension",
    instructions: [
      "Hold kettlebell overhead with one arm",
      "Lower behind head, elbow pointing up",
      "Extend back to start",
      "Keep core engaged"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Skull Crusher",
    muscleGroup: "triceps",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Lying tricep extension to forehead",
    instructions: [
      "Lie on back, kettlebell pressed over chest",
      "Lower toward forehead by bending elbows",
      "Keep upper arms still",
      "Extend back up"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Tricep Kickback",
    muscleGroup: "triceps",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Bent over arm extension",
    instructions: [
      "Hinge forward, upper arm parallel to floor",
      "Extend arm straight back",
      "Squeeze tricep at top",
      "Lower with control"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Close-Grip Floor Press",
    muscleGroup: "triceps",
    secondaryMuscles: ["chest"],
    difficulty: "beginner",
    equipment: "2 KB",
    description: "Narrow grip pressing emphasizing triceps",
    instructions: [
      "Lie on back with kettlebells close together",
      "Press up with elbows close to body",
      "Lower until triceps touch floor",
      "Press back up"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Diamond Push-Up on KB",
    muscleGroup: "triceps",
    secondaryMuscles: ["chest"],
    difficulty: "advanced",
    equipment: "1 KB",
    description: "Hands close together on single bell",
    instructions: [
      "Place both hands on top of kettlebell",
      "Perform push-up with hands close",
      "Keep elbows tucked",
      "Push back up"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Tricep Dip",
    muscleGroup: "triceps",
    difficulty: "intermediate",
    equipment: "2 KB",
    description: "Dips using bells as support",
    instructions: [
      "Place hands on kettlebell handles behind you",
      "Lower body by bending elbows",
      "Keep elbows pointing back",
      "Push back up"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "JM Press",
    muscleGroup: "triceps",
    secondaryMuscles: ["chest"],
    difficulty: "advanced",
    equipment: "1 KB",
    description: "Hybrid skull crusher and close-grip press",
    instructions: [
      "Lie on back, kettlebell over chest",
      "Lower toward chin/upper chest",
      "Elbows flare slightly",
      "Press back to start"
    ],
    defaultReps: 8,
    defaultSets: 3
  },

  // GLUTES EXERCISES
  {
    name: "Kettlebell Swing",
    muscleGroup: "glutes",
    secondaryMuscles: ["back"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Hip hinge explosive swing - the king of KB exercises",
    instructions: [
      "Stand with feet wider than hips",
      "Hinge and hike kettlebell between legs",
      "Explosively drive hips forward",
      "Let arms float to chest height",
      "Control the descent and repeat"
    ],
    tips: ["Power comes from hips, not arms", "Squeeze glutes at top"],
    defaultReps: 15,
    defaultSets: 3
  },
  {
    name: "Single-Arm Swing",
    muscleGroup: "glutes",
    secondaryMuscles: ["back"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "One-handed swing for added challenge",
    instructions: [
      "Same as regular swing but one arm",
      "Keep shoulders square",
      "Core engaged to prevent rotation",
      "Switch hands at top if desired"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Goblet Squat",
    muscleGroup: "glutes",
    secondaryMuscles: ["back"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Squat holding bell at chest",
    instructions: [
      "Hold kettlebell at chest by horns",
      "Squat down, keeping chest tall",
      "Go as deep as mobility allows",
      "Drive through heels to stand"
    ],
    tips: ["Knees track over toes", "Keep weight in midfoot/heels"],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Sumo Squat",
    muscleGroup: "glutes",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Wide stance squat for inner thighs",
    instructions: [
      "Wide stance, toes pointed out",
      "Hold kettlebell between legs",
      "Squat deep, knees over toes",
      "Stand by squeezing glutes"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Romanian Deadlift",
    muscleGroup: "glutes",
    secondaryMuscles: ["back"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Stiff-leg hip hinge for hamstrings and glutes",
    instructions: [
      "Hold kettlebell in front of thighs",
      "Hinge at hips, pushing butt back",
      "Lower until hamstring stretch",
      "Squeeze glutes to stand"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Single-Leg RDL",
    muscleGroup: "glutes",
    secondaryMuscles: ["back"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Unilateral Romanian deadlift",
    instructions: [
      "Hold kettlebell, stand on one leg",
      "Hinge forward, back leg extends behind",
      "Lower until hamstring stretch",
      "Squeeze glute to stand"
    ],
    defaultReps: 8,
    defaultSets: 3
  },
  {
    name: "Hip Thrust",
    muscleGroup: "glutes",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Back on bench, thrust hips up",
    instructions: [
      "Upper back on bench, feet flat on floor",
      "Place kettlebell on hips",
      "Drive hips up, squeezing glutes",
      "Lower with control"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Glute Bridge",
    muscleGroup: "glutes",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Floor-based hip thrust",
    instructions: [
      "Lie on back, feet flat, kettlebell on hips",
      "Drive hips up, squeezing glutes",
      "Hold briefly at top",
      "Lower with control"
    ],
    defaultReps: 15,
    defaultSets: 3
  },
  {
    name: "Bulgarian Split Squat",
    muscleGroup: "glutes",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Rear foot elevated single-leg squat",
    instructions: [
      "Rear foot on bench behind you",
      "Hold kettlebell at chest or sides",
      "Lower into lunge position",
      "Drive through front heel to stand"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Lateral Lunge",
    muscleGroup: "glutes",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Side-stepping lunge for inner/outer thighs",
    instructions: [
      "Hold kettlebell at chest",
      "Step wide to one side",
      "Sit back into hip on that side",
      "Push back to start"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Reverse Lunge",
    muscleGroup: "glutes",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Stepping backward lunge",
    instructions: [
      "Hold kettlebell at chest or sides",
      "Step back into lunge",
      "Lower until back knee nearly touches",
      "Drive through front heel to stand"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Walking Lunge",
    muscleGroup: "glutes",
    difficulty: "intermediate",
    equipment: "2 KB",
    description: "Forward traveling lunges",
    instructions: [
      "Hold kettlebells at sides",
      "Lunge forward alternating legs",
      "Keep torso upright",
      "Continue walking forward"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Step-Up",
    muscleGroup: "glutes",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Step onto elevated surface",
    instructions: [
      "Hold kettlebell at chest or sides",
      "Step up onto box or bench",
      "Drive through heel, stand tall",
      "Step down with control"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Cossack Squat",
    muscleGroup: "glutes",
    secondaryMuscles: ["flexibility"],
    difficulty: "advanced",
    equipment: "1 KB",
    description: "Deep lateral squat for mobility",
    instructions: [
      "Wide stance, hold kettlebell at chest",
      "Shift weight to one side, squatting deep",
      "Straight leg toes point up",
      "Shift to other side"
    ],
    defaultReps: 6,
    defaultSets: 3
  },
  {
    name: "Kickstand Deadlift",
    muscleGroup: "glutes",
    secondaryMuscles: ["back"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Staggered stance deadlift",
    instructions: [
      "One foot slightly behind for balance",
      "Most weight on front foot",
      "Hinge at hips",
      "Return to standing"
    ],
    defaultReps: 10,
    defaultSets: 3
  },

  // SHOULDERS EXERCISES
  {
    name: "Overhead Press",
    muscleGroup: "shoulders",
    secondaryMuscles: ["triceps"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Standing shoulder press",
    instructions: [
      "Clean kettlebell to rack position",
      "Press straight overhead",
      "Lock out arm at top",
      "Lower with control to rack"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Double Overhead Press",
    muscleGroup: "shoulders",
    secondaryMuscles: ["triceps"],
    difficulty: "intermediate",
    equipment: "2 KB",
    description: "Both arms pressing together",
    instructions: [
      "Clean both kettlebells to rack",
      "Press both overhead simultaneously",
      "Lock out at top",
      "Lower with control"
    ],
    defaultReps: 8,
    defaultSets: 3
  },
  {
    name: "Push Press",
    muscleGroup: "shoulders",
    secondaryMuscles: ["triceps", "glutes"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Leg-assisted explosive press",
    instructions: [
      "Kettlebell in rack position",
      "Dip knees slightly",
      "Explosively drive through legs and press",
      "Lock out overhead"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Arnold Press",
    muscleGroup: "shoulders",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Rotating press hitting all delt heads",
    instructions: [
      "Start with kettlebell at chest, palm facing you",
      "Press up while rotating palm forward",
      "Lock out overhead",
      "Reverse motion on descent"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Lateral Raise",
    muscleGroup: "shoulders",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Side raise for medial delts",
    instructions: [
      "Hold kettlebell at side",
      "Raise out to side to shoulder height",
      "Keep slight bend in elbow",
      "Lower with control"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Front Raise",
    muscleGroup: "shoulders",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Forward raise for front delts",
    instructions: [
      "Hold kettlebell in front of thighs",
      "Raise straight forward to shoulder height",
      "Keep arm straight",
      "Lower with control"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Bent-Over Rear Delt Fly",
    muscleGroup: "shoulders",
    secondaryMuscles: ["back"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Hinged fly for rear delts",
    instructions: [
      "Hinge at hips, back flat",
      "Raise kettlebell out to side",
      "Squeeze rear delt at top",
      "Lower with control"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Halo",
    muscleGroup: "shoulders",
    secondaryMuscles: ["mobility"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Circle bell around head for shoulder mobility",
    instructions: [
      "Hold kettlebell upside down by horns",
      "Circle around head in one direction",
      "Keep core engaged",
      "Switch directions"
    ],
    defaultReps: 8,
    defaultSets: 3
  },
  {
    name: "Bottoms-Up Press",
    muscleGroup: "shoulders",
    difficulty: "advanced",
    equipment: "1 KB",
    description: "Press with bell inverted for grip and stability",
    instructions: [
      "Hold kettlebell upside down (bottom up)",
      "Press overhead while balancing",
      "Requires intense grip and stability",
      "Lower with control"
    ],
    tips: ["Start light", "Squeeze handle hard"],
    defaultReps: 6,
    defaultSets: 3
  },
  {
    name: "Z Press",
    muscleGroup: "shoulders",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Seated on floor press without back support",
    instructions: [
      "Sit on floor, legs extended",
      "Kettlebell in rack position",
      "Press overhead without leaning",
      "Requires core strength and hip mobility"
    ],
    defaultReps: 8,
    defaultSets: 3
  },
  {
    name: "Snatch",
    muscleGroup: "shoulders",
    secondaryMuscles: ["back", "glutes"],
    difficulty: "advanced",
    equipment: "1 KB",
    description: "Floor to overhead in one powerful motion",
    instructions: [
      "Start like a swing",
      "Pull kettlebell up close to body",
      "Punch through at top to lock out",
      "Lower in controlled swing"
    ],
    tips: ["Master the swing first", "Keep bell close to body"],
    defaultReps: 8,
    defaultSets: 3
  },
  {
    name: "Clean",
    muscleGroup: "shoulders",
    secondaryMuscles: ["back", "biceps"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Floor to rack position",
    instructions: [
      "Swing kettlebell between legs",
      "Pull up close to body",
      "Rotate wrist and catch in rack",
      "Lower in swing motion"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Clean and Press",
    muscleGroup: "shoulders",
    secondaryMuscles: ["back", "triceps"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Combined clean into press",
    instructions: [
      "Clean kettlebell to rack",
      "Press overhead",
      "Lower to rack",
      "Lower to swing and repeat"
    ],
    defaultReps: 8,
    defaultSets: 3
  },
  {
    name: "Shoulder High Pull",
    muscleGroup: "shoulders",
    secondaryMuscles: ["back"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Explosive pull to shoulder height",
    instructions: [
      "Start with kettlebell between feet",
      "Hinge and grip handle",
      "Explosively pull to shoulder, elbow high",
      "Lower with control"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Sots Press",
    muscleGroup: "shoulders",
    secondaryMuscles: ["flexibility"],
    difficulty: "advanced",
    equipment: "1 KB",
    description: "Press from bottom of squat position",
    instructions: [
      "Squat to bottom position with kettlebell at shoulder",
      "Press overhead while staying in squat",
      "Requires great mobility",
      "Lower and stand"
    ],
    defaultReps: 5,
    defaultSets: 3
  },
  {
    name: "Windmill Press",
    muscleGroup: "shoulders",
    secondaryMuscles: ["flexibility"],
    difficulty: "advanced",
    equipment: "1 KB",
    description: "Press combined with windmill movement",
    instructions: [
      "Press kettlebell overhead",
      "Turn feet 45 degrees away",
      "Hinge and reach toward floor",
      "Keep arm locked out throughout"
    ],
    defaultReps: 6,
    defaultSets: 3
  },

  // FLEXIBILITY EXERCISES
  {
    name: "Windmill",
    muscleGroup: "flexibility",
    secondaryMuscles: ["shoulders"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Lateral bend with overhead hold",
    instructions: [
      "Press kettlebell overhead",
      "Turn feet 45 degrees away from raised arm",
      "Hinge at hip, reaching down to floor",
      "Keep eyes on kettlebell"
    ],
    tips: ["Start without weight", "Go slow"],
    defaultReps: 6,
    defaultSets: 3
  },
  {
    name: "Turkish Get-Up",
    muscleGroup: "flexibility",
    secondaryMuscles: ["shoulders", "glutes"],
    difficulty: "advanced",
    equipment: "1 KB",
    description: "Floor to standing while pressing overhead",
    instructions: [
      "Lie on back, kettlebell pressed overhead",
      "Roll to elbow, then hand",
      "Bridge hips and sweep leg through",
      "Stand up, reverse to return"
    ],
    tips: ["Learn each position separately", "Keep arm locked out"],
    defaultReps: 3,
    defaultSets: 3
  },
  {
    name: "Goblet Squat Hold",
    muscleGroup: "flexibility",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Deep squat position hold for hip mobility",
    instructions: [
      "Hold kettlebell at chest",
      "Squat to deepest position",
      "Use elbows to push knees out",
      "Hold for time, breathing deeply"
    ],
    defaultReps: 30,
    defaultSets: 3
  },
  {
    name: "Tactical Lunge",
    muscleGroup: "flexibility",
    secondaryMuscles: ["glutes"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Lunge with pass-through under leg",
    instructions: [
      "Lunge forward holding kettlebell",
      "Pass kettlebell under front leg",
      "Grab with other hand",
      "Stand and repeat other side"
    ],
    defaultReps: 8,
    defaultSets: 3
  },
  {
    name: "Kneeling Hip Flexor Stretch",
    muscleGroup: "flexibility",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Weighted hip flexor stretch",
    instructions: [
      "Kneel in lunge position",
      "Hold kettlebell as counterbalance",
      "Push hips forward",
      "Hold and breathe"
    ],
    defaultReps: 30,
    defaultSets: 2
  },
  {
    name: "Deep Squat Pry",
    muscleGroup: "flexibility",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Prying knees open in deep squat",
    instructions: [
      "Hold kettlebell at chest",
      "Squat deep",
      "Use elbows to push knees apart",
      "Shift weight side to side"
    ],
    defaultReps: 20,
    defaultSets: 2
  },
  {
    name: "Bretzel Stretch",
    muscleGroup: "flexibility",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Lying spinal twist stretch",
    instructions: [
      "Lie on side, bend top knee to 90 degrees",
      "Hold with bottom hand",
      "Rotate upper body to open chest",
      "Use light kettlebell for added stretch"
    ],
    defaultReps: 30,
    defaultSets: 2
  },
  {
    name: "Overhead Squat",
    muscleGroup: "flexibility",
    secondaryMuscles: ["shoulders"],
    difficulty: "advanced",
    equipment: "1 KB",
    description: "Squat with kettlebell locked overhead",
    instructions: [
      "Press kettlebell overhead with one or both arms",
      "Squat while keeping arm locked out",
      "Requires shoulder and thoracic mobility",
      "Stand back up"
    ],
    defaultReps: 6,
    defaultSets: 3
  },
  {
    name: "Assisted Cossack Squat",
    muscleGroup: "flexibility",
    secondaryMuscles: ["glutes"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Using kettlebell as counterweight",
    instructions: [
      "Hold kettlebell in front as counterbalance",
      "Shift weight to one side",
      "Squat deep on that side",
      "Use KB weight to balance"
    ],
    defaultReps: 6,
    defaultSets: 3
  },
  {
    name: "Hip 90/90 Stretch",
    muscleGroup: "flexibility",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Seated hip rotation stretch",
    instructions: [
      "Sit with both legs bent at 90 degrees",
      "Front shin parallel, back shin perpendicular",
      "Hold kettlebell for added stretch",
      "Switch sides"
    ],
    defaultReps: 30,
    defaultSets: 2
  },

  // CORE EXERCISES
  {
    name: "Russian Twist",
    muscleGroup: "core",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Seated rotation for obliques",
    instructions: [
      "Sit with knees bent, lean back slightly",
      "Hold kettlebell at chest",
      "Rotate torso side to side",
      "Keep core engaged throughout"
    ],
    tips: ["Lift feet for more challenge", "Control the movement"],
    defaultReps: 20,
    defaultSets: 3
  },
  {
    name: "Kettlebell Sit-Up",
    muscleGroup: "core",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Weighted sit-up for core strength",
    instructions: [
      "Lie on back with kettlebell pressed overhead",
      "Keep arms locked throughout",
      "Sit up while maintaining arm position",
      "Lower with control"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Plank Pull-Through",
    muscleGroup: "core",
    secondaryMuscles: ["back"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Plank with kettlebell drag for anti-rotation",
    instructions: [
      "Start in plank position with kettlebell beside you",
      "Reach under body with opposite hand",
      "Drag kettlebell to other side",
      "Alternate hands, keep hips stable"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Dead Bug with Kettlebell",
    muscleGroup: "core",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Anti-extension core exercise",
    instructions: [
      "Lie on back holding kettlebell over chest",
      "Bring knees to 90 degrees",
      "Extend opposite arm and leg",
      "Return and switch sides"
    ],
    tips: ["Keep lower back pressed to floor", "Move slowly"],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Half-Kneeling Wood Chop",
    muscleGroup: "core",
    secondaryMuscles: ["shoulders"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Rotational movement for core power",
    instructions: [
      "Kneel on one knee",
      "Hold kettlebell at hip on kneeling side",
      "Rotate and lift diagonally across body",
      "Return with control"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Kettlebell Crunch",
    muscleGroup: "core",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Weighted crunch for upper abs",
    instructions: [
      "Lie on back, hold kettlebell at chest",
      "Crunch up, pressing kettlebell toward ceiling",
      "Focus on contracting abs",
      "Lower with control"
    ],
    defaultReps: 15,
    defaultSets: 3
  },
  {
    name: "Kettlebell Side Bend",
    muscleGroup: "core",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Lateral flexion for obliques",
    instructions: [
      "Stand with kettlebell in one hand",
      "Bend sideways toward weighted side",
      "Return to standing using obliques",
      "Complete all reps then switch sides"
    ],
    defaultReps: 12,
    defaultSets: 3
  },
  {
    name: "Hollow Body Hold with KB",
    muscleGroup: "core",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Isometric core hold with weight",
    instructions: [
      "Lie on back, press kettlebell overhead",
      "Lift shoulders and legs off ground",
      "Create banana shape with body",
      "Hold position, breathing steadily"
    ],
    tips: ["Keep lower back pressed down", "Start without weight if needed"],
    defaultReps: 30,
    defaultSets: 3
  },
  {
    name: "Turkish Get-Up (Half)",
    muscleGroup: "core",
    secondaryMuscles: ["shoulders"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "First half of TGU focusing on core",
    instructions: [
      "Lie on back with kettlebell pressed up",
      "Roll to elbow, then to hand",
      "Bridge hips up",
      "Reverse the movement"
    ],
    defaultReps: 5,
    defaultSets: 3
  },
  {
    name: "Kettlebell V-Up",
    muscleGroup: "core",
    difficulty: "advanced",
    equipment: "1 KB",
    description: "Full body crunch with weight",
    instructions: [
      "Lie flat holding kettlebell overhead",
      "Simultaneously lift legs and torso",
      "Touch kettlebell to feet at top",
      "Lower with control"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Plank with KB Drag",
    muscleGroup: "core",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Anti-rotation plank exercise",
    instructions: [
      "Hold plank with kettlebell outside one hand",
      "Drag kettlebell under body to other side",
      "Keep hips square and stable",
      "Alternate sides"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Standing Core Rotation",
    muscleGroup: "core",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Standing twist for rotational strength",
    instructions: [
      "Stand with feet hip width, hold kettlebell at chest",
      "Rotate torso fully to one side",
      "Return to center and rotate other way",
      "Keep hips facing forward"
    ],
    defaultReps: 16,
    defaultSets: 3
  },
  {
    name: "Kettlebell Leg Raise",
    muscleGroup: "core",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Hanging or lying leg raise with weight",
    instructions: [
      "Lie on back or hang from bar",
      "Hold light kettlebell between feet",
      "Raise legs to 90 degrees",
      "Lower with control"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Bird Dog with KB",
    muscleGroup: "core",
    secondaryMuscles: ["back"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Quadruped core stability with weight",
    instructions: [
      "Start on hands and knees",
      "Hold light kettlebell in one hand",
      "Extend arm forward and opposite leg back",
      "Hold briefly, return, alternate"
    ],
    defaultReps: 8,
    defaultSets: 3
  },
  {
    name: "Mountain Climber with KB",
    muscleGroup: "core",
    secondaryMuscles: ["glutes"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Dynamic core exercise with hands on bell",
    instructions: [
      "Hands on kettlebell in plank position",
      "Drive knees toward chest alternating",
      "Keep hips low and stable",
      "Maintain quick pace"
    ],
    defaultReps: 20,
    defaultSets: 3
  },

  // MOBILITY EXERCISES
  {
    name: "Around the World",
    muscleGroup: "mobility",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Circle bell around body",
    instructions: [
      "Stand with kettlebell in one hand",
      "Pass around body to other hand behind back",
      "Continue circling",
      "Switch directions"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Figure 8",
    muscleGroup: "mobility",
    secondaryMuscles: ["glutes"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Pass bell between legs in figure 8 pattern",
    instructions: [
      "Slight squat stance",
      "Pass kettlebell between legs front to back",
      "Pass to other hand",
      "Continue in figure 8 pattern"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Arm Bar",
    muscleGroup: "mobility",
    secondaryMuscles: ["shoulders"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Lying shoulder stabilization",
    instructions: [
      "Lie on back, kettlebell pressed up",
      "Roll to side, keeping arm vertical",
      "Relax shoulder into socket",
      "Hold and breathe"
    ],
    defaultReps: 30,
    defaultSets: 2
  },
  {
    name: "Hip Circle",
    muscleGroup: "mobility",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Standing hip circles with bell as weight",
    instructions: [
      "Hold kettlebell at chest",
      "Circle hips in large circles",
      "Keep upper body stable",
      "Switch directions"
    ],
    defaultReps: 10,
    defaultSets: 2
  },
  {
    name: "Mobility Halo",
    muscleGroup: "mobility",
    secondaryMuscles: ["shoulders"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Slow controlled circles around head",
    instructions: [
      "Hold kettlebell upside down by horns",
      "Slowly circle around head",
      "Keep core engaged, minimize body movement",
      "Switch directions"
    ],
    defaultReps: 8,
    defaultSets: 3
  },
  {
    name: "Slingshot",
    muscleGroup: "mobility",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Hand-to-hand pass around body",
    instructions: [
      "Pass kettlebell around body quickly",
      "Release and catch with other hand",
      "Keep hips stable",
      "Switch directions"
    ],
    defaultReps: 10,
    defaultSets: 3
  },
  {
    name: "Goblet Wall Sit",
    muscleGroup: "mobility",
    secondaryMuscles: ["glutes"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Wall sit holding bell for added load",
    instructions: [
      "Back against wall, slide to seated position",
      "Hold kettlebell at chest",
      "Thighs parallel to ground",
      "Hold for time"
    ],
    defaultReps: 30,
    defaultSets: 3
  },
  {
    name: "Shoulder Dislocate",
    muscleGroup: "mobility",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Overhead arc for shoulder mobility",
    instructions: [
      "Hold light kettlebell with wide grip on horns",
      "Arc overhead and behind body",
      "Keep arms straight throughout",
      "Reverse motion"
    ],
    tips: ["Use very light weight", "Go slow"],
    defaultReps: 8,
    defaultSets: 2
  },
  {
    name: "Loaded Beast",
    muscleGroup: "mobility",
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Child's pose with bell for shoulder stretch",
    instructions: [
      "Kneel and sit back on heels",
      "Extend arms forward with kettlebell",
      "Sink chest toward floor",
      "Hold and breathe"
    ],
    defaultReps: 30,
    defaultSets: 2
  },
  {
    name: "Bottoms-Up Carry",
    muscleGroup: "mobility",
    secondaryMuscles: ["shoulders"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Walking with inverted bell for grip and stability",
    instructions: [
      "Hold kettlebell upside down",
      "Walk slowly maintaining balance",
      "Engage core and squeeze handle",
      "Switch hands"
    ],
    defaultReps: 40,
    defaultSets: 2
  },
  {
    name: "Rack Walk",
    muscleGroup: "mobility",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Walking with bell in rack position",
    instructions: [
      "Clean kettlebell to rack position",
      "Walk keeping posture tall",
      "Core engaged, no leaning",
      "Switch sides"
    ],
    defaultReps: 40,
    defaultSets: 2
  },
  {
    name: "Farmer's Carry",
    muscleGroup: "mobility",
    secondaryMuscles: ["back"],
    difficulty: "beginner",
    equipment: "2 KB",
    description: "Walking with bells at sides",
    instructions: [
      "Hold kettlebells at sides",
      "Walk with tall posture",
      "Shoulders back and down",
      "Core engaged"
    ],
    defaultReps: 40,
    defaultSets: 3
  },
  {
    name: "Waiter's Walk",
    muscleGroup: "mobility",
    secondaryMuscles: ["shoulders"],
    difficulty: "intermediate",
    equipment: "1 KB",
    description: "Walking with bell pressed overhead",
    instructions: [
      "Press kettlebell overhead",
      "Walk keeping arm locked out",
      "Core tight, ribs down",
      "Switch arms"
    ],
    defaultReps: 40,
    defaultSets: 2
  },
  {
    name: "Suitcase Carry",
    muscleGroup: "mobility",
    secondaryMuscles: ["back"],
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Single-sided farmer's walk",
    instructions: [
      "Hold single kettlebell at side",
      "Walk without leaning to either side",
      "Core works hard to stabilize",
      "Switch sides"
    ],
    defaultReps: 40,
    defaultSets: 2
  },
  {
    name: "Rack Hold",
    muscleGroup: "mobility",
    difficulty: "beginner",
    equipment: "1 KB",
    description: "Static hold in rack position",
    instructions: [
      "Clean kettlebell to rack",
      "Hold maintaining good posture",
      "Breathe behind the bell",
      "Switch sides"
    ],
    defaultReps: 30,
    defaultSets: 2
  }
] as const

// Map raw exercises to include generated IDs
export const exercises: ExerciseData[] = rawExercises.map(ex => ({
  ...ex,
  id: generateExerciseId(ex.name)
}))

export function getExercisesByMuscleGroup(muscleGroup: MuscleGroup): ExerciseData[] {
  return exercises.filter(e => e.muscleGroup === muscleGroup)
}

export function getExercisesByDifficulty(difficulty: Difficulty): ExerciseData[] {
  return exercises.filter(e => e.difficulty === difficulty)
}

