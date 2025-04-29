import { PostForm } from "../_components/post-form";

export default function NewPostPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        Create New Post
      </h1>
      <PostForm />
    </div>
  );
}
