"use client";

import { useState, useEffect } from "react";
import { SalesAgreementForm } from "@/components/SalesAgreementForm";
import { SalesAgreementPreview } from "@/components/SalesAgreementPreview";
import { defaultSalesAgreementData, type SalesAgreementData } from "@/types/salesAgreement";
import { numberToWords } from "@/lib/numberToWords";
import { parsePriceToNumber } from "@/lib/utils";
import { toast } from "sonner";

export default function SalesAgreementPage() {
  const [data, setData] = useState<SalesAgreementData>(defaultSalesAgreementData);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!data.salePrice) return;

    try {
      const numPrice = parsePriceToNumber(data.salePrice);
      if (!isNaN(numPrice)) {
        setData((prev) => ({
          ...prev,
          paymentTerms: numberToWords(numPrice).replace(/ Naira Only$/, ""),
        }));
      }
    } catch (error) {
      console.error("Error converting price to words:", error);
    }
  }, [data.salePrice]);

  const handleUpdate = (field: keyof SalesAgreementData, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/agreements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save agreement");
      }

      toast.success("Agreement saved successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save agreement");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="order-2 lg:order-1">
        <div className="sticky top-4 space-y-4">
          <SalesAgreementForm data={data} onUpdate={handleUpdate} />
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Agreement"}
          </button>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <SalesAgreementPreview data={data} />
      </div>
    </div>
  );
}
