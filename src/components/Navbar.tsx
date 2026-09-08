'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Compass, 
  Search, 
  ShoppingBag, 
  User, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Sparkles, 
  MapPin, 
  HelpCircle, 
  Calendar, 
  ChevronDown,
  ShieldCheck,
  Award,
  LogIn,
  LogOut,
  Lock
} from 'lucide-react';
import { usePorjotok } from '@/lib/store/porjotok-context';
import { UserRole } from '@/types';
import { canAccessProfileControls } from '@/lib/auth/rbac';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenCart: () => void;
}

const ROLE_LABELS: Record<UserRole, { label: string; badgeColor: string }> = {
  VISITOR: { label: 'Visitor', badgeColor: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300' },
  GUIDE: { label: 'Verified Guide', badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' },
  WORKSHOP_CONDUCTOR: { label: 'Workshop Master', badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' },
  LOCAL_FOOD_MERCHANT: { label: 'Food Merchant', badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' },
  LOCAL_ITEM_SELLER: { label: 'Handloom Seller', badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' },
  CLEANLINESS_CREW: { label: 'Cleanliness Crew', badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300' },
  ARTIST: { label: 'Folk Performer', badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' },
  RESEARCHER: { label: 'Researcher', badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' },
  ADMIN: { label: 'System Admin', badgeColor: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 font-bold' }
};

export function Navbar({ onOpenSearch, onOpenCart }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, currentRole, setCurrentRole, currentUser, cart, userPoints, logout } = usePorjotok();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { label: 'Explore', href: '/heritage' },
    { label: 'Culture', href: '/culture' },
    { label: 'Knowledge', href: '/knowledge' },
    { label: 'Map', href: '/map' },
    { label: 'History', href: '/history' },
    { label: 'Workshops', href: '/workshops' },
    { label: 'Guides', href: '/guides' },
    { label: 'Food', href: '/food' },
    { label: 'Crafts', href: '/local-items' },
    { label: 'AI Suite', href: '/ai' }
  ];

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl gradient-terracotta flex items-center justify-center text-white shadow-md shadow-orange-700/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-amber-200" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  Porjotok
                  <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-normal">
                    পর্যটক
                  </span>
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium tracking-wide">
                  West Bengal Heritage Ecosystem
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive 
                        ? 'bg-amber-100/80 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300' 
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & Role Switcher */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 text-stone-600 dark:text-stone-300 text-xs font-medium transition-colors"
              title="Search (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] rounded bg-white dark:bg-stone-900 text-stone-400 border border-stone-200 dark:border-stone-700">
                ⌘K
              </kbd>
            </button>

            {/* Points Badge */}
            <Link
              href="/quiz"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs font-bold hover:bg-amber-100 transition-colors"
              title="Earned Cultural Heritage Points"
            >
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{userPoints} pts</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 text-stone-700 dark:text-stone-300 transition-colors"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 text-stone-700 dark:text-stone-300 transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>

            {/* Sign In Button if Logged Out */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/sign-in"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors"
                >
                  Register
                </Link>
              </div>
            ) : (
              /* User Profile & Role Switcher Dropdown */
              <div className="relative">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-amber-500 transition-all text-left shadow-2xs"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-stone-300 dark:border-stone-700">
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100 leading-tight truncate max-w-[100px]">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
                      {ROLE_LABELS[currentRole].label}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-stone-400 shrink-0" />
                </button>

                {roleDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-stone-900 shadow-2xl border border-stone-200 dark:border-stone-800 p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setRoleDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-800 mb-1">
                      <p className="font-bold text-stone-900 dark:text-stone-100 truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-stone-500 truncate">{currentUser.email}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${ROLE_LABELS[currentRole].badgeColor}`}>
                          {ROLE_LABELS[currentRole].label}
                        </span>
                      </div>
                    </div>

                    <div className="mb-2">
                      <Link
                        href={currentRole === 'ADMIN' ? '/admin' : '/dashboard'}
                        onClick={() => setRoleDropdownOpen(false)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-center transition-colors"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Open {currentRole === 'ADMIN' ? 'Admin Panel' : 'Dashboard'}</span>
                      </Link>
                    </div>

                    <div className="px-3 py-1 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                      Switch Role (SIH Demo)
                    </div>

                    <div className="space-y-0.5 max-h-52 overflow-y-auto pr-1">
                      {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => {
                        const hasAccess = canAccessProfileControls(currentUser.role, role);
                        return (
                          <button
                            key={role}
                            onClick={() => {
                              if (role === 'ADMIN' && currentRole !== 'ADMIN') {
                                router.push('/admin');
                                setRoleDropdownOpen(false);
                                return;
                              }
                              setCurrentRole(role);
                              router.push('/dashboard');
                              setRoleDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                              currentRole === role
                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-bold'
                                : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              {role === 'ADMIN' ? (
                                <ShieldCheck className="w-3 h-3 text-red-500 shrink-0" />
                              ) : !hasAccess ? (
                                <Lock className="w-3 h-3 text-stone-400 shrink-0" />
                              ) : null}
                              <span>{ROLE_LABELS[role].label}</span>
                            </span>
                            {role === 'ADMIN' && currentRole !== 'ADMIN' ? (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-400 font-mono">
                                Passkey
                              </span>
                            ) : !hasAccess ? (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-400 font-mono">
                                Verified
                              </span>
                            ) : null}
                            {currentRole === role && (
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                      <button
                        onClick={() => {
                          logout();
                          setRoleDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-700 dark:text-rose-300 font-bold text-center transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-200 dark:border-stone-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs font-medium text-stone-800 dark:text-stone-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/quiz"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs font-semibold"
            >
              <span>Heritage Quiz & Crossword</span>
              <span>🪙 {userPoints} pts</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href={currentRole === 'ADMIN' ? '/admin' : '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-amber-600 text-white font-semibold text-xs text-center"
                >
                  Go to {currentRole === 'ADMIN' ? 'Admin Console' : 'My Dashboard'} ({currentUser.name})
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 font-semibold text-xs text-center"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/auth/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 rounded-xl bg-amber-600 text-white font-semibold text-xs text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
