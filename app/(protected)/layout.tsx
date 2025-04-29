import type { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { UserSidebar } from "@/components/sidebar/user-sidebar";

export default async function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  // If not logged in, redirect to login
  if (!session?.user) {
    return redirect("/auth/login");
  }

  // If user is an admin, redirect to admin dashboard
  if (session.user.role === "ADMIN") {
    return redirect("/admin/dashboard");
  }

  return (
    <>
      <Navbar user={session.user} />
      <div className="flex">
        <UserSidebar />
        <main className="container p-8 mx-auto w-full">{children}</main>
      </div>
    </>
  );
}
