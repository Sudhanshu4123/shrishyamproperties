export type PropertyPurpose = 'Buy' | 'Rent' | 'Projects' | 'Commercial';

export type PropertyType = 
  | '2 BHK'
  | '3 BHK'
  | '4 BHK'
  | '5 BHK'
  | 'Builder Floor'
  | 'DDA Flat'
  | 'Society Flat'
  | 'Projects'
  | 'New Launch'
  | 'Commercial'
  | 'Shop'
  | 'Plot'
  | 'Land'
  | 'Penthouse';

export type DwarkaSector = 
  | 'Dwarka Sector 6'
  | 'Dwarka Sector 7'
  | 'Dwarka Sector 8'
  | 'Dwarka Sector 9'
  | 'Dwarka Sector 10'
  | 'Dwarka Sector 11'
  | 'Dwarka Sector 12'
  | 'Dwarka Sector 13'
  | 'Dwarka Sector 14'
  | 'Dwarka Sector 17'
  | 'Dwarka Sector 18'
  | 'Dwarka Sector 19'
  | 'Dwarka Sector 21'
  | 'Dwarka Sector 22'
  | 'Dwarka Sector 23'
  | 'Dwarka Sector 24'
  | 'MBR Enclave';

export interface Property {
  id: string;
  title: string;
  slug: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  priceDisplay: string;
  priceValue: number; // in INR
  location: string;
  sector: DwarkaSector;
  bhk: number;
  bathrooms: number;
  areaSqFt: number;
  carpetAreaSqFt: number;
  floor: string;
  totalFloors: number;
  parking: string;
  furnishing: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  facing: 'North' | 'East' | 'North-East' | 'South-East' | 'West' | 'North-West';
  propertyAge: string;
  availability: 'Ready to Move' | 'Under Construction' | 'Immediate';
  featured: boolean;
  published: boolean;
  heroImage: string;
  images: string[];
  floorPlanUrl?: string;
  description: string;
  amenities: string[];
  highlights: string[];
  contactNumber: string;
  model3dType?: 'luxury-villa' | 'high-tower' | 'penthouse-suite';
  createdAt: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Site Visit' | 'Negotiation' | 'Closed' | 'Not Interested';

export interface PropertyLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  lookingFor: PropertyPurpose;
  propertyType: PropertyType | 'Any';
  budget: string;
  preferredLocation: string;
  message?: string;
  status: LeadStatus;
  createdAt: string;
  propertyTitle?: string;
}

export interface SectorMetric {
  id: string;
  sectorName: DwarkaSector;
  shortCode: string;
  totalProperties: number;
  avgRateSqFt: string;
  highlights: string[];
  popularTypes: string[];
  coordinates: { x: number; y: number }; // percentage positions for visual map
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  propertyBought: string;
  avatarUrl?: string;
  date: string;
}
