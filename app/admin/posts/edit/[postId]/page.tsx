import { getPostById } from "@/actions/actions";
import { notFound } from "next/navigation";
import { PostForm } from "../../_components/post-form";

interface EditPostPageProps {
  params: {
    postId: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await getPostById(params.postId);

  if (!post) {
    notFound();
  }

  // Transform the data for the form
  const initialData = {
    ...post,
    categoryIds: post.categories.map(
      (pc: { category: { id: string } }) => pc.category.id
    ),
    publishedAt: post.publishedAt
      ? post.publishedAt.toISOString().split("T")[0]
      : undefined,
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        Edit Post: {post.title}
      </h1>
      <PostForm initialData={initialData} />
    </div>
  );
}
