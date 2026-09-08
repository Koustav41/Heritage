'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Heart, 
  FileText, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  LogOut
} from 'lucide-react';
import { usePorjotok } from '@/lib/store/porjotok-context';
import { AdminAccessDenied } from '@/components/AdminAccessDenied';

export default function AdminConsolePage() {
  const { 
    isLoggedIn,
    currentRole,
    currentUser,
    revokeAdminRole,
    verifications, 
    approveVerification, 
    rejectVerification, 
    fundraisers, 
    approveFundraiser, 
    rejectFundraiser, 
    complaints, 
    resolveComplaint,
    auditLogs 
  } = usePorjotok();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'VERIFICATIONS' | 'FUNDRAISERS' | 'COMPLAINTS' | 'AUDIT_LOGS'>('OVERVIEW');

  // RBAC Guard: If the user is not authenticated or not an ADMIN, deny access
  if (!isLoggedIn || currentRole !== 'ADMIN') {
    return <AdminAccessDenied />;
  }

  const pendingVerifs = verifications.filter(v => v.status === 'PENDING_VERIFICATION');
  const pendingFunds = fundraisers.filter(f => f.status === 'PENDING_APPROVAL');
  const openComplaints = complaints.filter(c => c.status === 'OPEN' || c.status === 'IN_REVIEW');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-900 dark:text-red-300 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator Console • Rule-Enforced Moderation</span>
          </div>
          <h1 className="text-3xl font-black text-stone-900 dark:text-stone-100 mt-1">
            Porjotok Governance & Oversight Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Active Admin: {currentUser.name.split(' ')[0]}</span>
          </div>

          <button
            onClick={() => revokeAdminRole()}
            className="px-3.5 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-800 dark:text-rose-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Admin Mode</span>
          </button>

          <Link
            href="/dashboard"
            className="px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors"
          >
            Visitor Dashboard
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        {[
          { id: 'OVERVIEW', label: 'Analytics Overview' },
          { id: 'VERIFICATIONS', label: `Member Verifications (${pendingVerifs.length})` },
          { id: 'FUNDRAISERS', label: `Cleanliness Fundraisers (${pendingFunds.length})` },
          { id: 'COMPLAINTS', label: `Complaints (${openComplaints.length})` },
          { id: 'AUDIT_LOGS', label: `Audit Trail Logs (${auditLogs.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8 animate-in fade-in">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
              <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">Total Ecosystem Users</span>
              <div className="text-3xl font-black text-stone-900 dark:text-stone-100">4,820</div>
              <span className="text-[11px] text-emerald-600 font-medium">+18% this month</span>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
              <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">Verified Providers</span>
              <div className="text-3xl font-black text-amber-600">324</div>
              <span className="text-[11px] text-stone-400">Guides, Masters, Sweets</span>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
              <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">Marketplace Volume</span>
              <div className="text-3xl font-black text-emerald-600">₹3,48,200</div>
              <span className="text-[11px] text-stone-400">Tours, Workshops, Items</span>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
              <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">Cleanliness Fund Raised</span>
              <div className="text-3xl font-black text-teal-600">₹1,76,600</div>
              <span className="text-[11px] text-teal-500 font-medium">Hooghly Ghats & Temples</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
              <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
                Popular Heritage Circuits
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { name: 'Bishnupur Terracotta Temples Circuit', visits: '1,420 bookings', pct: '88%' },
                  { name: 'Darjeeling Steam Toy Train & Tea Walk', visits: '1,180 bookings', pct: '74%' },
                  { name: 'Kolkata Renaissance & Synagogues', visits: '980 bookings', pct: '62%' },
                  { name: 'Santiniketan Ashram & Baul Country', visits: '850 bookings', pct: '54%' }
                ].map(circuit => (
                  <div key={circuit.name} className="space-y-1">
                    <div className="flex justify-between text-stone-700 dark:text-stone-300 font-medium">
                      <span>{circuit.name}</span>
                      <span className="font-bold text-amber-600">{circuit.visits}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: circuit.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
              <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
                Action Items Awaiting Admin Moderation
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
                  <span className="font-bold text-amber-900 dark:text-amber-200">
                    {pendingVerifs.length} Member applications pending credential check
                  </span>
                  <button onClick={() => setActiveTab('VERIFICATIONS')} className="text-amber-600 font-bold hover:underline">
                    Review →
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-between">
                  <span className="font-bold text-teal-900 dark:text-teal-200">
                    {pendingFunds.length} Cleanliness campaigns pending approval
                  </span>
                  <button onClick={() => setActiveTab('FUNDRAISERS')} className="text-teal-600 font-bold hover:underline">
                    Review →
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center justify-between">
                  <span className="font-bold text-rose-900 dark:text-rose-200">
                    {openComplaints.length} Visitor complaints logged in system
                  </span>
                  <button onClick={() => setActiveTab('COMPLAINTS')} className="text-rose-600 font-bold hover:underline">
                    Review →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MEMBER VERIFICATIONS */}
      {activeTab === 'VERIFICATIONS' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
              Provider Application Vetting (Rule 1 & 57)
            </h2>
            <p className="text-xs text-stone-500">
              A member cannot publish services, accept bookings, or receive public orders until Admin verification is complete.
            </p>
          </div>

          <div className="space-y-4">
            {verifications.map((v) => (
              <div
                key={v.id}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-stone-900 dark:text-stone-100">{v.applicantName}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 font-bold text-amber-600">
                      {v.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      v.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
                      v.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {v.status}
                    </span>
                  </div>

                  <p className="text-stone-500">{v.email} • {v.phone} • {v.district} District</p>
                  <p className="text-stone-700 dark:text-stone-300 font-medium">Submitted Documentation: {v.documentType}</p>
                  {v.verificationNotes && <p className="text-stone-400 italic">{v.verificationNotes}</p>}
                </div>

                {v.status === 'PENDING_VERIFICATION' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approveVerification(v.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
                    >
                      Approve & Verify
                    </button>
                    <button
                      onClick={() => rejectVerification(v.id)}
                      className="px-4 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-stone-400 font-semibold italic">Processed</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FUNDRAISERS */}
      {activeTab === 'FUNDRAISERS' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
              Cleanliness Fundraiser Vetting (Rule 3)
            </h2>
            <p className="text-xs text-stone-500">Every fundraiser must be approved by an admin before it becomes publicly visible.</p>
          </div>

          <div className="space-y-4">
            {fundraisers.map((f) => (
              <div
                key={f.id}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100">{f.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      f.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' :
                      f.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {f.status}
                    </span>
                  </div>
                  <p className="text-stone-500" suppressHydrationWarning>{f.crewName} • {f.location} • Target: ₹{f.targetAmount.toLocaleString('en-IN')}</p>
                  <p className="text-stone-600 dark:text-stone-300">{f.purpose}</p>
                </div>

                {f.status === 'PENDING_APPROVAL' ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => approveFundraiser(f.id)}
                      className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold"
                    >
                      Approve Publicly
                    </button>
                    <button
                      onClick={() => rejectFundraiser(f.id)}
                      className="px-4 py-2 rounded-xl bg-rose-100 text-rose-800 hover:bg-rose-200 font-bold"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-stone-400 font-semibold italic">Approved / Active</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COMPLAINTS */}
      {activeTab === 'COMPLAINTS' && (
        <div className="space-y-4 animate-in fade-in">
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
            Visitor Complaints System (Spec 28)
          </h2>

          <div className="space-y-4">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-600">{c.id}</span>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">{c.subject}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      c.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-stone-500">Filed by {c.complainantName} on {c.filedDate} • Category: {c.category}</p>
                  <p className="text-stone-600 dark:text-stone-300">{c.description}</p>
                </div>

                {c.status !== 'RESOLVED' && (
                  <button
                    onClick={() => resolveComplaint(c.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shrink-0"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT LOGS */}
      {activeTab === 'AUDIT_LOGS' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
              System Audit Trail & Security Logs (Spec 45)
            </h2>
            <span className="text-xs text-stone-400">Chronological System Events</span>
          </div>

          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Actor</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Entity</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                    <td className="p-4 font-mono text-stone-400">{log.timestamp}</td>
                    <td className="p-4 font-semibold text-stone-800 dark:text-stone-200">{log.actor}</td>
                    <td className="p-4">
                      <span className="font-mono font-bold text-amber-600">{log.action}</span>
                    </td>
                    <td className="p-4 text-stone-600 dark:text-stone-400">
                      {log.entityType}: {log.entityName}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
