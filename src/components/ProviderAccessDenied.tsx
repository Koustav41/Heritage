'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Lock, 
  ArrowLeft, 
  LogIn, 
  Sparkles, 
  UserX, 
  FileCheck2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { UserRole } from '@/types';
import { usePorjotok } from '@/lib/store/porjotok-context';
import { ROLE_GATE_METADATA } from '@/lib/auth/rbac';
import { DEMO_USERS } from '@/lib/data/members';

interface ProviderAccessDeniedProps {
  targetRole: UserRole;
  onSwitchToVisitor?: () => void;
}

export function ProviderAccessDenied({ targetRole, onSwitchToVisitor }: ProviderAccessDeniedProps) {
  const { currentUser, currentRole, login } = usePorjotok();
  const meta = ROLE_GATE_METADATA[targetRole] || {
    title: `${targetRole.replace('_', ' ')} Portal`,
    category: 'Verified Provider',
    description: 'Operational business and schedule controls.',
    credentialDoc: 'Official Certification'
  };

  const [authorizing, setAuthorizing] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const demoPersona = DEMO_USERS[targetRole];

  const handleAuthorizePersona = () => {
    if (!demoPersona) return;
    setAuthorizing(true);
    setTimeout(() => {
      login(demoPersona.email, 'demo1234', targetRole, demoPersona.name);
      setAuthorizing(false);
      setAuthSuccess(true);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-200">
      
      {/* 403 Security Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-stone-900 to-stone-950 border border-amber-600/30 p-8 shadow-2xl text-white">
        
        {/* Ambient Glows */}
        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-amber-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-16 w-52 h-52 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-wide">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>403 FORBIDDEN • ROLE-BASED ACCESS ENFORCED</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Protected Provider Console</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{meta.title}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-amber-900/60 border border-amber-700/50 text-amber-300">
                Restricted
              </span>
            </h2>
            <p className="text-xs text-stone-300 leading-relaxed max-w-xl">
              Access to this operational profile is restricted to verified <strong className="text-white">{meta.category}</strong> accounts. General visitors and unauthorized personas cannot view incoming client orders, manage customer deliveries, or modify public provider listings.
            </p>
          </div>

          {/* Current Visitor Identity vs Required Credential Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            
            {/* Current Session */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1.5">
              <span className="text-[10px] text-stone-400 block font-mono uppercase tracking-wider">
                Current Active Session
              </span>
              <div className="flex items-center gap-2.5">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover border border-stone-600" />
                <div className="truncate">
                  <p className="font-bold text-white truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-stone-400 truncate">{currentUser.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-red-300 font-medium pt-1">
                <UserX className="w-3.5 h-3.5 shrink-0" />
                <span>Active Role: <strong className="text-white uppercase">{currentRole.replace('_', ' ')}</strong> (Unauthorized)</span>
              </div>
            </div>

            {/* Required Credential */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1.5">
              <span className="text-[10px] text-stone-400 block font-mono uppercase tracking-wider">
                Required Credential & Clearance
              </span>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-emerald-300">{meta.category}</span>
              </div>
              <p className="text-[11px] text-stone-300 leading-tight">
                Mandatory Documentation: {meta.credentialDoc}
              </p>
              <p className="text-[10px] text-amber-400/90 italic">
                Rule 1 & 57: Requires administrative credential vetting.
              </p>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {onSwitchToVisitor ? (
              <button
                type="button"
                onClick={onSwitchToVisitor}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to My Visitor Dashboard</span>
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to My Visitor Dashboard</span>
              </Link>
            )}

            <Link
              href="/auth/sign-in"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In with Provider Account</span>
            </Link>
          </div>

        </div>
      </div>

      {/* SIH Evaluator Demo Persona Switch */}
      {demoPersona && (
        <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>SIH Demo: Verify Authorized Persona Credentials</span>
            </span>
            <p className="text-[11px] text-stone-500">
              Authenticate directly as verified {meta.category} <strong className="text-stone-700 dark:text-stone-300">{demoPersona.name}</strong> ({demoPersona.email}) to test operational profile controls.
            </p>
          </div>

          <button
            type="button"
            disabled={authorizing || authSuccess}
            onClick={handleAuthorizePersona}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            {authSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Authorized!</span>
              </>
            ) : authorizing ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <LogIn className="w-3.5 h-3.5" />
                <span>Authenticate as {demoPersona.name.split(' ')[0]}</span>
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
}
