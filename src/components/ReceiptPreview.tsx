"use client";

import { ReceiptData } from "@/types/receipt";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Copy } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface Props {
  data: ReceiptData;
}

export const ReceiptPreview = ({ data }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
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
    const text = `
RECEIPT OF SALE

Receipt No: ${data.receiptNo}
Date: ${data.saleDay} ${data.saleMonth} ${data.saleYear}

SELLER:
${data.sellerName}
${data.sellerAddress}

BUYER:
${data.buyerName}
${data.buyerAddress}

VEHICLE DETAILS:
Make: ${data.vehicleMake}
Model: ${data.vehicleModel}
Year: ${data.vehicleYear}
Color: ${data.vehicleColor}
Chassis No: ${data.chassisNo}
Engine No: ${data.engineNo}
Reg No: ${data.regNo}
Odometer: ${data.odometerReading}

SALE PRICE: ₦${data.salePrice}
AMOUNT IN WORDS: ${data.amountInWords}
    `;
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
        className="bg-white text-black border border-gray-300 rounded p-8 space-y-6 print:p-0 print:border-0"
      >
        <div className="text-center border-b border-black pb-4">
          <h1 className="text-3xl font-bold">RECEIPT OF SALE</h1>
          <p className="text-sm text-gray-600 mt-2">
            Receipt No: {data.receiptNo}
          </p>
          <p className="text-sm text-gray-600">
            Date: {data.saleDay} {data.saleMonth} {data.saleYear}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold mb-2 border-b pb-1">SELLER:</h3>
            <p className="text-sm">{data.sellerName}</p>
            <p className="text-xs text-gray-600">{data.sellerAddress}</p>
          </div>
          <div>
            <h3 className="font-bold mb-2 border-b pb-1">BUYER:</h3>
            <p className="text-sm">{data.buyerName}</p>
            <p className="text-xs text-gray-600">{data.buyerAddress}</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2 border-b pb-1">VEHICLE DETAILS:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Make:</span> {data.vehicleMake}
            </div>
            <div>
              <span className="text-gray-600">Model:</span> {data.vehicleModel}
            </div>
            <div>
              <span className="text-gray-600">Year:</span> {data.vehicleYear}
            </div>
            <div>
              <span className="text-gray-600">Color:</span> {data.vehicleColor}
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Chassis No:</span>{" "}
              <span className="font-mono">{data.chassisNo}</span>
            </div>
            <div>
              <span className="text-gray-600">Engine No:</span>{" "}
              <span className="font-mono">{data.engineNo}</span>
            </div>
            <div>
              <span className="text-gray-600">Reg No:</span>{" "}
              <span className="font-mono">{data.regNo}</span>
            </div>
            <div>
              <span className="text-gray-600">Odometer:</span> {data.odometerReading}
            </div>
          </div>
        </div>

        <div className="border-t border-b border-black py-4">
          <div className="text-lg font-bold">Sale Price: ₦{data.salePrice}</div>
          <div className="text-sm mt-2">
            <span className="text-gray-600">Amount in Words:</span>
            <p className="font-semibold">{data.amountInWords}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-8 text-center text-sm">
          <div>
            <div className="border-t-2 border-black pt-2 h-20"></div>
            <p>Seller Signature</p>
          </div>
          <div>
            <div className="border-t-2 border-black pt-2 h-20"></div>
            <p>Buyer Signature</p>
          </div>
        </div>

        <div className="text-xs text-gray-600 border-t pt-4 mt-8">
          <p>Master Luxury & Flex - MasterAutoz</p>
          <p>Professional Receipt Generator</p>
        </div>
      </div>
    </div>
  );
};
