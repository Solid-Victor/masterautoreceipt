import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { LogOut } from "lucide-react";
import SignOutButton from "./sign-out-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-brand-black border-b border-primary/30">
        <div className="container mx-auto px-4 py-4 sm:py-6 flex items-center justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-foreground">
              Master <span className="text-primary">Luxury</span> & Flex
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground tracking-widest uppercase mt-1">
              MasterAutoz · Document Generator
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:block truncate max-w-[150px]">
              {session.user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12">
        {children}
      </main>
    </div>
  );
}

