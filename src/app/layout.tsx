import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { GlobalErrorBoundary } from "@/components/GlobalErrorBoundary";

export const metadata: Metadata = {
  title: "Unified IB Study Suite | 4K OLED Liquid Glass Spatial Workspace",
  description:
    "Consolidated spatial study suite for IB Diploma Programme: IB Biology SL/HL (May 2027), Orwell 1984, Physics SL, Business HL, Economics SL, and German B HL.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black text-[#F5F5F7] antialiased font-sans">
      <body className="bg-black text-[#F5F5F7] min-h-screen font-sans leading-[1.65] selection:bg-white/20 selection:text-white overflow-x-clip">
        <GlobalErrorBoundary>{children}</GlobalErrorBoundary>
      </body>
    </html>
  );
}
