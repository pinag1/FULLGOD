import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  // A senha que você quer criptografar
  const password = 'admin@godmota123';
  
  // Gerando o hash da senha usando bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criando o usuário admin no banco de dados
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'pinag@godmota.com',
      password: hashedPassword,
      role: 'ADMIN', // Definindo a role como admin
      profile: 'VIP', // Definindo o perfil como VIP ou outro valor se necessário
      points: 0, // Definindo os pontos iniciais (pode ser alterado conforme necessidade)
    },
  });

  console.log('Admin criado com sucesso!');
}

createAdmin()
  .catch((e) => {
    console.error('Erro ao criar o admin:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
