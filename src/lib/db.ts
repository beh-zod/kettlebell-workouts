import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Create libSQL client for local SQLite
  const libsql = createClient({
    url: 'file:./prisma/dev.db',
  })
  
  // Create Prisma adapter
  const adapter = new PrismaLibSql(libsql)
  
  // Create Prisma client with adapter
  return new PrismaClient({ adapter })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
