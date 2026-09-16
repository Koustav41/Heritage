'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Compass, ShieldCheck, User, Mail, Phone, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { usePorjotok } from '@/lib/store/porjotok-context';
import { UserRole } from '@/types';

export default function SignUpPage() {
  const router = useRouter();
  const { registerUser } = usePorjotok();

  const [accountType, setAccountType] = useState<'VISITOR' | 'MEMBER'>('VISITOR');
  const [memberCategory, setMemberCategory] = useState<UserRole>('GUIDE');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Kolkata');
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const roleToSet = accountType === 'MEMBER' ? memberCategory : 'VISITOR';
    registerUser({
      name: name || 'Traveler',
      email: email || 'user@example.com',
      phone: phone || '+91 98300 00000',
      role: roleToSet,
      district
    });
    setRegisteredSuccess(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl gradient-terracotta text-white flex items-center justify-center mx-auto shadow-md">
          <Compass className="w-6 h-6 text-amber-200" />
        </div>
        <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100">
          Create Parampara Account
        </h1>
        <p className="text-xs text-stone-500">
          Join India's premier cultural tourism & community heritage ecosystem
        </p>
      </div>

      {/* Account Type Tabs */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-stone-100 dark:bg-stone-800 text-xs font-bold text-center">
        <button
          type="button"
          onClick={() => setAccountType('VISITOR')}
          className={`py-2 rounded-xl transition-all ${
            accountType === 'VISITOR' 
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' 
              : 'text-stone-500'
          }`}
        >
          Traveler / Visitor
        </button>
        <button
          type="button"
          onClick={() => setAccountType('MEMBER')}
          className={`py-2 rounded-xl transition-all ${
            accountType === 'MEMBER' 
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' 
              : 'text-stone-500'
          }`}
        >
          Local Member / Provider
        </button>
      </div>

      {registeredSuccess ? (
        <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">Welcome to Parampara, {name}!</h3>
          <p className="text-xs text-stone-500">
            {accountType === 'MEMBER'
              ? 'Your provider application is logged as PENDING_VERIFICATION. Administrative moderators verify credentials within 24 hours.'
              : 'Your traveler account is active with 420 welcome discovery points!'}
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-3 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-md"
          >
            Enter Dashboard →
          </button>
        </div>
      ) : (
        <form onSubmit={handleRegister} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-4 text-xs">
          
          {accountType === 'MEMBER' && (
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 dark:text-stone-300">Enlistment Category</label>
              <select
                value={memberCategory}
                onChange={(e) => setMemberCategory(e.target.value as UserRole)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium"
              >
                <option value="GUIDE">Local / ASI Heritage Guide</option>
                <option value="WORKSHOP_CONDUCTOR">Workshop Conductor / Master Artisan</option>
                <option value="LOCAL_FOOD_MERCHANT">Confectioner / Food Merchant</option>
                <option value="LOCAL_ITEM_SELLER">Handloom / Craft Seller</option>
                <option value="CLEANLINESS_CREW">Cleanliness Crew Lead</option>
                <option value="ARTIST">Folk Artist / Performer</option>
                <option value="RESEARCHER">Academic / Cultural Researcher</option>
              </select>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300">Phone Number (Indian Mobile)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98XXX XXXXX"
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300">District Base</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium"
            >
              {['Kolkata', 'Bankura', 'Birbhum', 'Darjeeling', 'Murshidabad', 'Malda', 'Howrah', 'Hooghly', 'Purulia', 'South 24 Parganas'].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {accountType === 'MEMBER' && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                UIDAI / Verification Privacy Note (Rule 9)
              </span>
              <p className="text-[11px] leading-relaxed">
                Parampara never stores raw Aadhaar numbers. Identity verification tokens are securely cross-checked with certified state registries.
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="text-center pt-2 text-stone-400">
            <span>Already registered? </span>
            <Link href="/auth/sign-in" className="font-bold text-amber-600 hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      )}

    </div>
  );
}
