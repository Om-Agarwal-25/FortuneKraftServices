import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FortuneKraft Consultancy | SEBI Registered Research Analyst",
  description:
    "FortuneKraft Consultancy — SEBI registered equity research and stock market research services. Research-backed trade calls, real-time alerts, and disciplined analysis.",
  openGraph: {
    title: "FortuneKraft Consultancy",
    description:
      "SEBI Registered Research Analyst — Equity research and recommendations for Indian markets.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="bg-[#F8F9FA] font-sans overflow-auto">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
