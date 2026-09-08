'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Lock, 
  KeyRound, 
  ArrowLeft, 
  LogIn, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  UserX
} from 'lucide-react';
import { usePorjotok } from '@/lib/store/porjotok-context';
import { ADMIN_SECURITY_KEY } from '@/lib/auth/rbac';

export function AdminAccessDenied() {
  const { currentRole, currentUser, elevateToAdmin } = usePorjotok();
  const [passkey, setPasskey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!passkey.trim()) {
      setErrorMsg('Please enter the Administrator Security Key.');
      return;
    }

    setIsUnlocking(true);
    setTimeout(() => {
      const res = elevateToAdmin(passkey.trim());
      setIsUnlocking(false);
      if (res.success) {
        setSuccessMsg(res.message);
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  const handleAutofillDemoKey = () => {
    setPasskey(ADMIN_SECURITY_KEY);
    setErrorMsg('');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 animate-in fade-in duration-300">
      
      {/* 403 Security Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950 via-stone-900 to-stone-950 border border-red-500/30 p-8 sm:p-10 shadow-2xl text-white">
        
        {/* Decorative ambient background glows */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-amber-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono font-bold tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              <span>403 FORBIDDEN • RBAC POLICY ENFORCED</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
              <Lock className="w-3.5 h-3.5 text-red-400" />
              <span>Restricted Zone: Admin Gateway</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Access Denied</span>
              <span className="text-sm font-normal px-2.5 py-0.5 rounded-lg bg-red-900/60 border border-red-700/50 text-red-300">
                Administrative Privileges Required
              </span>
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-xl">
              The Porjotok Governance, Verification, and Oversight Console contains sensitive administrative controls. General visitors and unverified accounts cannot view or modify these resources.
            </p>
          </div>

          {/* Current Visitor Identity Card */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-stone-600">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span>{currentUser.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 font-mono">
                    {currentUser.email}
                  </span>
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-stone-400">Current Role:</span>
                  <span className="font-bold text-amber-400 uppercase tracking-wide">
                    {currentRole.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 font-medium shrink-0">
              <UserX className="w-3.5 h-3.5 text-red-400" />
              <span>Unauthorized Persona</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Visitor Dashboard</span>
            </Link>

            <Link
              href="/auth/sign-in"
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors flex items-center gap-2"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In with Admin Account</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Admin Passkey Fast Elevation Gate (For Evaluators & Authorized Personnel) */}
      <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-md space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h2 className="text-base font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-amber-600" />
              <span>Elevate Session with Admin Security Key</span>
            </h2>
            <p className="text-xs text-stone-500">
              Authorized administrators and SIH project evaluators can unlock the console by presenting a valid passkey.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAutofillDemoKey}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto-fill Demo Key</span>
          </button>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
              Admin Security Key / Master Passkey
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="SIH-26197-ADMIN"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono text-xs outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isUnlocking}
            className="w-full py-3 rounded-xl bg-stone-900 hover:bg-black dark:bg-amber-600 dark:hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>{isUnlocking ? 'Verifying Authorization...' : 'Authenticate & Unlock Console'}</span>
          </button>
        </form>

      </div>

    </div>
  );
}
