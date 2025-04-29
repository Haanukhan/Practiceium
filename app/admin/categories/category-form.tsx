"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CategoryFormSchema } from "@/schemas";

type CategoryFormValues = z.infer<typeof CategoryFormSchema>;

interface CategoryFormProps {
  defaultValues?: CategoryFormValues;
}

export const CategoryForm = ({ defaultValues }: CategoryFormProps) => {
  const router = useRouter();
  const isEdit = !!defaultValues?.id;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      slug: defaultValues?.slug || "",
      id: defaultValues?.id || undefined,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      const url = isEdit ? `/api/category/${values.id}` : "/api/category";
      const method = isEdit ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to save category");
      }

      router.refresh();
      router.push("/admin/categories");
      toast.success("Category saved", {
        description: `The category has been ${
          isEdit ? "updated" : "created"
        } successfully.`,
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="category-slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-x-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default CategoryForm;
