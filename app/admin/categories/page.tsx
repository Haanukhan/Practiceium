import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryTable from "./category-table";

export default function CategoriesPage() {
  return (
    <div className="space-y-4 mx-auto ">
      <div className="flex items-center justify-between w-full mt-20">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage your blog categories here.
          </p>
        </div>
        <div className="ml-px">
          <Button asChild>
            <Link href="/admin/categories/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Category
            </Link>
          </Button>
        </div>
      </div>

      <CategoryTable data={[]} />
    </div>
  );
}
