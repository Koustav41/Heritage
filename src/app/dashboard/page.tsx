'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Award, 
  Calendar, 
  ShoppingBag, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Heart, 
  ArrowRight,
  TrendingUp,
  DollarSign,
  Plus,
  BookOpen,
  QrCode,
  Compass,
  FileText,
  Package,
  Music,
  Lock
} from 'lucide-react';
import { usePorjotok } from '@/lib/store/porjotok-context';
import { UserRole } from '@/types';
import { canAccessProfileControls } from '@/lib/auth/rbac';
import { ProviderAccessDenied } from '@/components/ProviderAccessDenied';
import { CANONICAL_HERITAGE_SITES } from '@/lib/data/heritage-sites';
import { HeritageSiteImage } from '@/components/HeritageSiteImage';
import { CANONICAL_WORKSHOPS } from '@/lib/data/workshops';
import { CANONICAL_FOOD_ITEMS } from '@/lib/data/food-items';
import { CANONICAL_PRODUCTS } from '@/lib/data/products';

export default function UnifiedDashboardPage() {
  const { 
    isLoggedIn,
    currentRole, 
    setCurrentRole,
    currentUser, 
    bookings, 
    cancelBooking,
    orders, 
    updateOrderStatus, 
    userPoints, 
    savedSiteSlugs,
    fundraisers,
    cancelBooking: removeBk
  } = usePorjotok();

  const [activeTab, setActiveTab] = useState<string>('OVERVIEW');
  const [newFundraiserModal, setNewFundraiserModal] = useState(false);

  // Saved sites
  const savedSites = CANONICAL_HERITAGE_SITES.filter(s => savedSiteSlugs.includes(s.slug));

  const isAuthorizedForCurrentPortal = canAccessProfileControls(currentUser.role, currentRole);

  const PORTAL_TABS: { role: UserRole; label: string; isProtected: boolean }[] = [
    { role: 'VISITOR', label: 'Traveler Profile', isProtected: false },
    { role: 'LOCAL_FOOD_MERCHANT', label: 'Food Merchant', isProtected: true },
    { role: 'GUIDE', label: 'ASI Guide', isProtected: true },
    { role: 'WORKSHOP_CONDUCTOR', label: 'Workshop Master', isProtected: true },
    { role: 'LOCAL_ITEM_SELLER', label: 'Crafts & Handloom', isProtected: true },
    { role: 'CLEANLINESS_CREW', label: 'Cleanliness Crew', isProtected: true },
    { role: 'ARTIST', label: 'Folk Artiste', isProtected: true },
    { role: 'RESEARCHER', label: 'Researcher', isProtected: true }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Guest Mode Banner if not logged in */}
      {!isLoggedIn && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-amber-900 dark:text-amber-200 block">Previewing Dashboard in Guest Mode</span>
            <span className="text-amber-700 dark:text-amber-400 text-[11px]">
              Sign in with an authenticated account to save custom itineraries, place verified sweet orders, and receive official certificates.
            </span>
          </div>
          <Link
            href="/auth/sign-in"
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 self-start sm:self-center"
          >
            Sign In Now →
          </Link>
        </div>
      )}

      {/* Top Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-500 shadow-md">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">{currentUser.name}</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold uppercase tracking-wider">
                {currentRole.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">{currentUser.email} • {currentUser.district} District</p>
            {currentUser.bio && (
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-xl">{currentUser.bio}</p>
            )}
          </div>
        </div>

        {/* Stats on Right */}
        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-stone-200 dark:border-stone-800 pt-4 md:pt-0 md:pl-6">
          <div>
            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Points Wallet</span>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400">🪙 {userPoints}</span>
          </div>

          <div>
            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Listing State</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified & Active
            </span>
          </div>
        </div>
      </div>

      {/* Portal Selection & RBAC Boundary Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Portal Profile View
          </span>
          <span className="text-[11px] text-stone-400 font-mono">
            Authenticated As: <strong className="text-stone-700 dark:text-stone-300 uppercase">{currentUser.role.replace('_', ' ')}</strong>
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pb-2 border-b border-stone-200 dark:border-stone-800">
          {PORTAL_TABS.map((tab) => {
            const hasAccess = canAccessProfileControls(currentUser.role, tab.role);
            return (
              <button
                key={tab.role}
                onClick={() => setCurrentRole(tab.role)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentRole === tab.role
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                {!hasAccess && <Lock className="w-3 h-3 text-stone-400" />}
                <span>{tab.label}</span>
                {tab.isProtected && !hasAccess && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 font-mono">
                    Protected
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* RBAC Provider Gate: If active session is not authorized for this profile console */}
      {!isAuthorizedForCurrentPortal && (
        <ProviderAccessDenied 
          targetRole={currentRole} 
          onSwitchToVisitor={() => setCurrentRole('VISITOR')} 
        />
      )}

      {/* ========================================================= */}
      {/* 1. VISITOR ROLE VIEW */}
      {/* ========================================================= */}
      {currentRole === 'VISITOR' && (
        <div className="space-y-10">
          
          {/* Active Bookings & Itinerary */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>My Active Bookings ({bookings.length})</span>
            </h2>

            {bookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookings.map((bk) => (
                  <div
                    key={bk.id}
                    className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-[10px] font-bold">
                          {bk.serviceType}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          bk.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {bk.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">{bk.itemTitle}</h3>
                      <p className="text-xs text-stone-500">Provider: {bk.providerName}</p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-stone-400 block text-[10px]">Scheduled Date</span>
                        <span className="font-medium text-stone-800 dark:text-stone-200">{bk.date} ({bk.time || 'All Day'})</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-stone-900 dark:text-stone-100">₹{bk.totalAmount}</span>
                        {bk.status === 'CONFIRMED' && (
                          <button
                            onClick={() => cancelBooking(bk.id)}
                            className="text-[11px] text-red-600 hover:underline"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400">No active bookings yet. Explore guides and workshops to reserve tours.</p>
            )}
          </div>

          {/* Orders & Sweets Tracker */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-600" />
              <span>Orders & Sweet Deliveries ({orders.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-amber-600">{ord.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ord.status === 'READY' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      STATUS: {ord.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-stone-800 dark:text-stone-200">{ord.merchantName}</h4>
                    <p className="text-[11px] text-stone-500">{ord.items.map(i => `${i.title} (x${i.quantity})`).join(', ')}</p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                    <span className="text-stone-400">{ord.orderDate}</span>
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">₹{ord.totalAmount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Earned Certificates */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Earned Workshop Certificates</span>
            </h2>

            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    Ancient Dokra Lost-Wax Bell Metal Casting Certificate
                  </h4>
                  <p className="text-xs text-stone-500">Recipient: Ananya Sen • Conducted by Master Shyamal Karmakar</p>
                </div>
              </div>

              <Link
                href="/certificates/WS-7821"
                className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors shrink-0"
              >
                View & Verify QR →
              </Link>
            </div>
          </div>

          {/* Saved Places */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Bookmarked Heritage Landmarks ({savedSites.length})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {savedSites.map(site => (
                <Link
                  key={site.id}
                  href={`/heritage/${site.slug}`}
                  className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:border-amber-400 transition-all block group"
                >
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-2">
                    <HeritageSiteImage site={site} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600 truncate">{site.name}</h4>
                  <p className="text-xs text-stone-400">{site.district} • {site.historicalPeriod}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* 2. LOCAL FOOD MERCHANT ROLE VIEW (WITH LIVE ACCEPT/REJECT) */}
      {/* ========================================================= */}
      {isAuthorizedForCurrentPortal && currentRole === 'LOCAL_FOOD_MERCHANT' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
              Live Incoming Orders (Merchant Console)
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Merchant Store Open
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-amber-600">{ord.id}</span>
                      <span className="text-xs font-semibold text-stone-500">Customer: {ord.customerName}</span>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">Address: {ord.deliveryAddress}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400">Status:</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      {ord.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-bold text-stone-700 dark:text-stone-300">Order Items:</span>
                  {ord.items.map(item => (
                    <div key={item.id} className="flex justify-between text-stone-600 dark:text-stone-400">
                      <span>{item.title} (x{item.quantity})</span>
                      <span className="font-medium">₹{item.unitPrice * item.quantity}</span>
                    </div>
                  ))}
                  <div className="pt-2 flex justify-between font-bold text-sm text-stone-900 dark:text-stone-100 border-t border-stone-100 dark:border-stone-800">
                    <span>Total Amount:</span>
                    <span>₹{ord.totalAmount}</span>
                  </div>
                </div>

                {/* Merchant Actions: Accept, Preparing, Ready, Reject */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'ACCEPTED')}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Accept Order
                  </button>
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'PREPARING')}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Mark Preparing
                  </button>
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'READY')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Mark Ready for Pickup
                  </button>
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'CANCELLED')}
                    className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 hover:bg-rose-200 text-xs font-bold cursor-pointer"
                  >
                    Deny / Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. VERIFIED GUIDE ROLE VIEW */}
      {/* ========================================================= */}
      {isAuthorizedForCurrentPortal && currentRole === 'GUIDE' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-400 font-bold block">Tours Conducted</span>
              <span className="text-2xl font-black text-stone-900 dark:text-stone-100">142</span>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-400 font-bold block">Client Rating</span>
              <span className="text-2xl font-black text-amber-500">★ 4.9 / 5.0</span>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-400 font-bold block">Monthly Circuit Revenue</span>
              <span className="text-2xl font-black text-emerald-600">₹46,800</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Upcoming Assigned Tours</h3>
          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
            <div className="flex justify-between items-center font-semibold">
              <span>Bishnupur Terracotta Circuit • Oct 12, 2026</span>
              <span className="text-emerald-600">Confirmed (2 Pax)</span>
            </div>
            <p className="text-stone-500">Client: Ananya Sen • Starts at Rasmancha Ticket Gate at 09:00 AM</p>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. WORKSHOP CONDUCTOR ROLE VIEW */}
      {/* ========================================================= */}
      {isAuthorizedForCurrentPortal && currentRole === 'WORKSHOP_CONDUCTOR' && (
        <div className="space-y-6">
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">Scheduled Masterclasses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CANONICAL_WORKSHOPS.slice(0, 2).map(ws => (
              <div key={ws.id} className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-sm text-stone-900 dark:text-stone-100">{ws.title}</span>
                  <span className="text-amber-600">{ws.enrolledCount} / {ws.capacity} Enrolled</span>
                </div>
                <p className="text-stone-500">{ws.date} • {ws.venue}</p>
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex justify-between">
                  <span>Revenue: ₹{ws.price * ws.enrolledCount}</span>
                  <button className="text-amber-600 font-bold hover:underline">Issue QR Certificates</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. LOCAL ITEM SELLER (HANDLOOM & CRAFTS) VIEW */}
      {/* ========================================================= */}
      {isAuthorizedForCurrentPortal && currentRole === 'LOCAL_ITEM_SELLER' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
              Handloom & Dokra Seller Console (Live Inventory)
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
              Guild Storefront Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-400 font-bold block">Active Craft Catalog</span>
              <span className="text-2xl font-black text-stone-900 dark:text-stone-100">{CANONICAL_PRODUCTS.length} GI Items</span>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-400 font-bold block">Total Units In Stock</span>
              <span className="text-2xl font-black text-amber-600">84 Pieces</span>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-400 font-bold block">Fulfilled Guild Orders</span>
              <span className="text-2xl font-black text-emerald-600">₹82,400</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CANONICAL_PRODUCTS.slice(0, 4).map(prod => (
              <div key={prod.id} className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 text-[10px] font-bold">
                    {prod.category}
                  </span>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{prod.name}</h4>
                  <p className="text-stone-500">Stock Available: {prod.stock} units • Price: ₹{prod.price}</p>
                </div>
                <button className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 font-bold shrink-0">
                  Update Stock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. CLEANLINESS CREW ROLE VIEW */}
      {/* ========================================================= */}
      {isAuthorizedForCurrentPortal && currentRole === 'CLEANLINESS_CREW' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">Crew Cleanliness Dashboard</h2>
            <button 
              onClick={() => setNewFundraiserModal(true)}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Cleanliness Fundraiser</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-400 font-bold block">Ghat Cleanups Completed</span>
              <span className="text-2xl font-black text-stone-900 dark:text-stone-100">88</span>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-400 font-bold block">Waste Diverted to Compost</span>
              <span className="text-2xl font-black text-teal-600">14,200 kg</span>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-400 font-bold block">Volunteer Force</span>
              <span className="text-2xl font-black text-stone-900 dark:text-stone-100">45 Youth</span>
            </div>
          </div>

          {newFundraiserModal && (
            <div className="p-6 rounded-3xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-teal-900 dark:text-teal-200">New Cleanliness Campaign Proposal</h4>
                <button onClick={() => setNewFundraiserModal(false)}><XCircle className="w-4 h-4 text-teal-700" /></button>
              </div>
              <p className="text-stone-600 dark:text-stone-300">
                Rule 3 & 57: Fundraisers created by cleanliness crews require admin approval before becoming publicly visible.
              </p>
              <div className="space-y-2">
                <input type="text" placeholder="Campaign Title" className="w-full p-2 rounded-xl border border-teal-300 bg-white dark:bg-stone-900" />
                <input type="number" placeholder="Target Amount (₹)" className="w-full p-2 rounded-xl border border-teal-300 bg-white dark:bg-stone-900" />
              </div>
              <button 
                onClick={() => {
                  alert('Proposal submitted to Admin Moderation queue!');
                  setNewFundraiserModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs"
              >
                Submit for Admin Verification
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. FOLK ARTIST ROLE VIEW */}
      {/* ========================================================= */}
      {isAuthorizedForCurrentPortal && currentRole === 'ARTIST' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
              Folk Artiste & Troupe Operations Hub
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">
              Available for Booking
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-400 font-bold block">Heritage Recitals</span>
              <span className="text-2xl font-black text-stone-900 dark:text-stone-100">64 Performances</span>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-400 font-bold block">Standard Performance Fee</span>
              <span className="text-2xl font-black text-purple-600">₹8,500</span>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-400 font-bold block">Art Form Heritage</span>
              <span className="text-2xl font-black text-amber-600">Baul / Fakiri</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3 text-xs">
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">Upcoming Cultural Bookings</h4>
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-stone-900 dark:text-stone-100">Poush Mela Acoustic Evening Performance</p>
                <p className="text-stone-500">Santiniketan Ashram Grounds • Dec 24, 2026 • 06:30 PM</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                Contract Confirmed
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. RESEARCHER ROLE VIEW */}
      {/* ========================================================= */}
      {isAuthorizedForCurrentPortal && currentRole === 'RESEARCHER' && (
        <div className="space-y-6">
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
            Cultural Research Contributions (Rule 4: Not Bookable)
          </h2>
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3 text-xs">
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">Submitted Knowledge Entries</h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800 flex justify-between items-center">
                <span>Maritime Ports of Ancient Chandraketugarh</span>
                <span className="text-emerald-600 font-bold">✓ Published in Encyclopedia</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800 flex justify-between items-center">
                <span>Terracotta Iconography of Malla Dynastic Temples</span>
                <span className="text-emerald-600 font-bold">✓ Published in Encyclopedia</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
