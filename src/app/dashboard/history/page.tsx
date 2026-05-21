"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Eye } from "lucide-react";
import Link from "next/link";

interface Receipt {
  id: string;
  receiptNo: string;
  sellerName: string;
  buyerName: string;
  salePrice: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch("/api/receipts");
        if (!response.ok) throw new Error("Failed to fetch receipts");
        const data = await response.json();
        setReceipts(data);
      } catch (error: any) {
        toast.error(error?.message || "Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this receipt?")) return;

    try {
      const response = await fetch(`/api/receipts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete receipt");
      setReceipts((prev) => prev.filter((r) => r.id !== id));
      toast.success("Receipt deleted successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete receipt");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (receipts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No receipts found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-6">Receipt History</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Receipt No</th>
              <th className="text-left py-3 px-4 font-semibold">Seller</th>
              <th className="text-left py-3 px-4 font-semibold">Buyer</th>
              <th className="text-left py-3 px-4 font-semibold">Price</th>
              <th className="text-left py-3 px-4 font-semibold">Date</th>
              <th className="text-center py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((receipt) => (
              <tr key={receipt.id} className="border-b border-border hover:bg-muted">
                <td className="py-3 px-4 font-mono text-sm">{receipt.receiptNo}</td>
                <td className="py-3 px-4">{receipt.sellerName}</td>
                <td className="py-3 px-4">{receipt.buyerName}</td>
                <td className="py-3 px-4 font-mono">₦{receipt.salePrice}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">
                  {new Date(receipt.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-center flex gap-2 justify-center">
                  <Link
                    href={`/dashboard/receipt/${receipt.id}`}
                    className="p-2 hover:bg-primary/10 rounded transition-colors"
                    title="View"
                  >
                    <Eye className="w-4 h-4 text-primary" />
                  </Link>
                  <button
                    onClick={() => handleDelete(receipt.id)}
                    className="p-2 hover:bg-destructive/10 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
