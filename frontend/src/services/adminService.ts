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
  PROPERTIES: 'ssp_admin_properties_v5',
  LEADS: 'ssp_admin_leads_v5',
  AGENTS: 'ssp_admin_agents_v5',
  VISITS: 'ssp_admin_visits_v5',
  LOGS: 'ssp_admin_logs_v5',
  SETTINGS: 'ssp_admin_settings_v5'
};

const isDemoAdminProperty = (_p: any) => false;

const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return '/api';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';
};

const INITIAL_PROPERTIES: AdminProperty[] = [];

const INITIAL_LEADS: AdminLead[] = [];
const INITIAL_AGENTS: AgentStaff[] = [];
const INITIAL_VISITS: SiteVisit[] = [];

const INITIAL_SETTINGS: SystemSettings = {
  agencyName: 'Shri Shyam Associate',
  tagline: 'Premier Real Estate Agency in Dwarka, New Delhi',
  dwarkaOfficeAddress: 'Shop No. 12, Main Market, Dwarka Sector 7, New Delhi - 110075',
  contactPhone: '+91 9911956274',
  whatsappHotline: '9911956274',
  emailSupport: 'info@shrishyamassociate.com',
  enable3DViewer: true,
  backendApiUrl: '/api',
  currencySymbol: '₹',
  requireApprovalForListings: false,
  cloudinaryCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'shrishyamproperties',
  cloudinaryApiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '877916588632514',
  cloudinaryUploadPreset: 'dwarka_properties'
};

export function compressImage(file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    if (file.type === 'image/svg+xml' || file.size < 30 * 1024) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        let mimeType = 'image/webp';
        let dataUrl = canvas.toDataURL(mimeType, quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          mimeType = 'image/jpeg';
          dataUrl = canvas.toDataURL(mimeType, quality);
        }

        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const DEFAULT_PROP_IMAGE = '/images/luxury_builder_floor_dwarka_1786010981126.png';

export const sanitizeImageUrl = (url?: string): string => {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return DEFAULT_PROP_IMAGE;
  }
  return url.trim();
};

const mapBackendToAdminProperty = (item: any): AdminProperty => {
  const hero = sanitizeImageUrl(item.heroImage);
  const images = Array.isArray(item.images) && item.images.length > 0 
    ? item.images.map((img: string) => sanitizeImageUrl(img)) 
    : [hero];

  return {
    id: String(item.id),
    title: item.title || '',
    slug: item.slug || '',
    purpose: item.purpose || 'Buy',
    type: item.propertyType || item.type || 'Builder Floor',
    priceDisplay: item.priceDisplay || '',
    priceValue: Number(item.priceValue) || 0,
    location: item.location || '',
    sector: item.sector || '',
    bhk: Number(item.bhk) || 0,
    bathrooms: Number(item.bathrooms) || 0,
    areaSqFt: Number(item.areaSqFt) || 0,
    carpetAreaSqFt: Number(item.carpetAreaSqFt) || 0,
    floor: item.floor || '',
    totalFloors: Number(item.totalFloors) || 0,
    parking: item.parking || '',
    furnishing: item.furnishing || '',
    facing: item.facing || '',
    propertyAge: item.propertyAge || '',
    availability: item.availability || 'Ready to Move',
    featured: Boolean(item.featured),
    published: item.published !== false,
    heroImage: hero,
    images: images,
    description: item.description || '',
    amenities: item.amenities || ['24/7 Security', 'Power Backup', 'Stilt Parking', 'Modular Kitchen'],
    highlights: item.highlights || ['Freehold Clear Title', 'Prime Dwarka Location'],
    contactNumber: item.contactNumber || '+91 9911956274',
    legalClearance: true,
    createdAt: item.createdAt || new Date().toISOString(),
    viewsCount: item.viewsCount || 0
  };
};

export class AdminService {
  private static getItem<T>(key: string, defaultVal: T): T {
    if (typeof window === 'undefined') return defaultVal;
    try {
      ['ssp_properties_v1', 'ssp_properties_v2', 'ssp_properties_v3', 'ssp_properties_v4',
       'ssp_admin_properties_v1', 'ssp_admin_properties_v2', 'ssp_admin_properties_v3', 'ssp_admin_properties_v4',
       'ssp_admin_leads_v1', 'ssp_admin_leads_v2', 'ssp_admin_leads_v3', 'ssp_admin_leads_v4'
      ].forEach(k => localStorage.removeItem(k));
      
      const stored = localStorage.getItem(key);
      if (!stored) return defaultVal;

      return JSON.parse(stored);
    } catch {
      return defaultVal;
    }
  }

  private static setItem<T>(key: string, val: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(val));
      if (key === STORAGE_KEYS.PROPERTIES) {
        localStorage.setItem('ssp_properties_v5', JSON.stringify(val));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }

