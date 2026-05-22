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
    const text = `
MASTER AUTO'S
Cars Sales & Nationwide Delivery

OFFICE: Abuja, Nigeria | PHONE: +234 907 499 8543

Note: there is no refund

SALES AGREEMENT

This is to certify that

Mr/Mrs. ${data.sellerName}

Of ${data.sellerAddress}

Has agreed to tell my motor vehicle with

Type of Vehicle: ${data.vehicleMake} ${data.vehicleModel} ${data.vehicleYear}

Engine No: ${data.engineNo}

Reg. No: ${data.regNo}

To Mr/Mrs: ${data.buyerName}

Of ${data.buyerAddress}

At the sum of: ₦${data.salePrice}

Amount in Words: ${data.amountInWords}

Therefore the said buyer paid the amount stated above under witness signed so as from the day of this agreement all the particulars related to the said vehicle have been handed over to the said buyer as the rightful owner.

This agreement is made this: __________ day of _________________ 20__________

SELLER                                      BUYER
Name: ${data.sellerName}         Name: ${data.buyerName}
Sign: ____________________________  Sign: ____________________________
Phone: ____________________________  Phone: ____________________________

WITNESS                                     WITNESS
Name: ____________________________  Name: ____________________________
Sign: ____________________________  Sign: ____________________________
Phone: ____________________________  Phone: ____________________________
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
        className="bg-white text-black rounded p-0 print:p-0 print:border-0"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {/* Header with Logo and Company Info */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between gap-4 mb-4">
            {/* Logo */}
            <div className="flex-shrink-0 w-32 h-20">
              <img 
                src="/master-auto-logo.png" 
                alt="Master Auto's Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                }}
              />
            </div>
            
            {/* Company Info */}
            <div className="flex-grow text-center">
              <h1 className="text-2xl font-bold text-red-600" style={{ letterSpacing: "0.1em" }}>
                MASTER AUTO'S
              </h1>
              <p className="text-sm text-blue-600 font-bold">Cars Sales & Nationwide Delivery</p>
            </div>
          </div>

          {/* Office Info Row */}
          <div className="grid grid-cols-2 gap-8 text-sm mb-3 border-b border-gray-400 pb-3">
            <div>
              <span className="font-bold text-red-600">OFFICE:</span>
              <span className="ml-2">Abuja, Nigeria</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-red-600">PHONE:</span>
              <span className="ml-2">+234 907 499 8543</span>
            </div>
          </div>
        </div>

        {/* Red Line Separator */}
        <div className="h-1 bg-red-600"></div>

        {/* No Refund Note */}
        <div className="px-6 pt-4 pb-2">
          <p className="text-sm">Note: there is no refund</p>
        </div>

        {/* Sales Agreement Title */}
        <div className="text-center pt-4 pb-4">
          <h2 className="text-xl font-bold tracking-widest">SALES AGREEMENT</h2>
        </div>

        {/* Agreement Content */}
        <div className="px-6 space-y-3 text-sm leading-relaxed">
          <p>This is to certify that</p>
          
          <p className="border-b border-gray-400 pb-1">
            Mr/Mrs. <span className="font-semibold">{data.sellerName}</span>
          </p>

          <p>Of</p>
          
          <p className="border-b border-gray-400 pb-1">
            <span className="font-semibold">{data.sellerAddress}</span>
          </p>

          <p>Has agreed to tell my motor vehicle with</p>
          
          <p className="border-b border-gray-400 pb-1">
            Type of Vehicle: <span className="font-semibold">{data.vehicleMake} {data.vehicleModel} {data.vehicleYear}</span>
          </p>

          <p className="border-b border-gray-400 pb-1">
            Engine No: <span className="font-semibold">{data.engineNo}</span>
          </p>

          <p className="border-b border-gray-400 pb-1">
            Reg. No: <span className="font-semibold">{data.regNo}</span>
          </p>

          <p>To Mr/Mrs:</p>
          
          <p className="border-b border-gray-400 pb-1">
            <span className="font-semibold">{data.buyerName}</span>
          </p>

          <p>Of</p>
          
          <p className="border-b border-gray-400 pb-1">
            <span className="font-semibold">{data.buyerAddress}</span>
          </p>

          <p>At the sum of:</p>
          
          <p className="border-b border-gray-400 pb-1">
            <span className="font-semibold">₦{data.salePrice}</span>
          </p>

          <p className="italic text-xs">Amount in Words: {data.amountInWords}</p>

          <p className="pt-2">
            Therefore the said buyer paid the amount stated above under witness signed so as from the day of this agreement all the particulars related to the said vehicle have been handed over to the said buyer as the rightful owner.
          </p>

          <p>This agreement is made this:</p>
          
          <p className="border-b border-gray-400 pb-1">
            ______________ day of __________________________ 20__________
          </p>
        </div>

        {/* Signature Section */}
        <div className="px-6 pt-8 pb-6">
          <div className="grid grid-cols-2 gap-8 text-sm mb-8">
            {/* Seller */}
            <div>
              <p className="font-bold mb-4">SELLER</p>
              <div className="space-y-6">
                <div>
                  <p>Name: <span className="border-b border-gray-400 inline-block w-32">{data.sellerName}</span></p>
                </div>
                <div>
                  <p>Sign: <span className="border-b border-gray-400 inline-block w-32"></span></p>
                </div>
                <div>
                  <p>Phone: <span className="border-b border-gray-400 inline-block w-32"></span></p>
                </div>
              </div>
            </div>

            {/* Buyer */}
            <div>
              <p className="font-bold mb-4">BUYER</p>
              <div className="space-y-6">
                <div>
                  <p>Name: <span className="border-b border-gray-400 inline-block w-32">{data.buyerName}</span></p>
                </div>
                <div>
                  <p>Sign: <span className="border-b border-gray-400 inline-block w-32"></span></p>
                </div>
                <div>
                  <p>Phone: <span className="border-b border-gray-400 inline-block w-32"></span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Witnesses */}
          <div className="grid grid-cols-2 gap-8 text-sm border-t border-gray-400 pt-6">
            {/* Witness 1 */}
            <div>
              <p className="font-bold mb-4">WITNESS</p>
              <div className="space-y-6">
                <div>
                  <p>Name: <span className="border-b border-gray-400 inline-block w-32"></span></p>
                </div>
                <div>
                  <p>Sign: <span className="border-b border-gray-400 inline-block w-32"></span></p>
                </div>
                <div>
                  <p>Phone: <span className="border-b border-gray-400 inline-block w-32"></span></p>
                </div>
              </div>
            </div>

            {/* Witness 2 */}
            <div>
              <p className="font-bold mb-4">WITNESS</p>
              <div className="space-y-6">
                <div>
                  <p>Name: <span className="border-b border-gray-400 inline-block w-32"></span></p>
                </div>
                <div>
                  <p>Sign: <span className="border-b border-gray-400 inline-block w-32"></span></p>
                </div>
                <div>
                  <p>Phone: <span className="border-b border-gray-400 inline-block w-32"></span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
