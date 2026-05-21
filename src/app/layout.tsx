import type { Metadata } from "next";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Master Luxury & Flex - Receipt Generator",
  description: "Professional receipt and sales agreement generator for automotive sales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
