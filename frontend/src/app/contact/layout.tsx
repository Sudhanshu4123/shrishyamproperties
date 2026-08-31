import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Shri Shyam Associate — Property Dealer in Dwarka, New Delhi",
  description:
    "Get in touch with Shri Shyam Associate for property buying, selling, renting, or site visits in Dwarka, New Delhi. Call/WhatsApp +91 9911956274 or email shrishyamproperties001@gmail.com. Office at Dwarka Sector 7.",
  keywords: [
    "Contact Shri Shyam Associate",
    "Real estate agent contact Dwarka",
    "Dwarka Sector 7 property office",
    "Schedule property visit Dwarka",
    "Shri Shyam Properties phone number",
    "Property dealer near me Dwarka"
  ],
  alternates: {
    canonical: "https://shrishyamassociate.com/contact",
  },
  openGraph: {
    title: "Contact Shri Shyam Associate — Dwarka Real Estate Office",
    description:
      "Schedule your site visit today. Direct assistance for luxury builder floors & flats in Dwarka. Call +91 9911956274.",
    url: "https://shrishyamassociate.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
