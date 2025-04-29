"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ISidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: ISidebarItem) => {
  const pathname = usePathname();

  const _split = pathname.split("/");
  const isActive =
    (pathname === "/admin" && href === "/admin") ||
    pathname === href ||
    _split[2]?.toLowerCase() === label.toLowerCase();

  return (
    <Link href={href}>
      <span
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-black/25 ",
          isActive ? "bg-gray-500 text-white" : "transparent"
        )}
      >
        <Icon className="mr-2 h-4 w-4" />
        <span>{label}</span>
      </span>
    </Link>
  );
};

export default SidebarItem;
