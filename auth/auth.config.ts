import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { db } from "@/drizzle/db";
import { admins, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const validatedFields = LoginSchema.safeParse(credentials);
          if (!validatedFields.success) return null;

          const { email, password, role } = validatedFields.data;
          const table = role === "ADMIN" ? admins : users;

          const [user] = await db
            .select()
            .from(table)
            .where(eq(table.email, email))
            .limit(1);

          if (!user?.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: role,
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
};
