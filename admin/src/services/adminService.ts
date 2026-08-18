import { 
  AdminProperty, 
  AdminLead, 
  AgentStaff, 
  SiteVisit, 
  ActivityLog, 
  SystemSettings,
  LeadStatus 
} from '../types/admin';

const STORAGE_KEYS = {
  PROPERTIES: 'ssp_admin_properties_v3',
  LEADS: 'ssp_admin_leads_v3',
  AGENTS: 'ssp_admin_agents_v3',
  VISITS: 'ssp_admin_visits_v3',
  LOGS: 'ssp_admin_logs_v3',
  SETTINGS: 'ssp_admin_settings_v3'
};

const INITIAL_PROPERTIES: AdminProperty[] = [
  {
    id: 'prop-101',
    title: '3 BHK Ultra Luxury Builder Floor with Private Lift & Stilt Parking',
    slug: '3-bhk-ultra-luxury-builder-floor-sector-7',
    purpose: 'Buy',
    type: '3 BHK',
    priceDisplay: '₹ 1.65 Cr',
    priceValue: 16500000,
    location: 'Ramphal Chowk Road, Dwarka Sector 7, New Delhi',
    sector: 'Dwarka Sector 7',
    bhk: 3,
    bathrooms: 3,
    areaSqFt: 1850,
    carpetAreaSqFt: 1650,
    floor: '2nd Floor',
    totalFloors: 4,
    parking: 'Reserved Stilt Parking',
    furnishing: 'Semi-Furnished',
    facing: 'North-East',
    propertyAge: 'Brand New Construction',
    availability: 'Ready to Move',
    featured: true,
    published: true,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'Exclusive 3 BHK luxury builder floor with Italian marble, modular kitchen, branded bath fittings, wide balcony and private lift access in Dwarka Sector 7.',
    amenities: ['Private Lift', '24/7 Security', 'Modular Kitchen', 'Power Backup', 'Stilt Parking'],
    highlights: ['Near Ramphal Chowk Market', 'Walkable to Sector 9 Metro', 'Freehold Clear Title'],
    contactNumber: '+91 9911956274',
    legalClearance: true,
    model3dType: 'luxury-villa',
    createdAt: new Date().toISOString(),
    viewsCount: 142
  },
  {
    id: 'prop-102',
    title: '4 BHK High-End CGHS Society Penthouse with Terrace Garden',
    slug: '4-bhk-high-end-cghs-society-penthouse-sector-6',
    purpose: 'Buy',
    type: '4 BHK',
    priceDisplay: '₹ 2.85 Cr',
    priceValue: 28500000,
    location: 'CGHS Society, Dwarka Sector 6, New Delhi',
    sector: 'Dwarka Sector 6',
    bhk: 4,
    bathrooms: 4,
    areaSqFt: 2800,
    carpetAreaSqFt: 2500,
    floor: 'Top Floor with Terrace',
    totalFloors: 10,
    parking: '2 Covered Parkings',
    furnishing: 'Fully Furnished',
    facing: 'East',
    propertyAge: '1-3 Years',
    availability: 'Ready to Move',
    featured: true,
    published: true,
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'],
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description: 'Spacious 4 BHK penthouse featuring private terrace garden, wooden flooring, panoramic skyline views, and gated 3-tier security in Sector 6.',
    amenities: ['Gated Society', 'Clubhouse', 'Gym', 'Swimming Pool', 'Terrace Garden'],
    highlights: ['Corner Property', 'Park Facing', '100% Power Backup'],
    contactNumber: '+91 9911956274',
    legalClearance: true,
    model3dType: 'penthouse-suite',
    createdAt: new Date().toISOString(),
    viewsCount: 98
  },
  {
    id: 'prop-103',
    title: '2 BHK Renovated DDA Apartment near Sector 10 Metro',
    slug: '2-bhk-renovated-dda-apartment-sector-10',
    purpose: 'Buy',
    type: '2 BHK',
    priceDisplay: '₹ 95.00 Lakhs',
    priceValue: 9500000,
    location: 'Pocket 2, Dwarka Sector 10, New Delhi',
    sector: 'Dwarka Sector 10',
    bhk: 2,
    bathrooms: 2,
    areaSqFt: 1100,
    carpetAreaSqFt: 980,
    floor: '1st Floor',
    totalFloors: 4,
    parking: 'Open Parking',
    furnishing: 'Semi-Furnished',
    facing: 'North-West',
    propertyAge: '5-10 Years',
    availability: 'Ready to Move',
    featured: false,
    published: true,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'],
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    description: 'Well-maintained 2 BHK DDA flat on first floor with modular fittings, ample sunlight, and 2-minute walk to Sector 10 Metro Station.',
    amenities: ['Park Facing', 'Metro Connectivity', 'Security Guard'],
    highlights: ['Prime Location', 'Close to Market', 'Low Maintenance'],
    contactNumber: '+91 9911956274',
    legalClearance: true,
    createdAt: new Date().toISOString(),
    viewsCount: 76
  }
];

