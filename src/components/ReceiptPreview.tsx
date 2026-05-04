import { ReceiptData } from '@/types/receipt';
import logo from '@/assets/logo.png';
import carLogos from '@/assets/car-logos.png';

interface Props {
  data: ReceiptData;
}

const UnderlinedField = ({ label, value, placeholder, suffix, inline, flex }: {
  label?: string;
  value: string;
  placeholder?: string;
  suffix?: string;
  inline?: boolean;
  flex?: boolean;
}) => (
  <span style={{ display: flex ? 'flex' : 'inline', alignItems: flex ? 'baseline' : undefined, flex: flex ? 1 : undefined }}>
    {label && <span style={{ whiteSpace: 'nowrap' }}>{label} </span>}
    <span style={{
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      fontSize: '12px',
      borderBottom: '1.5px solid #374151',
      paddingBottom: '3px',
      paddingLeft: '4px',
      paddingRight: '4px',
      minWidth: '60px',
      display: 'inline-block',
      lineHeight: '1.4',
      textTransform: 'uppercase',
      flex: flex ? 1 : undefined,
      width: flex ? undefined : undefined,
    }}>
      {value || <span style={{ color: '#D1D5DB', fontWeight: 400, textTransform: 'none' }}>{placeholder || '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}</span>}
    </span>
    {suffix && <span style={{ whiteSpace: 'nowrap' }}> {suffix}</span>}
  </span>
);

export const ReceiptPreview = ({ data }: Props) => {
  return (
    <div
      id="receipt-preview"
      style={{
        background: '#ffffff',
        fontFamily: "'Inter', sans-serif",
        fontSize: '12px',
        lineHeight: '1.6',
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
        <span>{data.saleMonth} {data.saleDay}, {data.saleYear}</span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
        <img src={logo} alt="Master Luxury & Flex" style={{ width: '72px', height: '72px', objectFit: 'contain', borderRadius: '4px' }} />
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
      <div style={{ borderBottom: '2.5px solid #1a1a1a', marginBottom: '16px' }}>
        <div style={{ borderBottom: '1px solid #DC2626', marginBottom: '3px' }} />
      </div>

      {/* Title + Date box row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a', letterSpacing: '4px', textTransform: 'uppercase', margin: 0 }}>
          Sales Agreement
        </h2>
        <div style={{ border: '1.5px solid #1a1a1a' }}>
          <table style={{ fontSize: '9px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
                <th style={{ padding: '3px 12px', fontWeight: 600, borderRight: '1px solid #4B5563' }}>Day</th>
                <th style={{ padding: '3px 12px', fontWeight: 600, borderRight: '1px solid #4B5563' }}>Month</th>
                <th style={{ padding: '3px 12px', fontWeight: 600 }}>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '4px 12px', textAlign: 'center', fontWeight: 600, borderRight: '1px solid #D1D5DB' }}>{data.saleDay || '—'}</td>
                <td style={{ padding: '4px 12px', textAlign: 'center', fontWeight: 600, borderRight: '1px solid #D1D5DB' }}>{data.saleMonth?.slice(0, 2) || '—'}</td>
                <td style={{ padding: '4px 12px', textAlign: 'center', fontWeight: 600 }}>{data.saleYear || '—'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Body content */}
      <div style={{ fontSize: '12px', lineHeight: '2.6' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', margin: 0 }}>
          <span style={{ whiteSpace: 'nowrap' }}>This is to certify that I, </span>
          <UnderlinedField value={data.sellerName} placeholder="Seller Name" flex />
          <span style={{ fontSize: '10px', color: '#6B7280', whiteSpace: 'nowrap', marginLeft: '8px' }}>(Seller)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', margin: 0 }}>
          <span style={{ whiteSpace: 'nowrap' }}>of </span>
          <UnderlinedField value={data.sellerAddress} placeholder="Seller Address" flex />
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', margin: 0 }}>
          <span style={{ whiteSpace: 'nowrap' }}>Has agreed to sell my fairly used Car: </span>
          <UnderlinedField value={`${data.vehicleMake} ${data.vehicleModel} ${data.vehicleYear}`.trim()} placeholder="Make / Model / Year" flex />
          <span style={{ fontSize: '10px', color: '#6B7280', whiteSpace: 'nowrap', marginLeft: '8px' }}>(Make/Model)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', margin: 0 }}>
          <span style={{ whiteSpace: 'nowrap' }}>With Chassis No: </span>
          <UnderlinedField value={data.chassisNo} placeholder="VIN" flex />
          <span style={{ whiteSpace: 'nowrap', marginLeft: '24px' }}>Engine No: </span>
          <UnderlinedField value={data.engineNo} placeholder="NIL" flex />
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', margin: 0 }}>
          <span style={{ whiteSpace: 'nowrap' }}>Color: </span>
          <UnderlinedField value={data.vehicleColor} placeholder="Color" flex />
          <span style={{ whiteSpace: 'nowrap', marginLeft: '24px' }}>Reg. No (Plate): </span>
          <UnderlinedField value={data.regNo} placeholder="Plate No" flex />
        </div>

        {data.odometerReading && (
          <div style={{ display: 'flex', alignItems: 'baseline', margin: 0 }}>
            <span style={{ whiteSpace: 'nowrap' }}>Odometer Reading: </span>
            <UnderlinedField value={data.odometerReading} flex />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', margin: 0 }}>
          <span style={{ whiteSpace: 'nowrap' }}>to Mr/Mrs/Ms: </span>
          <UnderlinedField value={data.buyerName} placeholder="Buyer Name" flex />
          <span style={{ fontSize: '10px', color: '#6B7280', whiteSpace: 'nowrap', marginLeft: '8px' }}>(Buyer)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', margin: 0 }}>
          <span style={{ whiteSpace: 'nowrap' }}>of Address: </span>
          <UnderlinedField value={data.buyerAddress} placeholder="Buyer Address" flex />
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', margin: 0 }}>
          <span style={{ whiteSpace: 'nowrap' }}>on this day: </span>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '12px',
            borderBottom: '1.5px solid #374151', paddingBottom: '3px', paddingLeft: '4px', paddingRight: '4px',
            minWidth: '30px', display: 'inline-block', lineHeight: '1.4', textTransform: 'uppercase',
          }}>{data.saleDay || <span style={{ color: '#D1D5DB', fontWeight: 400 }}>DD</span>}</span>
          <span style={{ whiteSpace: 'nowrap', margin: '0 6px' }}>of</span>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '12px',
            borderBottom: '1.5px solid #374151', paddingBottom: '3px', paddingLeft: '4px', paddingRight: '4px',
            minWidth: '80px', display: 'inline-block', lineHeight: '1.4', textTransform: 'uppercase', flex: 1,
          }}>{data.saleMonth || <span style={{ color: '#D1D5DB', fontWeight: 400 }}>MONTH</span>}</span>
          <span style={{ whiteSpace: 'nowrap', marginLeft: '4px' }}>, 20</span>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '12px',
            borderBottom: '1.5px solid #374151', paddingBottom: '3px', paddingLeft: '4px', paddingRight: '4px',
            minWidth: '30px', display: 'inline-block', lineHeight: '1.4',
          }}>{data.saleYear.slice(-2) || <span style={{ color: '#D1D5DB', fontWeight: 400 }}>YY</span>}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', margin: 0 }}>
          <span style={{ whiteSpace: 'nowrap' }}>at the rate of ₦ </span>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '12px',
            borderBottom: '1.5px solid #374151', paddingBottom: '3px', paddingLeft: '4px', paddingRight: '4px',
            minWidth: '100px', display: 'inline-block', lineHeight: '1.4', textTransform: 'uppercase',
          }}>{data.salePrice || <span style={{ color: '#D1D5DB', fontWeight: 400 }}>0.00</span>}</span>
          <span style={{ whiteSpace: 'nowrap', margin: '0 8px' }}>(Amount in Words:</span>
          <UnderlinedField value={data.amountInWords} placeholder="Amount in words" flex />
          <span style={{ whiteSpace: 'nowrap' }}>).</span>
        </div>
      </div>

      {/* Legal Text */}
      <div style={{ margin: '18px 0 6px', lineHeight: '1.8' }}>
        <p style={{ fontSize: '11px', fontStyle: 'italic', color: '#374151', margin: 0 }}>
          The buyer has paid in full/part following the acceptance by both parties. The vehicle and all original valid particulars have been handed over to the buyer.
        </p>
      </div>

      <p style={{ fontSize: '11.5px', fontWeight: 700, color: '#1a1a1a', margin: '10px 0 20px' }}>
        Note: No refund of money after payment. Change of ownership must be completed within 7 days.
      </p>

      {/* Signatures */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', margin: '8px 0 12px' }}>
        <div>
          <div style={{ borderBottom: '1.5px solid #374151', height: '50px' }} />
          <p style={{ fontSize: '10px', textAlign: 'left', marginTop: '3px', color: '#4B5563', fontWeight: 500 }}>Seller's Signature</p>
        </div>
        <div>
          <div style={{ borderBottom: '1.5px solid #374151', height: '50px' }} />
          <p style={{ fontSize: '10px', textAlign: 'right', marginTop: '3px', color: '#4B5563', fontWeight: 500 }}>Buyer's Signature</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', margin: '0 0 10px' }}>
        <div>
          <div style={{ borderBottom: '1.5px solid #374151', height: '28px' }} />
          <p style={{ fontSize: '10px', textAlign: 'center', marginTop: '3px', color: '#4B5563', fontWeight: 500 }}>Witness Signature</p>
        </div>
        <div>
          <div style={{ borderBottom: '1.5px solid #374151', height: '28px' }} />
          <p style={{ fontSize: '10px', textAlign: 'center', marginTop: '3px', color: '#4B5563', fontWeight: 500 }}>Witness Signature</p>
        </div>
      </div>

      {/* Car Brand Logos */}
      <div style={{ textAlign: 'center', margin: '10px 0 4px' }}>
        <img src={carLogos} alt="We deal on all car brands" style={{ width: '100%', height: '80px', objectFit: 'contain', display: 'block', opacity: 0.85 }} />
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
