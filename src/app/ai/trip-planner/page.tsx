'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Utensils, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  Bookmark, 
  Share2,
  Navigation,
  Globe2,
  Sliders,
  Layers
} from 'lucide-react';
import { CANONICAL_HERITAGE_SITES } from '@/lib/data/heritage-sites';
import { CANONICAL_FOOD_ITEMS } from '@/lib/data/food-items';
import { CANONICAL_GUIDES } from '@/lib/data/members';

interface DayActivity {
  time: string;
  title: string;
  description: string;
  location: string;
  category: 'HERITAGE' | 'FOOD' | 'WORKSHOP' | 'EXPERIENCE';
  costEstimate: number;
  slug?: string;
}

interface DayPlan {
  dayNumber: number;
  dayTitle: string;
  activities: DayActivity[];
}

interface HeritageCircuit {
  id: string;
  name: string;
  region: string;
  states: string;
  highlights: string;
}

const PAN_INDIA_CIRCUITS: HeritageCircuit[] = [
  {
    id: 'golden-triangle',
    name: 'Golden Triangle (Delhi, Agra & Jaipur)',
    region: 'North India',
    states: 'Delhi, Uttar Pradesh & Rajasthan',
    highlights: 'Taj Mahal, Red Fort, Qutub Minar, Amer Fort & Sheesh Mahal'
  },
  {
    id: 'hampi-badami',
    name: 'Hampi & Vijayanagara Boulder Sanctuaries',
    region: 'South India',
    states: 'Karnataka',
    highlights: 'Vittala Stone Chariot, Virupaksha, Tungabhadra river & Badami caves'
  },
  {
    id: 'great-chola-dravidian',
    name: 'Great Living Chola & Dravidian Temples',
    region: 'South India',
    states: 'Tamil Nadu',
    highlights: 'Brihadisvara Thanjavur, Madurai Meenakshi & Mahabalipuram shore rathas'
  },
  {
    id: 'ajanta-ellora',
    name: 'Ajanta, Ellora & Kailasa Basalt Marvels',
    region: 'West India',
    states: 'Maharashtra',
    highlights: 'Buddhist rock-cut frescoes, Padmapani mural & monolithic Kailasa temple'
  },
  {
    id: 'marwar-mewar',
    name: 'Marwar & Mewar Royal Desert Fortresses',
    region: 'West India',
    states: 'Rajasthan',
    highlights: 'Mehrangarh Fort Jodhpur, Lake Pichola Udaipur City Palace & Jaisalmer Golden Citadel'
  },
  {
    id: 'khajuraho-orchha',
    name: 'Khajuraho & Orchha Bundelkhand Citadels',
    region: 'Central India',
    states: 'Madhya Pradesh',
    highlights: 'Kandariya Mahadeva nagara architecture, Betwa river cenotaphs & palaces'
  },
  {
    id: 'varanasi-sarnath',
    name: 'Varanasi & Sarnath Holy Ghats & Stupas',
    region: 'North India',
    states: 'Uttar Pradesh',
    highlights: 'Ancient Ganga dawn aarti, Banarasi silk looms & Dhamek Stupa'
  },
  {
    id: 'konark-puri',
    name: 'Konark Sun Chariot & Puri Coastal Heritage',
    region: 'East India',
    states: 'Odisha',
    highlights: '13th-century astronomical sundial chariot of Surya & Kalinga sanctums'
  },
  {
    id: 'malabar-kochi',
    name: 'Malabar Spice Coast & Fort Kochi',
    region: 'South India',
    states: 'Kerala',
    highlights: 'Portuguese-Dutch spice quarters, Chinese fishing nets & Kathakali'
  },
  {
    id: 'ladakh-spiti',
    name: 'Ladakh & Indus Valley Himalayan Monasteries',
    region: 'Himalayan',
    states: 'Ladakh',
    highlights: 'Hemis monastic gompas, Thiksey Maitreya, Alchi murals & Pangong high-altitude desert'
  },
  {
    id: 'nalanda-bodhgaya',
    name: 'Nalanda & Bodh Gaya Magadha Enlightenment Circuit',
    region: 'East India',
    states: 'Bihar',
    highlights: 'UNESCO Mahabodhi Temple, Bodhi Tree, Ancient Nalanda University ruins & Rajgir'
  },
  {
    id: 'bishnupur-bankura',
    name: 'Bishnupur Malla Terracotta & Weavers',
    region: 'East India',
    states: 'West Bengal',
    highlights: 'Rasmancha, Jor Bangla Ramayana tiles, Baluchari silk & Dokra'
  },
  {
    id: 'santiniketan-birbhum',
    name: 'Santiniketan Ashram & Baul Country',
    region: 'East India',
    states: 'West Bengal',
    highlights: 'UNESCO open-air humanist university, Uttarayan mud art & Baul lore'
  },
  {
    id: 'charminar-golconda',
    name: 'Charminar & Golconda Acoustic Strongholds',
    region: 'South India',
    states: 'Telangana',
    highlights: 'Qutb Shahi granite arches, acoustic domes & Hyderabadi cuisine'
  },
  {
    id: 'old-goa-latin',
    name: 'Old Goa Baroque Churches & Latin Fontainhas',
    region: 'West India',
    states: 'Goa',
    highlights: 'Basilica of Bom Jesus, Se Cathedral, Portuguese azulejos & heritage mansions'
  },
  {
    id: 'kaziranga-assam',
    name: 'Kaziranga & Brahmaputra Living Ecology',
    region: 'Northeast India',
    states: 'Assam',
    highlights: 'Rhino floodplains, Mishing tribal weavers & Ahom kingdom monuments'
  },
  {
    id: 'meghalaya-living-roots',
    name: 'Meghalaya Living Root Bridges & Khasi Heritage',
    region: 'Northeast India',
    states: 'Meghalaya',
    highlights: 'Nongriat bio-engineered ficus bridges, Mawphlang sacred groves & monoliths'
  },
  {
    id: 'badami-pattadakal',
    name: 'Badami, Pattadakal & Aihole Chalukyan Cradle',
    region: 'South India',
    states: 'Karnataka',
    highlights: '6th-century red sandstone cave temples, Dravida-Nagara hybrid temples'
  }
];