  // --- SERVER, CLOUDINARY & COMPRESSED FILE UPLOAD ---
  static async uploadImage(file: File): Promise<{ url: string; source: 'Server' | 'Cloudinary' | 'Local' }> {
    // 1. Try local server API route first (/api/upload)
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          return { url: data.url, source: 'Server' };
        }
      }
    } catch (err) {
      console.warn('Local API route upload bypassed:', err);
    }

    // 2. Try Cloudinary Unsigned/Direct API upload if configured
    const settings = this.getSettings();
    if (settings.cloudinaryCloudName && settings.cloudinaryUploadPreset) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', settings.cloudinaryUploadPreset);
        if (settings.cloudinaryApiKey) {
          formData.append('api_key', settings.cloudinaryApiKey);
        }

        const res = await fetch(`https://api.cloudinary.com/v1_1/${settings.cloudinaryCloudName}/image/upload`, {
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
        console.warn('Cloudinary direct upload bypassed:', err);
      }
    }

    // 3. Fallback to client-side HTML5 canvas image compression (~40-80KB WebP)
    const compressedUrl = await compressImage(file);
    return { url: compressedUrl, source: 'Local' };
  }

  // --- PROPERTIES CRUD & CLOUD SYNC ---
  static getProperties(): AdminProperty[] {
    const cached = this.getItem<AdminProperty[]>(STORAGE_KEYS.PROPERTIES, INITIAL_PROPERTIES);
    if (Array.isArray(cached)) {
      return cached;
    }
    return [];
  }

  static async fetchProperties(): Promise<AdminProperty[]> {
    try {
      const apiUrl = getApiBaseUrl();
      const res = await fetch(`${apiUrl}/properties?all=true`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map(mapBackendToAdminProperty);
          // Merge remote with local un-synced items so user properties are NEVER lost
          const localOnly = this.getProperties().filter(
            lp => !mapped.some(mp => String(mp.id) === String(lp.id) || (mp.slug && mp.slug === lp.slug))
          );
          const combined = [...mapped, ...localOnly];
          this.setItem(STORAGE_KEYS.PROPERTIES, combined);
          return combined;
        }
      }
    } catch (err) {
      console.warn('AdminService fetchProperties API notice:', err);
    }
    return this.getProperties();
  }

  static async addProperty(propData: Omit<AdminProperty, 'id' | 'createdAt' | 'viewsCount'>): Promise<AdminProperty> {
    const slug = propData.slug || propData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
    
    const payload = {
      title: propData.title,
      slug: slug,
      purpose: propData.purpose || 'Buy',
      propertyType: propData.type || 'Builder Floor',
      priceDisplay: propData.priceDisplay,
      priceValue: propData.priceValue,
      location: propData.location,
      sector: propData.sector,
      bhk: propData.bhk,
      bathrooms: propData.bathrooms,
      areaSqFt: propData.areaSqFt,
      carpetAreaSqFt: propData.carpetAreaSqFt,
      floor: propData.floor,
      totalFloors: propData.totalFloors,
      parking: propData.parking,
      furnishing: propData.furnishing,
      facing: propData.facing,
      propertyAge: propData.propertyAge,
      availability: propData.availability,
      featured: Boolean(propData.featured),
      published: propData.published !== false,
      heroImage: propData.heroImage,
      images: propData.images,
      description: propData.description,
      contactNumber: propData.contactNumber
    };

    let newProp: AdminProperty = {
      ...propData,
      id: `prop-${Date.now()}`,
      slug: slug,
      createdAt: new Date().toISOString(),
      viewsCount: 0
    };

    try {
      const apiUrl = getApiBaseUrl();
      const res = await fetch(`${apiUrl}/properties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const backendData = await res.json();
        newProp = mapBackendToAdminProperty(backendData);
      }
    } catch (e) {
      console.warn('Backend property POST notice:', e);
    }

    const properties = this.getProperties().filter(p => String(p.id) !== String(newProp.id));
    properties.unshift(newProp);
    this.setItem(STORAGE_KEYS.PROPERTIES, properties);
    this.logActivity('Create Property', newProp.title, 'create');
    return newProp;
  }

  static async updateProperty(id: string, updates: Partial<AdminProperty>): Promise<AdminProperty | null> {
    const properties = this.getProperties();
    const index = properties.findIndex(p => String(p.id) === String(id));
    if (index === -1) return null;

    properties[index] = { ...properties[index], ...updates };
    this.setItem(STORAGE_KEYS.PROPERTIES, properties);
    this.logActivity('Update Property', properties[index].title, 'update');

    if (!isNaN(Number(id))) {
      try {
        const apiUrl = getApiBaseUrl();
        const updatedObj = properties[index];
        await fetch(`${apiUrl}/properties/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: updatedObj.title,
            slug: updatedObj.slug,
            purpose: updatedObj.purpose,
            propertyType: updatedObj.type,
            priceDisplay: updatedObj.priceDisplay,
            priceValue: updatedObj.priceValue,
            location: updatedObj.location,
            sector: updatedObj.sector,
            bhk: updatedObj.bhk,
            bathrooms: updatedObj.bathrooms,
            areaSqFt: updatedObj.areaSqFt,
            carpetAreaSqFt: updatedObj.carpetAreaSqFt,
            floor: updatedObj.floor,
            totalFloors: updatedObj.totalFloors,
            parking: updatedObj.parking,
            furnishing: updatedObj.furnishing,
            facing: updatedObj.facing,
            propertyAge: updatedObj.propertyAge,
            availability: updatedObj.availability,
            featured: updatedObj.featured,
            published: updatedObj.published,
            heroImage: updatedObj.heroImage,
            images: updatedObj.images,
            description: updatedObj.description,
            contactNumber: updatedObj.contactNumber
          })
        }).catch(e => console.warn('Backend property update notice:', e));
      } catch (e) {
        console.warn('Property update notice:', e);
      }
    }

    return properties[index];
  }

  static async deleteProperty(id: string): Promise<boolean> {
    const properties = this.getProperties();
    const prop = properties.find(p => String(p.id) === String(id));
    const filtered = properties.filter(p => String(p.id) !== String(id));
    this.setItem(STORAGE_KEYS.PROPERTIES, filtered);
    if (prop) this.logActivity('Delete Property', prop.title, 'delete');

    if (!isNaN(Number(id))) {
      try {
        const apiUrl = getApiBaseUrl();
        await fetch(`${apiUrl}/properties/${id}`, { method: 'DELETE' }).catch(e => console.warn('Backend property delete notice:', e));
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

  static async fetchLeads(): Promise<AdminLead[]> {
    try {
      const apiUrl = getApiBaseUrl();
      const res = await fetch(`${apiUrl}/leads`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const mapped: AdminLead[] = data.map((l: any) => ({
            id: String(l.id),
            name: l.name || '',
            phone: l.phone || '',
            email: l.email || '',
            lookingFor: l.lookingFor || 'Buy',
            propertyType: l.propertyType || '3 BHK',
            budget: l.budget || '',
            preferredLocation: l.preferredLocation || '',
            message: l.message || '',
            status: l.status || 'New',
            createdAt: l.createdAt || new Date().toISOString(),
            notes: l.notes || '',
            source: 'Website Form',
            propertyTitle: l.propertyTitle || ''
          }));
          this.setItem(STORAGE_KEYS.LEADS, mapped);
          return mapped;
        }
      }
    } catch (err) {
      console.warn('AdminService fetchLeads notice:', err);
    }
    return this.getLeads();
  }

  static async updateLeadStatus(id: string, status: LeadStatus, notes?: string): Promise<AdminLead | null> {
    const leads = this.getLeads();
    const index = leads.findIndex(l => String(l.id) === String(id));
    if (index === -1) return null;
    leads[index].status = status;
    if (notes) leads[index].notes = notes;
    this.setItem(STORAGE_KEYS.LEADS, leads);
    this.logActivity('Update Lead Status', `${leads[index].name} -> ${status}`, 'update');

    if (!isNaN(Number(id))) {
      try {
        const apiUrl = getApiBaseUrl();
        await fetch(`${apiUrl}/leads/${id}/status?status=${encodeURIComponent(status)}`, { method: 'PATCH' })
          .catch(e => console.warn('Backend lead status update notice:', e));
      } catch (e) {
        console.warn('Lead status update notice:', e);
      }
    }

    return leads[index];
  }

  static async deleteLead(id: string): Promise<boolean> {
    const leads = this.getLeads();
    const filtered = leads.filter(l => String(l.id) !== String(id));
    this.setItem(STORAGE_KEYS.LEADS, filtered);

    if (!isNaN(Number(id))) {
      try {
        const apiUrl = getApiBaseUrl();
        await fetch(`${apiUrl}/leads/${id}`, { method: 'DELETE' }).catch(e => console.warn('Backend lead delete notice:', e));
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
        id: 'log-init',
        user: 'Admin',
        timestamp: new Date().toISOString(),
        action: 'System Initialized',
        target: 'Real-time sync enabled across mobile & desktop',
        type: 'create'
      }
    ]);
  }

  private static logActivity(action: string, target: string, type: 'create' | 'update' | 'delete' | 'auth'): void {
    const logs = this.getLogs();
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      user: 'Admin',
      timestamp: new Date().toISOString(),
      action,
      target,
      type
    };
    logs.unshift(newLog);
    this.setItem(STORAGE_KEYS.LOGS, logs.slice(0, 50));
  }

  // --- DASHBOARD STATS ---
  static getDashboardStats() {
    const properties = this.getProperties();
    const leads = this.getLeads();
    const visits = this.getSiteVisits();

    const totalViews = properties.reduce((acc, p) => acc + (p.viewsCount || 0), 0);
    const closedLeads = leads.filter(l => l.status === 'Closed').length;

    return {
      totalProperties: properties.length,
      publishedProperties: properties.filter(p => p.published).length,
      featuredProperties: properties.filter(p => p.featured).length,
      totalLeads: leads.length,
      newLeads: leads.filter(l => l.status === 'New').length,
      totalViews,
      siteVisitsCount: visits.length,
      conversionRate: leads.length > 0 ? ((closedLeads / leads.length) * 100).toFixed(1) + '%' : '0%'
    };
  }
}
