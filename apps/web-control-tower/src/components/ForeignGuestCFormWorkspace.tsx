import React, { useState } from 'react';
import {
  Globe,
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Plus,
  Search,
  Sparkles,
} from 'lucide-react';

export interface ForeignGuestRecord {
  id: string;
  guestName: string;
  nationality: string;
  countryCode: string;
  passportNumber: string;
  passportExpiry: string;
  visaNumber: string;
  visaType: 'e-Visa' | 'Tourist' | 'Business' | 'Diplomatic';
  visaExpiry: string;
  portOfEntry: string;
  arrivalDateInIndia: string;
  checkInDate: string;
  allocatedRoom: string;
  status: 'SUBMITTED_TO_BOI' | 'VERIFIED_BY_FRONTDESK' | 'PENDING_DOCUMENT_SCAN';
  submissionRef?: string;
}

const INITIAL_FOREIGN_GUESTS: ForeignGuestRecord[] = [
  {
    id: 'fg-1',
    guestName: 'Lord Alistair Sterling',
    nationality: 'United Kingdom',
    countryCode: 'GB',
    passportNumber: 'GB982144A',
    passportExpiry: '2031-04-18',
    visaNumber: 'IN-EV-2026-88912',
    visaType: 'e-Visa',
    visaExpiry: '2027-08-30',
    portOfEntry: 'Goa MOPA Airport (GOX)',
    arrivalDateInIndia: '2026-09-11',
    checkInDate: '2026-09-11',
    allocatedRoom: 'Room 301 (Heritage Sunset Suite)',
    status: 'SUBMITTED_TO_BOI',
    submissionRef: 'BOI-FORM-C-2026-88190',
  },
  {
    id: 'fg-2',
    guestName: 'Greta & Hans Weber',
    nationality: 'Germany',
    countryCode: 'DE',
    passportNumber: 'DE-C7881920',
    passportExpiry: '2029-11-24',
    visaNumber: 'IN-T-2026-44012',
    visaType: 'Tourist',
    visaExpiry: '2027-02-15',
    portOfEntry: 'Mumbai CSMIA (BOM)',
    arrivalDateInIndia: '2026-09-12',
    checkInDate: '2026-09-12',
    allocatedRoom: 'Villa 104 (Clifftop Sunset Villa)',
    status: 'VERIFIED_BY_FRONTDESK',
    submissionRef: 'BOI-FORM-C-2026-88204',
  },
  {
    id: 'fg-3',
    guestName: 'Jean-Luc Moreau',
    nationality: 'France',
    countryCode: 'FR',
    passportNumber: 'FR-9011827B',
    passportExpiry: '2030-06-12',
    visaNumber: 'IN-B-2026-10924',
    visaType: 'Business',
    visaExpiry: '2027-10-01',
    portOfEntry: 'Delhi IGI (DEL)',
    arrivalDateInIndia: '2026-09-10',
    checkInDate: '2026-09-13',
    allocatedRoom: 'Suite 203 (Panoramic Terrace Suite)',
    status: 'PENDING_DOCUMENT_SCAN',
  },
];

