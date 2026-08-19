import { Property, PropertyLead, PropertyPurpose, PropertyType, DwarkaSector, LeadStatus } from '@/types/property';
import { INITIAL_PROPERTIES, INITIAL_LEADS, DWARKA_SECTORS, INITIAL_TESTIMONIALS } from '@/data/mockData';

const PROPERTIES_KEY = 'ssp_properties_v3';
const LEADS_KEY = 'ssp_leads_v3';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export class PropertyService {
  // Properties API
  private static saveProperties(properties: Property[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PROPERTIES_KEY, JSON.stringify(properties));
      localStorage.setItem('ssp_admin_properties_v3', JSON.stringify(properties));
      window.dispatchEvent(new Event('storage'));
    }
  }

  static getProperties(): Property[] {
    if (typeof window === 'undefined') return INITIAL_PROPERTIES;
    
    // Purge legacy storage containing demo data
    localStorage.removeItem('ssp_properties_v1');
    localStorage.removeItem('ssp_admin_properties_v2');

    const adminStored = localStorage.getItem('ssp_admin_properties_v3');
    const stored = adminStored !== null ? adminStored : localStorage.getItem(PROPERTIES_KEY);
    if (stored === null) {
      this.saveProperties(INITIAL_PROPERTIES);
      return INITIAL_PROPERTIES;
    }
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : INITIAL_PROPERTIES;
    } catch {
      return INITIAL_PROPERTIES;
    }
  }

  static getPropertyById(id: string): Property | undefined {
    const list = this.getProperties();
    return list.find(p => p.id === id || p.slug === id);
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

      const response = await fetch(`${API_BASE_URL}/properties?${queryParams.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem(PROPERTIES_KEY, JSON.stringify(data));
          localStorage.setItem('ssp_admin_properties_v3', JSON.stringify(data));
          return params ? this.searchProperties(params) : data;
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

  static addProperty(property: Omit<Property, 'id' | 'createdAt'>): Property {
    const properties = this.getProperties();
    const newProperty: Property = {
      ...property,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    properties.unshift(newProperty);
    this.saveProperties(properties);
    return newProperty;
  }

  static updateProperty(id: string, updates: Partial<Property>): Property | null {
    const properties = this.getProperties();
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return null;

    properties[index] = { ...properties[index], ...updates };
    this.saveProperties(properties);
    return properties[index];
  }

  static deleteProperty(id: string): boolean {
    const properties = this.getProperties();
    const filtered = properties.filter(p => p.id !== id);
    this.saveProperties(filtered);
    return true;
  }

  // Leads API
  static getLeads(): PropertyLead[] {
    if (typeof window === 'undefined') return INITIAL_LEADS;
    localStorage.removeItem('ssp_leads_v1');
    localStorage.removeItem('ssp_admin_leads_v2');

    const adminStored = localStorage.getItem('ssp_admin_leads_v3');
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

  static submitLead(lead: Omit<PropertyLead, 'id' | 'status' | 'createdAt'>): PropertyLead {
    const leads = this.getLeads();
    const newLead: PropertyLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    leads.unshift(newLead);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    }

    // Sync lead to backend Spring Boot / MySQL database asynchronously
    try {
      fetch(`${API_BASE_URL}/leads`, {
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
      }).catch(err => {
        console.warn('Backend API connection check, lead saved to local storage:', err);
      });
    } catch (e) {
      console.warn('Lead API sync fallback to local storage:', e);
    }

    return newLead;
  }

  static updateLeadStatus(id: string, status: LeadStatus): PropertyLead | null {
    const leads = this.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) return null;

    leads[index].status = status;
    if (typeof window !== 'undefined') {
      localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    }
    return leads[index];
  }

  static deleteLead(id: string): boolean {
    const leads = this.getLeads();
    const filtered = leads.filter(l => l.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LEADS_KEY, JSON.stringify(filtered));
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
