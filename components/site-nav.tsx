"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileTextIcon,
  MenuIcon,
  XIcon,
  LogInIcon,
  UserPlusIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

const publicRoutes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4">
                {publicRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === route.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/auth?mode=login">
                      <LogInIcon className="w-4 h-4 mr-2" />
                      Log In
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/auth?mode=signup">
                      <UserPlusIcon className="w-4 h-4 mr-2" />
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <FileTextIcon className="h-5 w-5" />
            <span className="font-bold inline-block">CareerAI</span>
          </Link>
        </div>
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:flex">
          {publicRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2 hidden md:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/auth?mode=login">Log In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth?mode=signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}