import React, { useState } from 'react';
import {
  Bed,
  CheckCircle2,
  Sparkles,
  KeyRound,
  Filter,
  Check,
} from 'lucide-react';

export type HousekeepingStatus = 'CLEAN' | 'INSPECTED' | 'DIRTY' | 'OUT_OF_ORDER';

export interface RoomTapeItem {
  id: string;
  roomNumber: string;
  name: string;
  category: 'Villa' | 'Penthouse' | 'Suite';
  housekeeping: HousekeepingStatus;
  reservations: {
    id: string;
    guestName: string;
    vipTier: string;
    startDayIndex: number; // 0 to 6
    durationDays: number;
    checkInTime: string;
    status: 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'EXPECTED';
    flightSync?: string;
  }[];
}

const INITIAL_ROOMS: RoomTapeItem[] = [
  {
    id: 'r-101',
    roomNumber: 'Villa 101',
    name: 'Grand Infinity Pool Villa',
    category: 'Villa',
    housekeeping: 'INSPECTED',
    reservations: [
      {
        id: 'res-1',
        guestName: 'Vikram Malhotra',
        vipTier: 'Centurion Black',
        startDayIndex: 2, // 12 Sep
        durationDays: 3,
        checkInTime: '14:00',
        status: 'CHECKED_IN',
        flightSync: '6E-204 Landed',
      },
    ],
  },
  {
    id: 'r-102',
    roomNumber: 'Villa 102',
    name: 'Oceanfront Cliff Villa',
    category: 'Villa',
    housekeeping: 'CLEAN',
    reservations: [
      {
        id: 'res-2',
        guestName: 'Arjun Singhania',
        vipTier: 'Sovereign Gold',
        startDayIndex: 0,
        durationDays: 2,
        checkInTime: '15:00',
        status: 'CHECKED_OUT',
      },
      {
        id: 'res-3',
        guestName: 'Naveen Jindal Retinue',
        vipTier: 'Centurion Black',
        startDayIndex: 3,
        durationDays: 4,
        checkInTime: '14:30',
        status: 'EXPECTED',
        flightSync: 'AI-802 On Schedule',
      },
    ],
  },
  {
    id: 'r-103',
    roomNumber: 'Villa 103',
    name: 'Royal Pool Pavilion',
    category: 'Villa',
    housekeeping: 'INSPECTED',
    reservations: [
      {
        id: 'res-4',
        guestName: 'Rajesh & Meera Singhania',
        vipTier: 'Centurion Ambassador',
        startDayIndex: 1,
        durationDays: 4,
        checkInTime: '14:00',
        status: 'CHECKED_IN',
      },
    ],
  },
  {
    id: 'r-104',
    roomNumber: 'Villa 104',
    name: 'Clifftop Sunset Villa',
    category: 'Villa',
    housekeeping: 'DIRTY',
    reservations: [],
  },
  {
    id: 'r-201',
    roomNumber: 'Suite 201',
    name: 'Azure Oceanfront Penthouse',
    category: 'Penthouse',
    housekeeping: 'CLEAN',
    reservations: [
      {
        id: 'res-5',
        guestName: 'Dr. Selva Murugan',
        vipTier: 'Sovereign Platinum',
        startDayIndex: 2,
        durationDays: 3,
        checkInTime: '14:00',
        status: 'CHECKED_IN',
        flightSync: 'AI-678 In Transit',
      },
    ],
  },
  {
    id: 'r-202',
    roomNumber: 'Suite 202',
    name: 'Coastal Presidential Duplex',
    category: 'Penthouse',
    housekeeping: 'OUT_OF_ORDER',
    reservations: [],
  },
  {
    id: 'r-204',
    roomNumber: 'Suite 204',
    name: 'Azure Oceanfront Penthouse',
    category: 'Penthouse',
    housekeeping: 'INSPECTED',
    reservations: [
      {
        id: 'res-6',
        guestName: 'Ananya & Kabir Roy',
        vipTier: 'StaySphere Platinum',
        startDayIndex: 2,
        durationDays: 2,
        checkInTime: '15:30',
        status: 'EXPECTED',
        flightSync: 'AI-802 ETA 28m',
      },
    ],
  },
  {
    id: 'r-301',
    roomNumber: 'Room 301',
    name: 'Heritage Sunset Suite',
    category: 'Suite',
    housekeeping: 'CLEAN',
    reservations: [
      {
        id: 'res-7',
        guestName: 'Lord Alistair Sterling',
        vipTier: 'Sovereign Foreign VIP',
        startDayIndex: 1,
        durationDays: 5,
        checkInTime: '16:00',
        status: 'CHECKED_IN',
      },
    ],
  },
  {
    id: 'r-302',
    roomNumber: 'Room 302',
    name: 'Portuguese Heritage Suite',
    category: 'Suite',
    housekeeping: 'CLEAN',
    reservations: [],
  },
  {
    id: 'r-303',
    roomNumber: 'Room 303',
    name: 'Courtyard Garden Suite',
    category: 'Suite',
    housekeeping: 'INSPECTED',
    reservations: [
      {
        id: 'res-8',
        guestName: 'Kavita Krishnamoorthy',
        vipTier: 'Gold Member',
        startDayIndex: 3,
        durationDays: 3,
        checkInTime: '14:00',
        status: 'EXPECTED',
      },
    ],
  },
];

