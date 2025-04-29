import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "USER" | "ADMIN";
  error: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
