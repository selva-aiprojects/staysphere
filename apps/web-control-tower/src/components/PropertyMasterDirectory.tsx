import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Search,
  Filter,
  Star,
  RefreshCw,
  Eye,
  MapPin,
  X,
  Hotel,
  Link,
  Layers
} from 'lucide-react';
import { PropertyMasterEntity, PropertyCategoryType, PropertyOperationalStatus } from '@staysphere/domain-types';

interface PropertyMasterDirectoryProps {
  showToast: (msg: string) => void;
}

const INITIAL_PROPERTIES_MASTER: PropertyMasterEntity[] = [
  {
    id: 'prop-mst-01',
    code: 'SS-GOA-AZURA',
    name: 'Azura Cliff Luxury Estates & Private Ocean Villas',
    category: 'VILLA',
    categoryLabel: 'Private Oceanfront Villa & Estate',
    destinationCity: 'Goa',
    locationArea: 'Sinquerim Cliffs, North Goa',
    address: 'Plot 41, Aguada Clifftop Road, Sinquerim, Goa 403515',
    starRating: 4.96,
    trustScore: 99.4,
    reviewCount: 142,
    basePricePerNight: 42000,
    commissionRatePercent: 12.0,
    rateParityStatus: 'IN_SYNC',
    status: 'ACTIVE',
    hostSphereSync: 'CONNECTED',
    pmsConnector: 'HostSphere Direct PMS (Sync v3.4)',
    managerName: 'Anil Deshmukh',
    managerPhone: '+91 98300 33445',
    managerEmail: 'anil.owner@vanaazure.com',
    roomSuites: [
      {
        id: 'rm-az-1',
        name: 'Presidential Ocean Panoramic Suite (Suite 402)',
        maxGuests: 4,
        basePricePerNight: 42000,
        inventoryCount: 4,
        amenities: ['Private Infinity Pool', 'Direct Cliff Sunset Deck', '24/7 Butler Intercom', 'NFC Smart Keycard'],
        description: '3,200 sq.ft ocean-facing master estate with private plunge pool and private helipad transfer access.',
      },
      {
        id: 'rm-az-2',
        name: 'Royal Coral 3-Bedroom Clifftop Villa',
        maxGuests: 8,
        basePricePerNight: 78000,
        inventoryCount: 2,
        amenities: ['Private Garden', 'Private Chef Kitchen', 'Jacuzzi Spa', 'Ocean Balcony'],
        description: 'Complete private compound with dedicated butler retinue and private infinity pool.',
      },
    ],
    keyInclusions: ['Complimentary Chauffeur Airport Pickup', 'Daily Oceanfront Champagne Breakfast', 'Private Sunset Yacht Excursion'],
    heroImageUrl: '/luxury_cliff_villa_1788798235535.jpg',
    payoutBankInfo: {
      bankName: 'HDFC Corporate Bank (Panaji Branch)',
      accountEnding: '*4892',
      accountHolder: 'Coastal Luxury Hospitality LLP',
    },
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-09-08T08:30:00Z',
  },
  {
    id: 'prop-mst-02',
    code: 'SS-UDR-MEWAR',
    name: 'The Royal Lake Palace Heritage Sanctuary',
    category: 'HERITAGE_PALACE',
    categoryLabel: 'Royal Heritage Palace & Island Suites',
    destinationCity: 'Udaipur',
    locationArea: 'Lake Pichola Central Island',
    address: 'Lake Pichola Heritage Island, Udaipur, Rajasthan 313001',
    starRating: 4.98,
    trustScore: 99.8,
    reviewCount: 310,
    basePricePerNight: 68000,
    commissionRatePercent: 15.0,
    rateParityStatus: 'IN_SYNC',
    status: 'ACTIVE',
    hostSphereSync: 'CONNECTED',
    pmsConnector: 'HostSphere Direct PMS (Sync v3.4)',
    managerName: 'Maharaj Ranjit Rathore',
    managerPhone: '+91 294 242 9911',
    managerEmail: 'concierge@mewarpalace.in',
    roomSuites: [
      {
        id: 'rm-mw-1',
        name: 'Maharaja Heritage Lake View Suite',
        maxGuests: 3,
        basePricePerNight: 68000,
        inventoryCount: 6,
        amenities: ['Marble Royal Bath', 'Lake Pichola Panoramic Jharokha', 'Private Royal Butler', 'Solar Boat Access'],
        description: 'Centuries-old authentic royal quarters with hand-carved jharokhas overlooking the illuminated lake.',
      },
      {
        id: 'rm-mw-2',
        name: 'Grand Mewar Imperial Presidential Wing',
        maxGuests: 6,
        basePricePerNight: 125000,
        inventoryCount: 1,
        amenities: ['Private Royal Courtyard', 'Heritage Dining Hall', 'Private Sommelier'],
        description: 'Exclusive private wing with 24/7 dedicated chef, royal butler, and private solar boat.',
      },
    ],
    keyInclusions: ['Private Solar Boat Pichola Cruise', 'Royal Mewar Thali Dining', 'Heritage Chauffeur Transfer'],
    heroImageUrl: '/royal_palace_1788838828230.jpg',
    payoutBankInfo: {
      bankName: 'State Bank of India (Udaipur Royal Branch)',
      accountEnding: '*9014',
      accountHolder: 'Mewar Heritage Hospitality Trust',
    },
    createdAt: '2026-02-10T12:00:00Z',
    updatedAt: '2026-09-08T07:45:00Z',
  },
  {
    id: 'prop-mst-03',
    code: 'SS-MNL-SOLANG',
    name: 'Solang Valley Alpine Pine Chalets & Spa',
    category: 'CHALET',
    categoryLabel: 'Snow Mountain Alpine Chalet',
    destinationCity: 'Manali',
    locationArea: 'Solang Valley, Upper Manali',
    address: 'VPO Palchan, Solang Valley Road, Manali, HP 175131',
    starRating: 4.88,
    trustScore: 97.5,
    reviewCount: 94,
    basePricePerNight: 28000,
    commissionRatePercent: 10.0,
    rateParityStatus: 'DISCREPANCY',
    status: 'ACTIVE',
    hostSphereSync: 'CONNECTED',
    pmsConnector: 'eZee Absolute Cloud PMS',
    managerName: 'Karamchand Thakur',
    managerPhone: '+91 1902 258 400',
    managerEmail: 'stay@solangretreat.com',
    roomSuites: [
      {
        id: 'rm-sl-1',
        name: 'Cedar Wooden Loft Suite (Suite 301)',
        maxGuests: 4,
        basePricePerNight: 28000,
        inventoryCount: 8,
        amenities: ['Stone Fireplace', 'Panoramic Glacial Views', 'Heated Flooring', 'Alpine Hot Tub'],
        description: 'Authentic deodar wood duplex chalet loft with stone fireplace and heated flooring.',
      },
    ],
    keyInclusions: ['4x4 Snow Safari Expedition', 'Heated Herbal Jacuzzi Access', 'Himalayan High Tea by Fireplace'],
    heroImageUrl: '/luxury_alpine_chalet_1788798320863.jpg',
    payoutBankInfo: {
      bankName: 'ICICI Bank (Manali Mall Road)',
      accountEnding: '*3321',
      accountHolder: 'Solang Alpine Retreats Pvt Ltd',
    },
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-09-08T08:15:00Z',
  },
  {
    id: 'prop-mst-04',
    code: 'SS-BOM-HORIZON',
    name: 'The Sovereign Horizon Sky Penthouse & Suites',
    category: 'SERVICED_APARTMENT',
    categoryLabel: 'Luxury Serviced Sky Residence',
    destinationCity: 'Mumbai',
    locationArea: 'Bandra West, Carter Road',
    address: 'Level 38, The Sovereign Tower, Carter Road, Bandra West, Mumbai 400050',
    starRating: 4.92,
    trustScore: 98.6,
    reviewCount: 88,
    basePricePerNight: 36000,
    commissionRatePercent: 12.5,
    rateParityStatus: 'IN_SYNC',
    status: 'ACTIVE',
    hostSphereSync: 'CONNECTED',
    pmsConnector: 'Opera Cloud PMS Connector',
    managerName: 'Devika Singhal',
    managerPhone: '+91 22 6789 0011',
    managerEmail: 'devika.singhal@sovereignmumbai.com',
    roomSuites: [
      {
        id: 'rm-bm-1',
        name: 'Arabian Sea Panoramic Executive Sky Suite',
        maxGuests: 2,
        basePricePerNight: 36000,
        inventoryCount: 6,
        amenities: ['Floor-to-Ceiling Sea Glass', 'Private Boardroom', 'Smart Automated Controls', 'Executive Lounge Pass'],
        description: 'Ultra-modern 2,400 sq.ft sky apartment overlooking the Bandra Sea Link with dedicated executive concierge.',
      },
    ],
    keyInclusions: ['Airport Priority Terminal Chauffeur', 'Executive Club Lounge Access', 'Private High-Speed Starlink Wifi'],
    heroImageUrl: '/ocean_villa_1788838845631.jpg',
    payoutBankInfo: {
      bankName: 'Axis Bank (Bandra West Branch)',
      accountEnding: '*7723',
      accountHolder: 'Horizon Sky Residences LLP',
    },
    createdAt: '2026-04-12T11:00:00Z',
    updatedAt: '2026-09-08T09:00:00Z',
  },
];

