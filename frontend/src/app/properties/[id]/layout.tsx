import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verified Property Details | Shri Shyam Associate Dwarka',
  description: 'View verified 1 to 5 BHK luxury builder floors, DDA flats, and society apartments in Dwarka Delhi with clear titles and 3D virtual tours. Call +91 9911956274.',
};

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

