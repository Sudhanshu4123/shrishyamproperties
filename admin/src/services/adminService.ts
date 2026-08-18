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
      // Purge legacy v2 keys containing demo data
      localStorage.removeItem('ssp_admin_properties_v2');
      localStorage.removeItem('ssp_admin_leads_v2');
      localStorage.removeItem('ssp_admin_agents_v2');
      localStorage.removeItem('ssp_admin_visits_v2');
      
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultVal;
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
