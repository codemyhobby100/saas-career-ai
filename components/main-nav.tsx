"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  FileTextIcon,
  BriefcaseIcon,
  UserIcon,
  MenuIcon,
  BookOpenIcon,
  BarChartIcon,
  TicketIcon,
  LogOutIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const routes = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
  },
  {
    href: "/dashboard/resume",
    label: "Resume Analysis",
    icon: FileTextIcon,
  },
  {
    href: "/dashboard/jobs",
    label: "Job Search",
    icon: BriefcaseIcon,
  },
  {
    href: "/dashboard/skills",
    label: "Skill Gap Analysis",
    icon: BookOpenIcon,
  },
  {
    href: "/dashboard/progress",
    label: "Progress Tracker",
    icon: BarChartIcon,
  },
  {
    href: "/dashboard/tickets",
    label: "Support Tickets",
    icon: TicketIcon,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: UserIcon,
  },
];

export function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const username = "User"; // This should come from your auth context

  const NavLinks = () => (
    <nav className="flex flex-col gap-2">
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <Link
            key={route.href}
            href={route.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
              pathname === route.href
                ? "bg-secondary"
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {route.label}
          </Link>
        );
      })}
      <Button variant="ghost" size="sm" className="justify-start" asChild>
        <Link href="/auth">
          <LogOutIcon className="h-4 w-4 mr-2" />
          Sign Out
        </Link>
      </Button>
    </nav>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <header className="md:hidden sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 px-2">
                    <FileTextIcon className="h-5 w-5" />
                    <span className="font-bold">CareerAI</span>
                  </div>
                  <p className="text-sm font-medium px-2">Welcome, {username}!</p>
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <FileTextIcon className="h-5 w-5" />
              <span className="font-bold">CareerAI</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full flex-col border-r bg-background">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FileTextIcon className="h-5 w-5" />
              <span className="font-bold">CareerAI</span>
            </div>
            <ThemeToggle />
          </div>
          <p className="text-sm font-medium mb-6">Welcome, {username}!</p>
          <NavLinks />
        </div>
      </div>
    </>
  );
}