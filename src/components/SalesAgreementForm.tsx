"use client";

import { SalesAgreementData } from "@/types/salesAgreement";

interface Props {
  data: SalesAgreementData;
  onUpdate: (field: keyof SalesAgreementData, value: string) => void;
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 border-b border-primary/20 pb-2">
      {title}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
  </div>
);

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  full,
  mono,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  full?: boolean;
  mono?: boolean;
}) => (
  <div className={full ? "sm:col-span-2" : ""}>
    <label className="block text-xs font-medium text-muted-foreground mb-1">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors ${
        mono ? "font-mono" : ""
      }`}
    />
  </div>
);

export const SalesAgreementForm = ({ data, onUpdate }: Props) => {
  return (
    <div className="bg-card rounded border border-border p-4 sm:p-5">
      <Section title="Seller Information">
        <Field
          label="Full Name"
          value={data.sellerName}
          onChange={(v) => onUpdate("sellerName", v)}
          placeholder="e.g. John Doe"
          full
        />
        <Field
          label="Address"
          value={data.sellerAddress}
          onChange={(v) => onUpdate("sellerAddress", v)}
          placeholder="e.g. 123 Main Street, Lagos"
          full
        />
        <Field
          label="Phone Number"
          value={data.sellerPhone}
          onChange={(v) => onUpdate("sellerPhone", v)}
          placeholder="e.g. +234 802 000 0000"
        />
      </Section>

      <Section title="Buyer Information">
        <Field
          label="Full Name"
          value={data.buyerName}
          onChange={(v) => onUpdate("buyerName", v)}
          placeholder="e.g. Jane Smith"
          full
        />
        <Field
          label="Address"
          value={data.buyerAddress}
          onChange={(v) => onUpdate("buyerAddress", v)}
          placeholder="e.g. 456 Park Avenue, Abuja"
          full
        />
        <Field
          label="Phone Number"
          value={data.buyerPhone}
          onChange={(v) => onUpdate("buyerPhone", v)}
          placeholder="e.g. +234 802 000 0000"
        />
      </Section>

      <Section title="Vehicle Details">
        <Field
          label="Make"
          value={data.vehicleMake}
          onChange={(v) => onUpdate("vehicleMake", v)}
          placeholder="e.g. Honda"
        />
        <Field
          label="Model"
          value={data.vehicleModel}
          onChange={(v) => onUpdate("vehicleModel", v)}
          placeholder="e.g. Accord"
        />
        <Field
          label="Year"
          value={data.vehicleYear}
          onChange={(v) => onUpdate("vehicleYear", v)}
          placeholder="e.g. 2020"
        />
        <Field
          label="Color"
          value={data.vehicleColor}
          onChange={(v) => onUpdate("vehicleColor", v)}
          placeholder="e.g. Black"
        />
        <Field
          label="Chassis / VIN No."
          value={data.chassisNo}
          onChange={(v) => onUpdate("chassisNo", v)}
          placeholder="e.g. 1HGCM56613A821909"
          full
          mono
        />
        <Field
          label="Engine No."
          value={data.engineNo}
          onChange={(v) => onUpdate("engineNo", v)}
          placeholder="e.g. K24A3-2045678"
          mono
        />
        <Field
          label="Reg. No. (Plate)"
          value={data.regNo}
          onChange={(v) => onUpdate("regNo", v)}
          placeholder="e.g. ABC 123 XY"
          mono
        />
      </Section>

      <Section title="Transaction Details">
        <Field
          label="Sale Price (₦)"
          value={data.salePrice}
          onChange={(v) => onUpdate("salePrice", v)}
          placeholder="e.g. 2,650,000.00"
          mono
          full
        />
        <Field
          label="Amount in Words"
          value={data.paymentTerms}
          onChange={(v) => onUpdate("paymentTerms", v)}
          placeholder="e.g. Two Million, Nine Hundred Thousand"
          full
        />
        <Field
          label="Day"
          value={data.agreementDay}
          onChange={(v) => onUpdate("agreementDay", v)}
          placeholder="16"
        />
        <Field
          label="Month"
          value={data.agreementMonth}
          onChange={(v) => onUpdate("agreementMonth", v)}
          placeholder="MARCH"
        />
        <Field
          label="Year"
          value={data.agreementYear}
          onChange={(v) => onUpdate("agreementYear", v)}
          placeholder="2026"
        />
      </Section>
    </div>
  );
};
