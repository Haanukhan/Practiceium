import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import type { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/login");
  }

  if (session.user.role !== "ADMIN") {
    return redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      <Navbar user={session.user} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
