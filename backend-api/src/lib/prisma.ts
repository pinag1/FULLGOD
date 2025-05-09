import { PrismaClient } from '@prisma/client';

// Instanciando o Prisma Client
const prisma = new PrismaClient();

// Exportando o Prisma Client para ser utilizado em outras partes da aplicação
export default prisma;
