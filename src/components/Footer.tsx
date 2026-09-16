'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Heart, ShieldCheck, PhoneCall, Sparkles, MapPin, Lock, Globe, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';

export function Footer() {
  const { language, setLanguage, supportedLanguages, currentLanguageMeta, t } = useLanguage();

  return (
    <footer className="w-full bg-stone-900 text-stone-300 border-t border-stone-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand & Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gradient-terracotta flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5 text-amber-200" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white tracking-tight flex items-center gap-1.5">
                  <span className="notranslate" translate="no">Parampara</span>
                  {language !== 'en' && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-normal notranslate" translate="no">
                      {currentLanguageMeta.nativeName}
                    </span>
                  )}
                </span>
                <span className="text-[10px] text-stone-400 font-medium">
                  {t('footer_tagline')}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              <span className="notranslate" translate="no">Parampara</span> is India’s digital heritage, living culture, tourism, and community ecosystem.
              Connecting travelers with verified local guides, artisans, regional food merchants, and green cleanliness crews while preserving our timeless historical archives across all Indian states.
            </p>

            <div className="pt-2 text-xs space-y-1.5 text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Local Guides & Handloom Artisans</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                <span>100% Community-Rooted Tourism Economy</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <span>National Tourism Helpline: 1363 (24x7 Multi-lingual)</span>
              </div>
            </div>
          </div>

          {/* Quick Discovery */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">{t('nav_explore')}</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/heritage" className="hover:text-amber-300 transition-colors">85+ Canonical Heritage Sites</Link></li>
              <li><Link href="/culture" className="hover:text-amber-300 transition-colors">Living Traditions & Festivals</Link></li>
              <li><Link href="/knowledge" className="hover:text-amber-300 transition-colors">Knowledge Encyclopedia</Link></li>
              <li><Link href="/history" className="hover:text-amber-300 transition-colors">Timeline of Indian History</Link></li>
              <li><Link href="/map" className="hover:text-amber-300 transition-colors">Interactive Geospatial Map</Link></li>
              <li><Link href="/photos" className="hover:text-amber-300 transition-colors">Archival Photography</Link></li>
              <li><Link href="/videos" className="hover:text-amber-300 transition-colors">Cultural Video Archive</Link></li>
            </ul>
          </div>

          {/* Community Marketplace */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Marketplace</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/guides" className="hover:text-amber-300 transition-colors">{t('nav_guides')}</Link></li>
              <li><Link href="/workshops" className="hover:text-amber-300 transition-colors">{t('nav_workshops')}</Link></li>
              <li><Link href="/food" className="hover:text-amber-300 transition-colors">{t('nav_food')}</Link></li>
              <li><Link href="/local-items" className="hover:text-amber-300 transition-colors">{t('nav_crafts')}</Link></li>
              <li><Link href="/artists" className="hover:text-amber-300 transition-colors">Traditional & Folk Artists</Link></li>
              <li><Link href="/cleanliness" className="hover:text-amber-300 transition-colors">Clean Ghats & Fundraisers</Link></li>
            </ul>
          </div>

          {/* Interactive & AI */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Interactive AI</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/ai" className="hover:text-amber-300 transition-colors flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-amber-400" /> {t('btn_chat_ai')}</Link></li>
              <li><Link href="/ai/trip-planner" className="hover:text-amber-300 transition-colors">{t('nav_trip_planner')}</Link></li>
              <li><Link href="/landmark" className="hover:text-amber-300 transition-colors">{t('btn_scan_landmark')}</Link></li>
              <li><Link href="/quiz" className="hover:text-amber-300 transition-colors">Indian Heritage Quiz & Points</Link></li>
              <li><Link href="/crosswords" className="hover:text-amber-300 transition-colors">Cultural Crossword Puzzle</Link></li>
              <li><Link href="/certificates/WS-7821" className="hover:text-amber-300 transition-colors">Public Certificate Verification</Link></li>
              <li>
                <Link href="/admin" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-red-400 shrink-0" />
                  <span>Administrator Portal</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-800 text-stone-400 font-mono">Restricted</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Indian Languages Selector Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-stone-200">
                {t('select_language')} / भारतीय भाषाएं:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {supportedLanguages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white'
                    }`}
                  >
                    <span className="text-[10px] opacity-70 font-mono">{lang.scriptBadge}</span>
                    <span>{lang.nativeName}</span>
                    {isSelected && <Check className="w-3 h-3 ml-0.5 text-stone-950" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-6 pt-6 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 <span className="notranslate" translate="no">Parampara</span>. {t('footer_rights')}</p>
          <div className="flex items-center gap-6">
            <Link href="/auth/sign-in" className="hover:text-stone-300">{t('signin')}</Link>
            <Link href="/auth/sign-up" className="hover:text-stone-300">{t('register')}</Link>
            <Link href="/dashboard" className="hover:text-stone-300">Visitor Dashboard</Link>
            <Link href="/admin" className="hover:text-stone-300 inline-flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-stone-500" />
              <span>Admin Console</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
