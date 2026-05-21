"use client";

import { SalesAgreementData } from "@/types/salesAgreement";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Copy } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface Props {
  data: SalesAgreementData;
}

export const SalesAgreementPreview = ({ data }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`agreement-${data.agreementNo}.pdf`);
      toast.success("Agreement downloaded successfully");
    } catch (error) {
      toast.error("Failed to download agreement");
    }
  };

  const handleCopyText = () => {
    const text = `
VEHICLE SALE AGREEMENT

Agreement No: ${data.agreementNo}
Date: ${data.agreementDay} ${data.agreementMonth} ${data.agreementYear}

SELLER:
${data.sellerName}
${data.sellerAddress}
Phone: ${data.sellerPhone}

BUYER:
${data.buyerName}
${data.buyerAddress}
Phone: ${data.buyerPhone}

VEHICLE DETAILS:
Make: ${data.vehicleMake}
Model: ${data.vehicleModel}
Year: ${data.vehicleYear}
Color: ${data.vehicleColor}
Chassis No: ${data.chassisNo}
Engine No: ${data.engineNo}
Reg No: ${data.regNo}

SALE PRICE: ₦${data.salePrice}
PAYMENT TERMS: ${data.paymentTerms}

This is a binding agreement between the seller and buyer for the sale of the above vehicle.
    `;
    navigator.clipboard.writeText(text);
    toast.success("Agreement copied to clipboard");
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
        className="bg-card border border-border rounded p-8 space-y-6 text-foreground"
      >
        <div className="text-center border-b border-foreground pb-4">
          <h1 className="text-3xl font-bold">VEHICLE SALE AGREEMENT</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Agreement No: {data.agreementNo}
          </p>
          <p className="text-sm text-muted-foreground">
            Date: {data.agreementDay} {data.agreementMonth} {data.agreementYear}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold mb-2 border-b pb-1">SELLER:</h3>
            <p>{data.sellerName}</p>
            <p className="text-sm text-muted-foreground">{data.sellerAddress}</p>
            <p className="text-sm text-muted-foreground">Phone: {data.sellerPhone}</p>
          </div>
          <div>
            <h3 className="font-bold mb-2 border-b pb-1">BUYER:</h3>
            <p>{data.buyerName}</p>
            <p className="text-sm text-muted-foreground">{data.buyerAddress}</p>
            <p className="text-sm text-muted-foreground">Phone: {data.buyerPhone}</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2 border-b pb-1">VEHICLE DETAILS:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Make:</span> {data.vehicleMake}
            </div>
            <div>
              <span className="text-muted-foreground">Model:</span>{" "}
              {data.vehicleModel}
            </div>
            <div>
              <span className="text-muted-foreground">Year:</span> {data.vehicleYear}
            </div>
            <div>
              <span className="text-muted-foreground">Color:</span>{" "}
              {data.vehicleColor}
            </div>
            <div>
              <span className="text-muted-foreground">Chassis No:</span>{" "}
              <span className="font-mono">{data.chassisNo}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Engine No:</span>{" "}
              <span className="font-mono">{data.engineNo}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Reg No:</span>{" "}
              <span className="font-mono">{data.regNo}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-b border-foreground py-4">
          <div className="text-lg font-bold">
            Sale Price: ₦{data.salePrice}
          </div>
          <div className="text-sm mt-2">
            <span className="text-muted-foreground">Payment Terms:</span>
            <p className="font-semibold">{data.paymentTerms}</p>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <p>
            The parties agree that the seller is the lawful owner of the vehicle
            and has the right to sell it. The buyer agrees to purchase the vehicle
            as-is, and all sales are final.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-8 text-center">
          <div>
            <p className="border-t border-foreground pt-2">Seller Signature</p>
          </div>
          <div>
            <p className="border-t border-foreground pt-2">Buyer Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};
