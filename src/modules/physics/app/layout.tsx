import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { ThemeToggle } from "@/modules/physics/components/ThemeToggle";

export const metadata: Metadata = {
  title: "IB Physics SL / HL — Liquid Glass Study Dashboard & Interactive Physics Lab",
  description:
    "Interactive Liquid Glass study dashboard, vector diagram laboratory, active recall revision hub, 7 guiding concepts matrix, formula bank, and complete 2025 syllabus blueprint for IB Physics SL / HL.",
};

export const viewport: Viewport = {
  themeColor: "#060402",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className="dark" data-academic-font="jakarta" data-handwritten-style="jakarta">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("study-app-theme")==="light"){document.documentElement.classList.add("theme-light")}}catch(e){}` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Caveat:wght@400;500;600;700&family=Kalam:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#060402] text-slate-100 antialiased selection:bg-amber-500/30 selection:text-amber-100 min-h-screen">
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
