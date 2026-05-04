"use client";

import { useEffect, useState } from "react";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const ALLOWED_EMAIL = 'jpmaster4rill@gmail.com';

const Auth = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [router, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.toLowerCase().trim() !== ALLOWED_EMAIL) {
      toast.error('Access denied. This account is not authorized.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      toast.success('Welcome back!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message);
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
              <p className="text-sm text-muted-foreground mt-1">Sign in with your authorized account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Please wait...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
