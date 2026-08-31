import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent in Dwarka, New Delhi | Shri Shyam Associate",
  description:
    "Explore verified 2 BHK, 3 BHK, 4 BHK builder floors, DDA flats, CGHS societies, penthouses & commercial shops for sale and rent in Dwarka Sector 6, 7, 8, 10, 11, 19, 21, 23 & Dwarka Expressway with 3D tours.",
  keywords: [
    "Properties in Dwarka",
    "Flats for sale in Dwarka",
    "Builder floors Dwarka",
    "2 BHK flats Dwarka",
    "3 BHK builder floor Dwarka",
    "4 BHK luxury floor Dwarka",
    "Rent flat in Dwarka",
    "Commercial shop in Dwarka",
    "Dwarka Sector 7 builder floor",
    "Dwarka Expressway properties"
  ],
  alternates: {
    canonical: "https://shrishyamassociate.com/properties",
  },
  openGraph: {
    title: "Properties for Sale & Rent in Dwarka | Shri Shyam Associate",
    description:
      "Browse our full catalog of verified builder floors, society apartments, and commercial shops across Dwarka. Call +91 9911956274.",
    url: "https://shrishyamassociate.com/properties",
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
