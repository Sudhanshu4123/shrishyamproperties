import { Property, PropertyLead, SectorMetric, Testimonial } from '@/types/property';

export const INITIAL_PROPERTIES: Property[] = [];

export const DWARKA_SECTORS: SectorMetric[] = [
  {
    id: 'sec-6',
    sectorName: 'Dwarka Sector 6',
    shortCode: 'SEC-6',
    totalProperties: 0,
    avgRateSqFt: 'Market Price',
    highlights: ['Central Market', 'Top Schools', 'Wide Roads', 'Family Preferred'],
    popularTypes: ['3 BHK Builder Floors', '4 BHK Floors', 'DDA Pockets'],
    coordinates: { x: 45, y: 35 }
  },
  {
    id: 'sec-7',
    sectorName: 'Dwarka Sector 7',
    shortCode: 'SEC-7',
    totalProperties: 0,
    avgRateSqFt: 'Market Price',
    highlights: ['Ramphal Chowk Hub', 'High Commercial Value', 'Metro Access'],
    popularTypes: ['Luxury Builder Floors', 'Shops', '3 BHK'],
    coordinates: { x: 55, y: 32 }
  },
  {
    id: 'sec-8',
    sectorName: 'Dwarka Sector 8',
    shortCode: 'SEC-8',
    totalProperties: 0,
    avgRateSqFt: 'Market Price',
    highlights: ['Quiet Residential Pockets', 'Near Railway Station', 'Green Parks'],
    popularTypes: ['DDA Flats', 'Builder Floors'],
    coordinates: { x: 62, y: 48 }
  },
  {
    id: 'sec-10',
    sectorName: 'Dwarka Sector 10',
    shortCode: 'SEC-10',
    totalProperties: 0,
    avgRateSqFt: 'Market Price',
    highlights: ['Manipal Hospital Link', 'Metro Connectivity', 'District Park'],
    popularTypes: ['CGHS Societies', '3 BHK Flats'],
    coordinates: { x: 38, y: 52 }
  },
  {
    id: 'sec-21',
    sectorName: 'Dwarka Sector 21',
    shortCode: 'SEC-21',
    totalProperties: 0,
    avgRateSqFt: 'Market Price',
    highlights: ['Metro Interchange', 'Delhi Golf Course', 'Airport Express Link'],
    popularTypes: ['Luxury Societies', '4 BHK Penthouse'],
    coordinates: { x: 25, y: 70 }
  },
  {
    id: 'sec-23',
    sectorName: 'Dwarka Sector 23',
    shortCode: 'SEC-23',
    totalProperties: 0,
    avgRateSqFt: 'Market Price',
    highlights: ['Yashobhoomi Nearby', 'Diplomatic Enclave Link', 'Quiet Elite Pockets'],
    popularTypes: ['5 BHK Builder Floors', 'Luxury Villas'],
    coordinates: { x: 20, y: 82 }
  },
  {
    id: 'sec-mbr',
    sectorName: 'MBR Enclave',
    shortCode: 'MBR',
    totalProperties: 0,
    avgRateSqFt: 'Market Price',
    highlights: ['Freehold Plots', 'High Growth Potential', 'Dwarka Expressway Connectivity'],
    popularTypes: ['Plots', 'Independent Houses'],
    coordinates: { x: 75, y: 65 }
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [];

export const INITIAL_LEADS: PropertyLead[] = [];

