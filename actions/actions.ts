"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import auth from "@/auth";
import { db } from "@/drizzle/db";
import { postCategories, posts } from "@/drizzle/schema";

const PostFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  categoryIds: z.array(z.string()).optional(),
  publishedAt: z.string().optional(),
});

export type PostFormValues = z.infer<typeof PostFormSchema>;

// Define a proper error type
export type FormErrors = {
  _form?: string[];
  [key: string]: string[] | undefined;
};

export async function createPost(values: PostFormValues) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  // Ensure adminId is a string
  const adminId: string = session.user.id;

  const validatedFields = PostFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors as FormErrors };
  }

  const { title, slug, content, excerpt, status, categoryIds, publishedAt } =
    validatedFields.data;

  try {
    const [post] = await db
      .insert(posts)
      .values({
        title,
        slug,
        content,
        excerpt: excerpt || null, // If undefined, set it to null
        status,
        adminId, // Now TypeScript knows this is definitely a string
        publishedAt: publishedAt ? new Date(publishedAt) : null, // If undefined, set it to null
      })
      .returning();

    // Handle category relations only if categoryIds is defined
    if (categoryIds && categoryIds.length > 0) {
      const categoryRelations = categoryIds
        .filter((categoryId) => categoryId !== null) // Filter out null values
        .map((categoryId) => ({
          postId: post.id,
          categoryId: categoryId as string, // Ensure type is `string` here
        }));

      if (categoryRelations.length > 0) {
        await db.insert(postCategories).values(categoryRelations);
      }
    }

    revalidatePath("/admin/posts");
    return { success: true, postId: post.id };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: { _form: ["Failed to create post"] } as FormErrors };
  }
}

export async function updatePost(values: PostFormValues) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const validatedFields = PostFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors as FormErrors };
  }

  const {
    id,
    title,
    slug,
    content,
    excerpt,
    status,
    categoryIds,
    publishedAt,
  } = validatedFields.data;

  if (!id) {
    return { error: { _form: ["Post ID is required"] } as FormErrors };
  }

  try {
    await db
      .update(posts)
      .set({
        title,
        slug,
        content,
        excerpt: excerpt || null, // If undefined, set it to null
        status,
        publishedAt: publishedAt ? new Date(publishedAt) : null, // If undefined, set it to null
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id));

    // Delete existing category relations
    await db.delete(postCategories).where(eq(postCategories.postId, id));

    // Add new category relations
    if (categoryIds && categoryIds.length > 0) {
      const categoryRelations = categoryIds.map((categoryId) => ({
        postId: id,
        categoryId,
      }));

      await db.insert(postCategories).values(categoryRelations);
    }

    revalidatePath("/admin/posts");
    revalidatePath(`/admin/posts/edit/${id}`);
    return { success: true, postId: id };
  } catch (error) {
    console.error("Error updating post:", error);
    return { error: { _form: ["Failed to update post"] } as FormErrors };
  }
}

export async function deletePost(id: string) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  try {
    // Delete post categories first (cascade should handle this, but being explicit)
    await db.delete(postCategories).where(eq(postCategories.postId, id));

    // Delete the post
    await db.delete(posts).where(eq(posts.id, id));

    revalidatePath("/admin/posts");
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }
}

export async function getPostById(id: string): Promise<any> {
  const session = await auth();

  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: {
        categories: {
          with: {
            category: true,
          },
        },
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post");
  }
}
