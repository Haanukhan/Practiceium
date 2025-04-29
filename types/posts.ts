export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: "draft" | "published" | "archived";
  authorId?: string;
  adminId?: string;
  categoryId?: string;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
