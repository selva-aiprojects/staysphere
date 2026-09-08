import React, { useState } from 'react';
import {
  Hotel,
  Bed,
  CreditCard,
  Star,
  ShieldCheck,
  CheckCircle2,
  Clock,
  KeyRound,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Percent,
  RefreshCw,
  Check,
  ChevronRight,
  Download,
  Eye,
  Coffee,
  Utensils,
  Wine,
  Radio,
  Car,
  Navigation,
  Zap,
} from 'lucide-react';

interface PropertyPartnerPortalProps {
  onSwitchToControlTower?: () => void;
  onOpenTickets?: () => void;
}

export const PropertyPartnerPortal: React.FC<PropertyPartnerPortalProps> = ({
  onSwitchToControlTower,
  onOpenTickets,
}) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'inventory' | 'rates' | 'arrivals' | 'services' | 'settlements' | 'feedback' | 'support'
  >('dashboard');

  const [selectedProperty, setSelectedProperty] = useState('vana-azure');
  const [pmsSyncing, setPmsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('2 mins ago');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSyncPms = () => {
    setPmsSyncing(true);
    setTimeout(() => {
      setPmsSyncing(false);
      setLastSyncTime('Just now');
      showToast('HostSphere Native PMS & Opera Cloud synced successfully.');
    }, 1200);
  };

  // State for Arrivals & Keycards with Live Arrival Radar Telemetry
  const [arrivals, setArrivals] = useState([
    {
      id: 'arr-1',
      guestName: 'Vikram & Radhika Malhotra',
      vipTier: 'Centurion Black VIP',
      room: 'Villa 101 — Grand Infinity Pool Villa',
      checkInTime: '14:00 (Today)',
      flightStatus: '6E-204 Touched Down (GOX Airport)',
      transitSync: 'Maybach S680 Chauffeur Dispatched (ETA 12m)',
      keycardStatus: 'ISSUED',
      status: 'CHECKED_IN',
      specialRequests: 'Kashmir Lavender Pillow Mist, Chilled Dom Pérignon 2012',
      liveRadar: {
        stage: 'AT_PORTE_COCHERE' as 'FLIGHT_AIRBORNE' | 'CHAUFFEUR_EN_ROUTE' | 'AT_PORTE_COCHERE' | 'CHECKED_IN',
        distanceKm: 0.2,
        etaMinutes: 1,
        vehicleModel: 'Mercedes-Maybach S680 (GA-03-X-0001)',
        chauffeurName: 'Gurpreet Singh',
        chauffeurPhone: '+91 98201 44892',
        roomReadiness: 'KEY_ASSIGNED' as 'CLEANING' | 'INSPECTED' | 'KEY_ASSIGNED',
        telemetryPing: 'Passing estate entry gates. Bellhop alerted.',
      },
    },
    {
      id: 'arr-2',
      guestName: 'Ananya & Kabir Roy',
      vipTier: 'StaySphere Platinum',
      room: 'Suite 204 — Azure Oceanfront Penthouse',
      checkInTime: '15:30 (Today)',
      flightStatus: 'AI-802 On Schedule (BOM → GOX)',
      transitSync: 'Private Luxury Van on standby at Terminal VIP Bay',
      keycardStatus: 'PENDING',
      status: 'EXPECTED',
      specialRequests: 'Gluten-free high tea, Late check-out requested',
      liveRadar: {
        stage: 'CHAUFFEUR_EN_ROUTE' as 'FLIGHT_AIRBORNE' | 'CHAUFFEUR_EN_ROUTE' | 'AT_PORTE_COCHERE' | 'CHECKED_IN',
        distanceKm: 24.8,
        etaMinutes: 28,
        vehicleModel: 'Land Rover Defender 110 (GA-03-Z-9999)',
        chauffeurName: 'Manpreet Rathore',
        chauffeurPhone: '+91 98112 55301',
        roomReadiness: 'INSPECTED' as 'CLEANING' | 'INSPECTED' | 'KEY_ASSIGNED',
        telemetryPing: 'Departed airport VIP bay via NH-66 highway.',
      },
    },
    {
      id: 'arr-3',
      guestName: 'Dr. Siddharth Sen',
      vipTier: 'Elite Corporate VIP',
      room: 'Suite 108 — Heritage Sunset Suite',
      checkInTime: '18:00 (Today)',
      flightStatus: 'UK-851 Scheduled (DEL → GOX)',
      transitSync: 'BMW 7-Series Assigned',
      keycardStatus: 'PENDING',
      status: 'EXPECTED',
      specialRequests: 'High-speed ethernet hub for virtual board meeting',
      liveRadar: {
        stage: 'FLIGHT_AIRBORNE' as 'FLIGHT_AIRBORNE' | 'CHAUFFEUR_EN_ROUTE' | 'AT_PORTE_COCHERE' | 'CHECKED_IN',
        distanceKm: 142.0,
        etaMinutes: 110,
        vehicleModel: 'BMW i7 Electric Sedan (GA-01-E-7777)',
        chauffeurName: 'Tariq Mansoor',
        chauffeurPhone: '+91 97664 12890',
        roomReadiness: 'CLEANING' as 'CLEANING' | 'INSPECTED' | 'KEY_ASSIGNED',
        telemetryPing: 'Flight airborne over Bhopal corridor. Chauffeur staging at GOX.',
      },
    },
    {
      id: 'arr-4',
      guestName: 'Rajesh & Meera Singhania',
      vipTier: 'Centurion Ambassador',
      room: 'Villa 103 — Royal Cliffside Pool Pavilion',
      checkInTime: 'Yesterday (In-Stay)',
      flightStatus: 'Arrived Yesterday',
      transitSync: 'Private Chauffeur on Standby at Estate',
      keycardStatus: 'ACTIVE',
      status: 'IN_STAY',
      specialRequests: 'Private beach BBQ arranged for 20:00 tonight',
      liveRadar: {
        stage: 'CHECKED_IN' as 'FLIGHT_AIRBORNE' | 'CHAUFFEUR_EN_ROUTE' | 'AT_PORTE_COCHERE' | 'CHECKED_IN',
        distanceKm: 0,
        etaMinutes: 0,
        vehicleModel: 'Mercedes-Maybach S-Class (GA-07-EA-9901)',
        chauffeurName: 'Devendra Singh',
        chauffeurPhone: '+91 98200 44321',
        roomReadiness: 'KEY_ASSIGNED' as 'CLEANING' | 'INSPECTED' | 'KEY_ASSIGNED',
        telemetryPing: 'Guest in-stay. Milestone 1 released; milestone 2 active.',
      },
    },
  ]);

  // State for Butler & In-Stay Requests
  const [serviceRequests, setServiceRequests] = useState([
    {
      id: 'srv-1',
      villa: 'Villa 101',
      guest: 'Radhika Malhotra',
      type: 'Butler Service',
      request: 'Warm Himalayan Salt Foot Soak & Cold Pressed Mango Juice',
      time: '10 mins ago',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      icon: Coffee,
    },
    {
      id: 'srv-2',
      villa: 'Villa 103',
      guest: 'Rajesh Singhania',
      type: 'Executive Chef',
      request: 'Coastal Prawn Curry with Fresh Poi Bread for In-Villa Dining',
      time: '25 mins ago',
      status: 'PREPARING',
      priority: 'MEDIUM',
      icon: Utensils,
    },
    {
      id: 'srv-3',
      villa: 'Suite 204',
      guest: 'Ananya Roy',
      type: 'Sommelier',
      request: 'Decant Sula Rasa Cabernet Sauvignon for sunset terrace',
      time: '40 mins ago',
      status: 'DELIVERED',
      priority: 'NORMAL',
      icon: Wine,
    },
  ]);

  // State for Room Inventory
  const [rooms] = useState([
    {
      id: 'rm-1',
      name: 'Grand Infinity Pool Villa',
      totalUnits: 4,
      availableUnits: 1,
      baseRate: 48000,
      currentRate: 52000,
      status: 'HIGH_DEMAND',
      features: ['Private 12m Infinity Pool', '24/7 Dedicated Butler', 'Panoramic Arabian Sea View'],
    },
    {
      id: 'rm-2',
      name: 'Azure Oceanfront Penthouse',
      totalUnits: 6,
      availableUnits: 2,
      baseRate: 36000,
      currentRate: 38500,
      status: 'OPTIMAL',
      features: ['Wraparound Teak Deck', 'Outdoor Jacuzzi', 'Direct Cliff Access'],
    },
    {
      id: 'rm-3',
      name: 'Heritage Sunset Suite',
      totalUnits: 8,
      availableUnits: 3,
      baseRate: 26000,
      currentRate: 26000,
      status: 'STABLE',
      features: ['Goan Portuguese Architecture', 'Rain Shower', 'Private Garden Veranda'],
    },
    {
      id: 'rm-4',
      name: 'Royal Cliffside Pavilion',
      totalUnits: 2,
      availableUnits: 0,
      baseRate: 75000,
      currentRate: 85000,
      status: 'SOLD_OUT',
      features: ['Private Helipad Access', '2-Bedroom Luxury Suite', 'Private Chef Kitchen'],
    },
  ]);

  const handleIssueKey = (id: string) => {
    setArrivals((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              keycardStatus: 'ISSUED',
              status: 'CHECKED_IN',
              liveRadar: {
                ...a.liveRadar,
                stage: 'CHECKED_IN',
                roomReadiness: 'KEY_ASSIGNED',
                telemetryPing: 'Digital AES-256 NFC Key issued to guest. 70% Base Escrow payout unlocked for HDFC settlement.',
              },
            }
          : a
      )
    );
    showToast('Digital AES-256 Keycard armed and delivered to guest smartphone.');
  };

  const handleUpdateReadiness = (id: string, readiness: 'CLEANING' | 'INSPECTED' | 'KEY_ASSIGNED') => {
    setArrivals((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, liveRadar: { ...a.liveRadar, roomReadiness: readiness } }
          : a
      )
    );
    showToast(`Room readiness updated to ${readiness.replace(/_/g, ' ')}`);
  };

  const handleAcknowledgeCurbArrival = (id: string) => {
    setArrivals((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              liveRadar: {
                ...a.liveRadar,
                stage: 'AT_PORTE_COCHERE',
                distanceKm: 0.0,
                etaMinutes: 0,
                telemetryPing: 'Chauffeur pulled into porte-cochère. Front desk bellhop dispatched with welcome drinks.',
              },
            }
          : a
      )
    );
    showToast('Porte-cochère arrival acknowledged! Front desk welcome team alerted.');
  };

  const handleUpdateServiceStatus = (id: string, newStatus: string) => {
    setServiceRequests((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    showToast('Guest service request updated.');
  };

  return (
    <div className="min-h-screen bg-[#001020] text-slate-100 flex flex-col font-sans selection:bg-[#00A9A5] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#002B4D] border border-[#3CCF91] text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-slide-in">
          <Sparkles className="w-4 h-4 text-[#3CCF91]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Partner Portal Dedicated Top Bar */}
      <div className="bg-[#001830] border-b border-white/10 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#0B3D91] to-[#00A9A5] text-white shadow-md">
            <Hotel className="w-5 h-5 text-[#FFC857]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white tracking-wide">StaySphere Property Partner Portal</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                PREMIER TIER • 98.4 SCORE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Property Partner & Frontdesk Workspace • Single Unified Estate Operations
            </p>
          </div>
        </div>

        {/* Property Selector & Quick Actions */}
        <div className="flex items-center gap-3">
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="bg-[#002544] border border-white/15 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-[#00A9A5]"
          >
            <option value="vana-azure">The Vana Azure Ocean Villa & Estate (Goa)</option>
            <option value="pichola">Maharaja Pichola Heritage Palace (Udaipur)</option>
            <option value="wildflower">Wildflower Himalayan Sky Chalet (Shimla)</option>
          </select>

          <button
            onClick={handleSyncPms}
            disabled={pmsSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002B4D] border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/20 text-xs font-bold transition shadow-sm cursor-pointer"
            title="Synchronize inventory & rates with HostSphere / PMS"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${pmsSyncing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>PMS Sync: {lastSyncTime}</span>
          </button>

          {onSwitchToControlTower && (
            <button
              onClick={onSwitchToControlTower}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-slate-200 transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#00D2C4]" />
              <span>Control Tower View ↗</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-[#001428] border-b border-white/10 px-4 sm:px-6 py-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'inventory', label: 'Rooms & Inventory', icon: Bed },
            { id: 'rates', label: 'Rates & Parity', icon: Percent },
            { id: 'arrivals', label: 'Arrivals & Keycards', icon: KeyRound, badge: '3 Today' },
            { id: 'services', label: 'Guest Services & Butler', icon: Coffee, badge: '2 Open' },
            { id: 'settlements', label: 'Escrow & Settlements', icon: CreditCard },
            { id: 'feedback', label: 'Guest Reviews (4.9★)', icon: Star },
            { id: 'support', label: 'Partner Support Desk', icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-lg border border-[#00D2C4]/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FFC857]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#FF8A3D] text-[#001428]">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* ========================================================================= */}
        {/* TAB 1: DASHBOARD                                                          */}
        {/* ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Estate Header Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#002244] via-[#002B4D] to-[#003866] border border-white/15 shadow-2xl flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#3CCF91]/20 text-[#3CCF91] border border-[#3CCF91]/30 uppercase">
                    Live Operational Status
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Villa ID: PROP-GOA-001</span>
                </div>
                <h1 className="text-2xl font-black text-white tracking-wide">
                  The Vana Azure Private Ocean Villa & Estate
                </h1>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Goa West Coastline • 20 Total Luxury Pavilions & Suites • Managed by Anil Deshmukh & Frontdesk Lead Ananya Deshmukh.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-black text-[#3CCF91] font-mono">₹18,45,000</div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">Month-to-Date Net Payout</div>
                </div>
                <button
                  onClick={() => setActiveTab('settlements')}
                  className="p-3 rounded-2xl bg-[#00A9A5]/20 border border-[#00A9A5]/40 text-[#00D2C4] hover:bg-[#00A9A5]/30 transition cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 4 Core Property KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                  <span>Occupancy Rate</span>
                  <span className="text-[#3CCF91]">+6% vs last week</span>
                </div>
                <div className="text-3xl font-black text-white font-mono">85.0%</div>
                <div className="text-[11px] text-slate-400">17 of 20 Suites Occupied tonight</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                  <span>Average Daily Rate (ADR)</span>
                  <span className="text-cyan-400">Dynamic Peak</span>
                </div>
                <div className="text-3xl font-black text-white font-mono">₹38,200</div>
                <div className="text-[11px] text-slate-400">RevPAR: ₹32,470 (Highest in Goa Lux)</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                  <span>Today's Arrivals</span>
                  <span className="text-[#FFC857]">Flight Synced</span>
                </div>
                <div className="text-3xl font-black text-[#FFC857] font-mono">4 Guests</div>
                <div className="text-[11px] text-slate-400">1 Checked-in • 3 En Route with Chauffeur</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                  <span>Partner Trust Score</span>
                  <span className="text-[#3CCF91]">98.4 / 100</span>
                </div>
                <div className="text-3xl font-black text-white font-mono">PREMIER</div>
                <div className="text-[11px] text-slate-400">0 SLA Breaches • 100% Rate Parity Sync</div>
              </div>
            </div>

            {/* Live Queue Preview (Arrivals & Butler Services) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Arrivals Snippet */}
              <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-[#FFC857]" />
                    <span>Today's VIP Arrivals & Keycard Queue</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('arrivals')}
                    className="text-xs text-cyan-400 font-bold hover:underline cursor-pointer"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-3">
                  {arrivals.slice(0, 2).map((a) => (
                    <div key={a.id} className="p-4 rounded-xl bg-[#001428] border border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-white text-xs">{a.guestName}</div>
                        <div className="text-[11px] text-slate-400">{a.room}</div>
                        <div className="text-[10px] text-cyan-300 font-mono mt-1">{a.flightStatus}</div>
                      </div>
                      {a.keycardStatus === 'ISSUED' ? (
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                          Key Active
                        </span>
                      ) : (
                        <button
                          onClick={() => handleIssueKey(a.id)}
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow hover:brightness-110 cursor-pointer"
                        >
                          Issue Key
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Butler Requests Snippet */}
              <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-[#3CCF91]" />
                    <span>In-Stay Butler & Concierge Requests</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="text-xs text-cyan-400 font-bold hover:underline cursor-pointer"
                  >
                    Manage →
                  </button>
                </div>
                <div className="space-y-3">
                  {serviceRequests.map((s) => (
                    <div key={s.id} className="p-4 rounded-xl bg-[#001428] border border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{s.villa}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">{s.type}</span>
                        </div>
                        <div className="text-[11px] text-slate-300 mt-1">{s.request}</div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        s.status === 'DELIVERED'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {s.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ROOMS & INVENTORY                                                  */}
        {/* ========================================================================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Rooms, Suites & Inventory Allocation</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Configure live room inventory, lock rooms for maintenance, or adjust rates dynamically.
                </p>
              </div>
              <button
                onClick={handleSyncPms}
                className="px-4 py-2 rounded-xl bg-[#002B4D] border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>HostSphere 2-Way Sync</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">{room.name}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          room.status === 'SOLD_OUT'
                            ? 'bg-rose-500/20 text-rose-400'
                            : room.status === 'HIGH_DEMAND'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {room.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Total Capacity: {room.totalUnits} Units • <strong className="text-cyan-300">{room.availableUnits} Available</strong> tonight
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-white font-mono">₹{room.currentRate.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-slate-400">per night + 18% GST</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <div className="text-[11px] font-bold text-slate-400">Premium Amenities & Inclusions:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {room.features.map((feat, idx) => (
                        <span key={idx} className="text-[10px] px-2.5 py-1 rounded-lg bg-[#001428] border border-white/10 text-slate-300">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] text-slate-300 font-mono">Channel Manager Synced</span>
                    </div>
                    <button
                      onClick={() => showToast(`Rate adjustment applied to ${room.name}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-white transition cursor-pointer"
                    >
                      Edit Rate Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: RATES & PARITY                                                     */}
        {/* ========================================================================= */}
        {activeTab === 'rates' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Rate Parity & OTA Pricing Governance</h2>
              <p className="text-xs text-slate-400 mt-1">
                StaySphere guarantees partner rate parity. Automated parity sentinels monitor external OTAs every 15 minutes.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#3CCF91]" />
                  <span>Real-Time OTA Parity Matrix (The Vana Azure Ocean Estate)</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                  100% In Parity
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#001428] text-slate-400 font-bold border-b border-white/10">
                    <tr>
                      <th className="p-3">Room Category</th>
                      <th className="p-3">StaySphere Direct</th>
                      <th className="p-3">Booking.com</th>
                      <th className="p-3">Agoda</th>
                      <th className="p-3">MakeMyTrip</th>
                      <th className="p-3">Parity Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="p-3 font-bold text-white">Grand Infinity Pool Villa</td>
                      <td className="p-3 text-[#3CCF91] font-mono font-bold">₹52,000</td>
                      <td className="p-3 text-slate-300 font-mono">₹54,500 (+5%)</td>
                      <td className="p-3 text-slate-300 font-mono">₹54,000</td>
                      <td className="p-3 text-slate-300 font-mono">₹55,000</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                          Direct Best Rate
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Azure Oceanfront Penthouse</td>
                      <td className="p-3 text-[#3CCF91] font-mono font-bold">₹38,500</td>
                      <td className="p-3 text-slate-300 font-mono">₹39,900</td>
                      <td className="p-3 text-slate-300 font-mono">₹39,500</td>
                      <td className="p-3 text-slate-300 font-mono">₹41,000</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                          Direct Best Rate
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Heritage Sunset Suite</td>
                      <td className="p-3 text-[#3CCF91] font-mono font-bold">₹26,000</td>
                      <td className="p-3 text-slate-300 font-mono">₹26,000</td>
                      <td className="p-3 text-slate-300 font-mono">₹26,200</td>
                      <td className="p-3 text-slate-300 font-mono">₹26,500</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                          Exact Parity
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: ARRIVALS & KEYCARDS (ARRIVAL RADAR COCKPIT)                        */}
        {/* ========================================================================= */}
        {activeTab === 'arrivals' && (
          <div className="space-y-6">
            {/* Arrival Radar Live Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#001830] via-[#002B4D] to-[#0A4D68] border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A9A5]/20 border border-[#00A9A5]/40 text-[#00A9A5] text-xs font-bold uppercase tracking-wider">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-[#3CCF91]" />
                  <span>Real-Time Property Arrival Radar (SSE Stream Active)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Guest Arrival Radar & Chauffeur Handshake Cockpit
                </h2>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Eliminates blind lobby check-ins. Tracks approaching chauffeur telemetry, syncs flight landings, and enables proactive room readiness before the guest steps out of the vehicle.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 relative z-10">
                <button
                  onClick={() => showToast('Aviation ADS-B & Chauffeur Telematics SSE stream synchronized with front desk.')}
                  className="px-4 py-2 rounded-xl bg-[#002B4D] border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <RefreshCw className="w-4 h-4 text-cyan-400" />
                  <span>Refresh Radar Feed</span>
                </button>
              </div>
            </div>

            {/* Arrival Radar Feed Grid */}
            <div className="space-y-4">
              {arrivals.map((arr) => {
                const isAtCurb = arr.liveRadar.stage === 'AT_PORTE_COCHERE';
                const isCheckedIn = arr.status === 'CHECKED_IN' || arr.liveRadar.stage === 'CHECKED_IN';
                return (
                  <div
                    key={arr.id}
                    className={`p-6 rounded-3xl border transition-all shadow-xl space-y-4 ${
                      isAtCurb
                        ? 'bg-[#00223A] border-[#3CCF91] shadow-[#3CCF91]/20'
                        : isCheckedIn
                        ? 'bg-[#00172C] border-white/10 opacity-90'
                        : 'bg-[#001A33] border-white/15'
                    }`}
                  >
                    {/* Top Row: Guest & Live Stage Badge */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-3 border-b border-white/10">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-lg font-bold text-white">{arr.guestName}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF8A3D]/20 text-[#FF8A3D] border border-[#FF8A3D]/30">
                            {arr.vipTier}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 ${
                            isAtCurb
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse'
                              : isCheckedIn
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          }`}>
                            <Navigation className="w-3 h-3" />
                            {arr.liveRadar.stage.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 font-medium">{arr.room}</div>
                      </div>

                      {/* Radar Live Distance & ETA Counter */}
                      <div className="flex items-center gap-4 bg-black/40 px-4 py-2 rounded-2xl border border-white/10">
                        <div className="text-center">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Remaining Dist</span>
                          <strong className="text-sm font-mono font-black text-cyan-300">{arr.liveRadar.distanceKm} km</strong>
                        </div>
                        <div className="h-6 w-px bg-white/10" />
                        <div className="text-center">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Arrival ETA</span>
                          <strong className="text-sm font-mono font-black text-[#FFC857]">
                            {arr.liveRadar.etaMinutes > 0 ? `${arr.liveRadar.etaMinutes} mins` : 'At Curb'}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Middle Grid: Telemetry, Chauffeur & Room Readiness */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      {/* Chauffeur Telemetry */}
                      <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1.5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 text-cyan-400">
                          <Car className="w-3 h-3" /> Chauffeur & Vehicle
                        </div>
                        <div className="font-bold text-white">{arr.liveRadar.vehicleModel}</div>
                        <div className="text-slate-400 text-[11px]">
                          Driver: <strong className="text-slate-200">{arr.liveRadar.chauffeurName}</strong> ({arr.liveRadar.chauffeurPhone})
                        </div>
                        <div className="text-[10px] text-emerald-400 font-mono">
                          ● Telemetry: {arr.liveRadar.telemetryPing}
                        </div>
                      </div>

                      {/* Flight Status */}
                      <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1.5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 text-[#FF8A3D]">
                          <Clock className="w-3 h-3" /> Inbound Flight Radar
                        </div>
                        <div className="text-slate-200 font-mono">{arr.flightStatus}</div>
                        <div className="text-[11px] text-slate-400">Scheduled Check-in: <span className="text-white font-mono">{arr.checkInTime}</span></div>
                        {arr.specialRequests && (
                          <div className="text-[10px] text-amber-300 line-clamp-1">
                            ★ {arr.specialRequests}
                          </div>
                        )}
                      </div>

                      {/* Room Readiness Toggle */}
                      <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-2">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                          <span className="text-[#3CCF91]">Suite Readiness Handshake</span>
                          <span className="font-mono text-white text-[11px] uppercase">{arr.liveRadar.roomReadiness.replace(/_/g, ' ')}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          {(['CLEANING', 'INSPECTED', 'KEY_ASSIGNED'] as const).map((rd) => (
                            <button
                              key={rd}
                              onClick={() => handleUpdateReadiness(arr.id, rd)}
                              className={`py-1 px-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                                arr.liveRadar.roomReadiness === rd
                                  ? 'bg-[#3CCF91] text-black shadow'
                                  : 'bg-white/5 text-slate-400 hover:text-white'
                              }`}
                            >
                              {rd === 'KEY_ASSIGNED' ? 'Ready/Key' : rd}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar: Curb Handshake & Digital Key */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#FFC857]" />
                        <span>Handshake Protocol: Live ETA triggers room lighting, welcome beverages, and front desk greeting.</span>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        {!isCheckedIn && !isAtCurb && (
                          <button
                            onClick={() => handleAcknowledgeCurbArrival(arr.id)}
                            className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Car className="w-3.5 h-3.5" />
                            <span>Simulate Curb Arrival</span>
                          </button>
                        )}

                        {arr.keycardStatus === 'ISSUED' ? (
                          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>AES-256 Keycard Issued (Milestone 1 Cleared)</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleIssueKey(arr.id)}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-black font-black text-xs shadow hover:brightness-110 flex items-center gap-2 cursor-pointer transition"
                          >
                            <KeyRound className="w-4 h-4" />
                            <span>Acknowledge Handshake & Release Key</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: GUEST SERVICES & BUTLER                                            */}
        {/* ========================================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">In-Suite Butler & Experience Requests</h2>
              <p className="text-xs text-slate-400 mt-1">
                Manage live guest requests submitted via the StaySphere guest web app.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {serviceRequests.map((req) => {
                const Icon = req.icon;
                return (
                  <div
                    key={req.id}
                    className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-xl bg-[#002544] text-[#FFC857] text-xs font-bold">
                          {req.villa}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{req.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-[#00A9A5]/20 text-[#00D2C4]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{req.type}</div>
                          <div className="text-[11px] text-slate-400">Guest: {req.guest}</div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 bg-[#001428] p-3 rounded-xl border border-white/5">
                        {req.request}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-cyan-300">Status: {req.status}</span>
                      {req.status !== 'DELIVERED' ? (
                        <button
                          onClick={() => handleUpdateServiceStatus(req.id, 'DELIVERED')}
                          className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition cursor-pointer"
                        >
                          Mark Delivered
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Completed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: SETTLEMENTS & ESCROW                                               */}
        {/* ========================================================================= */}
        {activeTab === 'settlements' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl flex flex-wrap items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold text-white">Escrow Releases & Settlement Ledger</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Automated release 2 hours post guest check-in. Zero dispute deduction hold.
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-[#3CCF91] font-mono">₹4,85,000</div>
                <div className="text-[11px] text-slate-400">Available for Instant IMPS/RTGS Payout</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white">Recent Completed Bookings & Payouts</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#001428] text-slate-400 font-bold border-b border-white/10">
                    <tr>
                      <th className="p-3">Booking Ref</th>
                      <th className="p-3">Guest & Room</th>
                      <th className="p-3">Gross Value</th>
                      <th className="p-3">Platform Fee (15%)</th>
                      <th className="p-3">Net Partner Payout</th>
                      <th className="p-3">Escrow Status</th>
                      <th className="p-3">GST Tax Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 font-mono">
                    <tr>
                      <td className="p-3 text-cyan-300 font-bold">BK-VANA-901</td>
                      <td className="p-3 font-sans text-white">Malhotra Family (Villa 101)</td>
                      <td className="p-3">₹1,56,000</td>
                      <td className="p-3 text-rose-300">-₹23,400</td>
                      <td className="p-3 text-[#3CCF91] font-bold">₹1,32,600</td>
                      <td className="p-3 font-sans">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                          RELEASED
                        </span>
                      </td>
                      <td className="p-3 font-sans">
                        <button
                          onClick={() => showToast('Downloading Tax Invoice #INV-2026-901.pdf')}
                          className="flex items-center gap-1 text-cyan-400 hover:underline text-[11px] cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-cyan-300 font-bold">BK-VANA-902</td>
                      <td className="p-3 font-sans text-white">Singhania Retinue (Villa 103)</td>
                      <td className="p-3">₹2,25,000</td>
                      <td className="p-3 text-rose-300">-₹33,750</td>
                      <td className="p-3 text-[#3CCF91] font-bold">₹1,91,250</td>
                      <td className="p-3 font-sans">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[10px]">
                          ESCROW ARMED (T+2H)
                        </span>
                      </td>
                      <td className="p-3 font-sans">
                        <button
                          onClick={() => showToast('Invoice will be generated post escrow release')}
                          className="flex items-center gap-1 text-slate-500 text-[11px] cursor-pointer"
                        >
                          <Clock className="w-3.5 h-3.5" /> Pending
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: FEEDBACK (4.9★)                                                    */}
        {/* ========================================================================= */}
        {activeTab === 'feedback' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl flex flex-wrap items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold text-white">360° Guest Satisfaction & Quality Audits</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Consolidated ratings from checked-out guests and unannounced StaySphere quality audits.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-black text-[#FFC857]">4.92 ★</div>
                <div className="text-[11px] text-slate-400 font-bold">Based on 148 Verified Stays</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#001428] border border-white/10">
                <div className="text-xs text-slate-400 font-bold">Estate Cleanliness & Hygiene</div>
                <div className="text-xl font-black text-[#3CCF91] mt-1 font-mono">4.96 / 5.0</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#001428] border border-white/10">
                <div className="text-xs text-slate-400 font-bold">Butler & Concierge Responsiveness</div>
                <div className="text-xl font-black text-[#3CCF91] mt-1 font-mono">4.98 / 5.0</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#001428] border border-white/10">
                <div className="text-xs text-slate-400 font-bold">In-Suite Dining & Culinary Art</div>
                <div className="text-xl font-black text-[#3CCF91] mt-1 font-mono">4.89 / 5.0</div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: PARTNER SUPPORT DESK                                               */}
        {/* ========================================================================= */}
        {activeTab === 'support' && (
          <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Dedicated StaySphere Relationship Desk</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Direct hotline with your assigned Senior Relationship Manager Vikramaditya Singh.
                </p>
              </div>
              {onOpenTickets && (
                <button
                  onClick={onOpenTickets}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow hover:brightness-110 flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open Triage Ticket</span>
                </button>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-[#001428] border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-white text-sm">
                  VS
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Vikramaditya Singh</div>
                  <div className="text-xs text-cyan-300">Senior Relationship Manager (West Coast Estates)</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Hello Anil-ji, I am actively monitoring your guest arrivals today. The Maybach S680 has received the Malhotra VIP family at GOX Terminal 1. If you require rate parity adjustments or special escrow authorizations, ping me directly."
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
