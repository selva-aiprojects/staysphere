import {
  Compass,
  TrendingUp,
  Hotel,
  Car,
  Ticket,
  ShieldAlert,
  Clock,
  RefreshCw,
  Banknote,
  AlertTriangle,
  ArrowUpRight,
  Activity,
  Zap,
  Globe,
  BarChart3,
} from 'lucide-react';

interface OverviewDashboardProps {
  onNavigate: (workflow: string) => void;
}

const KPI_DATA = [
  {
    id: 'sjr',
    label: 'Successful Journey Rate',
    value: '97.8%',
    target: '≥ 97.5%',
    delta: '+0.3%',
    deltaPositive: true,
    icon: TrendingUp,
    color: '#3CCF91',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    status: 'HEALTHY',
    workflow: 'journeys',
  },
  {
    id: 'active-journeys',
    label: 'Active Journeys',
    value: '84',
    target: 'Live',
    delta: '+12 today',
    deltaPositive: true,
    icon: Compass,
    color: '#00A9A5',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    status: 'LIVE',
    workflow: 'journeys',
  },
  {
    id: 'active-stays',
    label: 'Active Stays',
    value: '61',
    target: 'Checked-In',
    delta: '+5 today',
    deltaPositive: true,
    icon: Hotel,
    color: '#7C6DF2',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    status: 'LIVE',
    workflow: 'frontdesk',
  },
  {
    id: 'trips',
    label: 'Trips in Progress',
    value: '23',
    target: 'En Route',
    delta: '3 delayed',
    deltaPositive: false,
    icon: Car,
    color: '#FF8A3D',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    status: 'WATCH',
    workflow: 'travel-desk',
  },
  {
    id: 'open-tickets',
    label: 'Open Tickets',
    value: '9',
    target: '< 15 threshold',
    delta: '2 escalated',
    deltaPositive: false,
    icon: Ticket,
    color: '#FFC857',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    status: 'WATCH',
    workflow: 'sla-incidents',
  },
  {
    id: 'p0-incidents',
    label: 'P0 Incidents',
    value: '1',
    target: '0 target',
    delta: 'Active escalation',
    deltaPositive: false,
    icon: ShieldAlert,
    color: '#FF4D6D',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
    status: 'CRITICAL',
    workflow: 'sla-incidents',
  },
  {
    id: 'sla-risk',
    label: 'SLA At Risk',
    value: '3',
    target: '0 target',
    delta: 'Next breach: 4m',
    deltaPositive: false,
    icon: Clock,
    color: '#F97316',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    status: 'WATCH',
    workflow: 'sla-incidents',
  },
  {
    id: 'pending-refunds',
    label: 'Pending Refunds',
    value: '₹1.24L',
    target: 'Awaiting Auth',
    delta: '5 requests',
    deltaPositive: false,
    icon: RefreshCw,
    color: '#A78BFA',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    status: 'WATCH',
    workflow: 'payments',
  },
  {
    id: 'settlement-queue',
    label: 'Settlement Queue',
    value: '₹8.46L',
    target: 'Release eligible',
    delta: '18 partners',
    deltaPositive: true,
    icon: Banknote,
    color: '#D4AF37',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    status: 'ACTION',
    workflow: 'payments',
  },
];

