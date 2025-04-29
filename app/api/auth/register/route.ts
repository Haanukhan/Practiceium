import bcrypt from "bcryptjs";
import { db } from "@/drizzle/db";
import { RegisterSchema } from "@/schemas";
import { admins, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the fields
    const validatedFields = RegisterSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Invalid fields!" }, { status: 400 });
    }

    const { email, password, name, role, confirmPassword } =
      validatedFields.data;

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match!" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "ADMIN") {
      const existingAdmin = await db
        .select()
        .from(admins)
        .where(eq(admins.email, email));

      if (existingAdmin.length > 0) {
        return NextResponse.json(
          { error: "Email already in use!" },
          { status: 400 }
        );
      }

      await db.insert(admins).values({
        name,
        email,
        password: hashedPassword,
      });
    } else {
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (existingUser.length > 0) {
        return NextResponse.json(
          { error: "Email already in use!" },
          { status: 400 }
        );
      }

      await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
      });
    }

    return NextResponse.json(
      { success: "Account created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
