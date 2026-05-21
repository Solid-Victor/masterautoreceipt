import { FileText, ScrollText, Clock } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
      <Link
        href="/dashboard/sales-receipt"
        className="group flex flex-col items-center gap-4 p-6 sm:p-8 rounded-xl border-2 border-border bg-card hover:border-primary/60 hover:shadow-lg transition-all active:scale-[0.97]"
      >
        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <FileText className="w-7 h-7 text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground mb-1">
            Sales Receipt
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Table-based receipt with vehicle info and payment summary.
          </p>
        </div>
      </Link>

      <Link
        href="/dashboard/sales-agreement"
        className="group flex flex-col items-center gap-4 p-6 sm:p-8 rounded-xl border-2 border-border bg-card hover:border-primary/60 hover:shadow-lg transition-all active:scale-[0.97]"
      >
        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <ScrollText className="w-7 h-7 text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground mb-1">
            Sales Agreement
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Formal agreement with seller/buyer details and signatures.
          </p>
        </div>
      </Link>

      <Link
        href="/dashboard/history"
        className="group flex flex-col items-center gap-4 p-6 sm:p-8 rounded-xl border-2 border-border bg-card hover:border-primary/60 hover:shadow-lg transition-all active:scale-[0.97]"
      >
        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Clock className="w-7 h-7 text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground mb-1">History</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            View and manage previously generated receipts and agreements.
          </p>
        </div>
      </Link>
    </div>
  );
}
