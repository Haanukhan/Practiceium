import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UserDashboardPage() {
  const session = await auth();

  // Verify the user is logged in (and not an admin)
  if (!session?.user) {
    return redirect("/auth/login");
  }

  // If user is an admin, redirect to admin dashboard
  if (session.user.role === "ADMIN") {
    return redirect("/admin/dashboard");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mt-28">User Dashboard</h1>
    </div>
  );
}
