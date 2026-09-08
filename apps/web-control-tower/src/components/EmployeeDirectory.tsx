import { useState } from 'react';
import {
  Plus,
  Building2,
  Mail,
  Phone,
  Search,
} from 'lucide-react';

export interface EmployeeRecord {
  id: string;
  fullName: string;
  corporateEmail: string;
  phone: string;
  department: 'RELATIONSHIP_MANAGEMENT' | 'FRONTDESK_CONCIERGE' | 'TRAVEL_FLEET' | 'FINANCE_ESCROW' | 'OPERATIONS_SLA';
  jobTitle: string;
  assignedRegionOrProperty: string;
  shiftStatus: 'ON_DUTY' | 'STANDBY' | 'OFF_DUTY';
  joinedDate: string;
  activeTicketsCount: number;
}

export const INITIAL_EMPLOYEES: EmployeeRecord[] = [
  {
    id: 'emp-1',
    fullName: 'Devraj Mukherjee',
    corporateEmail: 'devraj.lead@staysphere.io',
    phone: '+91 98100 11223',
    department: 'OPERATIONS_SLA',
    jobTitle: 'Chief Operating Officer & Central Resolution Lead',
    assignedRegionOrProperty: 'All India Sovereign Estates',
    shiftStatus: 'ON_DUTY',
    joinedDate: 'Jan 2024',
    activeTicketsCount: 3,
  },
  {
    id: 'emp-2',
    fullName: 'Vikramaditya Singh',
    corporateEmail: 'vikram.rm@staysphere.io',
    phone: '+91 98200 22334',
    department: 'RELATIONSHIP_MANAGEMENT',
    jobTitle: 'Senior Relationship Manager (West & North India)',
    assignedRegionOrProperty: 'Goa, Udaipur, Manali & Mumbai Estates',
    shiftStatus: 'ON_DUTY',
    joinedDate: 'Mar 2024',
    activeTicketsCount: 2,
  },
  {
    id: 'emp-3',
    fullName: 'Ananya Deshmukh',
    corporateEmail: 'ananya.frontdesk@vanaazure.com',
    phone: '+91 98400 44556',
    department: 'FRONTDESK_CONCIERGE',
    jobTitle: 'Head of Frontdesk & Concierge',
    assignedRegionOrProperty: 'The Vana Azure Private Ocean Villa',
    shiftStatus: 'ON_DUTY',
    joinedDate: 'Jun 2024',
    activeTicketsCount: 1,
  },
  {
    id: 'emp-4',
    fullName: 'Vikas Rathore',
    corporateEmail: 'vikas.traveldesk@staysphere.io',
    phone: '+91 98500 55667',
    department: 'TRAVEL_FLEET',
    jobTitle: 'Fleet Telematics Director & Chauffeur Transit Lead',
    assignedRegionOrProperty: 'Mopa GOX, Mumbai BOM, Udaipur UDR Airports',
    shiftStatus: 'ON_DUTY',
    joinedDate: 'May 2024',
    activeTicketsCount: 1,
  },
  {
    id: 'emp-5',
    fullName: 'Rajesh Khosla',
    corporateEmail: 'rajesh.finance@staysphere.io',
    phone: '+91 98700 88990',
    department: 'FINANCE_ESCROW',
    jobTitle: 'Chief Financial Officer & Escrow Vault Custodian',
    assignedRegionOrProperty: '₹14.82M Central Escrow Vault',
    shiftStatus: 'STANDBY',
    joinedDate: 'Feb 2024',
    activeTicketsCount: 0,
  },
];

interface EmployeeDirectoryProps {
  showToast: (msg: string) => void;
}

