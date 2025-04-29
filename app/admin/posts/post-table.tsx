"use client";
import Link from "next/link";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";

// Define the Post type to match your schema
export type Post = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

interface PostsTableProps {
  posts: Post[];
}

export function PostsTable({ posts }: PostsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Excerpt</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Publish Date</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Content</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No posts found.
              </TableCell>
            </TableRow>
          ) : (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      post.status === "published" ? "default" : "secondary"
                    }
                  >
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(post.createdAt, "MMM dd, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/posts/edit/${post.id}`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
