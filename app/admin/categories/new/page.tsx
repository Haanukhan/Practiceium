import Heading from "@/components/page-heading";
import CategoryForm from "../category-form";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { appRoutes } from "@/lib/config";
import { ArrowLeft } from "lucide-react";

export default function NewCategoryPage() {
  return (
    <div className="w-full flex-1 space-y-4">
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
        <Heading
          description="Add a new category to your blog"
          title="Create Category"
        />
      </div>
      <Separator />
      <div className="space-y-4 mx-auto w-full">
        <CategoryForm />
      </div>
    </div>
  );
}
