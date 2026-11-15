import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { GlobalErrorBoundary } from "@/components/GlobalErrorBoundary";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Unified IB Study Suite | 4K OLED Liquid Glass Spatial Workspace",
  description:
    "Consolidated spatial study suite for IB Diploma Programme: IB Biology SL/HL (May 2027), Orwell 1984, Physics SL, Business HL, Economics SL, and German B HL.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "IB Study Suite",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black text-[#F5F5F7] antialiased font-sans">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="bg-black text-[#F5F5F7] min-h-screen font-sans leading-[1.65] selection:bg-white/20 selection:text-white overflow-x-hidden">
        <GlobalErrorBoundary>{children}</GlobalErrorBoundary>
      </body>
    </html>
  );
}
