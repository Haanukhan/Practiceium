"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const userRoutes = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
  { href: "/settings", label: "Settings" },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 mt-28 h-screen bg-gradient-to-b from-white to-purple-50 border-r px-6 py-8 shadow-md">
      <nav className="flex flex-col gap-2">
        {userRoutes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                isActive
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-purple-100 hover:text-purple-800"
              )}
            >
              {route.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
