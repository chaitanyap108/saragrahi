import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Lora } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import BrushStrokeDivider from "./components/BrushStrokeDivider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Saragrahi — Healing · Wisdom · Practice",
  description:
    "A sanctuary bridging clinical trauma recovery, Vedic sciences, and the sacred arts. UKCP-registered psychotherapy and traditional mridanga practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <Nav />
        <main className="flex-1">{children}</main>
        <BrushStrokeDivider tone="ink" size="md" className="bg-transparent" />
        <Footer />
      </body>
    </html>
  );
}
