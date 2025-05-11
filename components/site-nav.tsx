"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

const publicRoutes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blogs" },
  { href: "/trips", label: "Trips" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full flex justify-center px-2 py-2 fixed top-0 z-50 bg-transparent">
      <div className="w-full max-w-4xl flex items-center justify-between px-4 py-2 bg-white rounded-full shadow-md backdrop-blur-md">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-sm text-black">
          <Avatar className="h-5 w-5 bg-black text-white">
            <AvatarFallback>CA</AvatarFallback>
          </Avatar>
          CareerAI
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm">
          {publicRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-black relative",
                pathname === route.href
                  ? "text-black after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-black"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            asChild
            className="text-sm rounded-full px-4 py-1.5 bg-black text-white hover:bg-neutral-800"
          >
            <Link href="/get-started">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="mt-6 flex flex-col gap-4">
                {publicRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-base font-medium hover:text-black transition-colors",
                      pathname === route.href ? "text-black" : "text-muted-foreground"
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
                <Button asChild className="mt-4 w-full">
                  <Link href="/get-started">Get Started</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
