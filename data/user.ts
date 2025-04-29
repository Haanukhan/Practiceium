import { db } from "@/drizzle/db";
import { users, admins } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getUserById = async (id: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id));
    if (user.length > 0) return { ...user[0], role: "USER" };

    const admin = await db.select().from(admins).where(eq(admins.id, id));
    if (admin.length > 0) return { ...admin[0], role: "ADMIN" };

    return null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));
    if (user.length > 0) return user[0];

    const admin = await db.select().from(admins).where(eq(admins.email, email));
    if (admin.length > 0) return admin[0];

    return null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};
