'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Compass, 
  ShieldCheck, 
  User, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  KeyRound
} from 'lucide-react';
import { usePorjotok } from '@/lib/store/porjotok-context';
import { UserRole } from '@/types';
import { DEMO_USERS } from '@/lib/data/members';

export default function SignInPage() {
  const router = useRouter();
  const { login, isLoggedIn, currentUser } = usePorjotok();
  
  const [selectedPortal, setSelectedPortal] = useState<'VISITOR' | 'MEMBER' | 'ADMIN'>('VISITOR');
  const [memberRole, setMemberRole] = useState<UserRole>('GUIDE');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleQuickLogin = (role: UserRole) => {
    const demo = DEMO_USERS[role];
    setEmail(demo.email);
    setPassword('demo1234');
    if (role === 'ADMIN') {
      setSelectedPortal('ADMIN');
      setAdminKey('SIH-26197-ADMIN');
    } else if (role === 'VISITOR') {
      setSelectedPortal('VISITOR');
    } else {
      setSelectedPortal('MEMBER');
      setMemberRole(role);
    }
    
    setLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      login(demo.email, 'demo1234', role, demo.name);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(role === 'ADMIN' ? '/admin' : '/dashboard');
      }, 500);
    }, 300);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setLoading(true);

    let targetRole: UserRole = 'VISITOR';
    if (selectedPortal === 'ADMIN') {
      targetRole = 'ADMIN';
    } else if (selectedPortal === 'MEMBER') {
      targetRole = memberRole;
    } else {
      targetRole = 'VISITOR';
    }

    setTimeout(() => {
      login(email, password || 'password', targetRole);
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        if (targetRole === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }, 500);
    }, 400);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl gradient-terracotta text-white flex items-center justify-center mx-auto shadow-md">
          <Compass className="w-6 h-6 text-amber-200" />
        </div>
        <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100">
          Sign In to Porjotok
        </h1>
        <p className="text-xs text-stone-500">
          West Bengal Heritage Ecosystem — Role-Aware Cultural Portal
        </p>
      </div>

      {/* Already Logged In Notice */}
      {isLoggedIn && !success && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover border border-amber-300" />
            <div>
              <p className="font-bold text-amber-900 dark:text-amber-200">Currently active as {currentUser.name}</p>
              <p className="text-[11px] text-amber-700 dark:text-amber-400">Role: {currentUser.role.replace('_', ' ')}</p>
            </div>
          </div>
          <Link
            href={currentUser.role === 'ADMIN' ? '/admin' : '/dashboard'}
            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0"
          >
            Go to {currentUser.role === 'ADMIN' ? 'Admin' : 'Dashboard'} →
          </Link>
        </div>
      )}

      {/* Quick 1-Click Role Logins (SIH Demo Helper) */}
      <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700/60 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Instant Demo Logins (1-Click)</span>
          </span>
          <span className="text-[10px] text-stone-400">Click any persona to log in:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin('VISITOR')}
            className="p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-amber-500 text-left transition-colors group cursor-pointer"
          >
            <span className="block text-[11px] font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600">Tourist</span>
            <span className="block text-[9px] text-stone-400 truncate">Ananya Sen</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('GUIDE')}
            className="p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-amber-500 text-left transition-colors group cursor-pointer"
          >
            <span className="block text-[11px] font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600">ASI Guide</span>
            <span className="block text-[9px] text-stone-400 truncate">Sourav Ganguly</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('LOCAL_FOOD_MERCHANT')}
            className="p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-amber-500 text-left transition-colors group cursor-pointer"
          >
            <span className="block text-[11px] font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600">Sweet Merchant</span>
            <span className="block text-[9px] text-stone-400 truncate">Nobin Sweets</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('LOCAL_ITEM_SELLER')}
            className="p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-amber-500 text-left transition-colors group cursor-pointer"
          >
            <span className="block text-[11px] font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600">Craft Seller</span>
            <span className="block text-[9px] text-stone-400 truncate">Rupali Das</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('ARTIST')}
            className="p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-amber-500 text-left transition-colors group cursor-pointer"
          >
            <span className="block text-[11px] font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600">Baul Artist</span>
            <span className="block text-[9px] text-stone-400 truncate">Subhadra Baul</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('ADMIN')}
            className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 hover:border-red-500 text-left transition-colors group cursor-pointer"
          >
            <span className="block text-[11px] font-bold text-red-900 dark:text-red-200 group-hover:text-red-600">System Admin</span>
            <span className="block text-[9px] text-red-500 dark:text-red-400 truncate">Moderator</span>
          </button>
        </div>
      </div>

      {/* Portal Switcher Tabs */}
      <div className="grid grid-cols-3 p-1 rounded-2xl bg-stone-100 dark:bg-stone-800 text-xs font-bold text-center">
        <button
          type="button"
          onClick={() => {
            setSelectedPortal('VISITOR');
            setEmail('ananya.sen@example.com');
          }}
          className={`py-2 rounded-xl transition-all cursor-pointer ${
            selectedPortal === 'VISITOR' 
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' 
              : 'text-stone-500'
          }`}
        >
          Traveler / Visitor
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedPortal('MEMBER');
            setEmail('sourav.heritage@example.com');
          }}
          className={`py-2 rounded-xl transition-all cursor-pointer ${
            selectedPortal === 'MEMBER' 
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' 
              : 'text-stone-500'
          }`}
        >
          Provider / Member
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedPortal('ADMIN');
            setEmail('admin.heritage@wb.gov.in');
            setAdminKey('SIH-26197-ADMIN');
          }}
          className={`py-2 rounded-xl transition-all cursor-pointer ${
            selectedPortal === 'ADMIN' 
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' 
              : 'text-stone-500'
          }`}
        >
          Admin Console
        </button>
      </div>

      {/* Form Container */}
      <form onSubmit={handleLogin} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-4 text-xs">
        
        {/* Portal-specific notice */}
        {selectedPortal === 'ADMIN' && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-300 space-y-1">
            <span className="font-bold block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              State Heritage Moderator Gateway
            </span>
            <p className="text-[11px]">
              Access restricted to authorized moderators for member approvals, campaign audits, and civic governance.
            </p>
          </div>
        )}

        {selectedPortal === 'MEMBER' && (
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300">Member Category</label>
            <select
              value={memberRole}
              onChange={(e) => {
                const r = e.target.value as UserRole;
                setMemberRole(r);
                if (DEMO_USERS[r]) setEmail(DEMO_USERS[r].email);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium"
            >
              <option value="GUIDE">Verified Heritage Guide</option>
              <option value="WORKSHOP_CONDUCTOR">Workshop Conductor / Master Artisan</option>
              <option value="LOCAL_FOOD_MERCHANT">Local Sweet & Food Merchant</option>
              <option value="LOCAL_ITEM_SELLER">Handloom / Craft Guild Seller</option>
              <option value="CLEANLINESS_CREW">Cleanliness Crew Coordinator</option>
              <option value="ARTIST">Folk Artist / Traditional Performer</option>
              <option value="RESEARCHER">Heritage Researcher (Non-commercial)</option>
            </select>
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label className="font-semibold text-stone-700 dark:text-stone-300">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={selectedPortal === 'ADMIN' ? 'admin.heritage@wb.gov.in' : 'your.email@example.com'}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:border-amber-500"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="font-semibold text-stone-700 dark:text-stone-300">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Admin Allowlist Key if Admin portal */}
        {selectedPortal === 'ADMIN' && (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-stone-700 dark:text-stone-300">Admin Secret Key (Allowlist Verification)</label>
              <button 
                type="button" 
                onClick={() => setAdminKey('SIH-26197-ADMIN')}
                className="text-[10px] text-amber-600 hover:underline cursor-pointer"
              >
                Auto-Fill Demo Key
              </button>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="SIH-26197-ADMIN"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
              />
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Authentication successful! Redirecting...</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {loading ? (
            <span>Signing In...</span>
          ) : (
            <>
              <span>Sign In as {selectedPortal === 'MEMBER' ? memberRole.replace('_', ' ') : selectedPortal}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        <div className="text-center pt-2 text-stone-400">
          <span>Don&apos;t have an account yet? </span>
          <Link href="/auth/sign-up" className="font-bold text-amber-600 hover:underline">
            Register as Visitor or Member
          </Link>
        </div>
      </form>

    </div>
  );
}
