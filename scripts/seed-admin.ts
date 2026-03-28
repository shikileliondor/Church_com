import bcrypt from 'bcryptjs';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@fourscom.com';
  const plainPassword = 'Admin1234';
  const saltRounds = 10;

  const password = await bcrypt.hash(plainPassword, saltRounds);

  await prisma.admin.upsert({
    where: { email },
    update: {
      password,
      nom: 'Administrateur',
    },
    create: {
      email,
      password,
      nom: 'Administrateur',
    },
  });

  console.log(`Admin seeded: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
