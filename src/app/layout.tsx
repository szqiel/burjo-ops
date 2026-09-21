import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BurjoOps - KMS Mobile Web App",
  description: "Knowledge Management System Mobile Web App untuk UMKM Burjo SS",
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
      <body className="bg-burjo-canvas text-burjo-text antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
