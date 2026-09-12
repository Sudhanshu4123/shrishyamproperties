import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verified Property Details',
  description: 'View verified luxury builder floors, DDA flats and apartments in Dwarka Delhi with clear titles, floor plans and 3D tours. Call +91 9911956274.',
};

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

