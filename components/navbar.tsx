"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import type { User } from "next-auth";
import { LogOut, Menu, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

interface NavbarProps {
  user: Pick<User, "name" | "email" | "image"> & {
    role?: "USER" | "ADMIN";
  };
}

export function Navbar({ user }: NavbarProps) {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="fixed top-0 z-50 w-full border-b-2  bg-white shadow-md">
      <nav className="flex h-20 items-center px-4">
        {/* Logo Section */}
        <div className="flex items-center mr-4">
          <div className="relative ">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={60}
              height={40}
              priority
            />
          </div>
        </div>

        {/* User and Mobile Menu */}
        <div className="ml-auto flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-black"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 pt-10  text-white">
              <nav className="flex flex-col gap-4">
                <Button
                  variant="destructive"
                  onClick={handleSignOut}
                  className="mt-6 bg-red-600 hover:bg-red-700 text-white"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="h-9 w-9 p-0 rounded-full">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User avatar"}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-5 w-5 text-white" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl border bg-white/90 shadow-xl backdrop-blur-md"
            >
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold text-black">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}
