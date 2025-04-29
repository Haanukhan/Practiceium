"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryDeleteDialog } from "./category-delete";
import { Category } from "@/types/category";

interface Props {
  category: Category;
  onDeleted: () => void;
}

export const CategoryActionsCell: React.FC<Props> = ({
  category,
  onDeleted,
}) => {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const onDelete = async () => {
    try {
      await axios.delete(`/api/category/${category.id}`);
      toast.success("Category deleted successfully.");
      onDeleted();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const onEdit = () => {
    router.push(`/admin/categories/edit/${category.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(category.id)}
          >
            Copy category ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CategoryDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={onDelete}
      />
    </>
  );
};
