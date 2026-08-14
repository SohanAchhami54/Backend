import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import dotenv from 'dotenv' 
dotenv.config()

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false   // ← this fixes the P1010 error in most cases
  }
})

const prisma = new PrismaClient({ adapter })

export default prisma