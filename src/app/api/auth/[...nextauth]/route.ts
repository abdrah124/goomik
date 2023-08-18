import bcrypt from "bcrypt";
import NextAuth, { AuthOptions, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb";

export const authOptions: AuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: {
          type: "password",
          label: "Password",
          placeholder: "Password",
        },
        email: { type: "text", label: "Email", placeholder: "Email" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password)
            throw new Error("Missing required field!");
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (!user) throw new Error("No user registered with this email!");

          const passwordIsMatched = await bcrypt.compare(
            credentials?.password,
            user?.hashedPassword ?? ""
          );

          if (!passwordIsMatched || !user?.hashedPassword)
            throw new Error("Passwords do not match.");

          return user;
        } catch (err) {
          console.error(err);

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;

      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