const INITIAL_LEADS: AdminLead[] = [
  {
    id: 'lead-101',
    name: 'Rajesh Kumar',
    phone: '9810123456',
    email: 'rajesh.k@gmail.com',
    lookingFor: 'Buy',
    propertyType: '3 BHK',
    budget: '₹ 1.50 Cr - 1.80 Cr',
    preferredLocation: 'Dwarka Sector 7',
    message: 'Interested in buying a 3 BHK luxury builder floor with lift and parking.',
    propertyTitle: '3 BHK Ultra Luxury Builder Floor Sector 7',
    status: 'New',
    createdAt: new Date().toISOString()
  },
  {
    id: 'lead-102',
    name: 'Priya Sharma',
    phone: '9876543210',
    email: 'priya.s@yahoo.com',
    lookingFor: 'Buy',
    propertyType: '4 BHK',
    budget: '₹ 2.50 Cr - 3.00 Cr',
    preferredLocation: 'Dwarka Sector 6',
    message: 'Looking for a penthouse or top floor society flat in Sector 6.',
    propertyTitle: '4 BHK High-End Society Penthouse',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'lead-103',
    name: 'Amit Verma',
    phone: '9911223344',
    email: 'verma.amit@outlook.com',
    lookingFor: 'Buy',
    propertyType: '2 BHK',
    budget: '₹ 90 Lakhs - 1.00 Cr',
    preferredLocation: 'Dwarka Sector 10',
    message: 'Required 2 BHK DDA flat near metro station.',
    propertyTitle: '2 BHK Renovated DDA Apartment Sector 10',
    status: 'Site Visit Scheduled',
    visitDate: '2026-08-20',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

const INITIAL_AGENTS: AgentStaff[] = [
  {
    id: 'agent-1',
    name: 'Rahul Sharma',
    role: 'Senior Broker',
    phone: '+91 9911956274',
    email: 'rahul@shrishyamassociate.com',
    sectorSpecialization: 'Dwarka Sector 6 & 7',
    activeDeals: 8,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'agent-2',
    name: 'Deepak Verma',
    role: 'Site Manager',
    phone: '+91 9811223344',
    email: 'deepak@shrishyamassociate.com',
    sectorSpecialization: 'Dwarka Sector 10 & 12',
    activeDeals: 5,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
  }
];

const INITIAL_VISITS: SiteVisit[] = [
  {
    id: 'visit-1',
    clientName: 'Rajesh Kumar',
    clientPhone: '9810123456',
    propertyTitle: '3 BHK Ultra Luxury Builder Floor Sector 7',
    sector: 'Dwarka Sector 7',
    visitDate: '2026-08-20',
    visitTime: '11:00 AM',
    agentAssigned: 'Rahul Sharma',
    status: 'Confirmed'
  },
  {
    id: 'visit-2',
    clientName: 'Amit Verma',
    clientPhone: '9911223344',
    propertyTitle: '2 BHK DDA Apartment Sector 10',
    sector: 'Dwarka Sector 10',
    visitDate: '2026-08-21',
    visitTime: '04:00 PM',
    agentAssigned: 'Deepak Verma',
    status: 'Pending'
  }
];

const INITIAL_SETTINGS: SystemSettings = {
  agencyName: 'Shri Shyam Associate',
  tagline: 'Premier Real Estate Agency in Dwarka, New Delhi',
  dwarkaOfficeAddress: 'Shop No. 12, Main Market, Dwarka Sector 7, New Delhi - 110075',
  contactPhone: '+91 9911956274',
  whatsappHotline: '9911956274',
  emailSupport: 'info@shrishyamproperties.com',
  enable3DViewer: true,
  backendApiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  currencySymbol: '₹',
  requireApprovalForListings: false,
  cloudinaryCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'shrishyamproperties',
  cloudinaryApiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '877916588632514',
  cloudinaryUploadPreset: 'dwarka_properties'
};

export class AdminService {
  private static getItem<T>(key: string, defaultVal: T): T {
    if (typeof window === 'undefined') return defaultVal;
    try {
      // Purge legacy keys containing empty or stale data
      localStorage.removeItem('ssp_admin_properties_v2');
      localStorage.removeItem('ssp_admin_leads_v2');
      localStorage.removeItem('ssp_admin_agents_v2');
      localStorage.removeItem('ssp_admin_visits_v2');
      
      const stored = localStorage.getItem(key);
      if (!stored) return defaultVal;

      const parsed = JSON.parse(stored);
      // Return defaultVal if stored array is empty so dashboard is always populated with live seeds
      if (Array.isArray(parsed) && parsed.length === 0 && Array.isArray(defaultVal) && defaultVal.length > 0) {
        return defaultVal;
      }
      return parsed;
    } catch {
      return defaultVal;
    }
  }

  private static setItem<T>(key: string, val: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(val));
      if (key === STORAGE_KEYS.PROPERTIES) {
        localStorage.setItem('ssp_properties_v3', JSON.stringify(val));
      }
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }

  // --- CLOUDINARY & LOCAL FILE UPLOAD ---
  static async uploadImage(file: File): Promise<{ url: string; source: 'Cloudinary' | 'Local' }> {
    const settings = this.getSettings();
    const cloudName = settings.cloudinaryCloudName || 'shrishyamproperties';
    const uploadPreset = settings.cloudinaryUploadPreset || 'dwarka_properties';

    // 1. Try Cloudinary Unsigned/Direct API upload if available
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      if (settings.cloudinaryApiKey) {
        formData.append('api_key', settings.cloudinaryApiKey);
      }

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        if (data.secure_url) {
          return { url: data.secure_url, source: 'Cloudinary' };
        }
      }
    } catch (err) {
      console.warn('Cloudinary direct upload bypassed, using high performance local Data URL:', err);
    }

    // 2. High-performance FileReader Base64 fallback (guaranteed offline & local success)
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({ url: reader.result as string, source: 'Local' });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // --- PROPERTIES CRUD ---
  static getProperties(): AdminProperty[] {
    return this.getItem<AdminProperty[]>(STORAGE_KEYS.PROPERTIES, INITIAL_PROPERTIES);
  }

  static addProperty(propData: Omit<AdminProperty, 'id' | 'createdAt' | 'viewsCount'>): AdminProperty {
    const properties = this.getProperties();
    const newProp: AdminProperty = {
      ...propData,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString(),
      viewsCount: 0
    };
    properties.unshift(newProp);
    this.setItem(STORAGE_KEYS.PROPERTIES, properties);
    this.logActivity('Create Property', newProp.title, 'create');

    // Async sync to Backend Spring Boot API
    const settings = this.getSettings();
    const apiUrl = settings.backendApiUrl || 'http://localhost:8080/api';
    try {
      fetch(`${apiUrl}/properties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProp)
      }).catch(e => console.warn('Backend property sync notice:', e));
    } catch (e) {
      console.warn('Property sync notice:', e);
    }

    return newProp;
  }

  static updateProperty(id: string, updates: Partial<AdminProperty>): AdminProperty | null {
    const properties = this.getProperties();
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return null;
    properties[index] = { ...properties[index], ...updates };
    this.setItem(STORAGE_KEYS.PROPERTIES, properties);
    this.logActivity('Update Property', properties[index].title, 'update');

    // Async sync to Backend Spring Boot API
    const settings = this.getSettings();
    const apiUrl = settings.backendApiUrl || 'http://localhost:8080/api';
    if (!isNaN(Number(id))) {
      try {
        fetch(`${apiUrl}/properties/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(properties[index])
        }).catch(e => console.warn('Backend property update notice:', e));
      } catch (e) {
        console.warn('Property update notice:', e);
      }
    }

    return properties[index];
  }

  static deleteProperty(id: string): boolean {
    const properties = this.getProperties();
    const prop = properties.find(p => p.id === id);
    const filtered = properties.filter(p => p.id !== id);
    this.setItem(STORAGE_KEYS.PROPERTIES, filtered);
    if (prop) this.logActivity('Delete Property', prop.title, 'delete');

    // Async sync to Backend Spring Boot API
    const settings = this.getSettings();
    const apiUrl = settings.backendApiUrl || 'http://localhost:8080/api';
    if (!isNaN(Number(id))) {
      try {
        fetch(`${apiUrl}/properties/${id}`, { method: 'DELETE' }).catch(e => console.warn('Backend property delete notice:', e));
      } catch (e) {
        console.warn('Property delete notice:', e);
      }
    }

    return true;
  }

  // --- LEADS & CRM ---
  static getLeads(): AdminLead[] {
    return this.getItem<AdminLead[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
  }

  static updateLeadStatus(id: string, status: LeadStatus, notes?: string): AdminLead | null {
    const leads = this.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) return null;
    leads[index].status = status;
    if (notes) leads[index].notes = notes;
    this.setItem(STORAGE_KEYS.LEADS, leads);
    this.logActivity('Update Lead Status', `${leads[index].name} -> ${status}`, 'update');

    // Async sync to Backend Spring Boot API
    const settings = this.getSettings();
    const apiUrl = settings.backendApiUrl || 'http://localhost:8080/api';
    if (!isNaN(Number(id))) {
      try {
        fetch(`${apiUrl}/leads/${id}/status?status=${encodeURIComponent(status)}`, { method: 'PATCH' })
          .catch(e => console.warn('Backend lead status update notice:', e));
      } catch (e) {
        console.warn('Lead status update notice:', e);
      }
    }

    return leads[index];
  }

  static deleteLead(id: string): boolean {
    const leads = this.getLeads();
    const filtered = leads.filter(l => l.id !== id);
    this.setItem(STORAGE_KEYS.LEADS, filtered);

    // Async sync to Backend Spring Boot API
    const settings = this.getSettings();
    const apiUrl = settings.backendApiUrl || 'http://localhost:8080/api';
    if (!isNaN(Number(id))) {
      try {
        fetch(`${apiUrl}/leads/${id}`, { method: 'DELETE' }).catch(e => console.warn('Backend lead delete notice:', e));
      } catch (e) {
        console.warn('Lead delete notice:', e);
      }
    }

    return true;
  }

  // --- AGENTS ---
  static getAgents(): AgentStaff[] {
    return this.getItem<AgentStaff[]>(STORAGE_KEYS.AGENTS, INITIAL_AGENTS);
  }

  // --- VISITS ---
  static getSiteVisits(): SiteVisit[] {
    return this.getItem<SiteVisit[]>(STORAGE_KEYS.VISITS, INITIAL_VISITS);
  }

  // --- SYSTEM SETTINGS ---
  static getSettings(): SystemSettings {
    return this.getItem<SystemSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  static updateSettings(newSettings: Partial<SystemSettings>): SystemSettings {
    const settings = { ...this.getSettings(), ...newSettings };
    this.setItem(STORAGE_KEYS.SETTINGS, settings);
    this.logActivity('Update Settings', 'Global System Config', 'update');
    return settings;
  }

  // --- ACTIVITY LOGS ---
  static getLogs(): ActivityLog[] {
    return this.getItem<ActivityLog[]>(STORAGE_KEYS.LOGS, [
      {
        id: 'log-1',
        user: 'Super Admin',
        action: 'System Boot',
        target: 'Shri Shyam Admin Console',
        timestamp: new Date().toISOString(),
        type: 'auth'
      }
    ]);
  }

  static logActivity(action: string, target: string, type: 'create' | 'update' | 'delete' | 'auth') {
    const logs = this.getLogs();
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      user: 'Super Admin',
      action,
      target,
      timestamp: new Date().toISOString(),
      type
    };
    logs.unshift(newLog);
    this.setItem(STORAGE_KEYS.LOGS, logs.slice(0, 50));
  }

  // --- ANALYTICS STATS ---
  static getDashboardStats() {
    const properties = this.getProperties();
    const leads = this.getLeads();
    const visits = this.getSiteVisits();

    const totalProperties = properties.length;
    const featuredCount = properties.filter(p => p.featured).length;
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'New').length;
    const activeVisits = visits.filter(v => v.status === 'Confirmed' || v.status === 'Pending').length;
    
    const totalPortfolioValue = properties.reduce((acc, p) => acc + (p.priceValue || 0), 0);

    return {
      totalProperties,
      featuredCount,
      totalLeads,
      newLeads,
      activeVisits,
      totalPortfolioValueDisplay: `₹ ${(totalPortfolioValue / 10000000).toFixed(2)} Cr`,
      totalPortfolioValue
    };
  }
}
