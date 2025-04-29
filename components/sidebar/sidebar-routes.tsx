"use client";

import {
  LayoutDashboard,
  FileText,
  Tag,
  MessageSquare,
  Users,
  Settings,
} from "lucide-react";
import { appRoutes } from "@/lib/config";
import SidebarItem from "./sidebar-item";

const adminRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: appRoutes.admin.DASHBOARD,
  },
  {
    icon: Tag,
    label: "Categories",
    href: appRoutes.admin.CATEGORIES,
  },
  {
    icon: FileText,
    label: "Blog Posts",
    href: appRoutes.admin.POSTS,
  },
  {
    icon: Users,
    label: "Users",
    href: appRoutes.admin.USERS,
  },
  {
    icon: MessageSquare,
    label: "Comments",
    href: appRoutes.admin.COMMENTS,
  },

  {
    icon: Settings,
    label: "Settings",
    href: appRoutes.admin.SETTINGS,
  },
];

export const SidebarRoutes = () => {
  return (
    <div className="grid items-start gap-y-2">
      {adminRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
