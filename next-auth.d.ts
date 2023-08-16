import { Session, DefaultSession, User, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role: "user" | "admin";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: "admin" | "user";
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: "user" | "admin";
  }
}
