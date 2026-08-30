import { Property, PropertyLead, PropertyPurpose, PropertyType, DwarkaSector, LeadStatus } from '@/types/property';
import { INITIAL_PROPERTIES, INITIAL_LEADS, DWARKA_SECTORS, INITIAL_TESTIMONIALS } from '@/data/mockData';

const PROPERTIES_KEY = 'ssp_properties_v4';
const LEADS_KEY = 'ssp_leads_v4';

const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return '/api';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';
};

const mapBackendProperty = (p: any): Property => ({
  id: String(p.id),
  title: p.title || '',
  slug: p.slug || '',
  purpose: (p.purpose as PropertyPurpose) || 'Buy',
  type: (p.propertyType || p.type || 'Builder Floor') as PropertyType,
  priceDisplay: p.priceDisplay || '',
  priceValue: Number(p.priceValue) || 0,
  location: p.location || '',
  sector: (p.sector || 'Dwarka Sector 7') as DwarkaSector,
  bhk: Number(p.bhk) || 0,
  bathrooms: Number(p.bathrooms) || 0,
  areaSqFt: Number(p.areaSqFt) || 0,
  carpetAreaSqFt: Number(p.carpetAreaSqFt) || 0,
  floor: p.floor || '',
  totalFloors: Number(p.totalFloors) || 0,
  parking: p.parking || '',
  furnishing: p.furnishing || '',
  facing: p.facing || '',
  propertyAge: p.propertyAge || '',
  availability: p.availability || 'Ready to Move',
  featured: Boolean(p.featured),
  published: p.published !== false,
  heroImage: p.heroImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.heroImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
  description: p.description || '',
  amenities: p.amenities || ['24/7 Security', 'Power Backup', 'Reserved Parking', 'Modular Kitchen'],
  highlights: p.highlights || ['Freehold Clear Title', 'Prime Location in Dwarka', 'Ready Possession'],
  contactNumber: p.contactNumber || '+91 9911956274',
  model3dType: p.model3dType || 'luxury-villa',
  createdAt: p.createdAt || new Date().toISOString()
});

