# 🚀 Setup Guide - Elite Drive Receipts

Complete setup instructions for the Next.js + Neon + Prisma conversion.

## Prerequisites

- Node.js 18+ (with npm or bun)
- Git
- Neon account (free tier available)
- Vercel account (optional, for deployment)

## 📋 Step-by-Step Setup

### 1. Clone & Install Dependencies

```bash
cd masterautoreceipt
npm install
# or
bun install
```

### 2. Create Neon Database

1. Visit [neon.tech](https://neon.tech) and create a free account
2. Create a new project (e.g., "masterautoreceipt")
3. Copy the connection string:
   - Format: `postgresql://user:password@host/database?schema=public`
4. Keep this string handy - you'll need it next

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Copy the example
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Neon PostgreSQL Connection String
DATABASE_URL="postgresql://neon_user:your_password@ec2-123-456-789.compute-1.amazonaws.com:5432/your_db?schema=public"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Admin Credentials
ADMIN_EMAIL="jpmaster4rill@gmail.com"
ADMIN_PASSWORD="your-strong-password"
```

### 4. Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Copy the output and paste it into `.env.local` as `NEXTAUTH_SECRET`.

### 5. Initialize Database Schema

Push the Prisma schema to your Neon database:

```bash
npm run db:push
```

This will:
- Create the `User` table
- Create the `Receipt` table
- Create the `SalesAgreement` table

### 6. Create Admin User

#### Option A: Using the script

```bash
npm run create-admin
```

OR

#### Option B: Using Prisma Studio

```bash
npm run db:studio
```

Then manually create a user with:
- Email: your configured `ADMIN_EMAIL`
- Password: your configured `ADMIN_PASSWORD`

### 7. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### 8. Login

- Email: Your `ADMIN_EMAIL` (default: jpmaster4rill@gmail.com)
- Password: Your `ADMIN_PASSWORD`

## 🎯 Features to Test

Once logged in, test these features:

### Sales Receipt Generator
1. Navigate to "Sales Receipt"
2. Fill in seller, buyer, and vehicle information
3. Enter a sale price (e.g., 2650000)
4. Verify amount converts to words
5. Download PDF
6. Save to database

### Sales Agreement Generator
1. Navigate to "Sales Agreement"
2. Fill in all required fields
3. Download PDF
4. Save to database

### History View
1. Navigate to "History"
2. View all saved receipts
3. Delete old receipts
4. View receipt details

## 🔧 Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:push         # Sync schema with database
npm run db:studio       # Open Prisma Studio (GUI)
npm run db:generate     # Regenerate Prisma Client

# Build & Production
npm run build           # Build for production
npm start               # Start production server

# Linting
npm run lint            # Run ESLint
```

## 🚢 Deploy to Vercel

### Prerequisites
- GitHub account with the project repository
- Vercel account (free tier available)

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import Project in Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your repository
   - Vercel will auto-detect Next.js

3. **Set Environment Variables**
   In Vercel project settings → Environment Variables, add:
   ```
   DATABASE_URL=your-neon-connection-string
   NEXTAUTH_SECRET=your-generated-secret
   NEXTAUTH_URL=https://your-project-name.vercel.app
   ADMIN_EMAIL=jpmaster4rill@gmail.com
   ADMIN_PASSWORD=your-strong-password
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live!

### Post-Deployment
After deploying to Vercel, create the admin user on production:

Option 1: SSH to your vercel environment (if available)
```bash
npm run db:push -- --skip-generate
npx ts-node scripts/create-admin.ts
```

Option 2: Use Prisma Studio on production
```bash
npm run db:studio
```

## 🔐 Security Best Practices

### Environment Variables
- ✅ Store sensitive data in `.env.local` (never commit)
- ✅ Regenerate `NEXTAUTH_SECRET` for each environment
- ✅ Use strong `ADMIN_PASSWORD` (min 12 characters, mixed case + symbols)
- ✅ Use different secrets for dev and production

### Database
- ✅ Use Neon's built-in backup feature
- ✅ Regularly test restores
- ✅ Monitor database usage (free tier has limits)
- ✅ Set up database alerts if available

### Authentication
- ✅ Change `ADMIN_EMAIL` from default
- ✅ Enable rate limiting for login attempts (future feature)
- ✅ Audit user access logs regularly

## 🐛 Troubleshooting

### Database Connection Error
```
Error: getaddrinfo ENOTFOUND
```
- Verify `DATABASE_URL` is correct
- Check Neon database is running
- Ensure your IP is allowed in Neon firewall

**Solution**: 
1. Copy connection string again from Neon
2. Verify format: `postgresql://user:pass@host:port/db?schema=public`
3. Test connection: `npx prisma db execute --stdin < /dev/null`

### Login Fails After Deploy
```
Error: Invalid credentials
```
- Admin user might not exist on production database
- Run create-admin script on production
- Check `ADMIN_EMAIL` matches exactly

**Solution**:
```bash
# On production
npx ts-node scripts/create-admin.ts
```

### PDF Export Not Working
```
Error: Failed to download receipt
```
- Browser console should show detailed error
- html2canvas might need CORS headers
- Check JavaScript is enabled

**Solution**:
1. Open browser DevTools (F12)
2. Check Console for errors
3. Verify html2canvas is loaded
4. Try different browser

### Build Fails on Deploy
```
error: unable to resolve '@/types/receipt'
```
- Verify all imports use correct paths
- Check `.ts` files are not imported as `.js`
- Clear `.next` folder locally and rebuild

**Solution**:
```bash
rm -rf .next
npm run build
```

## 📚 Project Structure

```
src/
├── app/
│   ├── auth/login/          # Login page
│   ├── dashboard/           # Protected area
│   │   ├── sales-receipt/   # Receipt generator
│   │   ├── sales-agreement/ # Agreement generator
│   │   ├── history/         # View saved items
│   │   └── layout.tsx       # Protected layout
│   ├── api/
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── receipts/        # CRUD for receipts
│   │   └── agreements/      # CRUD for agreements
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home (redirect)
├── components/
│   ├── ReceiptForm.tsx      # Receipt input form
│   ├── ReceiptPreview.tsx   # Receipt display & export
│   ├── SalesAgreementForm.tsx
│   └── SalesAgreementPreview.tsx
├── lib/
│   ├── auth.ts              # NextAuth config
│   ├── prisma.ts            # Prisma singleton
│   ├── utils.ts             # Utilities (cn, formatPrice)
│   └── numberToWords.ts     # Convert numbers to text
├── types/
│   ├── receipt.ts
│   └── salesAgreement.ts
└── middleware.ts            # Auth session protection

prisma/
├── schema.prisma            # Database schema
└── migrations/              # Auto-generated migrations
```

## 🔄 Database Schema

### Users
```sql
id          - Unique ID (auto-generated)
email       - Unique email address
password    - Hashed password
createdAt   - Timestamp
updatedAt   - Timestamp
```

### Receipts
```sql
id               - Unique ID
receiptNo        - Unique receipt number
sellerName       - Seller name
sellerAddress    - Seller address
buyerName        - Buyer name
buyerAddress     - Buyer address
vehicleMake      - Car make (Honda, Toyota, etc.)
vehicleModel     - Car model (Accord, Corolla, etc.)
vehicleYear      - Car year
vehicleColor     - Car color
chassisNo        - VIN/Chassis number
engineNo         - Engine number
regNo            - Registration plate
odometerReading  - Odometer reading
salePrice        - Sale price in Naira
amountInWords    - Price written out
saleDay/Month/Year - Sale date
userId           - Foreign key to User
createdAt        - Timestamp
updatedAt        - Timestamp
```

### SalesAgreements
Similar to Receipts, with additional fields:
- sellerPhone
- buyerPhone
- paymentTerms
- agreementNo
- sellerSignature (optional)
- buyerSignature (optional)

## 💡 Performance Tips

1. **Database Indexing**
   - User ID is already indexed on receipts/agreements
   - Add more indexes for frequently queried fields

2. **Pagination**
   - History view currently loads all receipts
   - Consider pagination for large datasets

3. **Caching**
   - Implement Next.js ISR for read-only pages
   - Cache PDF generation if possible

4. **Image Optimization**
   - Use Next.js `Image` component when adding images
   - Optimize PDFs before download

## 📞 Support & Issues

If you encounter issues:

1. Check this troubleshooting guide
2. Review Neon documentation
3. Check Next.js docs
4. Check Prisma docs
5. Review browser console for errors

## 🎉 Congratulations!

Your modern, production-ready receipt generator is ready!

---

**Last Updated**: May 2026
**Version**: 1.0.0 - Next.js 15 with Neon & Prisma
