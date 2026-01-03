import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const url = process.env.DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  
  // Log for debugging (will show in Vercel logs)
  console.log('DATABASE_URL exists:', !!url)
  console.log('TURSO_AUTH_TOKEN exists:', !!authToken)
  
  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  
  if (!url.startsWith('libsql://') && !url.startsWith('file:')) {
    throw new Error(`Invalid DATABASE_URL format: ${url.substring(0, 20)}...`)
  }
  
  // Create Prisma adapter with config
  const adapter = new PrismaLibSql({
    url,
    authToken,
  })
  
  // Create Prisma client with adapter
  return new PrismaClient({ adapter })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
