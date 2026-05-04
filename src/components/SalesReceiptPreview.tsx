"use client";

import Image from "next/image";
import { SalesReceiptData } from '@/types/salesReceipt';

interface Props {
  data: SalesReceiptData;
}

const cellStyle: React.CSSProperties = {
  padding: '6px 10px',
  fontSize: '11px',
  borderBottom: '1px solid #D1D5DB',
  verticalAlign: 'top',
};

const labelStyle: React.CSSProperties = {
  ...cellStyle,
  fontWeight: 600,
  color: '#374151',
  whiteSpace: 'nowrap',
  width: '140px',
};

const valueStyle: React.CSSProperties = {
  ...cellStyle,
  color: '#1a1a1a',
};

const sectionHeader: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  color: '#1a1a1a',
  padding: '6px 10px',
  backgroundColor: '#F3F4F6',
  borderBottom: '1.5px solid #9CA3AF',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

export const SalesReceiptPreview = ({ data }: Props) => {
  const formatPrice = (val: string) => {
    if (!val) return '0.00';
    const num = parseFloat(val.replace(/,/g, ''));
    return isNaN(num) ? '0.00' : num.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const sellingNum = parseFloat((data.sellingPrice || '0').replace(/,/g, '')) || 0;
  const vatPct = parseFloat(data.vatPercent || '0') || 0;
  const vatAmt = sellingNum * (vatPct / 100);
  const total = sellingNum + vatAmt;

  return (
    <div
      id="receipt-preview"
      style={{
        background: '#ffffff',
        fontFamily: "'Inter', sans-serif",
        fontSize: '12px',
        lineHeight: '1.5',
        color: '#1a1a1a',
        padding: '28px 36px',
        maxWidth: '210mm',
        minHeight: '297mm',
        maxHeight: '297mm',
        overflow: 'hidden',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', color: '#9CA3AF', marginBottom: '8px' }}>
        <span>MASTER LUXURY & FLEX</span>
        <span>{data.transactionDate}</span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
        <Image
          src="/logo.png"
          alt="Master Luxury & Flex"
          width={72}
          height={72}
          style={{ width: "72px", height: "72px", objectFit: "contain", borderRadius: "4px" }}
          priority
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px', margin: 0 }}>
            MASTER <span style={{ color: '#DC2626' }}>LUXURY</span> & FLEX
          </h1>
          <p style={{ fontSize: '10px', color: '#4B5563', margin: '3px 0 0', lineHeight: '1.4' }}>
            MASTERAUTOZ · We deal on all kinds of cars · Nationwide Delivery
          </p>
          <p style={{ fontSize: '10px', color: '#4B5563', margin: '2px 0 0' }}>
            Phone: 09074998543 | Web: elite-drive-showcase.vercel.app
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderBottom: '2.5px solid #1a1a1a', marginBottom: '4px' }}>
        <div style={{ borderBottom: '1px solid #DC2626', marginBottom: '3px' }} />
      </div>

      {/* Receipt No + Date box */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a', letterSpacing: '3px', textTransform: 'uppercase', margin: '8px 0 0' }}>
          Sales Receipt
        </h2>
        <div style={{ border: '1.5px solid #1a1a1a' }}>
          <table style={{ fontSize: '9px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
                <th style={{ padding: '3px 10px', fontWeight: 600, borderRight: '1px solid #4B5563' }}>No:</th>
                <th colSpan={3} style={{ padding: '3px 10px', fontWeight: 600 }}>{data.receiptNo}</th>
              </tr>
              <tr style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
                <th style={{ padding: '3px 10px', fontWeight: 600, borderRight: '1px solid #4B5563' }}>Day</th>
                <th style={{ padding: '3px 10px', fontWeight: 600, borderRight: '1px solid #4B5563' }}>Month</th>
                <th style={{ padding: '3px 10px', fontWeight: 600 }}>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '4px 10px', textAlign: 'center', fontWeight: 600, borderRight: '1px solid #D1D5DB' }}>{data.day || '—'}</td>
                <td style={{ padding: '4px 10px', textAlign: 'center', fontWeight: 600, borderRight: '1px solid #D1D5DB' }}>{data.month || '—'}</td>
                <td style={{ padding: '4px 10px', textAlign: 'center', fontWeight: 600 }}>{data.year || '—'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Vehicle Information */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', border: '1px solid #D1D5DB' }}>
        <thead>
          <tr><th colSpan={4} style={sectionHeader}>Vehicle Information</th></tr>
        </thead>
        <tbody>
          <tr>
            <td style={labelStyle}>Brand / Model</td>
            <td style={valueStyle}>{data.brandModel || '—'}</td>
            <td style={labelStyle}>Car Type</td>
            <td style={valueStyle}>{data.carType || '—'}</td>
          </tr>
          <tr>
            <td style={labelStyle}>Engine / Transmission</td>
            <td style={valueStyle}>{data.engineTransmission || '—'}</td>
            <td style={labelStyle}>Plate Number</td>
            <td style={{ ...valueStyle, fontFamily: 'monospace' }}>{data.plateNumber || '—'}</td>
          </tr>
          <tr>
            <td style={labelStyle}>Variant</td>
            <td style={valueStyle}>{data.variant || '—'}</td>
            <td style={labelStyle}>Chassis No.</td>
            <td style={{ ...valueStyle, fontFamily: 'monospace' }}>{data.chassisNo || '—'}</td>
          </tr>
          <tr>
            <td style={labelStyle}>Engine No.</td>
            <td colSpan={3} style={{ ...valueStyle, fontFamily: 'monospace' }}>{data.engineNo || '—'}</td>
          </tr>
        </tbody>
      </table>

      {/* Customer Details */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', border: '1px solid #D1D5DB' }}>
        <thead>
          <tr><th colSpan={4} style={sectionHeader}>Customer Details</th></tr>
        </thead>
        <tbody>
          <tr>
            <td style={labelStyle}>Customer Name</td>
            <td style={valueStyle}>{data.customerName || '—'}</td>
            <td style={labelStyle}>Transaction Date</td>
            <td style={valueStyle}>{data.transactionDate || '—'}</td>
          </tr>
          <tr>
            <td style={labelStyle}>Phone Number</td>
            <td style={valueStyle}>{data.phoneNumber || '—'}</td>
            <td style={labelStyle}>Email Address</td>
            <td style={valueStyle}>{data.emailAddress || '—'}</td>
          </tr>
          <tr>
            <td style={labelStyle}>Agent</td>
            <td style={valueStyle}>{data.agent || '—'}</td>
            <td style={labelStyle}>Address</td>
            <td style={valueStyle}>{data.customerAddress || '—'}</td>
          </tr>
        </tbody>
      </table>

      {/* Payment Summary */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <table style={{ borderCollapse: 'collapse', border: '1px solid #D1D5DB', minWidth: '340px' }}>
          <thead>
            <tr><th colSpan={2} style={{ ...sectionHeader, textAlign: 'right' }}>Payment Summary</th></tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...cellStyle, fontWeight: 600, color: '#374151' }}>Selling Price</td>
              <td style={{ ...cellStyle, textAlign: 'right', fontFamily: 'monospace', fontWeight: 600 }}>₦ {formatPrice(data.sellingPrice)}</td>
            </tr>
            <tr>
              <td style={{ ...cellStyle, fontWeight: 600, color: '#374151' }}>VAT ({vatPct}%)</td>
              <td style={{ ...cellStyle, textAlign: 'right', fontFamily: 'monospace' }}>₦ {vatAmt.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
            <tr style={{ backgroundColor: '#F9FAFB' }}>
              <td style={{ ...cellStyle, fontWeight: 700, fontSize: '12px', borderBottom: 'none' }}>TOTAL AMOUNT DUE</td>
              <td style={{ ...cellStyle, textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, fontSize: '12px', borderBottom: 'none' }}>₦ {total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Signatures */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', margin: '30px 0 16px' }}>
        <div>
          <div style={{ borderBottom: '1.5px dashed #9CA3AF', height: '50px' }} />
          <p style={{ fontSize: '10px', textAlign: 'center', marginTop: '4px', color: '#DC2626', fontWeight: 600 }}>Customer Signature</p>
        </div>
        <div>
          <div style={{ borderBottom: '1.5px dashed #9CA3AF', height: '50px' }} />
          <p style={{ fontSize: '10px', textAlign: 'center', marginTop: '4px', color: '#DC2626', fontWeight: 600 }}>Authorised Signature</p>
        </div>
      </div>

      {/* Car Brand Logos */}
      <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '24px' }}>
        <Image
          src="/car-logos.png"
          alt="We deal on all car brands"
          width={1200}
          height={80}
          style={{ width: "100%", height: "80px", objectFit: "contain", display: "block", opacity: 0.85 }}
        />
        <p style={{ fontSize: '10px', fontWeight: 600, color: '#1a1a1a', letterSpacing: '0.5px', margin: '5px 0 0' }}>
          Please contact us for all car brands!
        </p>
      </div>

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: '20px', left: '36px', right: '36px' }}>
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '8px', color: '#9CA3AF', margin: 0 }}>
            Master Luxury & Flex — MasterAutoz · elite-drive-showcase.vercel.app
          </p>
          <p style={{ fontSize: '7px', color: '#D1D5DB', margin: 0 }}>
            Page 1 of 1
          </p>
        </div>
      </div>
    </div>
  );
};