const STATUS_CONFIG = {
  HEALTHY: { label: 'Healthy', color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30' },
  LIVE: { label: 'Live', color: 'text-cyan-400', bg: 'bg-cyan-500/15 border-cyan-500/30' },
  WATCH: { label: 'Watch', color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/30' },
  CRITICAL: { label: 'Critical', color: 'text-rose-400', bg: 'bg-rose-500/15 border-rose-500/30' },
  ACTION: { label: 'Action', color: 'text-[#D4AF37]', bg: 'bg-amber-500/10 border-amber-400/30' },
};

const JOURNEY_HEALTH_FEED = [
  { id: 'J-9041', guest: 'Arjun Mehta', destination: 'Goa', status: 'GREEN', label: 'On Track', note: 'Check-in confirmed. Airport pickup at 17:30.' },
  { id: 'J-7812', guest: 'Priya Iyer', destination: 'Udaipur', status: 'YELLOW', label: 'At Risk', note: 'Flight 2E-204 delayed 45 min. Transport pickup adjusted.' },
  { id: 'J-5503', guest: 'Aarav Sharma', destination: 'Manali', status: 'GREEN', label: 'On Track', note: 'Active stay. Day 2. No issues.' },
  { id: 'J-3297', guest: 'Kavya Nair', destination: 'Mumbai', status: 'RED', label: 'Critical', note: 'AC malfunction reported. Maintenance dispatched. P0 open.' },
  { id: 'J-6618', guest: 'Rohan Das', destination: 'Jaipur', status: 'YELLOW', label: 'At Risk', note: 'Sightseeing tour delayed. Driver en route.' },
];

const HEALTH_CONFIG = {
  GREEN: { color: 'text-emerald-400', dot: 'bg-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
  YELLOW: { color: 'text-amber-400', dot: 'bg-amber-400 animate-pulse', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
  RED: { color: 'text-rose-400', dot: 'bg-rose-500 animate-ping', border: 'border-rose-500/30', bg: 'bg-rose-500/10' },
};

export function OverviewDashboard({ onNavigate }: OverviewDashboardProps) {
  const criticalCount = KPI_DATA.filter((k) => k.status === 'CRITICAL').length;
  const watchCount = KPI_DATA.filter((k) => k.status === 'WATCH').length;
  const healthyCount = KPI_DATA.filter((k) => k.status === 'HEALTHY' || k.status === 'LIVE').length;

  const overallHealth =
    criticalCount > 0 ? 'CRITICAL' : watchCount > 2 ? 'AT_RISK' : 'HEALTHY';

  return (
    <div className="space-y-6">
      {/* Platform Health Banner */}
      <div
        className={`rounded-3xl p-6 border shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          overallHealth === 'CRITICAL'
            ? 'bg-gradient-to-r from-rose-950/60 to-[#001E36] border-rose-500/40'
            : overallHealth === 'AT_RISK'
            ? 'bg-gradient-to-r from-amber-950/40 to-[#001E36] border-amber-500/30'
            : 'bg-gradient-to-r from-emerald-950/40 to-[#001E36] border-emerald-500/25'
        }`}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity
              className={`w-5 h-5 ${
                overallHealth === 'CRITICAL'
                  ? 'text-rose-400'
                  : overallHealth === 'AT_RISK'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            />
            <h1 className="text-xl font-black text-white tracking-wide">
              Platform Operations Overview
            </h1>
            <span
              className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                overallHealth === 'CRITICAL'
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  : overallHealth === 'AT_RISK'
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}
            >
              {overallHealth === 'CRITICAL' ? '⚠ Active Incident' : overallHealth === 'AT_RISK' ? '⚡ At Risk' : '✓ Platform Healthy'}
            </span>
          </div>
          <p className="text-xs text-slate-300">
            StaySphere Journey Engine · Real-time operations pulse ·{' '}
            <span className="text-emerald-400 font-bold">{healthyCount} healthy</span>,{' '}
            <span className="text-amber-400 font-bold">{watchCount} watch</span>,{' '}
            {criticalCount > 0 && (
              <span className="text-rose-400 font-bold">{criticalCount} critical</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">SJR Target</div>
            <div className="text-xl font-black text-emerald-400">97.8%</div>
            <div className="text-[10px] text-emerald-400/70">≥ 97.5% threshold</div>
          </div>
        </div>
      </div>

      {/* 9-KPI Grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-[#00A9A5]" />
          <h2 className="text-sm font-bold text-white">Live KPI Dashboard</h2>
          <span className="text-[10px] text-slate-400 font-mono">Real-time · Click any card to drill in</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {KPI_DATA.map((kpi) => {
            const IconComponent = kpi.icon;
            const statusCfg = STATUS_CONFIG[kpi.status as keyof typeof STATUS_CONFIG];
            return (
              <button
                key={kpi.id}
                onClick={() => onNavigate(kpi.workflow)}
                className={`text-left p-5 rounded-2xl border ${kpi.bgColor} ${kpi.borderColor} hover:brightness-110 transition-all group cursor-pointer bg-[#001E36] relative overflow-hidden`}
              >
                {/* Subtle glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top left, ${kpi.color}15, transparent 60%)` }}
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${kpi.bgColor}`}
                    >
                      <IconComponent className="w-4 h-4" style={{ color: kpi.color }} />
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${statusCfg.bg} ${statusCfg.color}`}
                    >
                      {statusCfg.label}
                    </span>
                  </div>

                  <div className="text-2xl font-black text-white mb-0.5">{kpi.value}</div>
                  <div className="text-xs font-bold text-slate-300 mb-2">{kpi.label}</div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">{kpi.target}</span>
                    <span
                      className={`text-[10px] font-bold flex items-center gap-0.5 ${
                        kpi.deltaPositive ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {kpi.deltaPositive ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <AlertTriangle className="w-3 h-3" />
                      )}
                      {kpi.delta}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-slate-500 font-bold flex items-center gap-1 group-hover:text-slate-300 transition-colors">
                    <Zap className="w-3 h-3" /> Drill into workspace →
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Journey Health Feed */}
      <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#00A9A5]" />
            <h2 className="text-sm font-bold text-white">Live Journey Health Feed</h2>
          </div>
          <button
            onClick={() => onNavigate('journeys')}
            className="text-[11px] font-bold text-[#00A9A5] hover:text-[#00D2C4] transition-colors flex items-center gap-1"
          >
            View All Journeys <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {JOURNEY_HEALTH_FEED.map((journey) => {
            const cfg = HEALTH_CONFIG[journey.status as keyof typeof HEALTH_CONFIG];
            return (
              <div
                key={journey.id}
                className={`flex items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border ${cfg.bg} ${cfg.border}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Health dot */}
                  <div className="relative shrink-0">
                    <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-slate-400">{journey.id}</span>
                      <span className="text-xs font-bold text-white">{journey.guest}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 whitespace-nowrap shrink-0">
                        {journey.destination}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{journey.note}</p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-xl border whitespace-nowrap shrink-0 ${cfg.bg} ${cfg.color} ${cfg.border}`}
                >
                  {journey.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick-action Nav Strip */}
      <div className="bg-[#001428] border border-white/5 rounded-2xl p-4">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Quick Navigate</div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Live Journeys', wf: 'journeys', color: '#00A9A5' },
            { label: 'Properties', wf: 'property-master', color: '#7C6DF2' },
            { label: 'Mobility', wf: 'travel-desk', color: '#FF8A3D' },
            { label: 'SLA Sentinel', wf: 'sla-incidents', color: '#FF4D6D' },
            { label: 'Payments', wf: 'payments', color: '#3CCF91' },
            { label: 'Offer Mgmt', wf: 'offer-management', color: '#D4AF37' },
            { label: 'Feedback', wf: 'feedback', color: '#FFC857' },
            { label: 'Partners', wf: 'partners', color: '#00D2C4' },
          ].map((item) => (
            <button
              key={item.wf}
              onClick={() => onNavigate(item.wf)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
              style={{ color: item.color }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