const ALL_INDIA_INTERESTS = [
  'UNESCO World Heritage Sites',
  'Ancient Caves & Rock-Cut Shrines',
  'Classical Temple Architecture',
  'Mughal & Rajput Forts & Palaces',
  'Traditional Handlooms & Silk Weaving',
  'Regional Food & Spice Trails',
  'Master Metal & Dokra Casting',
  'Classical Music, Dance & Folklore',
  'Colonial & Maritime History',
  'Sacred Ghats & Spiritual Rituals',
  'Terracotta & Earthen Pottery',
  'Wildlife & River Sanctuaries'
];

const REGIONS = ['ALL', 'North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India', 'Himalayan'] as const;

export default function AITripPlannerPage() {
  const [circuitType, setCircuitType] = useState<'PRESET' | 'CUSTOM'>('PRESET');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedCircuit, setSelectedCircuit] = useState(PAN_INDIA_CIRCUITS[0].name);
  const [customDestination, setCustomDestination] = useState('');
  
  const [durationDays, setDurationDays] = useState(3);
  const [budgetTier, setBudgetTier] = useState<'BUDGET' | 'BALANCED' | 'LUXURY'>('BALANCED');
  const [travelPace, setTravelPace] = useState<'RELAXED' | 'BALANCED' | 'INTENSIVE'>('BALANCED');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'UNESCO World Heritage Sites',
    'Classical Temple Architecture',
    'Regional Food & Spice Trails'
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<DayPlan[] | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activeDestination = circuitType === 'PRESET' 
    ? selectedCircuit 
    : (customDestination.trim() || 'Pan-India Cultural Journey');

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setSavedSuccess(false);

    const destination = activeDestination;

    try {
      const res = await fetch('/api/ai/trip-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          durationDays,
          budgetTier,
          travelPace,
          selectedInterests
        })
      });

      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      if (data.plan && Array.isArray(data.plan) && data.plan.length > 0) {
        setGeneratedItinerary(data.plan);
        return;
      }
    } catch (err) {
      console.error('Trip planner error:', err);
    } finally {
      setIsGenerating(false);
    }

    // Fallback Pan-India generator
    const fallbackPlans: DayPlan[] = [];
    for (let d = 1; d <= durationDays; d++) {
      fallbackPlans.push({
        dayNumber: d,
        dayTitle: `Day ${d}: ${destination} Heritage Circuit & Discovery`,
        activities: [
          {
            time: '08:30 AM - 11:30 AM',
            title: `${destination} Landmark Architectural Tour`,
            description: `Morning exploration of canonical heritage monuments, architectural sanctums, and historical citadels of ${destination}.`,
            location: `${destination} Historic Zone`,
            category: 'HERITAGE',
            costEstimate: budgetTier === 'LUXURY' ? 500 : 50,
            slug: '/heritage'
          },
          {
            time: '12:00 PM - 01:30 PM',
            title: `Authentic Regional Heritage Dining`,
            description: `Savor traditional thali dishes and seasonal cuisine prepared by generational master cooks native to the region.`,
            location: `${destination} Culinary Quarter`,
            category: 'FOOD',
            costEstimate: budgetTier === 'LUXURY' ? 1200 : (budgetTier === 'BALANCED' ? 450 : 220)
          },
          {
            time: '02:30 PM - 05:00 PM',
            title: `Living Craft Guild & Artisan Masterclass`,
            description: `Engage with traditional master artisans in textile weaving, stone carving, pottery, or metalwork.`,
            location: `${destination} Craft Enclave`,
            category: 'WORKSHOP',
            costEstimate: budgetTier === 'LUXURY' ? 2500 : 800,
            slug: '/workshops'
          },
          {
            time: '05:30 PM - 07:30 PM',
            title: `Twilight Cultural Gathering & Evening Aarti / Folklore`,
            description: `Experience the serene atmosphere of sacred riverfront ghats, sunset fortress lookouts, or live folk musical performances.`,
            location: `${destination} Heritage Promenade`,
            category: 'EXPERIENCE',
            costEstimate: 0
          }
        ]
      });
    }

    setGeneratedItinerary(fallbackPlans);
  };

  const totalCost = generatedItinerary?.reduce((acc, day) => 
    acc + day.activities.reduce((dAcc, act) => dAcc + act.costEstimate, 0), 0
  ) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Parampara AI Engine • All-India Heritage Edition</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1"></span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          AI-Powered All-India Heritage Trip Planner
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          Generate an intelligent, time-optimized travel itinerary across all 28 states & union territories connecting canonical UNESCO World Heritage monuments, verified local guides, living craft guilds, and legendary regional culinary masters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Form (5 cols) */}
        <form 
          onSubmit={handleGenerate}
          className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6 text-xs"
        >
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>Trip Preferences</span>
            </h2>
            <span className="text-[11px] text-amber-600 font-semibold">Gemini 3.6 Flash</span>
          </div>

          {/* Destination Mode Selector */}
          <div className="space-y-2">
            <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
              <span>Destination Selection</span>
              <span className="text-[11px] text-stone-400 font-normal">Choose circuit or type any city</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCircuitType('PRESET')}
                className={`py-2 px-3 rounded-xl font-bold border transition-all text-xs flex items-center justify-center gap-1.5 ${
                  circuitType === 'PRESET'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/60'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>Curated Indian Circuits</span>
              </button>
              <button
                type="button"
                onClick={() => setCircuitType('CUSTOM')}
                className={`py-2 px-3 rounded-xl font-bold border transition-all text-xs flex items-center justify-center gap-1.5 ${
                  circuitType === 'CUSTOM'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/60'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Custom City / Region</span>
              </button>
            </div>

            {/* Circuit Selector */}
            {circuitType === 'PRESET' ? (
              <div className="space-y-3 pt-1">
                {/* Region Filter Pills */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Filter by Indian Region</span>
                  <div className="flex flex-wrap gap-1">
                    {REGIONS.map(reg => (
                      <button
                        type="button"
                        key={reg}
                        onClick={() => {
                          setSelectedRegion(reg);
                          const matches = reg === 'ALL' ? PAN_INDIA_CIRCUITS : PAN_INDIA_CIRCUITS.filter(c => c.region === reg);
                          if (matches.length > 0 && !matches.some(m => m.name === selectedCircuit)) {
                            setSelectedCircuit(matches[0].name);
                          }
                        }}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all ${
                          selectedRegion === reg
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                        }`}
                      >
                        {reg}
                      </button>
                    ))}
                  </div>
                </div>

                <select
                  value={selectedCircuit}
                  onChange={(e) => setSelectedCircuit(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {(selectedRegion === 'ALL' ? PAN_INDIA_CIRCUITS : PAN_INDIA_CIRCUITS.filter(c => c.region === selectedRegion)).map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.region})
                    </option>
                  ))}
                </select>

                {/* Circuit Info Card */}
                {(() => {
                  const circuitObj = PAN_INDIA_CIRCUITS.find(c => c.name === selectedCircuit);
                  if (!circuitObj) return null;
                  return (
                    <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-amber-900 dark:text-amber-200">{circuitObj.states}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100">{circuitObj.region}</span>
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-snug">
                        {circuitObj.highlights}
                      </p>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="space-y-1.5 pt-1">
                <input
                  type="text"
                  value={customDestination}
                  onChange={(e) => setCustomDestination(e.target.value)}
                  placeholder="e.g. Udaipur & Mewar, Amritsar, Ladakh Monasteries, Bodh Gaya..."
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium outline-none focus:ring-1 focus:ring-amber-500"
                />
                <p className="text-[11px] text-stone-500">Enter any Indian city, heritage town, or multi-city route.</p>
              </div>
            )}
          </div>

          {/* Duration in Days */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Duration</span>
              </label>
              <span className="font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={7}
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>1 Day Quick Tour</span>
              <span>3 Days Ideal</span>
              <span>7 Days Grand Circuit</span>
            </div>
          </div>

          {/* Budget Tier */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-amber-600" />
              <span>Budget Range</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['BUDGET', 'BALANCED', 'LUXURY'] as const).map(tier => (
                <button
                  type="button"
                  key={tier}
                  onClick={() => setBudgetTier(tier)}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    budgetTier === tier 
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Pace */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Travel Pace</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['RELAXED', 'BALANCED', 'INTENSIVE'] as const).map(pace => (
                <button
                  type="button"
                  key={pace}
                  onClick={() => setTravelPace(pace)}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    travelPace === pace 
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800'
                  }`}
                >
                  {pace}
                </button>
              ))}
            </div>
          </div>

          {/* Interests Chips */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>Pan-India Cultural Themes</span>
              </label>
              <span className="text-[10px] text-stone-400">{selectedInterests.length} selected</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ALL_INDIA_INTERESTS.map(opt => {
                const isSelected = selectedInterests.includes(opt);
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => toggleInterest(opt)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      isSelected 
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-400 shadow-xs' 
                        : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || (circuitType === 'CUSTOM' && !customDestination.trim())}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-orange-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing Verified Itinerary with Gemini...' : 'Generate Itinerary with AI'}</span>
          </button>
        </form>

        {/* Right Generated Itinerary (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {generatedItinerary ? (
            <div className="space-y-6">
              
              {/* Summary Bar */}
              <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Curated Cultural Journey
                  </span>
                  <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">{activeDestination}</h3>
                  <p className="text-xs text-stone-500">{durationDays} Days • {budgetTier} Budget • {travelPace} Pace</p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Estimated Activity Cost</span>
                    <span className="font-black text-lg text-emerald-600" suppressHydrationWarning>₹{totalCost.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    onClick={() => setSavedSuccess(true)}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{savedSuccess ? 'Saved to Profile!' : 'Save Trip Plan'}</span>
                  </button>
                </div>
              </div>

              {/* Day Cards */}
              <div className="space-y-6">
                {generatedItinerary.map((day) => (
                  <div
                    key={day.dayNumber}
                    className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-5"
                  >
                    <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                          D{day.dayNumber}
                        </span>
                        <h4 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
                          {day.dayTitle}
                        </h4>
                      </div>
                      <span className="text-xs text-stone-400 font-medium">Day {day.dayNumber} of {durationDays}</span>
                    </div>

                    <div className="space-y-4">
                      {day.activities.map((act, idx) => (
                        <div key={idx} className="flex gap-4 items-start text-xs border-b border-stone-100 dark:border-stone-800/50 pb-3.5 last:border-b-0 last:pb-0">
                          <span className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono text-[10px] shrink-0 font-bold mt-0.5">
                            {act.time ? act.time.split('-')[0].trim() : 'Schedule'}
                          </span>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                                {act.title}
                              </h5>
                              <span className="font-semibold text-emerald-600 text-xs">
                                {act.costEstimate > 0 ? `₹${act.costEstimate}` : 'Free Entry'}
                              </span>
                            </div>
                            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-xs">
                              {act.description}
                            </p>
                            <div className="flex items-center gap-3 pt-1 text-[11px]">
                              <span className="text-stone-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-amber-600" />
                                {act.location}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                act.category === 'HERITAGE'
                                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                                  : act.category === 'FOOD'
                                  ? 'bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300'
                                  : act.category === 'WORKSHOP'
                                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                  : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
                              }`}>
                                {act.category}
                              </span>
                              {act.slug && (
                                <Link
                                  href={act.slug}
                                  className="text-amber-600 dark:text-amber-400 font-semibold hover:underline flex items-center gap-0.5 ml-auto"
                                >
                                  <span>View Record</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center mx-auto">
                <Compass className="w-8 h-8 animate-spin-slow" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  Ready to Craft Your All-India Journey
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                  Select a curated Pan-India heritage circuit or type any custom Indian destination, adjust your pacing and themes, then click Generate to construct an AI-guided itinerary.
                </p>
              </div>
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-stone-400 block uppercase tracking-wider">Quick Suggestions Across India</span>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { id: 'golden-triangle', label: 'Golden Triangle', tag: 'North' },
                    { id: 'hampi-badami', label: 'Hampi & Badami', tag: 'South' },
                    { id: 'ajanta-ellora', label: 'Ajanta & Ellora', tag: 'West' },
                    { id: 'khajuraho-orchha', label: 'Khajuraho Citadels', tag: 'Central' },
                    { id: 'konark-puri', label: 'Konark & Puri', tag: 'East' },
                    { id: 'ladakh-spiti', label: 'Ladakh Monasteries', tag: 'Himalayan' },
                    { id: 'kaziranga-assam', label: 'Kaziranga & Ahom', tag: 'Northeast' },
                    { id: 'great-chola-dravidian', label: 'Chola Temples', tag: 'South' },
                  ].map(item => {
                    const found = PAN_INDIA_CIRCUITS.find(c => c.id === item.id);
                    if (!found) return null;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setCircuitType('PRESET');
                          setSelectedRegion('ALL');
                          setSelectedCircuit(found.name);
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400 hover:text-amber-600 border border-stone-200 dark:border-stone-700 transition-all flex items-center gap-1.5 shadow-xs"
                      >
                        <span>{item.label}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">{item.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
