import { type NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "jpmaster4rill@gmail.com";

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();

        if (email !== ADMIN_EMAIL.toLowerCase()) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) return null;

          // Check password
          if (credentials.password === user.password) {
            return {
              id: user.id,
              email: user.email,
            };
          }
          
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

const handler = NextAuth(authConfig);

export const GET = handler;
export const POST = handler;
