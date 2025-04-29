"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { createPost, updatePost, type PostFormValues } from "@/actions/actions";
import { Editor } from "./editor";
import { toast } from "sonner";
import Link from "next/link";
import { appRoutes } from "@/lib/config";
import { ArrowLeft } from "lucide-react";
import Heading from "@/components/page-heading";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  categoryIds: z.array(z.string()).optional(),
  publishedAt: z.string().optional(),
});

interface PostFormProps {
  initialData?: PostFormValues & {
    categories?: Array<{ category: { id: string; name: string } }>;
  };
}

export function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      status: "draft",
      categoryIds: [],
      publishedAt: "",
    },
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories!");
      }
    };

    fetchCategories();
  }, []);

  // Auto-generate slug from title
  const title = form.watch("title");
  useEffect(() => {
    if (title && !initialData) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      form.setValue("slug", slug);
    }
  }, [title, form, initialData]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const result = initialData
        ? await updatePost(values)
        : await createPost(values);

      if (result.error) {
        const errors = result.error;

        if (errors._form) {
          toast.error("ERROR!");
        }

        // Set field errors
        Object.keys(errors).forEach((key) => {
          if (key !== "_form" && errors[key]) {
            form.setError(key as keyof z.infer<typeof formSchema>, {
              message: errors[key]?.[0],
            });
          }
        });

        return;
      }

      toast.error("Post updated successfully!");

      router.push("/admin/posts");
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="mt-5">
        <div className="mb-6">
          <Link
            className="flex items-center text-primary transition hover:opacity-75"
            href={appRoutes.admin.POSTS}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Link>
        </div>
        <Heading description="Add your blog post" title="Add Blog Posts" />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="post-slug" {...field} />
                    </FormControl>
                    <FormDescription>
                      The URL-friendly version of the title
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief summary of the post"
                        className="resize-none"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      A short summary that appears in post listings
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publishedAt"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Publish Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormDescription>
                      When to publish this post (leave empty for drafts)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryIds"
                render={() => (
                  <FormItem className="mt-4">
                    <div className="mb-2">
                      <FormLabel>Categories</FormLabel>
                      <FormDescription>
                        Select the categories for this post
                      </FormDescription>
                    </div>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <FormField
                          key={category.id}
                          control={form.control}
                          name="categoryIds"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={category.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(category.id)}
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || [];
                                      return checked
                                        ? field.onChange([
                                            ...currentValue,
                                            category.id,
                                          ])
                                        : field.onChange(
                                            currentValue.filter(
                                              (value) => value !== category.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {category.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Editor value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/posts")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Saving..."
                : initialData
                ? "Update Post"
                : "Create Post"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
