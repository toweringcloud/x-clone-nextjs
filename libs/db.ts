/*
 * Prisma disconnect 는 명시적으로 하지 않는다.
 * 개발 환경에서 PrismaClient 인스턴스가 추가 되는 경우가 발생할 수 있어 아래와 같이 설정한다.
 * https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#do-not-explicitly-disconnect
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const db = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
