import { useState } from 'react';
import {
  Terminal,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Send,
  Server,
  Radio,
} from 'lucide-react';

export function PartnerApiConsole() {
  const [selectedApiCategory, setSelectedApiCategory] = useState<'HOTEL_PMS' | 'TRAVEL_FLEET' | 'CHANNEL_B2B' | 'WEBHOOKS'>('HOTEL_PMS');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);

  const copyApiKey = () => {
    navigator.clipboard.writeText('ss_live_partner_key_9941a8b3f2');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleTestApi = () => {
    setIsTesting(true);
    setTestResponse(null);
    setTimeout(() => {
      setIsTesting(false);
      if (selectedApiCategory === 'HOTEL_PMS') {
        setTestResponse(JSON.stringify({
          status: 200,
          success: true,
          message: 'Key inventory & Rate Parity synchronized with StaySphere Core API',
          data: {
            propertyId: 'prop-vana-azure-goa',
            allocatedKeys: 12,
            rateParityScore: '100%',
            nextEscrowReleaseETA: '2 Hours post check-in',
          }
        }, null, 2));
      } else if (selectedApiCategory === 'TRAVEL_FLEET') {
        setTestResponse(JSON.stringify({
          status: 200,
          success: true,
          message: 'Chauffeur telematics & flight radar paired successfully',
          data: {
            vehicle: 'Mercedes-Maybach S680',
            flightRadar: '6E-204 (DEL -> GOX)',
            status: 'BOARDING_TERMINAL',
            transitEscrowArmed: '₹8,500'
          }
        }, null, 2));
      } else if (selectedApiCategory === 'CHANNEL_B2B') {
        setTestResponse(JSON.stringify({
          status: 201,
          success: true,
          message: 'B2B VIP Booking confirmed via Corporate Escrow Credit',
          data: {
            bookingReference: 'BK-SS-B2B-9921',
            agency: 'American Express Centurion Lifestyle Concierge',
            guest: 'Sunil Mittal Retinue',
            commissionLogged: '₹72,000 (15%)'
          }
        }, null, 2));
      } else {
        setTestResponse(JSON.stringify({
          status: 200,
          event: 'escrow.released',
          dispatchedAt: new Date().toISOString(),
          webhookDelivery: 'DELIVERED_HTTP_200',
          payload: {
            bookingId: 'BK-SS-2026-9041',
            payoutAmount: 126000,
            beneficiaryAccount: 'Coastal Hospitality LLP (HDFC Bank)'
          }
        }, null, 2));
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-white tracking-wide">Partner API & Integration Console</h1>
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              OpenAPI 3.0 / REST & Webhooks
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Developer tools for Hotel PMS Channel Managers, Fleet GPS Telematics, and Corporate B2B Booking Engines.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="http://localhost:4000/docs"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-[#002B4D] hover:bg-[#003866] border border-cyan-500/40 text-cyan-300 text-xs font-bold transition shadow flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Server className="w-4 h-4 shrink-0" />
            <span>Open Swagger API Docs (Port 4000) ↗</span>
          </a>
        </div>
      </div>

      {/* API Key Credentials Card */}
      <div className="bg-[#001428] border border-white/10 rounded-2xl p-5 shadow flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5 whitespace-nowrap">
            <ShieldCheck className="w-4 h-4 text-[#3CCF91] shrink-0" />
            <span>Live Partner API Credential</span>
          </div>
          <div className="font-mono text-xs text-slate-200 bg-[#000E1C] px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-3">
            <span className="whitespace-nowrap">Bearer: <strong>ss_live_partner_key_9941a8b3f2</strong></span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold whitespace-nowrap shrink-0">Active</span>
          </div>
        </div>

        <button
          onClick={copyApiKey}
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          {copiedKey ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
          <span>{copiedKey ? 'Copied to Clipboard' : 'Copy API Key'}</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-bold">
        {[
          { key: 'HOTEL_PMS', label: '1. Hotel PMS & Channel Manager API' },
          { key: 'TRAVEL_FLEET', label: '2. Travel Desk & GPS Telematics API' },
          { key: 'CHANNEL_B2B', label: '3. Channel B2B Booking API' },
          { key: 'WEBHOOKS', label: '4. Real-time Event Webhooks' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setSelectedApiCategory(tab.key as any);
              setTestResponse(null);
            }}
            className={`px-4 py-2.5 rounded-xl transition whitespace-nowrap shrink-0 cursor-pointer ${
              selectedApiCategory === tab.key
                ? 'bg-[#00A9A5] text-white shadow-md'
                : 'bg-[#001428] border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Interactive Code & Test Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Endpoint Spec & cURL */}
        <div className="bg-[#001E36] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Endpoint Specification & cURL Snippet</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
              {selectedApiCategory === 'WEBHOOKS' ? 'EVENT STREAM' : 'POST / HTTPS'}
            </span>
          </div>

          <div className="font-mono text-xs bg-[#000E1C] p-4 rounded-xl border border-white/10 text-slate-300 overflow-x-auto leading-relaxed">
            {selectedApiCategory === 'HOTEL_PMS' && (
              <>
                <p className="text-cyan-400 font-bold"># Sync PMS Inventory & Rate Parity</p>
                <p className="text-slate-400 mt-1">curl -X POST http://localhost:4000/api/v1/stay/inventory-sync \</p>
                <p className="text-slate-400">  -H "Authorization: Bearer ss_live_partner_key_9941a8b3f2" \</p>
                <p className="text-slate-400">  -H "Content-Type: application/json" \</p>
                <p className="text-slate-400">  -d '{`{"allocatedKeys": 12, "baseNightlyRate": 42000}`}'</p>
              </>
            )}

            {selectedApiCategory === 'TRAVEL_FLEET' && (
              <>
                <p className="text-amber-400 font-bold"># Push Live Driver GPS & Flight Radar Status</p>
                <p className="text-slate-400 mt-1">curl -X POST http://localhost:4000/api/v1/move/telematics/status \</p>
                <p className="text-slate-400">  -H "Authorization: Bearer ss_live_partner_key_9941a8b3f2" \</p>
                <p className="text-slate-400">  -H "Content-Type: application/json" \</p>
                <p className="text-slate-400">  -d '{`{"licensePlate": "GA-03-MB-0001", "status": "BOARDING_TERMINAL"}`}'</p>
              </>
            )}

            {selectedApiCategory === 'CHANNEL_B2B' && (
              <>
                <p className="text-emerald-400 font-bold"># Create B2B Reservation with Corporate Escrow Credit</p>
                <p className="text-slate-400 mt-1">curl -X POST http://localhost:4000/api/v1/stay/bookings/channel-partner \</p>
                <p className="text-slate-400">  -H "Authorization: Bearer ss_live_partner_key_9941a8b3f2" \</p>
                <p className="text-slate-400">  -H "Content-Type: application/json" \</p>
                <p className="text-slate-400">  -d '{`{"propertyId": "prop-maharaja-pichola", "roomsCount": 4, "commissionSplit": 15}`}'</p>
              </>
            )}

            {selectedApiCategory === 'WEBHOOKS' && (
              <>
                <p className="text-purple-400 font-bold"># Real-Time Event Dispatch Listener</p>
                <p className="text-slate-400 mt-1">Headers: X-StaySphere-Signature: sha256=9f8a...</p>
                <p className="text-slate-400">Events: booking.confirmed, flight.radar.landed, escrow.released</p>
              </>
            )}
          </div>

          <button
            onClick={handleTestApi}
            disabled={isTesting}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow hover:brightness-110 transition flex items-center justify-center gap-2"
          >
            {isTesting ? <Zap className="w-4 h-4 animate-spin text-white" /> : <Send className="w-4 h-4" />}
            <span>{isTesting ? 'Dispatching Test Request...' : 'Send Live Test Request'}</span>
          </button>
        </div>

        {/* Right: Live Response Sandbox */}
        <div className="bg-[#001E36] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#3CCF91]" />
              <span>Live API Response Output</span>
            </h3>
            {testResponse && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                HTTP 200 OK
              </span>
            )}
          </div>

          <div className="font-mono text-xs bg-[#000E1C] p-4 rounded-xl border border-white/10 text-emerald-400 min-h-[180px] overflow-x-auto">
            {testResponse ? (
              <pre className="whitespace-pre-wrap">{testResponse}</pre>
            ) : (
              <span className="text-slate-500 italic">
                Click "Send Live Test Request" to simulate real-time API execution with StaySphere Core Backend.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
