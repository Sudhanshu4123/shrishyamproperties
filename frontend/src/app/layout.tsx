import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shri Shyam Properties — Premium Real Estate in Dwarka, New Delhi",
  description:
    "Find 2, 3, 4 & 5 BHK luxury builder floors, DDA flats, society apartments, commercial shops, and plots in Dwarka, New Delhi. Verified listings with 3D property inspection at Shri Shyam Properties.",
  keywords:
    "Dwarka properties, builder floor Dwarka, 3 BHK Dwarka Sector 7, DDA flat Dwarka, property for sale Dwarka, property for rent Dwarka, Shri Shyam Properties",
  authors: [{ name: "Shri Shyam Properties" }],
  openGraph: {
    title: "Shri Shyam Properties — Dwarka Real Estate",
    description: "Premium Dwarka real estate: builder floors, DDA flats, society apartments, commercial properties. Contact: 9911956274",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f0f4f8]">{children}</body>
    </html>
  );
}
