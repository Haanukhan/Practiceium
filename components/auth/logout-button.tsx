"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export const LogoutButton = ({ variant = "outline" }: LogoutButtonProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <Button variant={variant} onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
};
