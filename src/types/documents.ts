export type AgreementOrReceiptData = Record<string, unknown>;

export interface DocumentRecord {
  id: string;
  receipt_no: string;
  data: AgreementOrReceiptData;
  created_at: string;
  type: "agreement" | "receipt";
}
