import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, slug } = categorySchema.parse(body);

    const category = await db
      .insert(categories)
      .values({
        name,
        slug,
      })
      .returning();

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Category POST Error:", error);
    return NextResponse.json(
      { message: "Failed to create category" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const categoriesList = await db.select().from(categories);
    return NextResponse.json(categoriesList, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories", error);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
