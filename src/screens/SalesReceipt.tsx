"use client";

import { useState, useEffect } from "react";
import { SalesReceiptData, defaultSalesReceiptData } from "@/types/salesReceipt";
import { SalesReceiptForm } from "@/components/SalesReceiptForm";
import { SalesReceiptPreview } from "@/components/SalesReceiptPreview";
import { Download, Printer, Eye, EyeOff, Save, RotateCcw, ArrowLeft } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const SalesReceipt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const editId = searchParams.get("id");

  const [data, setData] = useState<SalesReceiptData>(defaultSalesReceiptData);
  const [generating, setGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editId) {
      void fetch(`/api/sales-receipts/${editId}`)
        .then(async (response) => {
          if (!response.ok) return null;
          return (await response.json()) as { record?: { data: SalesReceiptData } };
        })
        .then((payload) => {
          if (payload?.record?.data) {
            setData(payload.record.data);
          }
        })
        .catch(() => {
          toast.error("Unable to load receipt");
        });
    }
  }, [editId]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const body = {
        userId: user.id,
        receiptNo: data.receiptNo,
        data: JSON.parse(JSON.stringify(data)),
      };

      if (editId) {
        const response = await fetch(`/api/sales-receipts/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error("Failed to update receipt");
      } else {
        const response = await fetch("/api/sales-receipts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error("Failed to save receipt");
      }
      toast.success("Saved to database");
    } catch (e: any) {
      toast.error(e.message || "Failed to save");
    }
    setSaving(false);
  };

  const handleReset = () => {
    setData(defaultSalesReceiptData);
    toast.success("Form cleared");
  };

  const updateField = (field: keyof SalesReceiptData, value: string) => {
    setData(prev => {
      const next = { ...prev, [field]: value };
      if (field === "sellingPrice" || field === "vatPercent") {
        const price = parseFloat((field === "sellingPrice" ? value : prev.sellingPrice).replace(/,/g, "")) || 0;
        const vat = parseFloat(field === "vatPercent" ? value : prev.vatPercent) || 0;
        const vatAmt = price * (vat / 100);
        next.vatAmount = vatAmt.toFixed(2);
        next.totalAmountDue = (price + vatAmt).toFixed(2);
      }
      return next;
    });
  };

  const generateCanvas = async () => {
    const el = document.getElementById("receipt-preview");
    if (!el) return null;
    const parent = el.parentElement;
    const origParentStyles = parent ? { overflow: parent.style.overflow, maxHeight: parent.style.maxHeight, width: parent.style.width } : null;
    const origElStyles = { maxHeight: el.style.maxHeight, overflow: el.style.overflow, width: el.style.width, position: el.style.position };
    if (parent) { parent.style.overflow = "visible"; parent.style.maxHeight = "none"; parent.style.width = "794px"; }
    el.style.maxHeight = "none"; el.style.overflow = "visible"; el.style.width = "794px";
    await new Promise(r => setTimeout(r, 150));
    const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff", width: 794, windowWidth: 794 });
    if (parent && origParentStyles) { parent.style.overflow = origParentStyles.overflow; parent.style.maxHeight = origParentStyles.maxHeight; parent.style.width = origParentStyles.width; }
    Object.assign(el.style, origElStyles);
    return canvas;
  };

  const ensurePreviewVisible = async () => {
    const wasHidden = !showPreview;
    if (wasHidden) setShowPreview(true);
    await new Promise(r => setTimeout(r, 250));
    return wasHidden;
  };

  const handleDownloadPDF = async () => {
    setGenerating(true);
    try {
      const wasHidden = await ensurePreviewVisible();
      const canvas = await generateCanvas();
      if (!canvas) return;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pW = pdf.internal.pageSize.getWidth(), pH = pdf.internal.pageSize.getHeight();
      const m = 5, aW = pW - 2 * m, aH = pH - 2 * m;
      const r = canvas.width / canvas.height, pr = aW / aH;
      let iW: number, iH: number;
      if (r > pr) { iW = aW; iH = aW / r; } else { iH = aH; iW = aH * r; }
      pdf.addImage(imgData, "PNG", (pW - iW) / 2, m, iW, iH);
      pdf.save(`MasterAutoz-Receipt-${data.receiptNo}.pdf`);
      if (wasHidden) setShowPreview(false);
    } catch { toast.error("Failed to generate PDF"); }
    setGenerating(false);
  };

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-brand-black border-b border-primary/30 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push("/")} className="flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="text-center sm:text-left shrink-0">
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-primary-foreground">
                Sales <span className="text-primary">Receipt</span>
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <ActionBtn onClick={handleSave} icon={<Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />} label={saving ? "Saving..." : "Save"} className="bg-accent text-accent-foreground" disabled={saving} />
            <ActionBtn onClick={handleDownloadPDF} icon={<Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />} label="PDF" className="bg-primary text-primary-foreground" disabled={generating} />
            <ActionBtn onClick={handlePrint} icon={<Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />} label="Print" className="border border-primary/40 text-primary" />
            <ActionBtn onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />} label="Clear" className="border border-destructive/40 text-destructive" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <div className={`grid grid-cols-1 ${showPreview ? "lg:grid-cols-2" : ""} gap-4 sm:gap-6`}>
          <div className={showPreview ? "order-2 lg:order-1" : ""}>
            <SalesReceiptForm data={data} onUpdate={updateField} />
          </div>
          <div className={showPreview ? "order-1 lg:order-2 lg:sticky lg:top-16 lg:self-start" : "order-1"}>
            <div className="mb-2 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${showPreview ? "bg-primary animate-pulse" : "bg-muted-foreground"}`} />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Live Preview</span>
            </div>
            {!showPreview ? (
              <button onClick={() => setShowPreview(true)} className="w-full flex flex-col items-center justify-center gap-3 py-10 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all cursor-pointer group">
                <Eye className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-primary">Click to Preview Receipt</span>
                <span className="text-xs text-muted-foreground">See how your receipt will look before downloading</span>
              </button>
            ) : (
              <>
                <button onClick={() => setShowPreview(false)} className="w-full flex items-center justify-center gap-1.5 mb-2 px-3 py-1.5 text-xs font-medium rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                  <EyeOff className="w-3.5 h-3.5" /> Hide Preview
                </button>
                <div className="bg-card rounded border border-border shadow-lg overflow-auto max-h-[80vh]">
                  <SalesReceiptPreview data={data} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionBtn = ({ onClick, icon, label, className = '', disabled }: {
  onClick: () => void; icon: React.ReactNode; label: string; className?: string; disabled?: boolean;
}) => (
  <button onClick={onClick} disabled={disabled} className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 font-semibold text-[11px] sm:text-sm rounded hover:opacity-80 transition-colors disabled:opacity-50 ${className}`}>
    {icon}<span className="hidden xs:inline">{label}</span>
  </button>
);

export default SalesReceipt;
