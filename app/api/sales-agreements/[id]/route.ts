import { NextRequest, NextResponse } from "next/server";
import {
  deleteSalesAgreement,
  getSalesAgreementById,
  updateSalesAgreement,
} from "@/lib/document-api";

type Params = {
  params: { id: string };
};

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = params;

  try {
    const record = await getSalesAgreementById(id);
    if (!record) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ record });
  } catch (error) {
    console.error("Failed to fetch sales agreement:", error);
    return NextResponse.json(
      { error: "Failed to fetch sales agreement" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = params;
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

    const record = await updateSalesAgreement(id, {
      userId: body.userId,
      receiptNo: body.receiptNo,
      data: body.data,
    });

    return NextResponse.json({ record });
  } catch (error) {
    console.error("Failed to update sales agreement:", error);
    return NextResponse.json(
      { error: "Failed to update sales agreement" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = params;
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId query parameter" }, { status: 400 });
  }

  try {
    const result = await deleteSalesAgreement(id, userId);
    if (result.count === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete sales agreement:", error);
    return NextResponse.json(
      { error: "Failed to delete sales agreement" },
      { status: 500 },
    );
  }
}
