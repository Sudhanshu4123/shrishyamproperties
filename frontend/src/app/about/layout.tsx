import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Shri Shyam Associate — Trusted Real Estate in Dwarka, New Delhi",
  description:
    "Learn about Shri Shyam Associate, Dwarka's premier real estate consultancy. Over a decade of excellence in verified luxury builder floors, DDA flats, society apartments, and commercial shops across Sector 6, 7, 8, 10, 19 & Dwarka Expressway.",
  keywords: [
    "About Shri Shyam Associate",
    "Real estate advisors Dwarka",
    "Property dealer Dwarka Sector 7",
    "Trusted property consultants Dwarka",
    "Shri Shyam Properties history",
    "Dwarka real estate agency"
  ],
  alternates: {
    canonical: "https://shrishyamassociate.com/about",
  },
  openGraph: {
    title: "About Shri Shyam Associate — Dwarka's Trusted Real Estate Advisors",
    description:
      "Expert property advisory, 100% legal verification, and transparent real estate deals across Dwarka, New Delhi. Call +91 9911956274.",
    url: "https://shrishyamassociate.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
