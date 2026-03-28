import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== 'string' || typeof password !== 'string') {
          return null;
        }

        const admin = await db.admin.findUnique({
          where: { email },
        });

        if (!admin) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(password, admin.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: String(admin.id),
          email: admin.email,
          name: admin.nom,
        };
      },
    }),
  ],
});
