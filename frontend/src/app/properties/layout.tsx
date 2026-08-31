import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent in Delhi & Dwarka | Shri Shyam Associate",
  description:
    "Explore verified 2 BHK, 3 BHK, 4 BHK, 5 BHK luxury builder floors, DDA flats, CGHS societies, penthouses & commercial shops for sale and rent in Delhi, West Delhi, Dwarka & Dwarka Expressway with interactive 3D tours.",
  keywords: [
    "Properties in Delhi",
    "Flats for sale in Delhi",
    "Builder floors in Delhi",
    "Properties in Dwarka",
    "Flats for sale in Dwarka",
    "Builder floors Dwarka",
    "2 BHK flats in Delhi",
    "3 BHK builder floor Delhi",
    "4 BHK luxury floor Delhi",
    "Rent flat in Delhi",
    "Commercial shop in Delhi",
    "Dwarka Sector 7 builder floor",
    "Dwarka Expressway properties"
  ],
  alternates: {
    canonical: "https://shrishyamassociate.com/properties",
  },
  openGraph: {
    title: "Properties for Sale & Rent in Delhi & Dwarka | Shri Shyam Associate",
    description:
      "Browse our full catalog of verified builder floors, society apartments, and commercial shops across Delhi and Dwarka. Call +91 9911956274.",
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
