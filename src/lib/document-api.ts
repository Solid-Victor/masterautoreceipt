import { prisma } from "@/lib/prisma";
import { DocumentRecord } from "@/types/documents";
import { Prisma } from "@prisma/client";

type AgreementPayload = {
  userId: string;
  receiptNo: string;
  data: Record<string, unknown>;
};

type ReceiptPayload = {
  userId: string;
  receiptNo: string;
  data: Record<string, unknown>;
};

const asJson = (value: Record<string, unknown>) => value as Prisma.InputJsonValue;

export async function createSalesAgreement(payload: AgreementPayload) {
  return prisma.salesAgreement.create({
    data: {
      userId: payload.userId,
      receiptNo: payload.receiptNo,
      data: asJson(payload.data),
    },
  });
}

export async function updateSalesAgreement(id: string, payload: AgreementPayload) {
  return prisma.salesAgreement.update({
    where: { id },
    data: {
      userId: payload.userId,
      receiptNo: payload.receiptNo,
      data: asJson(payload.data),
    },
  });
}

export async function deleteSalesAgreement(id: string, userId: string) {
  return prisma.salesAgreement.deleteMany({
    where: {
      id,
      userId,
    },
  });
}

export async function getSalesAgreementById(id: string) {
  return prisma.salesAgreement.findUnique({
    where: { id },
  });
}

export async function createSalesReceipt(payload: ReceiptPayload) {
  return prisma.salesReceipt.create({
    data: {
      userId: payload.userId,
      receiptNo: payload.receiptNo,
      data: asJson(payload.data),
    },
  });
}

export async function updateSalesReceipt(id: string, payload: ReceiptPayload) {
  return prisma.salesReceipt.update({
    where: { id },
    data: {
      userId: payload.userId,
      receiptNo: payload.receiptNo,
      data: asJson(payload.data),
    },
  });
}

export async function deleteSalesReceipt(id: string, userId: string) {
  return prisma.salesReceipt.deleteMany({
    where: {
      id,
      userId,
    },
  });
}

export async function getSalesReceiptById(id: string) {
  return prisma.salesReceipt.findUnique({
    where: { id },
  });
}

export async function getCombinedHistory(userId: string): Promise<DocumentRecord[]> {
  const [agreements, receipts] = await Promise.all([
    prisma.salesAgreement.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.salesReceipt.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const normalized: DocumentRecord[] = [
    ...agreements.map((item) => ({
      id: item.id,
      receipt_no: item.receiptNo,
      data: item.data as Record<string, unknown>,
      created_at: item.createdAt.toISOString(),
      type: "agreement" as const,
    })),
    ...receipts.map((item) => ({
      id: item.id,
      receipt_no: item.receiptNo,
      data: item.data as Record<string, unknown>,
      created_at: item.createdAt.toISOString(),
      type: "receipt" as const,
    })),
  ];

  normalized.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return normalized;
}
