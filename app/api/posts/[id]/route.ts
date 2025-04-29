import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { posts } from "@/drizzle/schema";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, params.id),
      with: {
        admin: true,
        author: true,
        categories: {
          with: {
            category: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
