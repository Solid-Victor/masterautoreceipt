import { NextRequest, NextResponse } from "next/server";
import { getCombinedHistory } from "@/lib/document-api";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId query parameter" }, { status: 400 });
  }

  try {
    const records = await getCombinedHistory(userId);
    return NextResponse.json({ records });
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}
