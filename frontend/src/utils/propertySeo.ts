import { Property } from '@/types/property';

export interface PropertySeoMetadata {
  cleanTitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  societyName: string;
  sectorName: string;
  faqs: { question: string; answer: string }[];
}

/**
 * Extracts a polished, human-readable Society name from raw location strings.
 */
export function extractSocietyName(location: string, title?: string): string {
  if (!location) return 'Prime Location';

  let loc = location.trim();
  // Remove trailing city names
  loc = loc.replace(/,\s*dwarka\s*delhi.*$/i, '');
  loc = loc.replace(/,\s*delhi.*$/i, '');
  loc = loc.replace(/,\s*gurgaon.*$/i, '');
  loc = loc.replace(/,\s*new delhi.*$/i, '');

  // Match common society patterns
  const aptMatch = loc.match(/^(.+?)(?:\s+apartment|\s+apartments|\s+kunj|\s+height|\s+heights|\s+vihar|\s+enclave|\s+society|\s+builder floor)/i);
  if (aptMatch && aptMatch[0]) {
    const rawName = aptMatch[0].trim();
    return rawName.replace(/\b\w/g, char => char.toUpperCase());
  }

  // If sector is in the location
  const sectorSplit = loc.split(/sector\s*-?\s*\d+/i)[0];
  if (sectorSplit && sectorSplit.trim().length > 3) {
    return sectorSplit.trim().replace(/\b\w/g, char => char.toUpperCase());
  }

  if (title && title.length > 5 && !title.toLowerCase().startsWith('3bhk') && !title.toLowerCase().startsWith('2bhk')) {
    return title.trim();
  }

  return 'Prime Society';
}

/**
 * Extracts a normalized Sector name (e.g., 'Dwarka Sector 7', 'Dwarka Sector 4').
 */
export function extractSectorName(location: string, defaultSector: string): string {
  const loc = (location + ' ' + (defaultSector || '')).toLowerCase();
  
  if (loc.includes('joyville') || loc.includes('sector - 102') || loc.includes('sector 102') || loc.includes('expressway')) {
    return 'Dwarka Expressway';
  }

  const match = loc.match(/sector\s*-?\s*(\d+[a-z]?)/i);
  if (match && match[1]) {
    return `Dwarka Sector ${match[1].toUpperCase()}`;
  }

  if (loc.includes('mbr')) return 'MBR Enclave';
  if (loc.includes('ramphal')) return 'Dwarka Sector 7 (Ramphal Chowk)';
  if (loc.includes('palam')) return 'Palam Vihar / Dwarka';

  return defaultSector || 'Dwarka, New Delhi';
}

/**
 * Generates top-tier, search-engine-optimized metadata for any property.
 */
export function getPropertySeo(property: Property): PropertySeoMetadata {
  const society = extractSocietyName(property.location, property.title);
  const sector = extractSectorName(property.location, property.sector);
  const bhkStr = property.bhk ? `${property.bhk} BHK` : property.type || 'Property';
  const typeStr = property.type === 'Builder Floor' ? 'Builder Floor' : property.type === 'DDA Flat' ? 'DDA Flat' : 'Apartment';
  const price = property.priceDisplay || (property.priceValue ? `₹${(property.priceValue / 10000000).toFixed(2)} Cr` : 'Call for Price');
  const purposeWord = property.purpose === 'Rent' ? 'for Rent' : 'for Sale';

  // 1. Clean Title (for H1 heading on page)
  const cleanTitle = `${bhkStr} ${typeStr} in ${society}, ${sector}`;

  // 2. Meta Title (Max 60 chars for Google & Bing zero-truncation)
  let metaTitle = `${bhkStr} in ${society}, ${sector} (${price})`;
  if (metaTitle.length > 60) {
    metaTitle = `${bhkStr} in ${society}, ${sector}`;
  }
  if (metaTitle.length > 60) {
    metaTitle = `${bhkStr} in ${society} (${price})`;
  }
  if (metaTitle.length > 60) {
    metaTitle = `${bhkStr} Flat in ${sector} — ${price}`;
  }

  // 3. Meta Description (140-155 chars strictly for Bing & Google)
  const floorInfo = property.floor ? `, ${property.floor}` : '';
  const areaInfo = property.areaSqFt ? `${property.areaSqFt} sq ft` : 'Spacious';
  const rawDesc = `Verified ${bhkStr} ${purposeWord} in ${society}, ${sector} (${areaInfo}, ${price}${floorInfo}). Lift & parking. 100% freehold title. Call +91 9911956274.`;
  const metaDescription = rawDesc.length > 158 ? `${rawDesc.slice(0, 154)}...` : rawDesc;

  // 4. High-Ranking Keywords
  const keywords = [
    `${bhkStr} in ${society}`,
    `${bhkStr} in ${sector}`,
    `Flats in ${society} Dwarka`,
    `${bhkStr} flat for sale in ${sector}`,
    `Properties in ${sector} Dwarka`,
    `${typeStr} in ${sector}`,
    `Ready to move flats in ${sector}`,
    `${society} Dwarka price`,
    'Shri Shyam Associate',
    'Real estate business Dwarka',
    'Real estate agent in Delhi',
    'Dwarka Real Estate',
    'Verified Properties in Dwarka'
  ];

  // 5. Dynamic Structured FAQs
  const faqs = [
    {
      question: `What is the price of this ${bhkStr} in ${society}, ${sector}?`,
      answer: `The asking price for this verified ${bhkStr} in ${society}, ${sector} is ${price}. It includes ${property.parking || 'reserved parking'} and clear freehold documentation.`
    },
    {
      question: `Is home loan available for this property in ${sector}?`,
      answer: `Yes, 100% bank loan approval up to 80%-90% is available on this property through nationalized and private banks like SBI, HDFC, ICICI, and Axis Bank.`
    },
    {
      question: `What amenities are included with this ${bhkStr}?`,
      answer: `This unit offers ${property.areaSqFt} sq.ft area, ${property.bathrooms || 2} bathrooms, ${property.furnishing || 'semi-furnished'} fittings, ${property.parking || 'parking'}, and high-speed lift access.`
    },
    {
      question: `How to schedule an on-ground site visit for this property?`,
      answer: `Contact Shri Shyam Associate directly at +91 9911956274 or via WhatsApp to schedule an immediate, guided physical site visit in ${sector}.`
    }
  ];

  return {
    cleanTitle,
    metaTitle,
    metaDescription,
    keywords,
    societyName: society,
    sectorName: sector,
    faqs
  };
}
