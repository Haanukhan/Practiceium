import { db } from "@/drizzle/db";
import { posts, categories, users } from "@/drizzle/schema";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FileText, Tag, MessageSquare, Users } from "lucide-react";

async function getDashboardData() {
  try {
    const allPosts = await db.select().from(posts);
    const allCategories = await db.select().from(categories);
    const allUsers = await db.select().from(users);

    return {
      postCount: allPosts.length,
      categoryCount: allCategories.length,
      commentCount: 0,
      userCount: allUsers.length,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      postCount: 0,
      categoryCount: 0,
      commentCount: 0,
      userCount: 0,
    };
  }
}

export default async function AdminDashboard() {
  const { postCount, categoryCount, commentCount, userCount } =
    await getDashboardData();

  return (
    <div className="space-y-4 mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mt-20">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard.
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {[
          {
            title: "Total Posts",
            count: postCount,
            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Categories",
            count: categoryCount,
            icon: <Tag className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Comments",
            count: commentCount,
            icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Users",
            count: userCount,
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
          },
        ].map((item, index) => (
          <Card
            key={index}
            className="min-w-[200px] max-w-[220px] flex-shrink-0"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
