import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(1),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, slug } = categorySchema.parse(body);

    const category = await db
      .update(categories)
      .set({ name, slug })
      .where(eq(categories.id, params.id))
      .returning();

    return NextResponse.json(category, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Failed to update category" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(categories).where(eq(categories.id, params.id));
    return NextResponse.json({ message: "Category deleted" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 400 }
    );
  }
}
