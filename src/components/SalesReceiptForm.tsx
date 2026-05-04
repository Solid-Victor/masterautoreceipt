import { SalesReceiptData } from '@/types/salesReceipt';

interface Props {
  data: SalesReceiptData;
  onUpdate: (field: keyof SalesReceiptData, value: string) => void;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 border-b border-primary/20 pb-2">
      {title}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {children}
    </div>
  </div>
);

const Field = ({
  label, value, onChange, placeholder, full, mono,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; full?: boolean; mono?: boolean;
}) => (
  <div className={full ? 'sm:col-span-2' : ''}>
    <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors ${mono ? 'font-mono' : ''}`}
    />
  </div>
);

export const SalesReceiptForm = ({ data, onUpdate }: Props) => {
  return (
    <div className="bg-card rounded border border-border p-4 sm:p-5">
      <Section title="Vehicle Information">
        <Field label="Brand / Model" value={data.brandModel} onChange={v => onUpdate('brandModel', v)} placeholder="e.g. Honda - Accord 05" full />
        <Field label="Car Type" value={data.carType} onChange={v => onUpdate('carType', v)} placeholder="e.g. Saloon" />
        <Field label="Engine / Transmission" value={data.engineTransmission} onChange={v => onUpdate('engineTransmission', v)} placeholder="e.g. Nil / Automatic" />
        <Field label="Plate Number" value={data.plateNumber} onChange={v => onUpdate('plateNumber', v)} placeholder="e.g. GWA 345 DM" mono />
        <Field label="Variant" value={data.variant} onChange={v => onUpdate('variant', v)} placeholder="e.g. Grey" />
        <Field label="Chassis No." value={data.chassisNo} onChange={v => onUpdate('chassisNo', v)} placeholder="e.g. 1HGCM56613A821909" full mono />
        <Field label="Engine No." value={data.engineNo} onChange={v => onUpdate('engineNo', v)} placeholder="e.g. NA" mono />
      </Section>

      <Section title="Customer Details">
        <Field label="Customer Name" value={data.customerName} onChange={v => onUpdate('customerName', v)} placeholder="e.g. Ibebuike Queeneth" full />
        <Field label="Phone Number" value={data.phoneNumber} onChange={v => onUpdate('phoneNumber', v)} placeholder="e.g. 08106222440" />
        <Field label="Email Address" value={data.emailAddress} onChange={v => onUpdate('emailAddress', v)} placeholder="e.g. customer@gmail.com" />
        <Field label="Agent" value={data.agent} onChange={v => onUpdate('agent', v)} placeholder="e.g. Master K" />
        <Field label="Transaction Date" value={data.transactionDate} onChange={v => onUpdate('transactionDate', v)} placeholder="e.g. Mar 16, 2026 12:17 PM" />
        <Field label="Address" value={data.customerAddress} onChange={v => onUpdate('customerAddress', v)} placeholder="e.g. Sentosa Garden, Abuja" full />
      </Section>

      <Section title="Payment Summary">
        <Field label="Selling Price (₦)" value={data.sellingPrice} onChange={v => onUpdate('sellingPrice', v)} placeholder="e.g. 2,650,000.00" mono />
        <Field label="VAT (%)" value={data.vatPercent} onChange={v => onUpdate('vatPercent', v)} placeholder="e.g. 0" />
      </Section>
    </div>
  );
};
