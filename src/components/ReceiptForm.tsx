"use client";

import { ReceiptData } from "@/types/receipt";

interface Props {
  data: ReceiptData;
  onUpdate: (field: keyof ReceiptData, value: string) => void;
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

export const ReceiptForm = ({ data, onUpdate }: Props) => {
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
        <Field
          label="Odometer Reading"
          value={data.odometerReading}
          onChange={(v) => onUpdate("odometerReading", v)}
          placeholder="e.g. 45,000 km"
        />
      </Section>

      <Section title="Transaction Details">
        <Field
          label="Sale Price (₦)"
          value={data.salePrice}
          onChange={(v) => onUpdate("salePrice", v)}
          placeholder="e.g. 2,650,000.00"
          mono
        />
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            Amount in Words (auto)
          </label>
          <div className="w-full px-3 py-2 bg-muted border border-border rounded text-sm text-foreground min-h-[38px]">
            {data.amountInWords || (
              <span className="text-muted-foreground/50">
                Auto-generated from sale price
              </span>
            )}
          </div>
        </div>
        <Field
          label="Day"
          value={data.saleDay}
          onChange={(v) => onUpdate("saleDay", v)}
          placeholder="16"
        />
        <Field
          label="Month"
          value={data.saleMonth}
          onChange={(v) => onUpdate("saleMonth", v)}
          placeholder="MARCH"
        />
        <Field
          label="Year"
          value={data.saleYear}
          onChange={(v) => onUpdate("saleYear", v)}
          placeholder="2026"
        />
      </Section>
    </div>
  );
};