export const PropertyMasterDirectory: React.FC<PropertyMasterDirectoryProps> = ({ showToast }) => {
  const [properties, setProperties] = useState<PropertyMasterEntity[]>(INITIAL_PROPERTIES_MASTER);
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [inspectingProperty, setInspectingProperty] = useState<PropertyMasterEntity | null>(null);

  // New Property Form State
  const [newProp, setNewProp] = useState<Partial<PropertyMasterEntity>>({
    name: '',
    code: '',
    category: 'HOTEL',
    categoryLabel: 'Boutique Luxury Hotel',
    destinationCity: 'Goa',
    locationArea: '',
    address: '',
    basePricePerNight: 35000,
    commissionRatePercent: 12.0,
    managerName: '',
    managerPhone: '',
    managerEmail: '',
    pmsConnector: 'HostSphere Direct PMS (Sync v3.4)',
    status: 'ACTIVE',
    hostSphereSync: 'CONNECTED',
  });

  const filteredProperties = properties.filter((prop) => {
    if (selectedCity !== 'ALL' && prop.destinationCity.toLowerCase() !== selectedCity.toLowerCase()) return false;
    if (selectedCategory !== 'ALL' && prop.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        prop.name.toLowerCase().includes(q) ||
        prop.code.toLowerCase().includes(q) ||
        prop.destinationCity.toLowerCase().includes(q) ||
        prop.locationArea.toLowerCase().includes(q) ||
        prop.managerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSyncParity = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, rateParityStatus: 'IN_SYNC' as const } : p))
    );
    showToast('Direct Rate Parity synchronization executed across OTAs and PMS.');
  };

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProp.name || !newProp.destinationCity) {
      showToast('Please provide Property Name and Destination City');
      return;
    }

    const created: PropertyMasterEntity = {
      id: `prop-mst-${Date.now()}`,
      code: newProp.code || `SS-${newProp.destinationCity.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-4)}`,
      name: newProp.name,
      category: (newProp.category as PropertyCategoryType) || 'HOTEL',
      categoryLabel: newProp.categoryLabel || 'Boutique Hotel & Resort',
      destinationCity: newProp.destinationCity,
      locationArea: newProp.locationArea || `${newProp.destinationCity} Prime Area`,
      address: newProp.address || `Premier Boulevard, ${newProp.destinationCity}`,
      starRating: 4.9,
      trustScore: 99.0,
      reviewCount: 1,
      basePricePerNight: Number(newProp.basePricePerNight) || 35000,
      commissionRatePercent: Number(newProp.commissionRatePercent) || 12.0,
      rateParityStatus: 'IN_SYNC',
      status: (newProp.status as PropertyOperationalStatus) || 'ACTIVE',
      hostSphereSync: 'CONNECTED',
      pmsConnector: newProp.pmsConnector || 'HostSphere Direct PMS',
      managerName: newProp.managerName || 'General Manager',
      managerPhone: newProp.managerPhone || '+91 98000 00000',
      managerEmail: newProp.managerEmail || 'manager@property.com',
      roomSuites: [
        {
          id: `rm-${Date.now()}`,
          name: 'Executive Premier Suite',
          maxGuests: 2,
          basePricePerNight: Number(newProp.basePricePerNight) || 35000,
          inventoryCount: 5,
          amenities: ['Smart Access Key', 'Dedicated Concierge', 'Complimentary Breakfast'],
          description: 'Luxuriously appointed suite with modern appointments and city views.',
        },
      ],
      keyInclusions: ['Airport Priority Transfer', 'Daily Gourmet Breakfast', '24/7 Concierge Support'],
      heroImageUrl: '/luxury_cliff_villa_1788798235535.jpg',
      payoutBankInfo: {
        bankName: 'HDFC Bank Corporate',
        accountEnding: '*1092',
        accountHolder: newProp.name,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProperties([created, ...properties]);
    setShowAddModal(false);
    showToast(`Master Property "${created.name}" created and synced with HostSphere!`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#001E36] via-[#002B4D] to-[#0A4D68] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A9A5]/20 border border-[#00A9A5]/40 text-[#00D2C4] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              Master Entity Catalog
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Property Master Entries & HostSphere Sync
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Central master registry for Hotels, Luxury Resorts, Private Villas, and Serviced Apartments. Manage rate parity, PMS connectors, commission structures, and room suites.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] hover:brightness-110 text-[#001428] font-black text-xs shadow-lg shadow-[#FF8A3D]/25 flex items-center gap-2 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Master Property</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-[#001E36] border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mr-1 whitespace-nowrap shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#00A9A5] shrink-0" /> Filter City:
          </span>
          {['ALL', 'Goa', 'Udaipur', 'Manali', 'Mumbai'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCity === city
                  ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {city}
            </button>
          ))}

          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 ml-3 mr-1 whitespace-nowrap shrink-0">
            <Layers className="w-3.5 h-3.5 text-[#FFC857] shrink-0" /> Category:
          </span>
          {[
            { id: 'ALL', label: 'All Types' },
            { id: 'VILLA', label: 'Villas' },
            { id: 'HERITAGE_PALACE', label: 'Palaces' },
            { id: 'CHALET', label: 'Chalets' },
            { id: 'SERVICED_APARTMENT', label: 'Serviced Suites' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search property code, name, city, manager..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00A9A5]"
          />
        </div>
      </div>

      {/* Properties Table / Grid */}
      <div className="grid grid-cols-1 gap-5">
        {filteredProperties.map((prop) => (
          <div
            key={prop.id}
            className="p-6 rounded-2xl bg-[#001D33] border border-white/10 hover:border-[#00A9A5]/50 transition shadow-lg space-y-4"
          >
            {/* Card Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-white/10 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B3D91] to-[#00A9A5] flex items-center justify-center text-white font-black shadow-md shrink-0">
                  <Hotel className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/10 text-[#00D2C4] border border-white/15 whitespace-nowrap shrink-0">
                      {prop.code}
                    </span>
                    <h3 className="font-bold text-white text-base leading-snug">{prop.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/40 whitespace-nowrap shrink-0">
                      {prop.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{prop.locationArea}, <strong>{prop.destinationCity}</strong></span>
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-amber-300 font-bold flex items-center gap-1 whitespace-nowrap shrink-0">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300 shrink-0" /> {prop.starRating} ({prop.reviewCount} reviews)
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-[#3CCF91] font-bold whitespace-nowrap shrink-0">Trust Score: {prop.trustScore}%</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                {prop.rateParityStatus === 'DISCREPANCY' && (
                  <button
                    onClick={() => handleSyncParity(prop.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer animate-pulse whitespace-nowrap shrink-0"
                  >
                    <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                    <span>Sync Rate Parity (Discrepancy)</span>
                  </button>
                )}
                <button
                  onClick={() => setInspectingProperty(prop)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#002B4D] hover:bg-[#003B6D] text-white border border-[#00A9A5]/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Eye className="w-3.5 h-3.5 text-[#00A9A5] shrink-0" />
                  <span>Inspect Suites & Rates</span>
                </button>
              </div>
            </div>

            {/* Property Operational Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/20 border border-white/5 space-y-1">
                <span className="text-slate-400 font-semibold block whitespace-nowrap">Base Nightly Rate & Commission</span>
                <div className="flex items-baseline gap-2">
                  <strong className="text-white text-sm whitespace-nowrap">₹{prop.basePricePerNight.toLocaleString()}</strong>
                  <span className="text-[#3CCF91] font-bold whitespace-nowrap">({prop.commissionRatePercent}% Com.)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/20 border border-white/5 space-y-1 min-w-0">
                <span className="text-slate-400 font-semibold block whitespace-nowrap">HostSphere PMS Connector</span>
                <div className="flex items-center gap-1.5 text-[#00D2C4] font-bold truncate">
                  <Link className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{prop.pmsConnector}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/20 border border-white/5 space-y-1 min-w-0">
                <span className="text-slate-400 font-semibold block whitespace-nowrap">General Manager / Host</span>
                <div className="text-white font-bold truncate">{prop.managerName}</div>
                <div className="text-[11px] text-slate-400 font-mono truncate">{prop.managerPhone}</div>
              </div>

              <div className="p-3 rounded-xl bg-black/20 border border-white/5 space-y-1 min-w-0">
                <span className="text-slate-400 font-semibold block whitespace-nowrap">Settlement Bank Account</span>
                <div className="text-white font-bold truncate">{prop.payoutBankInfo.bankName}</div>
                <div className="text-[11px] text-[#3CCF91] font-mono whitespace-nowrap">{prop.payoutBankInfo.accountEnding}</div>
              </div>
            </div>

            {/* Room Suites Breakdown Pills */}
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 mr-1 whitespace-nowrap shrink-0">Active Suites:</span>
              {prop.roomSuites.map((suite) => (
                <span
                  key={suite.id}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-200 whitespace-nowrap shrink-0"
                >
                  <strong>{suite.name}</strong> (₹{suite.basePricePerNight.toLocaleString()} • {suite.inventoryCount} units)
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Property Detail Modal */}
      {inspectingProperty && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#001D33] border border-white/20 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setInspectingProperty(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#00A9A5]/20 text-[#00D2C4] border border-[#00A9A5]/40 font-bold">
                  {inspectingProperty.code}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-[#FFC857]/20 text-[#FFC857] font-bold">
                  {inspectingProperty.categoryLabel}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white">{inspectingProperty.name}</h2>
              <p className="text-xs text-slate-300">{inspectingProperty.address}</p>
            </div>

            {/* Suites Master Details */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00A9A5]" />
                Room Suites & Inventory Catalog
              </h3>
              <div className="space-y-3">
                {inspectingProperty.roomSuites.map((suite) => (
                  <div key={suite.id} className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{suite.name}</h4>
                      <strong className="text-[#3CCF91] text-sm">₹{suite.basePricePerNight.toLocaleString()} / night</strong>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{suite.description}</p>
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      {suite.amenities.map((am, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setInspectingProperty(null)}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Master Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#001D33] border border-white/20 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A9A5]/20 text-[#00D2C4] text-xs font-bold">
                <Plus className="w-3.5 h-3.5" /> New Master Entity
              </div>
              <h2 className="text-2xl font-black text-white">Register Property in Master Catalog</h2>
              <p className="text-xs text-slate-300">
                Add a verified accommodation partner with HostSphere PMS mapping and commission settings.
              </p>
            </div>

            <form onSubmit={handleCreateProperty} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Property Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Baga Beachfront Villas"
                    value={newProp.name}
                    onChange={(e) => setNewProp({ ...newProp, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Destination City *</label>
                  <select
                    value={newProp.destinationCity}
                    onChange={(e) => setNewProp({ ...newProp, destinationCity: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  >
                    <option value="Goa">Goa</option>
                    <option value="Udaipur">Udaipur</option>
                    <option value="Manali">Manali</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Property Category *</label>
                  <select
                    value={newProp.category}
                    onChange={(e) => setNewProp({ ...newProp, category: e.target.value as PropertyCategoryType })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  >
                    <option value="HOTEL">5-Star Boutique Hotel</option>
                    <option value="RESORT">Premier Beachfront / Hill Resort</option>
                    <option value="VILLA">Private Pool Villa & Estate</option>
                    <option value="SERVICED_APARTMENT">Luxury Serviced Apartment</option>
                    <option value="CHALET">Alpine Snow Chalet</option>
                    <option value="HERITAGE_PALACE">Royal Heritage Palace</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Base Nightly Rate (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 45000"
                    value={newProp.basePricePerNight}
                    onChange={(e) => setNewProp({ ...newProp, basePricePerNight: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Commission Rate (%)</label>
                  <input
                    type="number"
                    placeholder="e.g. 12"
                    value={newProp.commissionRatePercent}
                    onChange={(e) => setNewProp({ ...newProp, commissionRatePercent: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">PMS Connector Mapping</label>
                  <select
                    value={newProp.pmsConnector}
                    onChange={(e) => setNewProp({ ...newProp, pmsConnector: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  >
                    <option value="HostSphere Direct PMS (Sync v3.4)">HostSphere Direct PMS (Sync v3.4)</option>
                    <option value="Opera Cloud PMS Connector">Opera Cloud PMS Connector</option>
                    <option value="eZee Absolute Cloud PMS">eZee Absolute Cloud PMS</option>
                    <option value="IDS Next Enterprise Bridge">IDS Next Enterprise Bridge</option>
                    <option value="Direct Webhook Connector">Direct Webhook Connector</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">General Manager Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Raghavendra Sharma"
                    value={newProp.managerName}
                    onChange={(e) => setNewProp({ ...newProp, managerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Manager Contact Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98200 88990"
                    value={newProp.managerPhone}
                    onChange={(e) => setNewProp({ ...newProp, managerPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Full Physical Address</label>
                <input
                  type="text"
                  placeholder="e.g. Clifftop Aguada Boulevard, Candolim, Goa 403515"
                  value={newProp.address}
                  onChange={(e) => setNewProp({ ...newProp, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-[#001428] font-black shadow-lg hover:brightness-110"
                >
                  Save & Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
