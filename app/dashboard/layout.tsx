import { MainNav } from "@/components/main-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <MainNav />
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="md:hidden">
          <MainNav />
        </div>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}