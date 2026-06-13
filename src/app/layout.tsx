// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// themeColor must live in viewport export in Next.js 15
export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  title: "LearnFlow — Student Dashboard",
  description: "Your personalized AI-powered learning dashboard",
  keywords: ["learning", "dashboard", "courses", "education"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-[#0a0a0f] text-[#f1f5f9] antialiased">
        <div
          className="fixed inset-0 pointer-events-none z-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}