const DATES_7_DAYS = [
  { day: 'Wed', date: '10 Sep' },
  { day: 'Thu', date: '11 Sep' },
  { day: 'Fri', date: '12 Sep', isToday: true },
  { day: 'Sat', date: '13 Sep' },
  { day: 'Sun', date: '14 Sep' },
  { day: 'Mon', date: '15 Sep' },
  { day: 'Tue', date: '16 Sep' },
];

export const RoomTapeChartWorkspace: React.FC = () => {
  const [rooms, setRooms] = useState<RoomTapeItem[]>(INITIAL_ROOMS);
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'Villa' | 'Penthouse' | 'Suite'>('ALL');
  const [hkFilter, setHkFilter] = useState<'ALL' | HousekeepingStatus>('ALL');
  const [selectedRoom, setSelectedRoom] = useState<RoomTapeItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateHkStatus = (roomId: string, newHk: HousekeepingStatus) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, housekeeping: newHk } : r))
    );
    if (selectedRoom && selectedRoom.id === roomId) {
      setSelectedRoom((prev) => (prev ? { ...prev, housekeeping: newHk } : null));
    }
    showToast(`Room housekeeping updated to ${newHk}`);
  };

  const handleArmKeycard = (roomNumber: string) => {
    showToast(`NFC Keycard for ${roomNumber} re-armed via HostSphere / Salto BLE mesh.`);
  };

  const filteredRooms = rooms.filter((r) => {
    if (categoryFilter !== 'ALL' && r.category !== categoryFilter) return false;
    if (hkFilter !== 'ALL' && r.housekeeping !== hkFilter) return false;
    return true;
  });

  // Calculate live stats
  const totalUnits = rooms.length;
  const occupiedUnits = rooms.filter((r) => r.reservations.some((res) => res.startDayIndex <= 2 && res.startDayIndex + res.durationDays > 2)).length;
  const cleanUnits = rooms.filter((r) => r.housekeeping === 'CLEAN' || r.housekeeping === 'INSPECTED').length;
  const dirtyUnits = rooms.filter((r) => r.housekeeping === 'DIRTY').length;
  const outOfOrderUnits = rooms.filter((r) => r.housekeeping === 'OUT_OF_ORDER').length;
  const occupancyRate = Math.round((occupiedUnits / totalUnits) * 100);

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div data-keep-dark className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#002B4D] border border-[#00D2C4] text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-slide-in">
          <Sparkles className="w-4 h-4 text-[#00D2C4]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner & Quick Controls */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#001D3A] via-[#002B4D] to-[#003B6A] border border-white/15 shadow-2xl flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#00D2C4]/20 text-[#00D2C4] border border-[#00D2C4]/30 uppercase tracking-wider">
              OPERA Cloud & Mews Standard
            </span>
            <span className="text-xs text-slate-400 font-mono">Tape Chart v4.2 • 7-Day Live Rack</span>
          </div>
          <h2 className="text-xl font-serif-luxury font-bold text-white tracking-wide">
            Interactive PMS Room Tape Chart & Rack Operations
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Visual room allocation matrix across dates. Click any suite or reservation block to reassign rooms, arm NFC keycards, or change housekeeping state.
          </p>
        </div>

        {/* Quick KPI Cards */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#001830] border border-white/10 text-center min-w-[90px]">
            <div className="text-[10px] uppercase font-bold text-slate-400">Occupancy</div>
            <div className="text-lg font-black text-[#3CCF91] font-mono">{occupancyRate}%</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#001830] border border-white/10 text-center min-w-[90px]">
            <div className="text-[10px] uppercase font-bold text-slate-400">Occupied</div>
            <div className="text-lg font-black text-white font-mono">{occupiedUnits} / {totalUnits}</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#001830] border border-white/10 text-center min-w-[90px]">
            <div className="text-[10px] uppercase font-bold text-slate-400">Inspected</div>
            <div className="text-lg font-black text-[#00D2C4] font-mono">{cleanUnits}</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#001830] border border-white/10 text-center min-w-[90px]">
            <div className="text-[10px] uppercase font-bold text-slate-400">Dirty / OOO</div>
            <div className="text-lg font-black text-[#FF8A3D] font-mono">{dirtyUnits + outOfOrderUnits}</div>
          </div>
        </div>
      </div>

      {/* Filter & Legend Bar */}
      <div className="p-4 rounded-2xl bg-[#001830] border border-white/10 flex flex-wrap items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-2">
            <Filter className="w-3.5 h-3.5 text-[#00D2C4]" />
            <span>Filter Category:</span>
          </div>
          {(['ALL', 'Villa', 'Penthouse', 'Suite'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#00A9A5] text-white shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? 'All Room Types' : cat}
            </button>
          ))}

          <div className="h-4 w-px bg-white/10 mx-2" />

          {(['ALL', 'INSPECTED', 'CLEAN', 'DIRTY', 'OUT_OF_ORDER'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setHkFilter(status)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                hkFilter === status
                  ? 'bg-[#0B3D91] text-white border border-[#00D2C4]/40 shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {status.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            Inspected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            Clean
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            Dirty
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            Out of Order
          </span>
        </div>
      </div>

      {/* Main Tape Chart Grid Container */}
      <div className="rounded-3xl bg-[#001428] border border-white/10 overflow-hidden shadow-2xl">
        {/* Date Headers */}
        <div className="grid grid-cols-12 bg-[#001C38] border-b border-white/10 text-xs font-bold text-slate-300">
          <div className="col-span-3 p-3.5 border-r border-white/10 flex items-center justify-between">
            <span>Room & Category</span>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Housekeeping</span>
          </div>

          <div className="col-span-9 grid grid-cols-7 divide-x divide-white/10">
            {DATES_7_DAYS.map((d, idx) => (
              <div
                key={idx}
                className={`p-3 text-center transition ${
                  d.isToday ? 'bg-[#00A9A5]/20 text-[#00D2C4]' : 'text-slate-300'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider text-slate-400">{d.day}</div>
                <div className="text-xs font-black">{d.date}</div>
                {d.isToday && (
                  <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-[#00D2C4] text-[#001428]">
                    TODAY
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Room Rows */}
        <div className="divide-y divide-white/5">
          {filteredRooms.map((room) => {
            const hkBadgeClass =
              room.housekeeping === 'INSPECTED'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : room.housekeeping === 'CLEAN'
                ? 'bg-teal-500/20 text-teal-400 border-teal-500/40'
                : room.housekeeping === 'DIRTY'
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-rose-500/20 text-rose-400 border-rose-500/40';

            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className="grid grid-cols-12 items-center hover:bg-white/5 transition group cursor-pointer"
              >
                {/* Room Info Cell */}
                <div className="col-span-3 p-3.5 border-r border-white/10 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-[#FFC857]" />
                      <span className="font-black text-xs text-white">{room.roomNumber}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[140px]">{room.name}</div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${hkBadgeClass}`}
                  >
                    {room.housekeeping.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* 7-Day Matrix Columns */}
                <div className="col-span-9 grid grid-cols-7 divide-x divide-white/5 relative h-16 items-center">
                  {/* Empty Day Grid Slots */}
                  {Array.from({ length: 7 }).map((_, dayIdx) => (
                    <div
                      key={dayIdx}
                      className={`h-full ${dayIdx === 2 ? 'bg-[#00A9A5]/5' : ''}`}
                    />
                  ))}

                  {/* Overlaid Reservation Bars */}
                  {room.reservations.map((res) => {
                    const leftPct = (res.startDayIndex / 7) * 100;
                    const widthPct = (res.durationDays / 7) * 100;

                    const barColor =
                      res.status === 'CHECKED_IN'
                        ? 'from-[#0B3D91] to-[#00A9A5] border-[#00D2C4]/60'
                        : res.status === 'EXPECTED'
                        ? 'from-amber-700/80 to-amber-600/80 border-amber-400/50'
                        : 'from-slate-700 to-slate-800 border-slate-600';

                    return (
                      <div
                        key={res.id}
                        style={{
                          left: `${leftPct}%`,
                          width: `${widthPct}%`,
                        }}
                        className={`absolute inset-y-2 z-10 px-3 py-1.5 rounded-xl bg-gradient-to-r ${barColor} border text-white shadow-lg flex flex-col justify-center overflow-hidden transition-transform group-hover:scale-[1.01]`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-black truncate">
                          <span className="truncate">{res.guestName}</span>
                          <span className="text-[9px] font-bold text-[#FFC857] ml-1">{res.vipTier}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[9px] text-slate-200">
                          <span className="font-mono">In: {res.checkInTime}</span>
                          {res.flightSync && (
                            <span className="text-emerald-300 font-bold truncate">• {res.flightSync}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Room Action Drawer (When Room is Selected) */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#00162B] border border-white/20 p-6 text-white shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-[#FFC857]" />
                  <h3 className="text-lg font-black text-white">{selectedRoom.roomNumber}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#00D2C4]/20 text-[#00D2C4] border border-[#00D2C4]/30 uppercase">
                    {selectedRoom.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">{selectedRoom.name}</p>
              </div>
              <button
                onClick={() => setSelectedRoom(null)}
                className="p-1.5 rounded-xl border border-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Housekeeping Status Quick Changer */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Change Housekeeping Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['INSPECTED', 'CLEAN', 'DIRTY', 'OUT_OF_ORDER'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleUpdateHkStatus(selectedRoom.id, status)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                      selectedRoom.housekeeping === status
                        ? 'bg-[#00A9A5] text-white border-[#00D2C4]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{status.replace(/_/g, ' ')}</span>
                    {selectedRoom.housekeeping === status && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Reservation Details */}
            {selectedRoom.reservations.length > 0 ? (
              <div className="p-4 rounded-2xl bg-[#002244] border border-white/10 space-y-3 text-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#FFC857]">
                  Active Guest Reservation
                </div>
                {selectedRoom.reservations.map((res) => (
                  <div key={res.id} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">{res.guestName}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#FF8A3D]/20 text-[#FF8A3D] border border-[#FF8A3D]/30">
                        {res.vipTier}
                      </span>
                    </div>
                    <div className="text-slate-300">
                      Stay: {DATES_7_DAYS[res.startDayIndex].date} – {DATES_7_DAYS[Math.min(6, res.startDayIndex + res.durationDays)].date} ({res.durationDays} Nights)
                    </div>
                    {res.flightSync && (
                      <div className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Flight Telemetry: {res.flightSync}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-slate-400">
                No active reservation currently assigned to this room for today.
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleArmKeycard(selectedRoom.roomNumber)}
                className="py-2.5 px-3 rounded-xl bg-[#002B4D] hover:bg-[#003B6A] border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#FFC857]" />
                <span>Re-Arm NFC Key</span>
              </button>
              <button
                onClick={() => {
                  showToast(`${selectedRoom.roomNumber} room status refreshed and synchronized with HostSphere PMS.`);
                  setSelectedRoom(null);
                }}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#0B3D91] hover:from-[#00c2be] hover:to-[#0d4ab0] text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save & Sync PMS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