export function EmployeeDirectory({ showToast }: EmployeeDirectoryProps) {
  const [employees, setEmployees] = useState<EmployeeRecord[]>(INITIAL_EMPLOYEES);
  const [filterDepartment, setFilterDepartment] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState<boolean>(false);

  // New Employee Form
  const [newEmpForm, setNewEmpForm] = useState({
    fullName: '',
    corporateEmail: '',
    phone: '',
    department: 'RELATIONSHIP_MANAGEMENT' as EmployeeRecord['department'],
    jobTitle: '',
    assignedRegionOrProperty: '',
  });

  const filteredEmployees = employees.filter((emp) => {
    const matchesDept = filterDepartment === 'ALL' || emp.department === filterDepartment;
    const matchesSearch =
      emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.corporateEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleToggleShift = (empId: string) => {
    setEmployees((prev) =>
      prev.map((e) => {
        if (e.id === empId) {
          const nextStatus = e.shiftStatus === 'ON_DUTY' ? 'OFF_DUTY' : 'ON_DUTY';
          return { ...e, shiftStatus: nextStatus };
        }
        return e;
      })
    );
    showToast('Employee shift status updated.');
  };

  const handleOnboardEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpForm.fullName.trim() || !newEmpForm.corporateEmail.trim()) return;

    const newEmp: EmployeeRecord = {
      id: `emp-${Date.now()}`,
      fullName: newEmpForm.fullName,
      corporateEmail: newEmpForm.corporateEmail,
      phone: newEmpForm.phone || '+91 98000 00000',
      department: newEmpForm.department,
      jobTitle: newEmpForm.jobTitle || 'Operations Specialist',
      assignedRegionOrProperty: newEmpForm.assignedRegionOrProperty || 'North & West Regional Estates',
      shiftStatus: 'ON_DUTY',
      joinedDate: 'Just Now',
      activeTicketsCount: 0,
    };

    setEmployees([newEmp, ...employees]);
    setIsOnboardingModalOpen(false);
    setNewEmpForm({ fullName: '', corporateEmail: '', phone: '', department: 'RELATIONSHIP_MANAGEMENT', jobTitle: '', assignedRegionOrProperty: '' });
    showToast(`Staff member "${newEmp.fullName}" added to employee directory.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-white tracking-wide">StaySphere Internal Employee & Staff Roster</h1>
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#3CCF91]/20 text-[#3CCF91] border border-[#3CCF91]/30">
              {employees.length} Active Staff Members
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Manage Relationship Managers, Frontdesk Concierges, Fleet Telematics Leads, Resolution Desk Agents, and Finance Custodians.
          </p>
        </div>

        <button
          onClick={() => setIsOnboardingModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold transition shadow-lg hover:brightness-110 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Employee</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 overflow-x-auto text-xs font-bold">
          {[
            { key: 'ALL', label: 'All Staff' },
            { key: 'RELATIONSHIP_MANAGEMENT', label: 'Relationship Managers' },
            { key: 'FRONTDESK_CONCIERGE', label: 'Frontdesk & Concierge' },
            { key: 'TRAVEL_FLEET', label: 'Travel & Fleet Desk' },
            { key: 'FINANCE_ESCROW', label: 'Finance & Escrow' },
            { key: 'OPERATIONS_SLA', label: 'Operations & COO' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterDepartment(tab.key)}
              className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap ${
                filterDepartment === tab.key
                  ? 'bg-[#00A9A5] text-white shadow-md'
                  : 'bg-[#001428] border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search staff by name, title, email..."
            className="bg-[#001428] border border-white/15 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A9A5] w-64"
          />
        </div>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className="bg-[#001E36] border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 hover:border-[#00A9A5]/40 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                  {emp.department.replace(/_/g, ' ')}
                </span>

                <button
                  onClick={() => handleToggleShift(emp.id)}
                  className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border transition ${
                    emp.shiftStatus === 'ON_DUTY'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-500/20 text-slate-400 border-white/10'
                  }`}
                >
                  ● {emp.shiftStatus.replace(/_/g, ' ')}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00A9A5] to-[#3CCF91] flex items-center justify-center text-white font-black text-sm shrink-0">
                  {emp.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{emp.fullName}</h3>
                  <div className="text-xs text-[#3CCF91] font-medium">{emp.jobTitle}</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono text-slate-200">{emp.corporateEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{emp.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] text-slate-400 truncate">Assigned: {emp.assignedRegionOrProperty}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Joined {emp.joinedDate}</span>
              <span className="text-cyan-300 font-bold">{emp.activeTicketsCount} Active Tickets</span>
            </div>
          </div>
        ))}
      </div>

      {/* Onboard Employee Modal */}
      {isOnboardingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#001E36] border border-[#00A9A5]/50 rounded-3xl w-full max-w-xl p-6 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">Add New StaySphere Employee</h3>
                <p className="text-xs text-slate-400">Assign roles, department permissions & regional territories</p>
              </div>
              <button
                onClick={() => setIsOnboardingModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOnboardEmployee} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newEmpForm.fullName}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, fullName: e.target.value })}
                    placeholder="e.g. Siddharth Rao"
                    className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Corporate Email</label>
                  <input
                    type="email"
                    value={newEmpForm.corporateEmail}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, corporateEmail: e.target.value })}
                    placeholder="siddharth.rm@staysphere.io"
                    className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Department</label>
                  <select
                    value={newEmpForm.department}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, department: e.target.value as any })}
                    className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                  >
                    <option value="RELATIONSHIP_MANAGEMENT">Relationship Management</option>
                    <option value="FRONTDESK_CONCIERGE">Frontdesk & Concierge</option>
                    <option value="TRAVEL_FLEET">Travel & Fleet Desk</option>
                    <option value="FINANCE_ESCROW">Finance & Escrow</option>
                    <option value="OPERATIONS_SLA">Central Operations & SLA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={newEmpForm.jobTitle}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, jobTitle: e.target.value })}
                    placeholder="e.g. Associate Relationship Manager"
                    className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Assigned Territory / Estates</label>
                <input
                  type="text"
                  value={newEmpForm.assignedRegionOrProperty}
                  onChange={(e) => setNewEmpForm({ ...newEmpForm, assignedRegionOrProperty: e.target.value })}
                  placeholder="e.g. Rajasthan Heritage Palaces & Luxury Resorts"
                  className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsOnboardingModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow-lg hover:brightness-110"
                >
                  Add Employee to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
