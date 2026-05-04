import { NextRequest, NextResponse } from "next/server";
import { createSalesReceipt } from "@/lib/document-api";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      userId?: string;
      receiptNo?: string;
      data?: Record<string, unknown>;
    };

    if (!body.userId || !body.receiptNo || !body.data) {
      return NextResponse.json(
        { error: "userId, receiptNo, and data are required" },
        { status: 400 },
      );
    }

    const record = await createSalesReceipt({
      userId: body.userId,
      receiptNo: body.receiptNo,
      data: body.data,
    });

    return NextResponse.json({ record }, { status: 201 });
  } catch (error) {
    console.error("Failed to create sales receipt:", error);
    return NextResponse.json(
      { error: "Failed to create sales receipt" },
      { status: 500 },
    );
  }
}
