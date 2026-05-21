export interface SalesAgreementData {
  // Seller Info
  sellerName: string;
  sellerAddress: string;
  sellerPhone: string;

  // Buyer Info
  buyerName: string;
  buyerAddress: string;
  buyerPhone: string;

  // Vehicle Info
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  chassisNo: string;
  engineNo: string;
  regNo: string;

  // Transaction
  salePrice: string;
  paymentTerms: string;
  agreementDay: string;
  agreementMonth: string;
  agreementYear: string;

  // Agreement meta
  agreementNo: string;
}

export const defaultSalesAgreementData: SalesAgreementData = {
  sellerName: "",
  sellerAddress: "",
  sellerPhone: "",
  buyerName: "",
  buyerAddress: "",
  buyerPhone: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleYear: "",
  vehicleColor: "",
  chassisNo: "",
  engineNo: "",
  regNo: "",
  salePrice: "",
  paymentTerms: "",
  agreementDay: new Date().getDate().toString(),
  agreementMonth: new Date()
    .toLocaleString("default", { month: "long" })
    .toUpperCase(),
  agreementYear: new Date().getFullYear().toString(),
  agreementNo: `MA-${Date.now().toString().slice(-6)}`,
};
