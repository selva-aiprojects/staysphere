import React, { useState } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Send,
  Download,
  Building2,
} from 'lucide-react';

interface RateShopRecord {
  id: string;
  propertyName: string;
  destination: string;
  roomType: string;
  staysphereRate: number;
  bookingComRate: number;
  expediaRate: number;
  agodaRate: number;
  parityStatus: 'PARITY_MET' | 'UNDERBID_BREACH' | 'CHANNEL_MARKUP';
  variancePercent: number; // Negative means OTA is undercutting
  lastCrawled: string;
}

export const RateParityIntelligenceWorkspace: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCrawling, setIsCrawling] = useState(false);
  const [filterCity, setFilterCity] = useState<string>('ALL');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [rateRecords] = useState<RateShopRecord[]>([
    {
      id: 'PARITY-01',
      propertyName: 'The Grand Vagator Bay Resort & Oceanfront Villas',
      destination: 'Goa',
      roomType: 'Horizon Oceanfront Private Pool Villa 101',
      staysphereRate: 28000,
      bookingComRate: 29500,
      expediaRate: 29900,
      agodaRate: 29200,
      parityStatus: 'PARITY_MET',
      variancePercent: 5.3,
      lastCrawled: '4 mins ago',
    },
    {
      id: 'PARITY-02',
      propertyName: 'Maharaja Pichola Lake Palace',
      destination: 'Udaipur',
      roomType: 'Royal Mewar Heritage Suite',
      staysphereRate: 42000,
      bookingComRate: 38900, // Breach!
      expediaRate: 42500,
      agodaRate: 41800,
      parityStatus: 'UNDERBID_BREACH',
      variancePercent: -7.4,
      lastCrawled: '12 mins ago',
    },
    {
      id: 'PARITY-03',
      propertyName: 'Solitude Himalayan Cedar Chalet & Spa',
      destination: 'Manali',
      roomType: 'Presidential Snow-Peak Chalet',
      staysphereRate: 34000,
      bookingComRate: 35500,
      expediaRate: 36000,
      agodaRate: 35000,
      parityStatus: 'PARITY_MET',
      variancePercent: 4.4,
      lastCrawled: '28 mins ago',
    },
    {
      id: 'PARITY-04',
      propertyName: 'Amber Fort Royal Heritage Haveli',
      destination: 'Jaipur',
      roomType: 'Maharani Courtyard Deluxe Suite',
      staysphereRate: 22000,
      bookingComRate: 22500,
      expediaRate: 20500, // Breach on Expedia!
      agodaRate: 21900,
      parityStatus: 'UNDERBID_BREACH',
      variancePercent: -6.8,
      lastCrawled: '18 mins ago',
    },
    {
      id: 'PARITY-05',
      propertyName: 'Marine Drive Horizon Executive Penthouse',
      destination: 'Mumbai',
      roomType: 'Horizon Sea-Facing Master Suite',
      staysphereRate: 31000,
      bookingComRate: 32000,
      expediaRate: 32500,
      agodaRate: 31800,
      parityStatus: 'PARITY_MET',
      variancePercent: 3.2,
      lastCrawled: '1 hour ago',
    },
  ]);

  const handleRunCrawler = () => {
    setIsCrawling(true);
    setTimeout(() => {
      setIsCrawling(false);
      showToast('Live OTA Crawler completed: 18 properties checked across Booking.com, Expedia, and Agoda.');
    }, 1500);
  };

  const handleSendCureNotice = (record: RateShopRecord) => {
    showToast(`Dispatched automated Parity Breach Notice to ${record.propertyName} GM. 24h cure window initiated.`);
  };

  const filteredRecords = filterCity === 'ALL'
    ? rateRecords
    : rateRecords.filter((r) => r.destination.toUpperCase() === filterCity.toUpperCase());

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div data-keep-dark className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#002B4D] border border-[#3CCF91] text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-slide-in">
          <Sparkles className="w-4 h-4 text-[#3CCF91]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#001D38] via-[#003B5C] to-[#00A9A5] border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-6 h-6 text-[#FFC857]" />
            <h1 className="text-xl font-serif-luxury font-bold text-white tracking-wide">
              Rate Parity & Competitor Price Intelligence
            </h1>
          </div>
          <p className="text-xs text-slate-200">
            Automated rate shopping across Booking.com, Expedia, and Agoda to enforce contractual rate parity and protect direct booking margins.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => showToast('Exported Rate Parity Audit Dossier (CSV/PDF).')}
            className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>

          <button
            onClick={handleRunCrawler}
            disabled={isCrawling}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] hover:from-[#00BDB8] hover:to-[#45E4A3] text-white text-xs font-bold transition flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isCrawling ? 'animate-spin' : ''}`} />
            <span>{isCrawling ? 'Shopping OTAs...' : 'Run Live Rate Shop'}</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
          <div className="text-xs text-slate-400 font-bold">Parity Compliance Rate</div>
          <div className="text-2xl font-black text-[#3CCF91] font-mono">94.2%</div>
          <div className="text-[11px] text-slate-400">Target ≥95% across contracted luxury estates</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
          <div className="text-xs text-slate-400 font-bold">Active Parity Breaches</div>
          <div className="text-2xl font-black text-rose-400 font-mono">2 Detected</div>
          <div className="text-[11px] text-slate-400">OTA undercut alerts sent to property GMs</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
          <div className="text-xs text-slate-400 font-bold">Margin Protection Yield</div>
          <div className="text-2xl font-black text-[#FFC857] font-mono">₹4,28,000</div>
          <div className="text-[11px] text-slate-400">Direct booking commission saved vs OTAs</div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-300" />
            <span>Live OTA Price Comparison Grid (Updated Every 15 Minutes)</span>
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold">Destination:</span>
            {['ALL', 'GOA', 'UDAIPUR', 'MANALI', 'JAIPUR', 'MUMBAI'].map((city) => (
              <button
                key={city}
                onClick={() => setFilterCity(city)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  filterCity === city
                    ? 'bg-[#00A9A5] text-white'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#001428] text-slate-400 font-bold border-b border-white/10">
              <tr>
                <th className="p-3">Estate & Room Type</th>
                <th className="p-3 text-right">StaySphere Direct</th>
                <th className="p-3 text-right">Booking.com</th>
                <th className="p-3 text-right">Expedia</th>
                <th className="p-3 text-right">Agoda</th>
                <th className="p-3 text-center">Parity Status</th>
                <th className="p-3 text-right">Variance</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredRecords.map((r) => (
                <tr key={r.id}>
                  <td className="p-3">
                    <div className="font-bold text-white">{r.propertyName}</div>
                    <div className="text-[11px] text-cyan-300">{r.roomType}</div>
                    <div className="text-[10px] text-slate-400">Ref: {r.id} • Crawled {r.lastCrawled}</div>
                  </td>

                  <td className="p-3 text-right font-mono font-bold text-[#3CCF91]">
                    ₹{r.staysphereRate.toLocaleString('en-IN')}
                  </td>

                  <td className={`p-3 text-right font-mono ${
                    r.bookingComRate < r.staysphereRate ? 'text-rose-400 font-bold bg-rose-500/10' : 'text-slate-300'
                  }`}>
                    ₹{r.bookingComRate.toLocaleString('en-IN')}
                  </td>

                  <td className={`p-3 text-right font-mono ${
                    r.expediaRate < r.staysphereRate ? 'text-rose-400 font-bold bg-rose-500/10' : 'text-slate-300'
                  }`}>
                    ₹{r.expediaRate.toLocaleString('en-IN')}
                  </td>

                  <td className={`p-3 text-right font-mono ${
                    r.agodaRate < r.staysphereRate ? 'text-rose-400 font-bold bg-rose-500/10' : 'text-slate-300'
                  }`}>
                    ₹{r.agodaRate.toLocaleString('en-IN')}
                  </td>

                  <td className="p-3 text-center">
                    {r.parityStatus === 'PARITY_MET' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        PARITY MET
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
                        UNDERBID BREACH
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-right font-mono font-bold">
                    {r.variancePercent > 0 ? (
                      <span className="text-emerald-400">+{r.variancePercent}%</span>
                    ) : (
                      <span className="text-rose-400">{r.variancePercent}%</span>
                    )}
                  </td>

                  <td className="p-3 text-center">
                    {r.parityStatus === 'UNDERBID_BREACH' ? (
                      <button
                        onClick={() => handleSendCureNotice(r)}
                        className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[11px] font-bold transition flex items-center gap-1 mx-auto cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send Notice</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[11px] flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Compliant</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
