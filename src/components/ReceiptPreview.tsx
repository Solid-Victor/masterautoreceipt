"use client";

import { ReceiptData } from "@/types/receipt";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Copy } from "lucide-react";
import { type ReactNode, useRef } from "react";
import { toast } from "sonner";

interface Props {
  data: ReceiptData;
}

const getYearSuffix = (year: string) => {
  const cleanYear = year.trim();
  return cleanYear.length > 2 ? cleanYear.slice(-2) : cleanYear;
};

const Underline = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={`min-w-0 flex-1 break-words border-b border-slate-500 px-3 pb-0.5 font-semibold uppercase leading-6 text-slate-700 ${className}`}
  >
    {children}
  </span>
);

const SignatureLine = ({ label }: { label: string }) => (
  <div className="text-center">
    <div className="h-12 border-b border-slate-500" />
    <div className="mt-1 text-xs font-semibold text-slate-600">{label}</div>
  </div>
);

export const ReceiptPreview = ({ data }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const vehicle = [data.vehicleMake, data.vehicleModel, data.vehicleYear]
    .filter(Boolean)
    .join(" ");
  const yearSuffix = getYearSuffix(data.saleYear);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`receipt-${data.receiptNo}.pdf`);
      toast.success("Receipt downloaded successfully");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to download receipt");
    }
  };

  const handleCopyText = () => {
    const text = `MASTER AUTO'S
Sales Receipt
Quality Cars, Nationwide Delivery
Main Office: Abuja, Nigeria
CEO: +234 907 499 8543 | Email: info@masterautos.ng

This is to certify that I, ${data.sellerName} (Seller)
of ${data.sellerAddress}

Has agreed to sell my fairly used Car: ${vehicle} (Make/Model)

With Chassis No: ${data.chassisNo}         Engine No: ${data.engineNo}

Color: ${data.vehicleColor}         Reg. No (Plate): ${data.regNo}

Odometer Reading: ${data.odometerReading}

to Mr/Mrs/Ms: ${data.buyerName} (Buyer)

of Address: ${data.buyerAddress}

on this day: ${data.saleDay} of ${data.saleMonth}, 20 ${yearSuffix}

at the rate of ₦ ${data.salePrice} (Amount in Words: ${data.amountInWords}).

The buyer has paid in full/part following the acceptance by both parties. The vehicle and all original valid particulars have been handed over to the buyer.

Note: No refund of money after payment. Change of ownership must be completed within 7 days.`;
    navigator.clipboard.writeText(text);
    toast.success("Receipt copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
        <button
          onClick={handleCopyText}
          className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded font-medium hover:bg-primary/10 transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copy Text
        </button>
      </div>

      <div
        ref={contentRef}
        className="mx-auto w-full max-w-[794px] bg-white px-8 py-6 text-slate-700 shadow-sm"
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#ffffff",
          minHeight: "1123px",
        }}
      >
        <div className="flex items-start justify-between text-[11px] font-bold text-slate-500">
          <span>MASTER AUTO'S</span>
          <span>Receipt No: {data.receiptNo}</span>
        </div>

        <div className="mt-9 grid grid-cols-[160px_1fr] items-center gap-6">
          <div className="flex justify-center">
            <img
              src="/master-auto-logo.png"
              alt="Master Auto's logo"
              className="h-28 w-36 object-contain"
            />
          </div>
          <div className="text-center">
            <h1 className="text-[34px] font-extrabold tracking-wide text-slate-700">
              MASTER AUTO'S
            </h1>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Quality Cars, Nationwide Delivery
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Main Office: Abuja, Nigeria
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              CEO: +234 907 499 8543 | Email: info@masterautos.ng
            </p>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-[1fr_auto] items-end">
          <h2 className="pl-28 text-center text-2xl font-extrabold tracking-wide text-slate-700">
            SALES RECEIPT
          </h2>
          <div className="border border-slate-600 text-xs text-slate-700">
            <div className="grid grid-cols-3 border-b border-slate-600 font-bold">
              <div className="border-r border-slate-600 px-4 py-1 text-center">
                Day
              </div>
              <div className="border-r border-slate-600 px-4 py-1 text-center">
                Month
              </div>
              <div className="px-4 py-1 text-center">Year</div>
            </div>
            <div className="grid grid-cols-3 font-semibold">
              <div className="border-r border-slate-600 px-4 py-1 text-center">
                {data.saleDay}
              </div>
              <div className="border-r border-slate-600 px-4 py-1 text-center">
                {data.saleMonth}
              </div>
              <div className="px-4 py-1 text-center">{data.saleYear}</div>
            </div>
          </div>
        </div>

        <div className="mt-9 space-y-3 text-sm leading-6 text-slate-700">
          <div className="flex items-end gap-2">
            <span className="shrink-0">This is to certify that I,</span>
            <Underline>{data.sellerName}</Underline>
            <span className="w-16 shrink-0 text-right font-semibold">(Seller)</span>
          </div>

          <div className="flex items-end gap-2">
            <span className="shrink-0">of</span>
            <Underline>{data.sellerAddress}</Underline>
          </div>

          <div className="flex items-end gap-2">
            <span className="shrink-0">Has agreed to sell my fairly used Car:</span>
            <Underline>{vehicle}</Underline>
            <span className="w-24 shrink-0 text-right font-semibold">
              (Make/Model)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-end gap-2">
              <span className="shrink-0">With Chassis No:</span>
              <Underline>{data.chassisNo}</Underline>
            </div>
            <div className="flex items-end gap-2">
              <span className="shrink-0">Engine No:</span>
              <Underline>{data.engineNo || "NIL"}</Underline>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-end gap-2">
              <span className="shrink-0">Color:</span>
              <Underline>{data.vehicleColor}</Underline>
            </div>
            <div className="flex items-end gap-2">
              <span className="shrink-0">Reg. No (Plate):</span>
              <Underline>{data.regNo}</Underline>
            </div>
          </div>

          <div className="flex items-end gap-2">
            <span className="shrink-0">Odometer Reading:</span>
            <Underline>{data.odometerReading}</Underline>
          </div>

          <div className="flex items-end gap-2">
            <span className="shrink-0">to Mr/Mrs/Ms:</span>
            <Underline>{data.buyerName}</Underline>
            <span className="w-16 shrink-0 text-right font-semibold">(Buyer)</span>
          </div>

          <div className="flex items-end gap-2">
            <span className="shrink-0">of Address:</span>
            <Underline>{data.buyerAddress}</Underline>
          </div>

          <div className="flex items-end gap-2">
            <span className="shrink-0">on this day:</span>
            <Underline className="max-w-28">{data.saleDay}</Underline>
            <span className="shrink-0">of</span>
            <Underline>{data.saleMonth}</Underline>
            <span className="shrink-0">, 20</span>
            <Underline className="max-w-28">{yearSuffix}</Underline>
          </div>

          <div className="flex items-end gap-2">
            <span className="shrink-0">at the rate of ₦</span>
            <Underline className="max-w-44 normal-case">{data.salePrice}</Underline>
            <span className="shrink-0">(Amount in Words:</span>
            <Underline>{data.amountInWords}</Underline>
            <span className="shrink-0">).</span>
          </div>

          <div className="pt-3 text-sm font-semibold italic leading-7 text-slate-600">
            The buyer has paid in full/part following the acceptance by both
            parties. The vehicle and all original valid particulars have been
            handed over to the buyer.
          </div>

          <div className="pt-1 text-sm font-extrabold text-slate-700">
            Note: No refund of money after payment. Change of ownership must be
            completed within 7 days.
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-20 px-2">
          <SignatureLine label="Seller's Signature" />
          <SignatureLine label="Buyer's Signature" />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-20 px-2">
          <SignatureLine label="Witness Signature" />
          <SignatureLine label="Witness Signature" />
        </div>

        <div className="mt-6 flex justify-center">
          <img
            src="/car-brand-logos.svg"
            alt="Car brand logos"
            className="h-12 w-full max-w-[640px] object-contain"
          />
        </div>

        <div className="mt-1 text-center text-sm font-extrabold text-slate-700">
          Please contact us for all car brands!
        </div>

        <div className="mt-11 flex items-end justify-between text-[10px] font-semibold text-slate-500">
          <div>https://elite-drive-showcase.vercel.app</div>
          <div>Page 1 of 1</div>
        </div>
      </div>
    </div>
  );
};
