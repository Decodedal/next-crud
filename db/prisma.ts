
//Prisma client is attached to the global object in dvelopment sot prevent exausting you rdb conections  limit
//https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

//log :['query]

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma