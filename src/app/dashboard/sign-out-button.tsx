"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ redirect: false }).then(() => { window.location.href = "/auth/login"; })}
      className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs font-semibold rounded border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">Sign Out</span>
    </button>
  );
}
