import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { posts } from "@/drizzle/schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const post = await db.query.posts.findFirst({
        where: eq(posts.slug, slug),
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
    }

    const allPosts = await db.query.posts.findMany({
      with: {
        admin: true,
        author: true,
        categories: {
          with: {
            category: true,
          },
        },
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return NextResponse.json(allPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
