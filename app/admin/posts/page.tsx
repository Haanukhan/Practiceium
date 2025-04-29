import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { PostsTableSkeleton } from "./_components/posts-table-structure";
import { PostsTable } from "./post-table";

const PostsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 mt-20">
        <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
        <Link href="/admin/posts/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Post
          </Button>
        </Link>
      </div>
      <Suspense fallback={<PostsTableSkeleton />}>
        <PostsTable posts={[]} />
      </Suspense>
    </div>
  );
};

export default PostsPage;