export class PropertyService {
  // Properties API
  private static saveProperties(properties: Property[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PROPERTIES_KEY, JSON.stringify(properties));
      localStorage.setItem('ssp_admin_properties_v4', JSON.stringify(properties));
      window.dispatchEvent(new Event('storage'));
    }
  }

  static getProperties(): Property[] {
    if (typeof window === 'undefined') return INITIAL_PROPERTIES;
    
    // Purge legacy storage containing stale mock data
    localStorage.removeItem('ssp_properties_v1');
    localStorage.removeItem('ssp_properties_v2');
    localStorage.removeItem('ssp_admin_properties_v2');

    const adminStored = localStorage.getItem('ssp_admin_properties_v4');
    const stored = adminStored !== null ? adminStored : localStorage.getItem(PROPERTIES_KEY);
    if (stored === null) {
      this.saveProperties(INITIAL_PROPERTIES);
      return INITIAL_PROPERTIES;
    }
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PROPERTIES;
    } catch {
      return INITIAL_PROPERTIES;
    }
  }

  static getPropertyById(id: string): Property | undefined {
    const list = this.getProperties();
    return list.find(p => String(p.id) === String(id) || p.slug === id);
  }

  static async fetchPropertiesApi(params?: {
    purpose?: string;
    type?: string;
    sector?: string;
    minPrice?: number;
    maxPrice?: number;
    bhk?: number;
    query?: string;
  }): Promise<Property[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.purpose) queryParams.set('purpose', params.purpose);
      if (params?.type) queryParams.set('type', params.type);
      if (params?.sector) queryParams.set('sector', params.sector);

      const apiUrl = getApiBaseUrl();
      const response = await fetch(`${apiUrl}/properties?${queryParams.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store'
      }).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const mappedList = data.map(mapBackendProperty);
          this.saveProperties(mappedList);
          return params ? this.searchProperties(params) : mappedList;
        }
      }
    } catch (e) {
      console.warn('Backend API connection warning, fallback to local properties:', e);
    }

    if (params) {
      return this.searchProperties(params);
    }
    return this.getProperties();
  }

  static searchProperties(params: {
    purpose?: string;
    type?: string;
    sector?: string;
    minPrice?: number;
    maxPrice?: number;
    bhk?: number;
    query?: string;
  }): Property[] {
    let list = this.getProperties().filter(p => p.published);

    if (params.purpose && params.purpose !== 'All') {
      const purp = params.purpose.toLowerCase();
      list = list.filter(p => 
        p.purpose.toLowerCase() === purp || 
        (purp === 'commercial' && (p.type.toLowerCase() === 'commercial' || p.type.toLowerCase() === 'shop'))
      );
    }

    if (params.type && params.type !== 'All') {
      list = list.filter(p => p.type.toLowerCase() === params.type?.toLowerCase());
    }

    if (params.sector && params.sector !== 'All Locations') {
      list = list.filter(p => p.sector.toLowerCase() === params.sector?.toLowerCase());
    }

    if (params.bhk && params.bhk > 0) {
      list = list.filter(p => p.bhk === Number(params.bhk));
    }

    if (params.minPrice) {
      list = list.filter(p => p.priceValue >= params.minPrice!);
    }

    if (params.maxPrice) {
      list = list.filter(p => p.priceValue <= params.maxPrice!);
    }

    if (params.query) {
      const q = params.query.toLowerCase();
      list = list.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.sector.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return list;
  }

  static getFeaturedProperties(): Property[] {
    return this.getProperties().filter(p => p.featured && p.published);
  }

  static async addProperty(property: Omit<Property, 'id' | 'createdAt'>): Promise<Property> {
    const slug = property.slug || property.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
    const payload = {
      title: property.title,
      slug: slug,
      purpose: property.purpose,
      propertyType: property.type,
      priceDisplay: property.priceDisplay,
      priceValue: property.priceValue,
      location: property.location,
      sector: property.sector,
      bhk: property.bhk,
      bathrooms: property.bathrooms,
      areaSqFt: property.areaSqFt,
      carpetAreaSqFt: property.carpetAreaSqFt,
      floor: property.floor,
      totalFloors: property.totalFloors,
      parking: property.parking,
      furnishing: property.furnishing,
      facing: property.facing,
      propertyAge: property.propertyAge,
      availability: property.availability,
      featured: property.featured,
      published: property.published,
      heroImage: property.heroImage,
      images: property.images,
      description: property.description,
      contactNumber: property.contactNumber
    };

    let newProperty: Property = {
      ...property,
      id: `prop-${Date.now()}`,
      slug: slug,
      createdAt: new Date().toISOString()
    };

    try {
      const apiUrl = getApiBaseUrl();
      const res = await fetch(`${apiUrl}/properties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const saved = await res.json();
        newProperty = mapBackendProperty(saved);
      }
    } catch (e) {
      console.warn('Backend addProperty notice:', e);
    }

    const properties = this.getProperties();
    properties.unshift(newProperty);
    this.saveProperties(properties);
    return newProperty;
  }

  static async updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
    const properties = this.getProperties();
    const index = properties.findIndex(p => String(p.id) === String(id));
    if (index === -1) return null;

    const updated = { ...properties[index], ...updates };
    properties[index] = updated;
    this.saveProperties(properties);

    if (!isNaN(Number(id))) {
      try {
        const apiUrl = getApiBaseUrl();
        await fetch(`${apiUrl}/properties/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: updated.title,
            slug: updated.slug,
            purpose: updated.purpose,
            propertyType: updated.type,
            priceDisplay: updated.priceDisplay,
            priceValue: updated.priceValue,
            location: updated.location,
            sector: updated.sector,
            bhk: updated.bhk,
            bathrooms: updated.bathrooms,
            areaSqFt: updated.areaSqFt,
            carpetAreaSqFt: updated.carpetAreaSqFt,
            floor: updated.floor,
            totalFloors: updated.totalFloors,
            parking: updated.parking,
            furnishing: updated.furnishing,
            facing: updated.facing,
            propertyAge: updated.propertyAge,
            availability: updated.availability,
            featured: updated.featured,
            published: updated.published,
            heroImage: updated.heroImage,
            images: updated.images,
            description: updated.description,
            contactNumber: updated.contactNumber
          })
        }).catch(e => console.warn('Update API sync notice:', e));
      } catch (e) {
        console.warn('Update property notice:', e);
      }
    }

    return properties[index];
  }

  static async deleteProperty(id: string): Promise<boolean> {
    const properties = this.getProperties();
    const filtered = properties.filter(p => String(p.id) !== String(id));
    this.saveProperties(filtered);

    if (!isNaN(Number(id))) {
      try {
        const apiUrl = getApiBaseUrl();
        await fetch(`${apiUrl}/properties/${id}`, { method: 'DELETE' }).catch(e => console.warn('Delete sync notice:', e));
      } catch (e) {
        console.warn('Delete property notice:', e);
      }
    }
    return true;
  }

  // Leads API
  static getLeads(): PropertyLead[] {
    if (typeof window === 'undefined') return INITIAL_LEADS;
    localStorage.removeItem('ssp_leads_v1');
    localStorage.removeItem('ssp_admin_leads_v2');

    const adminStored = localStorage.getItem('ssp_admin_leads_v4');
    const stored = adminStored || localStorage.getItem(LEADS_KEY);
    if (!stored) {
      localStorage.setItem(LEADS_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_LEADS;
    }
  }

  static async submitLead(lead: Omit<PropertyLead, 'id' | 'status' | 'createdAt'>): Promise<PropertyLead> {
    const newLead: PropertyLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    try {
      const apiUrl = getApiBaseUrl();
      const res = await fetch(`${apiUrl}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          lookingFor: lead.lookingFor,
          propertyType: lead.propertyType,
          budget: lead.budget,
          preferredLocation: lead.preferredLocation,
          message: lead.message,
          status: 'New',
          propertyTitle: lead.propertyTitle
        })
      });
      if (res.ok) {
        const data = await res.json();
        newLead.id = String(data.id);
      }
    } catch (e) {
      console.warn('Lead API sync notice:', e);
    }

    const leads = this.getLeads();
    leads.unshift(newLead);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
      localStorage.setItem('ssp_admin_leads_v4', JSON.stringify(leads));
    }

    return newLead;
  }

  static updateLeadStatus(id: string, status: LeadStatus): PropertyLead | null {
    const leads = this.getLeads();
    const index = leads.findIndex(l => String(l.id) === String(id));
    if (index === -1) return null;

    leads[index].status = status;
    if (typeof window !== 'undefined') {
      localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
      localStorage.setItem('ssp_admin_leads_v4', JSON.stringify(leads));
    }
    return leads[index];
  }

  static deleteLead(id: string): boolean {
    const leads = this.getLeads();
    const filtered = leads.filter(l => String(l.id) !== String(id));
    if (typeof window !== 'undefined') {
      localStorage.setItem(LEADS_KEY, JSON.stringify(filtered));
      localStorage.setItem('ssp_admin_leads_v4', JSON.stringify(filtered));
    }
    return true;
  }

  // Admin Dashboard Statistics
  static getAdminStats() {
    const properties = this.getProperties();
    const leads = this.getLeads();

    return {
      totalProperties: properties.length,
      propertiesForSale: properties.filter(p => p.purpose === 'Buy').length,
      propertiesForRent: properties.filter(p => p.purpose === 'Rent').length,
      projectsProperties: properties.filter(p => p.purpose === 'Projects' || p.type === 'Projects' || p.type === 'New Launch').length,
      commercialProperties: properties.filter(p => p.type === 'Commercial' || p.type === 'Shop').length,
      featuredProperties: properties.filter(p => p.featured).length,
      totalLeads: leads.length,
      siteVisitsCount: leads.filter(l => l.status === 'Site Visit').length,
      newLeadsCount: leads.filter(l => l.status === 'New').length
    };
  }
}
