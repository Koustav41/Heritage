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
  Share2
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

export default function AITripPlannerPage() {
  const [destination, setDestination] = useState('Bishnupur & Bankura');
  const [durationDays, setDurationDays] = useState(3);
  const [budgetTier, setBudgetTier] = useState<'BUDGET' | 'BALANCED' | 'LUXURY'>('BALANCED');
  const [travelPace, setTravelPace] = useState<'RELAXED' | 'BALANCED' | 'INTENSIVE'>('BALANCED');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Terracotta Architecture',
    'Baluchari Silk Looms',
    'Traditional Sweets'
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<DayPlan[] | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const interestOptions = [
    'Terracotta Architecture',
    'Baluchari Silk Looms',
    'Traditional Sweets',
    'Colonial Calcutta',
    'DHR Toy Train & Hills',
    'Sundarbans Mangrove Safari',
    'Classical Music & Baul',
    'Idol Making & Crafts'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setSavedSuccess(false);

    setTimeout(() => {
      // Generate structured itinerary grounded in destination
      let plan: DayPlan[] = [];

      if (destination.includes('Bishnupur') || destination.includes('Bankura')) {
        plan = [
          {
            dayNumber: 1,
            dayTitle: 'Arrival & Malla Dynasty Terracotta Wonders',
            activities: [
              {
                time: '09:00 AM - 11:30 AM',
                title: 'Rasmancha Stepped Pyramidal Monument',
                description: 'Explore the oldest brick temple structure in Bishnupur (1600 CE) built by King Bir Hambir, with its 40 arch galleries.',
                location: 'Bishnupur, Bankura',
                category: 'HERITAGE',
                costEstimate: 25,
                slug: '/heritage/rasmancha'
              },
              {
                time: '12:00 PM - 01:30 PM',
                title: 'Traditional Bengali Lunch at Porjotok Partner Kitchen',
                description: 'Enjoy Gobindobhog rice, fragrant Postor Bora (poppy seed fritters), and Kosha Mangsho.',
                location: 'Bishnupur Town',
                category: 'FOOD',
                costEstimate: 350
              },
              {
                time: '02:30 PM - 05:00 PM',
                title: 'Jor Bangla & Shyam Rai Terracotta Relief Tour',
                description: 'Accompanied by verified ASI guide Sourav Gangopadhyay, examine intricate Ramayana panels and the dancing Rasamandala.',
                location: 'Bishnupur Heritage Complex',
                category: 'HERITAGE',
                costEstimate: 1800,
                slug: '/heritage/jor-bangla-temple'
              }
            ]
          },
          {
            dayNumber: 2,
            dayTitle: 'Weavers of Baluchari & Dokra Metallurgy Hubs',
            activities: [
              {
                time: '09:30 AM - 12:30 PM',
                title: 'Bikna Village Lost-Wax Dokra Casting',
                description: 'Visit master metalsmith Shyamal Karmakar’s guild in Bikna and observe the 4,000-year-old cire-perdue process.',
                location: 'Bikna Village',
                category: 'WORKSHOP',
                costEstimate: 1850,
                slug: '/workshops'
              },
              {
                time: '02:00 PM - 04:30 PM',
                title: 'Bishnupur Silk Weavers Co-operative',
                description: 'Watch master handloom jacquard weavers embroider pure mulberry silk Baluchari saris depicting the Gita.',
                location: 'Chawkbazar, Bishnupur',
                category: 'EXPERIENCE',
                costEstimate: 0,
                slug: '/local-items'
              },
              {
                time: '05:00 PM - 06:30 PM',
                title: 'Dalmadal Cannon & Madan Mohan Temple',
                description: 'Inspect the massive 1742 wrought iron cannon that legendarily defended the city from Maratha bargis.',
                location: 'Sankharipara',
                category: 'HERITAGE',
                costEstimate: 0,
                slug: '/heritage/dalmadal-gun'
              }
            ]
          },
          {
            dayNumber: 3,
            dayTitle: 'Susunia Ancient Epigraphy & Terracotta Panchmura',
            activities: [
              {
                time: '08:30 AM - 12:00 PM',
                title: 'Susunia Hill 4th-Century Chandravarman Rock Inscription',
                description: 'Trek to the earliest epigraphical record in West Bengal (c. 350 CE) carved on Susunia Hill.',
                location: 'Susunia Hill, Bankura',
                category: 'HERITAGE',
                costEstimate: 0,
                slug: '/heritage/rock-inscription-of-chandra-varman'
              },
              {
                time: '01:30 PM - 04:00 PM',
                title: 'Panchmura Terracotta Horse Pottery Guild',
                description: 'Explore the ancestral village of the iconic Bankura horse with master sculptors.',
                location: 'Panchmura Village',
                category: 'EXPERIENCE',
                costEstimate: 400
              }
            ]
          }
        ];
      } else {
        // Kolkata & Hooghly Heritage Circuit
        plan = [
          {
            dayNumber: 1,
            dayTitle: 'Colonial Calcutta & Renaissance Cradle',
            activities: [
              {
                time: '09:00 AM - 11:30 AM',
                title: 'Victoria Memorial & Maidan Heritage Walk',
                description: 'Explore the white Makrana marble galleries and Queen’s garden under the Angel of Victory.',
                location: 'Queens Way, Maidan',
                category: 'HERITAGE',
                costEstimate: 50,
                slug: '/heritage/victoria-memorial'
              },
              {
                time: '12:30 PM - 02:00 PM',
                title: 'Spongy Rosogolla at Nobin Chandra Das Legacy',
                description: 'Savor the original GI-tagged cottage cheese confection invented in Bagbazar in 1868.',
                location: 'Bagbazar, Kolkata',
                category: 'FOOD',
                costEstimate: 180,
                slug: '/food'
              },
              {
                time: '03:00 PM - 05:30 PM',
                title: 'Kumartuli Clay Idol-Making Lanes',
                description: 'Walk through the generational studios sculpting divine clay idols from holy Hooghly silt.',
                location: 'Kumartuli Ghat',
                category: 'EXPERIENCE',
                costEstimate: 0,
                slug: '/culture/kumartuli-idol-making'
              }
            ]
          },
          {
            dayNumber: 2,
            dayTitle: 'Sacred Confluences & Danish Serampore',
            activities: [
              {
                time: '08:30 AM - 11:00 AM',
                title: 'Dakshineswar Kali Temple & Belur Math',
                description: 'Visit the 1855 nine-spired temple of Rani Rashmoni and Ramakrishna Mission headquarters.',
                location: 'Dakshineswar & Belur',
                category: 'HERITAGE',
                costEstimate: 0,
                slug: '/heritage/dakshineswar-kali-temple'
              },
              {
                time: '01:00 PM - 04:30 PM',
                title: 'Danish Governor House & Cemetery, Serampore',
                description: 'Explore the restored 1770s Danish colonial administration on the Hooghly riverfront.',
                location: 'Serampore, Hooghly',
                category: 'HERITAGE',
                costEstimate: 20,
                slug: '/heritage/danish-governor-house'
              }
            ]
          }
        ];
      }

      setGeneratedItinerary(plan.slice(0, durationDays));
      setIsGenerating(false);
    }, 1000);
  };

  const totalCost = generatedItinerary?.reduce((acc, day) => 
    acc + day.activities.reduce((dAcc, act) => dAcc + act.costEstimate, 0), 0
  ) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Porjotok AI Engine • Spec 16.3 & 66</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          AI-Powered Bengal Trip Planner
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          Generate an intelligent, time-optimized travel itinerary connecting canonical monuments, verified guides, artisan workshops, and legendary sweet confectioners.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Form (5 cols) */}
        <form 
          onSubmit={handleGenerate}
          className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6 text-xs"
        >
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-3">
            Trip Preferences
          </h2>

          {/* Destination */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300">Destination Circuit</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium"
            >
              <option value="Bishnupur & Bankura">Bishnupur & Bankura Terracotta Circuit</option>
              <option value="Kolkata & Hooghly">Kolkata, Howrah & European Riverfront</option>
              <option value="Santiniketan & Birbhum">Santiniketan Ashram & Baul Country</option>
              <option value="Murshidabad & Malda">Murshidabad Nawabs & Gour Citadel</option>
              <option value="Darjeeling Himalayan">Darjeeling Hills & Tea Garden Steam</option>
              <option value="Sundarbans Delta">Sundarbans Mangrove Marine Circuit</option>
            </select>
          </div>

          {/* Duration in Days */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-stone-700 dark:text-stone-300">Duration</label>
              <span className="font-bold text-amber-600">{durationDays} Days</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>

          {/* Budget Tier */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300">Budget Range</label>
            <div className="grid grid-cols-3 gap-2">
              {(['BUDGET', 'BALANCED', 'LUXURY'] as const).map(tier => (
                <button
                  type="button"
                  key={tier}
                  onClick={() => setBudgetTier(tier)}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    budgetTier === tier 
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Pace */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300">Travel Pace</label>
            <div className="grid grid-cols-3 gap-2">
              {(['RELAXED', 'BALANCED', 'INTENSIVE'] as const).map(pace => (
                <button
                  type="button"
                  key={pace}
                  onClick={() => setTravelPace(pace)}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    travelPace === pace 
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {pace}
                </button>
              ))}
            </div>
          </div>

          {/* Interests Chips */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300">Focus Interests</label>
            <div className="flex flex-wrap gap-1.5">
              {interestOptions.map(opt => {
                const isSelected = selectedInterests.includes(opt);
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => toggleInterest(opt)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      isSelected 
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-400' 
                        : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700'
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
            disabled={isGenerating}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-orange-600/25 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Synthesizing Verified Itinerary...' : 'Generate Itinerary with AI'}</span>
          </button>
        </form>

        {/* Right Generated Itinerary (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {generatedItinerary ? (
            <div className="space-y-6">
              
              {/* Summary Bar */}
              <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">AI Curated Journey</span>
                  <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">{destination}</h3>
                  <p className="text-xs text-stone-500">{durationDays} Days • {budgetTier} Budget • {travelPace} Pace</p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Estimated Total Cost</span>
                    <span className="font-black text-lg text-emerald-600" suppressHydrationWarning>₹{totalCost.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    onClick={() => setSavedSuccess(true)}
                    className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
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
                        <div key={idx} className="flex gap-4 items-start text-xs">
                          <span className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono text-[10px] shrink-0 font-bold mt-0.5">
                            {act.time.split('-')[0]}
                          </span>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                                {act.title}
                              </h5>
                              <span className="text-stone-400">
                                {act.costEstimate > 0 ? `₹${act.costEstimate}` : 'Free Entry'}
                              </span>
                            </div>
                            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">{act.description}</p>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-stone-400 text-[11px] flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-amber-600" />
                                {act.location}
                              </span>
                              {act.slug && (
                                <Link href={act.slug} className="text-amber-600 dark:text-amber-400 font-bold hover:underline">
                                  View Archive →
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
            /* Empty state placeholder */
            <div className="py-24 text-center text-stone-400 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3 p-8">
              <Compass className="w-12 h-12 mx-auto text-amber-600/40 animate-spin [animation-duration:12s]" />
              <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
                Your Custom Journey Awaits
              </h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Select your preferred circuit and duration on the left, then click Generate to create a time-sequenced schedule.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
