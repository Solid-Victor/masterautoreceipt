import { useNavigate } from 'react-router-dom';
import { FileText, ScrollText, Clock, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out');
    navigate('/auth');
  };

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
            <span className="text-xs text-muted-foreground hidden sm:block truncate max-w-[150px]">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs font-semibold rounded border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/sales-receipt')}
            className="group flex flex-col items-center gap-4 p-6 sm:p-8 rounded-xl border-2 border-border bg-card hover:border-primary/60 hover:shadow-lg transition-all active:scale-[0.97]"
          >
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-foreground mb-1">Sales Receipt</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Table-based receipt with vehicle info and payment summary.
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/sales-agreement')}
            className="group flex flex-col items-center gap-4 p-6 sm:p-8 rounded-xl border-2 border-border bg-card hover:border-primary/60 hover:shadow-lg transition-all active:scale-[0.97]"
          >
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <ScrollText className="w-7 h-7 text-primary" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-foreground mb-1">Sales Agreement</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Formal agreement with seller/buyer details and signatures.
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/history')}
            className="group flex flex-col items-center gap-4 p-6 sm:p-8 rounded-xl border-2 border-border bg-card hover:border-primary/60 hover:shadow-lg transition-all active:scale-[0.97]"
          >
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Clock className="w-7 h-7 text-primary" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-foreground mb-1">History</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                View, manage, and download your saved documents.
              </p>
            </div>
          </button>
        </div>
      </main>

      <footer className="border-t border-border py-4 text-center">
        <p className="text-xs text-muted-foreground">Master Luxury & Flex — MasterAutoz</p>
      </footer>
    </div>
  );
};

export default Index;
