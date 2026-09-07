import React from 'react';
import Link from 'next/link';
import { Compass, Heart, ShieldCheck, PhoneCall, Sparkles, MapPin } from 'lucide-react';

export function Footer() {
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
                  Porjotok
                  <span className="text-xs px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-normal">
                    পর্যটক
                  </span>
                </span>
                <span className="text-[10px] text-stone-400 font-medium">
                  Smart India Hackathon • Problem Statement 26197
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Porjotok is West Bengal’s digital heritage, living culture, tourism, and community ecosystem. 
              Connecting travelers with verified local guides, artisans, sweetmakers, and green cleanliness crews while preserving our timeless historical archives.
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
                <span>WB Tourism Helpline: 1800-212-1655 (24x7 Toll-Free)</span>
              </div>
            </div>
          </div>

          {/* Quick Discovery */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Discovery</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/heritage" className="hover:text-amber-300 transition-colors">55+ Canonical Heritage Sites</Link></li>
              <li><Link href="/culture" className="hover:text-amber-300 transition-colors">Living Traditions & Festivals</Link></li>
              <li><Link href="/knowledge" className="hover:text-amber-300 transition-colors">Knowledge Encyclopedia</Link></li>
              <li><Link href="/history" className="hover:text-amber-300 transition-colors">Timeline of Bengal History</Link></li>
              <li><Link href="/map" className="hover:text-amber-300 transition-colors">Interactive Geospatial Map</Link></li>
              <li><Link href="/photos" className="hover:text-amber-300 transition-colors">Archival Photography</Link></li>
              <li><Link href="/videos" className="hover:text-amber-300 transition-colors">Cultural Video Archive</Link></li>
            </ul>
          </div>

          {/* Community Marketplace */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Marketplace</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/guides" className="hover:text-amber-300 transition-colors">Verified ASI & Local Guides</Link></li>
              <li><Link href="/workshops" className="hover:text-amber-300 transition-colors">Artisan Craft Workshops</Link></li>
              <li><Link href="/food" className="hover:text-amber-300 transition-colors">Authentic Bengali Sweets & Food</Link></li>
              <li><Link href="/local-items" className="hover:text-amber-300 transition-colors">Baluchari & Dokra Handicrafts</Link></li>
              <li><Link href="/artists" className="hover:text-amber-300 transition-colors">Baul & Chhau Folk Artists</Link></li>
              <li><Link href="/cleanliness" className="hover:text-amber-300 transition-colors">Clean Ghats & Fundraisers</Link></li>
            </ul>
          </div>

          {/* Interactive & AI */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Interactive AI</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/ai" className="hover:text-amber-300 transition-colors flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-amber-400" /> AI Heritage Assistant</Link></li>
              <li><Link href="/ai/trip-planner" className="hover:text-amber-300 transition-colors">AI Personalized Trip Planner</Link></li>
              <li><Link href="/landmark" className="hover:text-amber-300 transition-colors">Landmark Recognition Scanner</Link></li>
              <li><Link href="/quiz" className="hover:text-amber-300 transition-colors">Bengal Heritage Quiz & Points</Link></li>
              <li><Link href="/crosswords" className="hover:text-amber-300 transition-colors">Cultural Crossword Puzzle</Link></li>
              <li><Link href="/certificates/WS-7821" className="hover:text-amber-300 transition-colors">Public Certificate Verification</Link></li>
              <li><Link href="/admin" className="hover:text-amber-300 transition-colors">Administrator Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Porjotok. Dedicated to the living culture and heritage of West Bengal.</p>
          <div className="flex items-center gap-6">
            <Link href="/auth/sign-in" className="hover:text-stone-300">Sign In</Link>
            <Link href="/auth/sign-up" className="hover:text-stone-300">Join as Member</Link>
            <Link href="/dashboard" className="hover:text-stone-300">Visitor Dashboard</Link>
            <Link href="/admin" className="hover:text-stone-300">Admin Console</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
