/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        const user: any = await signIn(email);
        if (user) {
          const passwordConfirm = await bcrypt.compare(password, user.password);
          if (passwordConfirm) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.fullname = user.fullname;
        token.phone = user.phone;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("phone" in token) {
        session.user.phone = token.phone;
      }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);