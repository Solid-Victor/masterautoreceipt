export interface ReceiptData {
  // Seller Info
  sellerName: string;
  sellerAddress: string;

  // Buyer Info
  buyerName: string;
  buyerAddress: string;

  // Vehicle Info
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  chassisNo: string;
  engineNo: string;
  regNo: string;
  odometerReading: string;

  // Transaction
  salePrice: string;
  amountInWords: string;
  saleDay: string;
  saleMonth: string;
  saleYear: string;

  // Receipt meta
  receiptNo: string;
}

export const defaultReceiptData: ReceiptData = {
  sellerName: '',
  sellerAddress: '',
  buyerName: '',
  buyerAddress: '',
  vehicleMake: '',
  vehicleModel: '',
  vehicleYear: '',
  vehicleColor: '',
  chassisNo: '',
  engineNo: '',
  regNo: '',
  odometerReading: '',
  salePrice: '',
  amountInWords: '',
  saleDay: new Date().getDate().toString(),
  saleMonth: new Date().toLocaleString('default', { month: 'long' }).toUpperCase(),
  saleYear: new Date().getFullYear().toString(),
  receiptNo: `MA-${Date.now().toString().slice(-6)}`,
};
