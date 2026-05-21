"use client";

import { useState, useEffect } from "react";
import { ReceiptForm } from "@/components/ReceiptForm";
import { ReceiptPreview } from "@/components/ReceiptPreview";
import { defaultReceiptData, type ReceiptData } from "@/types/receipt";
import { numberToWords } from "@/lib/numberToWords";
import { toast } from "sonner";
import { parsePriceToNumber } from "@/lib/utils";

export default function SalesReceiptPage() {
  const [data, setData] = useState<ReceiptData>(defaultReceiptData);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data.salePrice) {
      try {
        const numPrice = parsePriceToNumber(data.salePrice);
        if (!isNaN(numPrice)) {
          const words = numberToWords(numPrice);
          setData((prev) => ({
            ...prev,
            amountInWords: words,
          }));
        }
      } catch (error) {
        console.error("Error converting price to words:", error);
      }
    }
  }, [data.salePrice]);

  const handleUpdate = (field: keyof ReceiptData, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/receipts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save receipt");
      }

      toast.success("Receipt saved successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save receipt");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="order-2 lg:order-1">
        <div className="sticky top-4 space-y-4">
          <ReceiptForm data={data} onUpdate={handleUpdate} />
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Receipt"}
          </button>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <ReceiptPreview data={data} />
      </div>
    </div>
  );
}
