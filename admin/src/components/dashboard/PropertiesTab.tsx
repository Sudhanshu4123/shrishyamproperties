'use client';

import React, { useState, useRef } from 'react';
import { 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  Eye, 
  Search, 
  X, 
  Sparkles,
  MapPin,
  IndianRupee,
  BedDouble,
  ShieldCheck,
  Upload,
  Image as ImageIcon,
  FileText,
  Sliders,
  CheckSquare,
  Loader2,
  Check,
  Maximize2,
  Layers,
  Phone,
  Home,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  FolderPlus,
  Link as LinkIcon
} from 'lucide-react';
import { AdminProperty, DwarkaSector, PropertyPurpose, PropertyType } from '../../types/admin';
import { AdminService } from '../../services/adminService';

interface PropertiesTabProps {
  properties: AdminProperty[];
  onAddProperty: (p: any) => void;
  onUpdateProperty: (id: string, updates: Partial<AdminProperty>) => void;
  onDeleteProperty: (id: string) => void;
  searchTerm: string;
}

// Preset stock images for quick selection
const STOCK_PRESETS = [
  { name: 'Luxury Builder Floor Exterior', url: '/images/luxury_builder_floor_dwarka_1786010981126.png' },
  { name: 'CGHS Society Park Facing', url: '/images/dwarka_society_flat_1786010993235.png' },
  { name: 'Duplex Penthouse Living Room', url: '/images/luxury_penthouse_interior_1786011006488.png' },
  { name: '3D Villa Architecture', url: '/images/hero_luxury_villa_3d.png' },
  { name: 'Modern Italian Kitchen', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop' },
  { name: 'Master Bedroom Suite', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop' },
  { name: 'Balcony & Greenery View', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop' }
];

type FormTabType = 'basic' | 'pricing' | 'specs' | 'features' | 'images';

const FORM_STEPS: { id: FormTabType; label: string; stepNum: number; icon: any; desc: string }[] = [
  { id: 'basic', label: 'Basic Info', stepNum: 1, icon: FileText, desc: 'Title & Location' },
  { id: 'pricing', label: 'Price & Area', stepNum: 2, icon: IndianRupee, desc: 'Budget & BHK' },
  { id: 'specs', label: 'Specs & 3D', stepNum: 3, icon: Sliders, desc: 'Facing & Model' },
  { id: 'features', label: 'Amenities', stepNum: 4, icon: CheckSquare, desc: 'Tags & Status' },
  { id: 'images', label: 'Photos', stepNum: 5, icon: ImageIcon, desc: 'Gallery Upload' }
];

export default function PropertiesTab({
  properties,
  onAddProperty,
  onUpdateProperty,
  onDeleteProperty,
  searchTerm
}: PropertiesTabProps) {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState<FormTabType>('basic');
  const [editingProp, setEditingProp] = useState<AdminProperty | null>(null);

  // Image upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [directUrlInput, setDirectUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddDirectUrl = () => {
    const url = directUrlInput.trim();
    if (!url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
      showToast('Please enter a valid URL starting with http://, https:// or /', 'info');
      return;
    }
    setFormData(prev => {
      const newImages = Array.from(new Set([...prev.images, url]));
      return {
        ...prev,
        images: newImages,
        heroImage: prev.heroImage ? prev.heroImage : url
      };
    });
    setDirectUrlInput('');
    showToast('Direct Image URL added to property gallery!', 'success');
  };

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const calculatePriceValue = (displayStr: string): number => {
    if (!displayStr) return 0;
    const cleanStr = displayStr.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleanStr);
    if (isNaN(num)) return 0;

    const lower = displayStr.toLowerCase();
    if (lower.includes('cr') || lower.includes('crore')) {
      return Math.round(num * 10000000);
    } else if (lower.includes('lakh') || lower.includes('lac') || lower.includes('l')) {
      return Math.round(num * 100000);
    } else if (lower.includes('k') || lower.includes('thousand')) {
      return Math.round(num * 1000);
    }
    return Math.round(num);
  };

  const defaultFormState = {
    title: '',
    purpose: 'Buy' as PropertyPurpose,
    type: '3 BHK' as PropertyType,
    priceDisplay: '',
    priceValue: 0,
    location: '',
    sector: 'Dwarka Sector 7' as DwarkaSector,
    bhk: 3,
    bathrooms: 3,
    areaSqFt: 1800,
    carpetAreaSqFt: 1500,
    floor: '1st Floor',
    totalFloors: 4,
    parking: '2 Covered Stilt Parking Slots',
    furnishing: 'Semi-Furnished' as 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished',
    facing: 'North-East' as 'North' | 'East' | 'North-East' | 'North-West' | 'South-East',
    propertyAge: 'Brand New (0-1 Yrs)',
    availability: 'Ready to Move' as 'Ready to Move' | 'Under Construction',
    featured: true,
    published: true,
    heroImage: '',
    images: [] as string[],
    description: '',
    amenities: 'Private Capsule Lift, Stilt Parking, Italian Marble, Modular Kitchen, PNG Gas Line, CCTV Security',
    highlights: 'Prime Dwarka Location, Freehold Title Clear, Bank Home Loan Approved',
    contactNumber: '+91 9911956274',
    legalClearance: true,
    model3dType: 'luxury-villa' as 'luxury-villa' | 'high-tower' | 'penthouse-suite',
    floorPlanUrl: ''
  };

  const [formData, setFormData] = useState(defaultFormState);

  const handleOpenAddModal = () => {
    setEditingProp(null);
    setFormData(defaultFormState);
    setActiveFormTab('basic');
    setUploadMessage(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prop: AdminProperty) => {
    setEditingProp(prop);
    const propImages = prop.images && prop.images.length > 0 
      ? prop.images 
      : (prop.heroImage ? [prop.heroImage] : []);

    setFormData({
      title: prop.title || '',
      purpose: prop.purpose || 'Buy',
      type: prop.type || '3 BHK',
      priceDisplay: prop.priceDisplay || '',
      priceValue: prop.priceValue || 0,
      location: prop.location || '',
      sector: (prop.sector || 'Dwarka Sector 7') as DwarkaSector,
      bhk: prop.bhk || 3,
      bathrooms: prop.bathrooms || 3,
      areaSqFt: prop.areaSqFt || 1800,
      carpetAreaSqFt: prop.carpetAreaSqFt || 1500,
      floor: prop.floor || '1st Floor',
      totalFloors: prop.totalFloors || 4,
      parking: prop.parking || '2 Covered Parking Slots',
      furnishing: (prop.furnishing || 'Semi-Furnished') as any,
      facing: (prop.facing || 'North-East') as any,
      propertyAge: prop.propertyAge || 'Brand New',
      availability: (prop.availability || 'Ready to Move') as any,
      featured: prop.featured ?? true,
      published: prop.published ?? true,
      heroImage: prop.heroImage || (propImages[0] || ''),
      images: propImages,
      description: prop.description || '',
      amenities: Array.isArray(prop.amenities) ? prop.amenities.join(', ') : (prop.amenities || ''),
      highlights: Array.isArray(prop.highlights) ? prop.highlights.join(', ') : (prop.highlights || ''),
      contactNumber: prop.contactNumber || '+91 9911956274',
      legalClearance: prop.legalClearance ?? true,
      model3dType: prop.model3dType || 'luxury-villa',
      floorPlanUrl: prop.floorPlanUrl || ''
    });
    setActiveFormTab('basic');
    setUploadMessage(null);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadMessage({ text: 'Processing selected photo(s)...', type: 'success' });

    const uploadedUrls: string[] = [];
    let successCount = 0;
    let cloudCount = 0;

    for (let i = 0; i < files.length; i++) {
      try {
        const res = await AdminService.uploadImage(files[i]);
        if (res && res.url) {
          uploadedUrls.push(res.url);
          successCount++;
          if (res.source === 'Cloudinary') cloudCount++;
        }
      } catch (err) {
        console.error('File upload error:', err);
      }
    }

    setIsUploading(false);

    if (uploadedUrls.length > 0) {
      setFormData(prev => {
        const newImages = Array.from(new Set([...prev.images, ...uploadedUrls]));
        const hero = prev.heroImage ? prev.heroImage : uploadedUrls[0];
        return {
          ...prev,
          images: newImages,
          heroImage: hero
        };
      });

      const messageText = cloudCount > 0
        ? `Successfully uploaded ${successCount} photo(s) via Cloudinary API!`
        : `Successfully added ${successCount} photo(s) to gallery!`;
      
      setUploadMessage({ text: messageText, type: 'success' });
      showToast(messageText, 'success');
    } else {
      setUploadMessage({ text: 'Failed to upload selected file(s). Please try again.', type: 'error' });
    }
  };

  const handleAddPresetImage = (presetUrl: string) => {
    setFormData(prev => {
      const newImages = Array.from(new Set([...prev.images, presetUrl]));
      return {
        ...prev,
        images: newImages,
        heroImage: prev.heroImage ? prev.heroImage : presetUrl
      };
    });
    showToast('Stock photo added to gallery!', 'info');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData(prev => {
      const updatedImages = prev.images.filter((_, idx) => idx !== indexToRemove);
      let newHero = prev.heroImage;
      if (prev.heroImage === prev.images[indexToRemove]) {
        newHero = updatedImages.length > 0 ? updatedImages[0] : '';
      }
      return {
        ...prev,
        images: updatedImages,
        heroImage: newHero
      };
    });
  };

  const handleSetHeroImage = (url: string) => {
    setFormData(prev => ({ ...prev, heroImage: url }));
    showToast('Set as main Hero Image for this property!', 'success');
  };

  const currentStepIndex = FORM_STEPS.findIndex(s => s.id === activeFormTab);

  const handleNextStep = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (currentStepIndex < FORM_STEPS.length - 1) {
      setActiveFormTab(FORM_STEPS[currentStepIndex + 1].id);
    }
  };

  const handlePrevStep = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (currentStepIndex > 0) {
      setActiveFormTab(FORM_STEPS[currentStepIndex - 1].id);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    // STRICT GUARD: If user is not on the final tab ('images'), advance to next step instead of submitting early
    if (activeFormTab !== 'images') {
      if (currentStepIndex < FORM_STEPS.length - 1) {
        setActiveFormTab(FORM_STEPS[currentStepIndex + 1].id);
      }
      return;
    }

    const amenitiesList = formData.amenities
      ? formData.amenities.split(',').map(s => s.trim()).filter(Boolean)
      : ['Private Lift', 'Stilt Parking', 'CCTV Security'];

    const highlightsList = formData.highlights
      ? formData.highlights.split(',').map(s => s.trim()).filter(Boolean)
      : ['Prime location in Dwarka', '100% Freehold Title Clear', 'Bank Loan Approved'];

    const currentImages = formData.images.length > 0 
      ? formData.images 
      : (formData.heroImage ? [formData.heroImage] : []);

    const currentHero = formData.heroImage || (currentImages[0] || '');

    const finalPriceValue = formData.priceValue || calculatePriceValue(formData.priceDisplay);

    const payload: Omit<AdminProperty, 'id' | 'createdAt' | 'viewsCount'> = {
      title: formData.title || 'Untitled Dwarka Property',
      slug: (formData.title || 'property').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      purpose: formData.purpose,
      type: formData.type,
      priceDisplay: formData.priceDisplay || '₹ Price on Call',
      priceValue: finalPriceValue,
      location: formData.location || 'Dwarka, New Delhi',
      sector: formData.sector,
      bhk: Number(formData.bhk),
      bathrooms: Number(formData.bathrooms),
      areaSqFt: Number(formData.areaSqFt),
      carpetAreaSqFt: Number(formData.carpetAreaSqFt),
      floor: formData.floor,
      totalFloors: Number(formData.totalFloors),
      parking: formData.parking,
      furnishing: formData.furnishing,
      facing: formData.facing,
      propertyAge: formData.propertyAge,
      availability: formData.availability,
      featured: formData.featured,
      published: formData.published,
      heroImage: currentHero,
      images: currentImages,
      description: formData.description,
      amenities: amenitiesList,
      highlights: highlightsList,
      contactNumber: formData.contactNumber,
      legalClearance: formData.legalClearance,
      model3dType: formData.model3dType,
      floorPlanUrl: formData.floorPlanUrl
    };

    if (editingProp) {
      onUpdateProperty(editingProp.id, payload);
      showToast(`Property "${formData.title}" updated successfully!`, 'success');
    } else {
      onAddProperty(payload);
      showToast(`New Property "${formData.title}" published successfully!`, 'success');
    }
    setIsModalOpen(false);
  };

  const filtered = properties.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector = selectedSector === 'All' || p.sector === selectedSector;
    const matchesType = selectedType === 'All' || p.type === selectedType;

    return matchesSearch && matchesSector && matchesType;
  });

  return (
    <div className="space-y-6 relative font-sans">
      {toast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-slate-900 text-white shadow-2xl border border-teal-500/40 animate-bounce">
          <Sparkles className="w-5 h-5 text-teal-400 shrink-0" />
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      )}

      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2.5" style={{ fontFamily: "'Playfair Display', serif" }}>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
              <Building2 className="w-5 h-5" />
            </div>
            <span>Dwarka Real Estate Portfolio ({filtered.length})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Add builder floors, society flats, penthouses & commercial spaces directly to the website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedSector}
            onChange={e => setSelectedSector(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none cursor-pointer"
          >
            <option value="All">All Dwarka Sectors</option>
            <option value="Dwarka Sector 6">Dwarka Sector 6</option>
            <option value="Dwarka Sector 7">Dwarka Sector 7</option>
            <option value="Dwarka Sector 8">Dwarka Sector 8</option>
            <option value="Dwarka Sector 10">Dwarka Sector 10</option>
            <option value="Dwarka Sector 12">Dwarka Sector 12</option>
            <option value="Dwarka Sector 19">Dwarka Sector 19</option>
            <option value="Dwarka Sector 21">Dwarka Sector 21</option>
            <option value="Dwarka Sector 23">Dwarka Sector 23</option>
            <option value="MBR Enclave">MBR Enclave</option>
          </select>

          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none cursor-pointer"
          >
            <option value="All">All Property Types</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
            <option value="5 BHK">5 BHK</option>
            <option value="Builder Floor">Builder Floor</option>
            <option value="Society Flat">Society Flat</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Commercial">Commercial</option>
            <option value="Plot">Plot</option>
          </select>

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-black text-xs shadow-md shadow-teal-500/20 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Property</span>
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 px-6 text-center bg-white rounded-3xl border border-slate-200/80 shadow-sm my-2">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4 border border-teal-100 shadow-inner">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-800">No properties in portfolio yet</h3>
          <p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
            Start by adding your first Dwarka builder floor, DDA flat, society apartment, or commercial property listing to display it on the website.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 text-white font-black text-xs shadow-lg shadow-teal-500/25 hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Your First Property</span>
          </button>
        </div>
      ) : (
        <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-teal-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Property & Photos</th>
                  <th className="p-4">Type & Sector</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">BHK & Specs</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(prop => {
                  const galleryCount = prop.images ? prop.images.length : 1;
                  return (
                    <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className="relative group flex-shrink-0">
                            <img
                              src={prop.heroImage || '/images/hero_luxury_villa_3d.png'}
                              alt={prop.title}
                              className="w-14 h-14 rounded-2xl object-cover border border-slate-200 bg-slate-100 cursor-pointer shadow-sm group-hover:opacity-90"
                              onClick={() => setPreviewImage(prop.heroImage || '/images/hero_luxury_villa_3d.png')}
                            />
                            <span className="absolute bottom-0 right-0 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-tl-lg rounded-br-2xl flex items-center gap-0.5">
                              <ImageIcon className="w-2.5 h-2.5" />
                              {galleryCount}
                            </span>
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-800 block leading-tight truncate max-w-[220px]" title={prop.title}>
                              {prop.title}
                            </span>
                            <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                              <span className="truncate max-w-[200px]">{prop.location}</span>
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-semibold text-slate-800 block">{prop.type}</span>
                        <span className="text-[10px] text-teal-600 font-bold">{prop.sector}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-black text-teal-700 text-sm block">{prop.priceDisplay}</span>
                        <span className="text-[10px] text-slate-500">{prop.purpose}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-semibold text-slate-700 block">{prop.bhk} BHK • {prop.bathrooms} Baths</span>
                        <span className="text-[10px] text-slate-500">{prop.areaSqFt} sq.ft ({prop.furnishing || 'Semi-Furnished'})</span>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => {
                            onUpdateProperty(prop.id, { featured: !prop.featured });
                            showToast(prop.featured ? 'Removed from Featured' : 'Marked as Featured Spotlight', 'info');
                          }}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            prop.featured
                              ? 'bg-amber-50 text-amber-600 border-amber-200 shadow-sm'
                              : 'bg-slate-50 text-slate-400 border-slate-200'
                          }`}
                          title="Toggle Featured Spotlight"
                        >
                          <Star className={`w-4 h-4 ${prop.featured ? 'fill-current' : ''}`} />
                        </button>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => {
                            onUpdateProperty(prop.id, { published: !prop.published });
                            showToast(prop.published ? 'Property Hidden' : 'Property Published', 'info');
                          }}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                            prop.published
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {prop.published ? 'Published' : 'Hidden'}
                        </button>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(prop)}
                            className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-teal-600 hover:bg-teal-50 border border-slate-200 transition-colors cursor-pointer"
                            title="Edit Property & Photos"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${prop.title}"?`)) {
                                onDeleteProperty(prop.id);
                                showToast(`Listing "${prop.title}" deleted`, 'info');
                              }
                            }}
                            className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200 transition-colors cursor-pointer"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-slate-900 border border-slate-700 p-2">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={previewImage} alt="Preview" className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain mx-auto" />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-white border border-slate-200 shadow-2xl text-slate-800 flex flex-col h-[90vh] max-h-[850px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Top Header */}
            <div className="p-5 px-6 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white flex items-center justify-between flex-shrink-0 border-b border-teal-800/40 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-inner">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                      Dwarka Property Console
                    </span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-teal-200 text-xs font-bold">Step {currentStepIndex + 1} of 5</span>
                  </div>
                  <h3 className="text-lg font-black text-white tracking-tight mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {editingProp ? `Edit: ${editingProp.title}` : 'Add New Property Listing'}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${((currentStepIndex + 1) / FORM_STEPS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Stepper Tabs Bar */}
            <div className="bg-slate-50 border-b border-slate-200 p-2.5 px-6 flex items-center justify-between gap-1 overflow-x-auto flex-shrink-0">
              {FORM_STEPS.map((step, idx) => {
                const isActive = activeFormTab === step.id;
                const isCompleted = idx < currentStepIndex;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveFormTab(step.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 scale-[1.02]'
                        : isCompleted
                        ? 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100'
                        : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isCompleted
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : step.stepNum}
                    </div>
                    <span>{step.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body Form with Fixed Footer */}
            <form onSubmit={handleSubmitForm} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              
              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
                
                {/* STEP 1: BASIC DETAILS */}
                {activeFormTab === 'basic' && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-center justify-between shadow-sm">
                      <div>
                        <h4 className="font-black text-slate-800 text-sm">Step 1: Property Identification & Location</h4>
                        <p className="text-[11px] text-slate-500">Provide title, sector location, contact hotline and overview.</p>
                      </div>
                      <FileText className="w-6 h-6 text-teal-600 opacity-70" />
                    </div>

                    <div>
                      <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Property Title *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          spellCheck={true}
                          placeholder="e.g. 3 BHK Ultra Luxury Builder Floor with Private Lift & Stilt Parking"
                          value={formData.title}
                          onChange={e => setFormData({ ...formData, title: e.target.value })}
                          className="w-full bg-white text-slate-900 rounded-xl pl-10 pr-4 py-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-bold text-sm shadow-sm transition-all placeholder:text-slate-400"
                        />
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">Purpose *</label>
                        <select
                          value={formData.purpose}
                          onChange={e => setFormData({ ...formData, purpose: e.target.value as PropertyPurpose })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-semibold shadow-sm cursor-pointer"
                        >
                          <option value="Buy">Buy / For Sale</option>
                          <option value="Rent">Rent</option>
                          <option value="Lease">Lease</option>
                          <option value="Projects">Projects / New Launch</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">Property Type *</label>
                        <select
                          value={formData.type}
                          onChange={e => setFormData({ ...formData, type: e.target.value as PropertyType })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-semibold shadow-sm cursor-pointer"
                        >
                          <option value="2 BHK">2 BHK</option>
                          <option value="3 BHK">3 BHK</option>
                          <option value="4 BHK">4 BHK</option>
                          <option value="5 BHK">5 BHK</option>
                          <option value="Builder Floor">Builder Floor</option>
                          <option value="DDA Flat">DDA Flat</option>
                          <option value="Society Flat">Society Flat</option>
                          <option value="Penthouse">Penthouse</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Plot">Plot</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">Dwarka Sector *</label>
                        <select
                          value={formData.sector}
                          onChange={e => setFormData({ ...formData, sector: e.target.value as DwarkaSector })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-semibold shadow-sm cursor-pointer"
                        >
                          <option value="Dwarka Sector 6">Dwarka Sector 6</option>
                          <option value="Dwarka Sector 7">Dwarka Sector 7</option>
                          <option value="Dwarka Sector 8">Dwarka Sector 8</option>
                          <option value="Dwarka Sector 10">Dwarka Sector 10</option>
                          <option value="Dwarka Sector 12">Dwarka Sector 12</option>
                          <option value="Dwarka Sector 19">Dwarka Sector 19</option>
                          <option value="Dwarka Sector 21">Dwarka Sector 21</option>
                          <option value="Dwarka Sector 23">Dwarka Sector 23</option>
                          <option value="MBR Enclave">MBR Enclave</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          Full Address Location *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            spellCheck={true}
                            placeholder="e.g. Near Ramphal Chowk, Dwarka Sector 7, New Delhi"
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                            className="w-full bg-white text-slate-900 rounded-xl pl-10 pr-4 py-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-semibold shadow-sm placeholder:text-slate-400"
                          />
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          Contact Phone Hotline *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="+91 9911956274"
                            value={formData.contactNumber}
                            onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
                            className="w-full bg-white text-slate-900 rounded-xl pl-10 pr-4 py-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-bold text-teal-700 shadow-sm"
                          />
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Detailed Description *
                      </label>
                      <textarea
                        rows={4}
                        required
                        spellCheck={true}
                        placeholder="Describe interior design, Italian marble flooring, modular fittings, park view, nearby metro station connectivity, and property highlights..."
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-medium leading-relaxed shadow-sm placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: PRICING & AREA */}
                {activeFormTab === 'pricing' && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-center justify-between shadow-sm">
                      <div>
                        <h4 className="font-black text-slate-800 text-sm">Step 2: Valuation & Space Specifications</h4>
                        <p className="text-[11px] text-slate-500">Set asking price, room count, floor level, and sq.ft dimensions.</p>
                      </div>
                      <IndianRupee className="w-6 h-6 text-teal-600 opacity-70" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          Display Price Text *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="e.g. ₹ 1.85 Cr or ₹ 45,000 / mo"
                            value={formData.priceDisplay}
                            onChange={e => {
                              const text = e.target.value;
                              const calculatedVal = calculatePriceValue(text);
                              setFormData({ 
                                ...formData, 
                                priceDisplay: text,
                                priceValue: calculatedVal > 0 ? calculatedVal : formData.priceValue
                              });
                            }}
                            className="w-full bg-white text-slate-900 rounded-xl pl-10 pr-4 py-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-black text-sm text-teal-700 shadow-sm placeholder:text-slate-400"
                          />
                          <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Numeric value: <strong className="text-teal-700 font-black">₹ {formData.priceValue.toLocaleString('en-IN')}</strong>
                        </span>
                      </div>

                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          Numeric Value (in INR) *
                        </label>
                        <input
                          type="number"
                          required
                          placeholder="18500000"
                          value={formData.priceValue || ''}
                          onChange={e => setFormData({ ...formData, priceValue: Number(e.target.value) })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-bold shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          Super Built-up Area (sq.ft) *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            required
                            placeholder="1800"
                            value={formData.areaSqFt || ''}
                            onChange={e => setFormData({ ...formData, areaSqFt: Number(e.target.value) })}
                            className="w-full bg-white text-slate-900 rounded-xl pl-10 pr-4 py-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-bold shadow-sm"
                          />
                          <Maximize2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          Carpet Area (sq.ft)
                        </label>
                        <input
                          type="number"
                          placeholder="1550"
                          value={formData.carpetAreaSqFt || ''}
                          onChange={e => setFormData({ ...formData, carpetAreaSqFt: Number(e.target.value) })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-semibold shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">BHK Bedrooms</label>
                        <input
                          type="number"
                          value={formData.bhk}
                          onChange={e => setFormData({ ...formData, bhk: Number(e.target.value) })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:outline-none font-bold text-center shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">Bathrooms</label>
                        <input
                          type="number"
                          value={formData.bathrooms}
                          onChange={e => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:outline-none font-bold text-center shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">Floor Level</label>
                        <input
                          type="text"
                          placeholder="1st Floor"
                          value={formData.floor}
                          onChange={e => setFormData({ ...formData, floor: e.target.value })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:outline-none font-semibold shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">Total Floors</label>
                        <input
                          type="number"
                          value={formData.totalFloors}
                          onChange={e => setFormData({ ...formData, totalFloors: Number(e.target.value) })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:outline-none font-bold text-center shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: SPECS & 3D MODEL */}
                {activeFormTab === 'specs' && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-center justify-between shadow-sm">
                      <div>
                        <h4 className="font-black text-slate-800 text-sm">Step 3: Property Specs & Interactive 3D Viewer</h4>
                        <p className="text-[11px] text-slate-500">Configure furnishing status, facing orientation, and 3D model archetype.</p>
                      </div>
                      <Sliders className="w-6 h-6 text-teal-600 opacity-70" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">Furnishing Status</label>
                        <select
                          value={formData.furnishing}
                          onChange={e => setFormData({ ...formData, furnishing: e.target.value as any })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-semibold shadow-sm cursor-pointer"
                        >
                          <option value="Unfurnished">Unfurnished</option>
                          <option value="Semi-Furnished">Semi-Furnished</option>
                          <option value="Fully Furnished">Fully Furnished</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">Facing Orientation</label>
                        <select
                          value={formData.facing}
                          onChange={e => setFormData({ ...formData, facing: e.target.value as any })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-semibold shadow-sm cursor-pointer"
                        >
                          <option value="North">North</option>
                          <option value="East">East</option>
                          <option value="North-East">North-East</option>
                          <option value="North-West">North-West</option>
                          <option value="South-East">South-East</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">Availability Status</label>
                        <select
                          value={formData.availability}
                          onChange={e => setFormData({ ...formData, availability: e.target.value as any })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-semibold shadow-sm cursor-pointer"
                        >
                          <option value="Ready to Move">Ready to Move</option>
                          <option value="Under Construction">Under Construction</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">Parking Details</label>
                        <input
                          type="text"
                          placeholder="e.g. 2 Covered Stilt Parking Slots"
                          value={formData.parking}
                          onChange={e => setFormData({ ...formData, parking: e.target.value })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-semibold shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">Property Age</label>
                        <input
                          type="text"
                          placeholder="e.g. Brand New (0-1 Yrs)"
                          value={formData.propertyAge}
                          onChange={e => setFormData({ ...formData, propertyAge: e.target.value })}
                          className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-semibold shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-inner">
                      <label className="block font-black text-slate-800 uppercase tracking-wider">
                        3D Architectural Model Archetype
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: 'luxury-villa', label: 'Luxury Villa 3D', desc: 'Builder Floors & independent homes' },
                          { id: 'high-tower', label: 'High Rise Tower 3D', desc: 'CGHS & DDA Apartments' },
                          { id: 'penthouse-suite', label: 'Penthouse Suite 3D', desc: 'Top floor terrace duplexes' }
                        ].map(m => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, model3dType: m.id as any })}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              formData.model3dType === m.id
                                ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300'
                            }`}
                          >
                            <span className="font-extrabold block text-xs">{m.label}</span>
                            <span className={`text-[10px] block mt-0.5 ${formData.model3dType === m.id ? 'text-teal-100' : 'text-slate-400'}`}>
                              {m.desc}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="legalClearance"
                          checked={formData.legalClearance}
                          onChange={e => setFormData({ ...formData, legalClearance: e.target.checked })}
                          className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                        />
                        <label htmlFor="legalClearance" className="font-bold text-slate-700 cursor-pointer select-none">
                          100% Freehold Title Clear & Bank Loan Approved
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: AMENITIES & TAGS */}
                {activeFormTab === 'features' && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-center justify-between shadow-sm">
                      <div>
                        <h4 className="font-black text-slate-800 text-sm">Step 4: Amenities, Highlights & Visibility</h4>
                        <p className="text-[11px] text-slate-500">List key features, highlight points, and homepage spotlight toggles.</p>
                      </div>
                      <CheckSquare className="w-6 h-6 text-teal-600 opacity-70" />
                    </div>

                    <div>
                      <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Property Amenities (comma separated)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Private Capsule Lift, Stilt Car Parking, Italian Marble, Modular Kitchen, PNG Gas Line, CCTV Security, 100% Power Backup"
                        value={formData.amenities}
                        onChange={e => setFormData({ ...formData, amenities: e.target.value })}
                        className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-medium leading-relaxed shadow-sm placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Key Highlights (comma separated)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Prime location near market, 100% Freehold title clear with loan facility, 100 meters from metro station"
                        value={formData.highlights}
                        onChange={e => setFormData({ ...formData, highlights: e.target.value })}
                        className="w-full bg-white text-slate-900 rounded-xl p-3 border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none font-medium leading-relaxed shadow-sm placeholder:text-slate-400"
                      />
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-amber-400 transition-colors shadow-sm">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                          className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400 cursor-pointer"
                        />
                        <div>
                          <span className="font-black text-slate-800 flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-amber-500 fill-current" />
                            Featured Spotlight
                          </span>
                          <span className="text-[10px] text-slate-500 block">Show on Website Homepage Hero Carousel</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-emerald-500 transition-colors shadow-sm">
                        <input
                          type="checkbox"
                          checked={formData.published}
                          onChange={e => setFormData({ ...formData, published: e.target.checked })}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                        />
                        <div>
                          <span className="font-black text-slate-800 flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                            Publish Immediately
                          </span>
                          <span className="text-[10px] text-slate-500 block">Make visible to public site visitors</span>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* STEP 5: IMAGES & UPLOADS */}
                {activeFormTab === 'images' && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-center justify-between shadow-sm">
                      <div>
                        <h4 className="font-black text-slate-800 text-sm">Step 5: High-Res Photos & Gallery Upload</h4>
                        <p className="text-[11px] text-slate-500">Upload property images directly, paste image web links, or pick sample stock photos.</p>
                      </div>
                      <ImageIcon className="w-6 h-6 text-teal-600 opacity-70" />
                    </div>

                    {/* Direct Image Web URL Input Box */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                      <label className="block text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                        <LinkIcon className="w-3.5 h-3.5 text-teal-600" />
                        <span>Add Photo via Direct Web Link / URL</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={directUrlInput}
                          onChange={e => setDirectUrlInput(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddDirectUrl();
                            }
                          }}
                          placeholder="Paste image URL (e.g. https://images.unsplash.com/... or Cloudinary URL)"
                          className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:border-teal-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddDirectUrl}
                          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add URL</span>
                        </button>
                      </div>
                    </div>

                    {/* Drag & Drop Upload Zone */}
                    <div
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => {
                        e.preventDefault();
                        handleFileUpload(e.dataTransfer.files);
                      }}
                      className="p-8 rounded-3xl border-2 border-dashed border-teal-400/80 bg-teal-50/30 hover:bg-teal-50/70 transition-all text-center relative cursor-pointer group shadow-inner"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        multiple
                        accept="image/*"
                        onChange={e => handleFileUpload(e.target.files)}
                        className="hidden"
                      />

                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                        {isUploading ? (
                          <Loader2 className="w-7 h-7 animate-spin text-white" />
                        ) : (
                          <Upload className="w-7 h-7 text-white" />
                        )}
                      </div>

                      <h4 className="text-sm font-black text-slate-800">
                        {isUploading ? 'Processing & Uploading Photos...' : 'Click to Upload Property Photos or Drag & Drop Here'}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Supports JPG, PNG, WEBP • Cloudinary Direct API & Offline High-Performance Storage
                      </p>

                      {uploadMessage && (
                        <div className={`mt-3 p-3 rounded-xl text-xs font-bold ${
                          uploadMessage.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {uploadMessage.text}
                        </div>
                      )}
                    </div>

                    {/* Preset Sample Photos */}
                    <div>
                      <h5 className="font-black text-slate-800 mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        <span>Quick Select Sample High-Res Dwarka Property Photos</span>
                      </h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {STOCK_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleAddPresetImage(preset.url)}
                            className="p-2 rounded-2xl border border-slate-200 bg-white hover:bg-teal-50 hover:border-teal-300 text-left flex items-center gap-2.5 transition-all group cursor-pointer shadow-sm"
                          >
                            <img src={preset.url} alt={preset.name} className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200" />
                            <div className="min-w-0">
                              <span className="font-black text-[10px] text-slate-800 block truncate group-hover:text-teal-700">
                                {preset.name}
                              </span>
                              <span className="text-[9px] text-teal-600 font-bold flex items-center gap-0.5">
                                + Add Photo
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Uploaded Gallery Grid */}
                    <div>
                      <h5 className="font-black text-slate-800 mb-3 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-teal-600" />
                          <span>Uploaded Property Gallery ({formData.images.length})</span>
                        </span>
                        <span className="text-[11px] text-slate-500 font-normal">
                          Click <Star className="w-3 h-3 inline text-amber-500" /> to set main Hero Image
                        </span>
                      </h5>

                      {formData.images.length === 0 ? (
                        <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-400 font-semibold">
                          No photos uploaded yet. Click the box above or select sample photos to add them.
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {formData.images.map((imgUrl, idx) => {
                            const isHero = formData.heroImage === imgUrl;
                            return (
                              <div
                                key={idx}
                                className={`relative rounded-2xl border-2 overflow-hidden bg-slate-100 group shadow-sm transition-all ${
                                  isHero ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-200 hover:border-teal-400'
                                }`}
                              >
                                <img src={imgUrl} alt={`Property photo ${idx + 1}`} className="w-full h-32 object-cover" />

                                {isHero && (
                                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center gap-1 shadow">
                                    <Star className="w-3 h-3 fill-current" />
                                    Hero Image
                                  </span>
                                )}

                                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleSetHeroImage(imgUrl)}
                                    className={`p-2 rounded-xl text-white transition-transform hover:scale-110 cursor-pointer ${
                                      isHero ? 'bg-amber-500' : 'bg-slate-700 hover:bg-amber-500'
                                    }`}
                                    title="Set as Hero Image"
                                  >
                                    <Star className={`w-4 h-4 ${isHero ? 'fill-current' : ''}`} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setPreviewImage(imgUrl)}
                                    className="p-2 rounded-xl bg-slate-700 hover:bg-teal-600 text-white transition-transform hover:scale-110 cursor-pointer"
                                    title="Preview Photo"
                                  >
                                    <Maximize2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveImage(idx)}
                                    className="p-2 rounded-xl bg-slate-700 hover:bg-rose-600 text-white transition-transform hover:scale-110 cursor-pointer"
                                    title="Delete Photo"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* FIXED MODAL FOOTER BAR (Always 100% Visible at Bottom of Modal Card) */}
              <div className="p-4 px-6 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3 flex-shrink-0 rounded-b-3xl">
                <div className="flex items-center gap-2">
                  {currentStepIndex > 0 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 py-2.5 rounded-xl bg-white text-slate-700 font-bold border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer text-xs shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white text-slate-600 font-bold border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer text-xs shadow-sm"
                  >
                    Cancel
                  </button>

                  {currentStepIndex < FORM_STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black shadow-md shadow-teal-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer text-xs"
                    >
                      <span>Next Step: {FORM_STEPS[currentStepIndex + 1]?.label}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer text-xs"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>{editingProp ? 'Save Changes' : 'Publish Property Listing'}</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
