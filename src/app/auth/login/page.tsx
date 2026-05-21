"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn } from "lucide-react";

const ADMIN_EMAIL = "jpmaster4rill@gmail.com";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.toLowerCase().trim() !== ADMIN_EMAIL) {
      toast.error("Access denied. This account is not authorized.");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      if (result?.ok) {
        toast.success("Welcome back!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-brand-black border-b border-primary/30">
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-foreground">
            Master <span className="text-primary">Luxury</span> & Flex
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground tracking-widest uppercase mt-1">
            MasterAutoz · Document Generator
          </p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-xl border-2 border-border p-6 sm:p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <LogIn className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Admin Login</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Sign in with your authorized account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 mt-6 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Contact your administrator for access credentials
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
