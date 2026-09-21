import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MobileShell } from "@/components/layout/MobileShell";

export const metadata: Metadata = {
  title: "BurjoOps - Knowledge Management System",
  description: "KMS Mobile Web App untuk UMKM Burjo SS (Tembalang, Semarang)",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="bg-[#050507] text-burjo-text antialiased min-h-screen">
        <MobileShell>{children}</MobileShell>
      </body>
    </html>
  );
}