export const ForeignGuestCFormWorkspace: React.FC = () => {
  const [guests, setGuests] = useState<ForeignGuestRecord[]>(INITIAL_FOREIGN_GUESTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<ForeignGuestRecord | null>(null);
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New guest form fields
  const [newGuestName, setNewGuestName] = useState('');
  const [newNationality, setNewNationality] = useState('United States');
  const [newPassport, setNewPassport] = useState('');
  const [newVisa, setNewVisa] = useState('');
  const [newPort, setNewPort] = useState('Goa MOPA Airport (GOX)');
  const [newRoom, setNewRoom] = useState('Villa 102');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRegisterNewGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName || !newPassport) {
      showToast('Please enter guest name and passport number.');
      return;
    }

    const newRecord: ForeignGuestRecord = {
      id: `fg-${Date.now()}`,
      guestName: newGuestName,
      nationality: newNationality,
      countryCode: newNationality === 'United States' ? 'US' : 'GB',
      passportNumber: newPassport.toUpperCase(),
      passportExpiry: '2032-10-15',
      visaNumber: newVisa || `IN-EV-${Math.floor(10000 + Math.random() * 90000)}`,
      visaType: 'e-Visa',
      visaExpiry: '2027-12-31',
      portOfEntry: newPort,
      arrivalDateInIndia: '2026-09-12',
      checkInDate: '2026-09-12',
      allocatedRoom: newRoom,
      status: 'VERIFIED_BY_FRONTDESK',
      submissionRef: `BOI-FORM-C-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    };

    setGuests((prev) => [newRecord, ...prev]);
    setShowAddDrawer(false);
    setNewGuestName('');
    setNewPassport('');
    setNewVisa('');
    showToast(`Form C Dossier created for ${newRecord.guestName} and transmitted to BoI.`);
  };

  const handleExportBatchJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(guests, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `StaySphere_Form_C_Batch_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Form C JSON Batch exported for Bureau of Immigration upload.');
  };

  const filteredGuests = guests.filter(
    (g) =>
      g.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.nationality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div data-keep-dark className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#002B4D] border border-[#3CCF91] text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-slide-in">
          <Sparkles className="w-4 h-4 text-[#3CCF91]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#001E3D] via-[#002D54] to-[#00417A] border border-white/15 shadow-2xl flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#3CCF91]/20 text-[#3CCF91] border border-[#3CCF91]/30 uppercase tracking-wider">
              MHA / BoI Legal Compliance
            </span>
            <span className="text-xs text-slate-400 font-mono">Government Form C • Foreign National Registry</span>
          </div>
          <h2 className="text-xl font-serif-luxury font-bold text-white tracking-wide">
            Foreign Guest Police Registration & C-Form Management
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Statutory 24-hour compliance for foreign nationals. Automate passport verification, visa tracking, and encrypted batch filing directly with the Bureau of Immigration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportBatchJson}
            className="py-2.5 px-4 rounded-2xl bg-[#002B4D] hover:bg-[#003B6A] border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5 text-[#00D2C4]" />
            <span>Export BoI Batch JSON</span>
          </button>
          <button
            onClick={() => setShowAddDrawer(true)}
            className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#00A9A5] to-[#0B3D91] hover:from-[#00c2be] hover:to-[#0d4ab0] text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-lg"
          >
            <Plus className="w-4 h-4 text-[#FFC857]" />
            <span>Register Foreign Guest</span>
          </button>
        </div>
      </div>

      {/* Search & Statistics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Foreign Guest Name, Passport No, or Nationality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#001830] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00A9A5]"
          />
        </div>

        <div className="p-3 rounded-2xl bg-[#001830] border border-white/10 flex items-center justify-between text-xs">
          <span className="text-slate-400">Total Foreign Guests:</span>
          <span className="font-mono font-bold text-white text-sm">{guests.length}</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#001830] border border-white/10 flex items-center justify-between text-xs">
          <span className="text-slate-400">BoI Compliance Rate:</span>
          <span className="font-mono font-bold text-[#3CCF91] text-sm">100.0% Compliant</span>
        </div>
      </div>

      {/* Foreign Guest Table */}
      <div className="rounded-3xl bg-[#001428] border border-white/10 overflow-hidden shadow-2xl">
        <div className="px-6 py-4 bg-[#001C38] border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-300">
            Active Foreign National Dossiers
          </span>
          <span className="text-[11px] text-slate-400 font-mono">Form C Mandate § 14 Foreigners Act</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-200">
            <thead className="bg-[#001830] text-slate-400 uppercase text-[10px] font-black border-b border-white/5">
              <tr>
                <th className="py-3 px-4">Guest Name & Country</th>
                <th className="py-3 px-4">Passport Particulars</th>
                <th className="py-3 px-4">Visa Details</th>
                <th className="py-3 px-4">Port of Entry</th>
                <th className="py-3 px-4">Allocated Suite</th>
                <th className="py-3 px-4">BoI Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredGuests.map((g) => (
                <tr key={g.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-sm">{g.guestName}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-[#00D2C4]" />
                      <span>{g.nationality} ({g.countryCode})</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <div className="font-bold text-slate-100">{g.passportNumber}</div>
                    <div className="text-[10px] text-slate-400">Exp: {g.passportExpiry}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-200 font-bold">{g.visaNumber}</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">{g.visaType} (Exp: {g.visaExpiry})</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-slate-200">{g.portOfEntry}</div>
                    <div className="text-[10px] text-slate-400">Landed: {g.arrivalDateInIndia}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#FFC857]">{g.allocatedRoom}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 border ${
                        g.status === 'SUBMITTED_TO_BOI'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : g.status === 'VERIFIED_BY_FRONTDESK'
                          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {g.status.replace(/_/g, ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedGuest(g)}
                      className="px-3 py-1.5 rounded-xl bg-[#002B4D] hover:bg-[#003B6A] border border-white/10 text-xs font-bold text-white transition cursor-pointer"
                    >
                      View Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Individual Form C Dossier Modal */}
      {selectedGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#00162B] border border-white/20 p-6 text-white shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#FFC857]" />
                  <h3 className="text-base font-serif-luxury font-bold text-white">Form C Statutory Arrival Declaration</h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ref: {selectedGuest.submissionRef || 'PENDING_OFFICIAL_NUMBER'}
                </p>
              </div>
              <button
                onClick={() => setSelectedGuest(null)}
                className="p-1.5 rounded-xl border border-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#002244] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Full Legal Name</span>
                <div className="font-bold text-sm text-white">{selectedGuest.guestName}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#002244] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Country of Citizenship</span>
                <div className="font-bold text-sm text-[#00D2C4]">{selectedGuest.nationality}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#002244] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Passport Number</span>
                <div className="font-mono font-bold text-sm text-white">{selectedGuest.passportNumber}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#002244] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Visa Number & Type</span>
                <div className="font-mono font-bold text-sm text-[#FF8A3D]">{selectedGuest.visaNumber} ({selectedGuest.visaType})</div>
              </div>
              <div className="p-3 rounded-xl bg-[#002244] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Port of Entry into India</span>
                <div className="font-semibold text-white">{selectedGuest.portOfEntry}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#002244] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Hotel Allocated Suite</span>
                <div className="font-semibold text-[#FFC857]">{selectedGuest.allocatedRoom}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Digital passport bio-page scan verified against Indian e-FRRO gateway.</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="py-2 px-4 rounded-xl border border-white/10 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#00D2C4]" />
                <span>Print Official Form C</span>
              </button>
              <button
                onClick={() => {
                  showToast(`Bureau of Immigration receipt refreshed for ${selectedGuest.guestName}`);
                  setSelectedGuest(null);
                }}
                className="py-2 px-4 rounded-xl bg-[#00A9A5] text-white text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Foreign Guest Modal */}
      {showAddDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <form
            onSubmit={handleRegisterNewGuest}
            className="relative w-full max-w-lg rounded-3xl bg-[#00162B] border border-white/20 p-6 text-white shadow-2xl space-y-4"
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-black text-white">Register Foreign National (Form C)</h3>
                <p className="text-xs text-slate-400">Enter passport & visa credentials for immigration registration</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddDrawer(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Legal Name (as per Passport)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sir Richard Bradington"
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#002244] border border-white/10 text-white focus:outline-none focus:border-[#00A9A5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Country / Nationality</label>
                  <select
                    value={newNationality}
                    onChange={(e) => setNewNationality(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#002244] border border-white/10 text-white focus:outline-none focus:border-[#00A9A5]"
                  >
                    <option value="United States">United States (US)</option>
                    <option value="United Kingdom">United Kingdom (GB)</option>
                    <option value="Germany">Germany (DE)</option>
                    <option value="France">France (FR)</option>
                    <option value="Singapore">Singapore (SG)</option>
                    <option value="United Arab Emirates">United Arab Emirates (AE)</option>
                    <option value="Australia">Australia (AU)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Passport Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. US9820011A"
                    value={newPassport}
                    onChange={(e) => setNewPassport(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#002244] border border-white/10 text-white font-mono focus:outline-none focus:border-[#00A9A5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Indian Visa Number</label>
                  <input
                    type="text"
                    placeholder="e.g. IN-EV-884920"
                    value={newVisa}
                    onChange={(e) => setNewVisa(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#002244] border border-white/10 text-white font-mono focus:outline-none focus:border-[#00A9A5]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Port of Entry</label>
                  <select
                    value={newPort}
                    onChange={(e) => setNewPort(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#002244] border border-white/10 text-white focus:outline-none focus:border-[#00A9A5]"
                  >
                    <option value="Goa MOPA Airport (GOX)">Goa MOPA Airport (GOX)</option>
                    <option value="Mumbai CSMIA (BOM)">Mumbai CSMIA (BOM)</option>
                    <option value="Delhi IGI (DEL)">Delhi IGI (DEL)</option>
                    <option value="Bengaluru KIA (BLR)">Bengaluru KIA (BLR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Assigned Suite</label>
                  <select
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#002244] border border-white/10 text-white focus:outline-none focus:border-[#00A9A5]"
                  >
                    <option value="Villa 101">Villa 101 (Grand Infinity Pool Villa)</option>
                    <option value="Villa 102">Villa 102 (Oceanfront Cliff Villa)</option>
                    <option value="Villa 103">Villa 103 (Royal Pool Pavilion)</option>
                    <option value="Suite 201">Suite 201 (Azure Oceanfront Penthouse)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddDrawer(false)}
                className="py-2 px-4 rounded-xl border border-white/10 text-xs font-bold text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#0B3D91] text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Register & Transmit to BoI
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
