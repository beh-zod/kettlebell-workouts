# 🏋️ Kettlebell Workout Generator & Tracker

A modern web application for generating personalized kettlebell workouts and tracking your progress over time.

## Features

- **Workout Generator** - Create customized workouts based on:
  - Energy level (Low/Medium/High)
  - Available time (15/30/45/60 minutes)
  - Target muscle groups (Back, Biceps, Chest, Triceps, Glutes, Shoulders, Flexibility, Mobility)

- **Exercise Library** - 90+ kettlebell exercises with:
  - Difficulty levels
  - Equipment requirements
  - Step-by-step instructions
  - Tips for proper form

- **Workout Tracking** - During workouts:
  - Adjust reps and sets
  - Change weights (supports both kg and lbs)
  - Skip exercises
  - Track completed sets

- **Progress History** - View past workouts with stats

- **User Accounts** - Save your workouts and preferences

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (via Prisma + LibSQL)
- **Authentication**: NextAuth.js v5
- **UI Components**: Radix UI

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. **Install dependencies**
   ```bash
   cd app
   npm install
   ```

2. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `app` directory:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # NextAuth (generate a secure secret for production)
   AUTH_SECRET="your-secret-key-here"

   # Google OAuth (optional)
   # GOOGLE_CLIENT_ID="your-google-client-id"
   # GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── dev.db            # SQLite database
├── src/
│   ├── app/              # Next.js pages
│   │   ├── (auth)/       # Auth pages (login, signup)
│   │   ├── (main)/       # Main app pages
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   └── ui/           # UI primitives
│   ├── lib/              # Utilities
│   │   ├── auth.ts       # NextAuth config
│   │   ├── db.ts         # Prisma client
│   │   ├── exercises.ts  # Exercise database
│   │   └── workout-generator.ts
│   └── types/            # TypeScript types
└── .env                  # Environment variables
```

## Muscle Groups

The app supports 8 muscle groups:

| Group | Example Exercises |
|-------|-------------------|
| **Back** | Rows, Deadlifts, High Pulls |
| **Biceps** | Curls, Hammer Curls |
| **Chest** | Floor Press, Push-ups |
| **Triceps** | Extensions, Skull Crushers |
| **Glutes** | Swings, Squats, Lunges |
| **Shoulders** | Press, Snatch, Clean |
| **Flexibility** | Turkish Get-Up, Windmill |
| **Mobility** | Halos, Carries, Figure 8s |

## Kettlebell Weights

Supports both metric and imperial units:

| kg | lbs |
|----|-----|
| 8 | 18 |
| 12 | 26 |
| 16 | 35 |
| 20 | 44 |
| 24 | 53 |
| 28 | 62 |
| 32 | 70 |

## Development

### Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint

# Database commands
npx prisma studio    # Open database GUI
npx prisma migrate dev  # Run migrations
npx prisma generate     # Regenerate client
```

### Adding New Exercises

Edit `src/lib/exercises.ts` to add new exercises:

```typescript
{
  name: "New Exercise",
  muscleGroup: "back",
  difficulty: "beginner",
  equipment: "1 KB",
  description: "Description here",
  instructions: ["Step 1", "Step 2"],
  tips: ["Tip 1"],
  defaultReps: 10,
  defaultSets: 3,
}
```

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.
