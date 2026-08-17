export type PropertyPurpose = 'Buy' | 'Rent' | 'Lease';

export type PropertyType = 
  | '2 BHK' 
  | '3 BHK' 
  | '4 BHK' 
  | '5 BHK' 
  | 'Builder Floor' 
  | 'DDA Flat' 
  | 'Society Flat' 
  | 'Penthouse' 
  | 'Commercial' 
  | 'Plot';

export type DwarkaSector = 
  | 'Dwarka Sector 6'
  | 'Dwarka Sector 7'
  | 'Dwarka Sector 8'
  | 'Dwarka Sector 10'
  | 'Dwarka Sector 12'
  | 'Dwarka Sector 19'
  | 'Dwarka Sector 21'
  | 'Dwarka Sector 23'
  | 'MBR Enclave'
  | 'Palam Flyover';

export type LeadStatus = 'New' | 'Contacted' | 'Site Visit Scheduled' | 'Negotiation' | 'Closed' | 'Not Interested';

export interface AdminProperty {
  id: string;
  title: string;
  slug: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  priceDisplay: string;
  priceValue: number;
  location: string;
  sector: DwarkaSector;
  bhk: number;
  bathrooms: number;
  areaSqFt: number;
  carpetAreaSqFt?: number;
  floor: string;
  totalFloors: number;
  parking: string;
  furnishing: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  facing: 'North' | 'East' | 'North-East' | 'North-West' | 'South-East';
  propertyAge: string;
  availability: 'Ready to Move' | 'Under Construction';
  featured: boolean;
  published: boolean;
  images: string[];
  heroImage: string;
  description: string;
  amenities: string[];
  highlights: string[];
  contactNumber: string;
  legalClearance: boolean;
  floorPlanUrl?: string;
  model3dType?: 'luxury-villa' | 'high-tower' | 'penthouse-suite';
  createdAt: string;
  viewsCount: number;
}

export interface AdminLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  lookingFor: PropertyPurpose;
  propertyType: PropertyType;
  budget: string;
  preferredLocation: string;
  message?: string;
  propertyId?: string;
  propertyTitle?: string;
  status: LeadStatus;
  assignedAgent?: string;
  visitDate?: string;
  notes?: string;
  createdAt: string;
}

export interface AgentStaff {
  id: string;
  name: string;
  role: 'Super Admin' | 'Senior Broker' | 'Site Manager' | 'Legal Advisor';
  phone: string;
  email: string;
  sectorSpecialization: string;
  activeDeals: number;
  status: 'Active' | 'On Leave';
  avatar: string;
}

export interface SiteVisit {
  id: string;
  clientName: string;
  clientPhone: string;
  propertyTitle: string;
  sector: string;
  visitDate: string;
  visitTime: string;
  agentAssigned: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'auth';
}

export interface SystemSettings {
  agencyName: string;
  tagline: string;
  dwarkaOfficeAddress: string;
  contactPhone: string;
  whatsappHotline: string;
  emailSupport: string;
  enable3DViewer: boolean;
  backendApiUrl: string;
  currencySymbol: string;
  requireApprovalForListings: boolean;
  cloudinaryCloudName?: string;
  cloudinaryApiKey?: string;
  cloudinaryUploadPreset?: string;
}
