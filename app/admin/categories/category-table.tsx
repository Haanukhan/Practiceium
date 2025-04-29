"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/category";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryActionsCell } from "./_components/category-action-cell";

interface CategoryTableProps {
  data: Category[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({ data }) => {
  const [categories, setCategories] = useState<Category[]>(data);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [nameFilter, setNameFilter] = useState("");

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      id: "actions",
      cell: ({ row }: { row: { original: Category } }) => (
        <CategoryActionsCell
          category={row.original}
          onDeleted={fetchCategories}
        />
      ),
    },
  ];

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
    table.getColumn("name")?.setFilterValue(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Input
          placeholder="Filter categories..."
          value={nameFilter}
          onChange={handleFilterChange}
          className="max-w-sm"
        />
      </div>
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default CategoryTable;
