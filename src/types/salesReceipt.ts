export interface SalesReceiptData {
  // Vehicle Info
  brandModel: string;
  carType: string;
  engineTransmission: string;
  plateNumber: string;
  variant: string;
  chassisNo: string;
  engineNo: string;

  // Customer Details
  customerName: string;
  transactionDate: string;
  phoneNumber: string;
  emailAddress: string;
  agent: string;
  customerAddress: string;

  // Payment
  sellingPrice: string;
  vatPercent: string;
  vatAmount: string;
  totalAmountDue: string;

  // Meta
  receiptNo: string;
  day: string;
  month: string;
  year: string;
}

export const defaultSalesReceiptData: SalesReceiptData = {
  brandModel: '',
  carType: '',
  engineTransmission: '',
  plateNumber: '',
  variant: '',
  chassisNo: '',
  engineNo: '',
  customerName: '',
  transactionDate: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }),
  phoneNumber: '',
  emailAddress: '',
  agent: '',
  customerAddress: '',
  sellingPrice: '',
  vatPercent: '0',
  vatAmount: '0.00',
  totalAmountDue: '',
  receiptNo: `MA-${Date.now().toString().slice(-5).padStart(5, '0')}`,
  day: new Date().getDate().toString(),
  month: (new Date().getMonth() + 1).toString().padStart(2, '0'),
  year: new Date().getFullYear().toString(),
};
