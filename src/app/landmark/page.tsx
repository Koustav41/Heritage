'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Camera, 
  Sparkles, 
  Upload, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ArrowRight,
  RotateCcw,
  Landmark
} from 'lucide-react';
import { CANONICAL_HERITAGE_SITES } from '@/lib/data/heritage-sites';
import { HeritageSite } from '@/types';

interface SampleScan {
  name: string;
  image: string;
  matchedSlug: string;
  confidence: number;
}

const SAMPLE_SCANS: SampleScan[] = [
  {
    name: 'Victoria Memorial, Kolkata',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80',
    matchedSlug: 'victoria-memorial',
    confidence: 98.6
  },
  {
    name: 'Rasmancha Pyramidal Temple, Bishnupur',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    matchedSlug: 'rasmancha',
    confidence: 97.2
  },
  {
    name: 'Darjeeling Himalayan Steam Toy Train',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    matchedSlug: 'darjeeling-himalayan-railway',
    confidence: 99.1
  },
  {
    name: 'Sundarbans National Park Delta Mangroves',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    matchedSlug: 'sundarbans-national-park',
    confidence: 96.4
  }
];

export default function LandmarkScannerPage() {
  const [activeScan, setActiveScan] = useState<SampleScan | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const matchedSite: HeritageSite | undefined = activeScan 
    ? CANONICAL_HERITAGE_SITES.find(s => s.slug === activeScan.matchedSlug)
    : undefined;

  const triggerScan = (sample: SampleScan) => {
    setActiveScan(sample);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <Camera className="w-3.5 h-3.5" />
          <span>Vision AI • Real-Time Architectural Landmark Identification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          AI Landmark Recognition Scanner
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          Upload or capture an image of any monument or heritage structure in West Bengal. Our neural vision model matches candidates against Parampara’s 55 verified canonical records.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Scanner & Upload Area (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Upload / Active image viewport */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-700 flex flex-col items-center justify-center p-6 text-center group">
            {activeScan ? (
              <>
                <img src={activeScan.image} alt="Scanned landmark" className="w-full h-full object-cover" />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-3">
                    <Sparkles className="w-10 h-10 text-amber-400 animate-spin" />
                    <p className="font-bold text-sm">Matching against 55 Canonical Heritage Records...</p>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">Upload Landmark Photo</h3>
                <p className="text-xs text-stone-400 max-w-xs">
                  Drag and drop a photo or select one of the test samples below to simulate scanning.
                </p>
              </div>
            )}
          </div>

          {/* Test Samples Chips */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
              Or Try A Sample Heritage Photo:
            </span>
            <div className="grid grid-cols-2 gap-3">
              {SAMPLE_SCANS.map((sample) => (
                <button
                  key={sample.name}
                  onClick={() => triggerScan(sample)}
                  className={`p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    activeScan?.name === sample.name
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-sm'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-50'
                  }`}
                >
                  <img src={sample.image} alt={sample.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                  <div className="text-xs truncate">
                    <div className="font-bold text-stone-900 dark:text-stone-100 truncate">{sample.name.split(',')[0]}</div>
                    <div className="text-stone-400 text-[10px]">Test Photo</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Recognition Results (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {matchedSite && !isAnalyzing ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6 animate-in fade-in">
              
              {/* Confidence Match Banner */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    High-Confidence Landmark Match
                  </span>
                </div>
                <span className="text-xs font-mono font-black text-emerald-700 dark:text-emerald-300">
                  {activeScan?.confidence}% Match
                </span>
              </div>

              {/* Landmark Identification Card */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  {matchedSite.district} District • {matchedSite.historicalPeriod}
                </span>
                <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100">
                  {matchedSite.name}
                </h2>
                {matchedSite.bengaliName && (
                  <p className="text-sm text-stone-400 font-medium">{matchedSite.bengaliName}</p>
                )}
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed pt-1">
                  {matchedSite.shortDescription}
                </p>
              </div>

              {/* Architectural Highlights */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-2">
                <div className="font-bold text-stone-800 dark:text-stone-200">Architectural Context:</div>
                <p className="text-stone-600 dark:text-stone-300">{matchedSite.architecturalSignificance}</p>
                
                <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Visiting: {matchedSite.visitingHours}</span>
                  <span>Fee: {matchedSite.entryFee.split('+')[0]}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/heritage/${matchedSite.slug}`}
                  className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
                >
                  <span>Explore Full Archive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/guides"
                  className="px-4 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 font-bold text-xs transition-colors"
                >
                  Find Nearby Guides
                </Link>
              </div>

            </div>
          ) : (
            <div className="py-24 text-center text-stone-400 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
              <Camera className="w-12 h-12 mx-auto text-amber-600/40" />
              <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
                Ready to Analyze Architecture
              </h3>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                Select any of the sample landmark photos on the left to test real-time vision identification.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
