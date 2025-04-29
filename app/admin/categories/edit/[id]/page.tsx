import Heading from "@/components/page-heading";
import CategoryForm from "../../category-form";
import { Separator } from "@/components/ui/separator";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { appRoutes } from "@/lib/config";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

const EditCategoryPage = async ({ params }: PageProps) => {
  const category = await db
    .select()
    .from(categories)
    .where(eq(categories.id, params.id))
    .then((res) => res[0]);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="w-full flex-1 space-y-2">
      <div className="mt-20">
        <div className="mb-6">
          <Link
            className="flex items-center text-primary transition hover:opacity-75"
            href={appRoutes.admin.CATEGORIES}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </div>
        <Heading description="Edit your category" title="Edit Category" />
      </div>
      <Separator />

      <div className="space-y-6 mx-auto w-full">
        <CategoryForm defaultValues={category} />
      </div>
    </div>
  );
};

export default EditCategoryPage;
