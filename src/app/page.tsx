'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Sparkles,
  ArrowRight,
  Calendar,
  ShieldCheck,
  Star,
  Award,
  Heart,
  BookOpen,
  HelpCircle,
  ShoppingBag,
  Users,
  Camera,
  Clock,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Flame,
  Volume2
} from 'lucide-react';
import { CANONICAL_HERITAGE_SITES } from '@/lib/data/heritage-sites';
import { HeritageSiteImage } from '@/components/HeritageSiteImage';
import { FoodItemImage } from '@/components/FoodItemImage';
import { CANONICAL_CULTURE_ENTRIES } from '@/lib/data/culture';
import { CANONICAL_GUIDES, CANONICAL_ARTISTS } from '@/lib/data/members';
import { CANONICAL_WORKSHOPS } from '@/lib/data/workshops';
import { CANONICAL_FOOD_ITEMS } from '@/lib/data/food-items';
import { CANONICAL_PRODUCTS } from '@/lib/data/products';
import { CANONICAL_FUNDRAISERS } from '@/lib/data/fundraisers';
import { usePorjotok } from '@/lib/store/porjotok-context';
import { useLanguage } from '@/lib/i18n/language-context';

const HERO_SPOTLIGHTS = [
  {
    name: 'Taj Mahal, Agra',
    nativeName: 'ताज महल • Jewel of Mughal India',
    state: 'Uttar Pradesh',
    shortTag: 'Taj Mahal',
    badge: 'World Wonder & UNESCO Site',
    subLocation: 'Agra District, UP',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1280&q=80',
    description: 'Ivory-white Makrana marble mausoleum on the Yamuna riverfront, celebrated globally as the sublime pinnacle of Indo-Islamic architecture and eternal love.',
    slug: 'taj-mahal'
  },
  {
    name: 'Amer Fort & Palace, Jaipur',
    nativeName: 'आमेर किला • Kachwaha Citadel',
    state: 'Rajasthan',
    shortTag: 'Amer Fort',
    badge: 'UNESCO Hill Fort',
    subLocation: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1280&q=80',
    description: 'Majestic red sandstone and marble fortress overlooking Maota Lake, famous for its dazzling Belgian mirror reflections inside the royal Sheesh Mahal.',
    slug: 'amer-fort-jaipur'
  },
  {
    name: 'Victoria Memorial, Kolkata',
    nativeName: 'ভিক্টোরিয়া মেমোরিয়াল • White Marble Legacy',
    state: 'West Bengal',
    shortTag: 'Kolkata',
    badge: 'Neoclassical Heritage',
    subLocation: 'Kolkata, West Bengal',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1000&q=80',
    description: 'Grand white Makrana marble monument blending British neoclassical with Mughal domes, crowned by the Angel of Victory and set amidst 64 acres of gardens.',
    slug: 'victoria-memorial'
  }
];

export default function HomePage() {
  const { addToCart, savedSiteSlugs, toggleSaveSite } = usePorjotok();
  const { t } = useLanguage();
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [quickQuizSelected, setQuickQuizSelected] = useState<number | null>(null);
  const [quickQuizAnswered, setQuickQuizAnswered] = useState(false);

  const currentSpotlight = HERO_SPOTLIGHTS[activeHeroIndex];

  // Curated balanced Pan-India showcases across all states
  const FEATURED_PAN_INDIA_SLUGS = [
    'taj-mahal',                // Uttar Pradesh
    'hampi-monuments',          // Karnataka
    'amer-fort-jaipur',         // Rajasthan
    'sun-temple-konark',        // Odisha
    'ajanta-caves',             // Maharashtra
    'sundarbans-national-park'  // West Bengal
  ];
  const featuredSites = FEATURED_PAN_INDIA_SLUGS
    .map(slug => CANONICAL_HERITAGE_SITES.find(s => s.slug === slug))
    .filter(Boolean) as typeof CANONICAL_HERITAGE_SITES;

  const PAN_INDIA_WORKSHOP_IDS = [
    'workshop-jaipur-pottery',    // Rajasthan
    'workshop-thanjavur-painting',// Tamil Nadu
    'workshop-1'                  // West Bengal (Dokra)
  ];
  const upcomingWorkshops = PAN_INDIA_WORKSHOP_IDS
    .map(id => CANONICAL_WORKSHOPS.find(w => w.id === id))
    .filter(Boolean) as typeof CANONICAL_WORKSHOPS;

  const PAN_INDIA_GUIDE_IDS = [
    'guide-raj-1', // Rajasthan (Jaipur / Amer)
    'guide-up-1',  // Uttar Pradesh (Agra / Taj Mahal)
    'guide-kar-1'  // Karnataka (Hampi)
  ];
  const verifiedGuides = PAN_INDIA_GUIDE_IDS
    .map(id => CANONICAL_GUIDES.find(g => g.id === id))
    .filter(Boolean) as typeof CANONICAL_GUIDES;

  const PAN_INDIA_FOOD_IDS = [
    'food-raj-1',  // Royal Dal Baati Churma Thali (Rajasthan)
    'food-up-1',   // Awadhi Dum Gosht Biryani (Uttar Pradesh)
    'food-tn-1',   // Madurai Ghee Roast Masala Dosa (Tamil Nadu)
    'food-1',      // Spongy Banglar Rosogolla (West Bengal)
    'food-tel-1',  // Authentic Hyderabadi Dum Biryani (Telangana)
    'food-mah-1',  // Iconic Mumbai Vada Pav (Maharashtra)
    'food-odi-1',  // Nayagarh Baked Chhena Poda (Odisha)
    'food-guj-1'   // Surti Nylon Khaman Dhokla (Gujarat)
  ];
  const sweetsAndFoods = PAN_INDIA_FOOD_IDS
    .map(id => CANONICAL_FOOD_ITEMS.find(f => f.id === id))
    .filter(Boolean) as typeof CANONICAL_FOOD_ITEMS;

  const PAN_INDIA_PRODUCT_IDS = [
    'product-banarasi-silk',       // Uttar Pradesh
    'product-jaipur-blue-pottery',  // Rajasthan
    'product-kanchipuram-silk',    // Tamil Nadu
    'product-1',                   // West Bengal (Baluchari Silk)
    'product-kashmiri-pashmina',   // Jammu & Kashmir
    'product-channapatna-toys',    // Karnataka
    'product-2',                   // West Bengal (Dokra)
    'product-sambalpuri-ikat'      // Odisha
  ];
  const handicrafts = PAN_INDIA_PRODUCT_IDS
    .map(id => CANONICAL_PRODUCTS.find(p => p.id === id))
    .filter(Boolean) as typeof CANONICAL_PRODUCTS;

  const activeFundraisers = CANONICAL_FUNDRAISERS.filter(f => f.status === 'ACTIVE');

  return (
    <div className="flex flex-col w-full space-y-20 pb-20">

      {/* ========================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Background gradient & decorative heritage motifs */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/40 via-amber-100/20 to-transparent dark:from-amber-950/20 dark:via-stone-900/40 dark:to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300/60 dark:border-amber-800/40 text-amber-900 dark:text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{t('hero_tagline')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-[1.15]">
                {t('hero_title')}
              </h1>

              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl leading-relaxed">
                {t('hero_subtitle')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/heritage"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-orange-600/25 transition-all hover:scale-[1.02] flex items-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>{t('btn_explore_sites')}</span>
                </Link>

                <Link
                  href="/ai/trip-planner"
                  className="px-6 py-3.5 rounded-2xl bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-100 font-semibold text-sm border border-stone-200 dark:border-stone-700 shadow-xs transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{t('btn_ai_planner')}</span>
                </Link>

                <Link
                  href="/auth/sign-in"
                  className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-600 px-3 py-2"
                >
                  {t('signin')} →
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 dark:border-stone-800">
                <div>
                  <div className="text-2xl font-black text-stone-900 dark:text-stone-100">{CANONICAL_HERITAGE_SITES.length}+</div>
                  <div className="text-xs text-stone-500 font-medium">Pan-India Monuments</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400">100%</div>
                  <div className="text-xs text-stone-500 font-medium">Verified Local Guides</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-stone-900 dark:text-stone-100">15+</div>
                  <div className="text-xs text-stone-500 font-medium">States Represented</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800 aspect-[4/5] group">
                <img
                  src={currentSpotlight.image}
                  alt={currentSpotlight.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                {/* Spotlights Quick Navigation Tabs */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
                  {HERO_SPOTLIGHTS.map((spot, idx) => (
                    <button
                      key={spot.slug}
                      onClick={() => setActiveHeroIndex(idx)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all backdrop-blur-md ${activeHeroIndex === idx
                        ? 'bg-amber-500 text-stone-950 shadow-md scale-105'
                        : 'bg-black/50 text-white/80 hover:bg-black/70'
                        }`}
                    >
                      {spot.shortTag}
                    </button>
                  ))}
                </div>

                {/* Overlay Card Content */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-bold shadow-xs">
                      <Award className="w-3.5 h-3.5" />
                      <span>{currentSpotlight.badge}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white">
                      {currentSpotlight.state}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {currentSpotlight.name}
                    </h3>
                    <p className="text-xs text-amber-300 font-medium mt-0.5">{currentSpotlight.nativeName}</p>
                  </div>

                  <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
                    {currentSpotlight.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-amber-300 font-semibold">{currentSpotlight.subLocation}</span>
                    <Link
                      href={`/heritage/${currentSpotlight.slug}`}
                      className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <span>Explore Archive</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -left-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100">ASI & National Tourism</p>
                  <p className="text-[10px] text-stone-500">Certified Heritage Registry</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 2. EXPLORE BY CATEGORY */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Taxonomy & Traditions
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
              Explore by Cultural Dimension
            </h2>
          </div>
          <Link href="/knowledge" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
            <span>Browse Full Knowledge Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Monuments & Forts', icon: '🏛️', count: `${CANONICAL_HERITAGE_SITES.length}+ Pan-India Sites`, href: '/heritage' },
            { title: 'Living Festivals', icon: '🪔', count: 'Garba, Kumbh & Durga', href: '/culture' },
            { title: 'Music & Traditions', icon: '🪕', count: 'Carnatic, Sufi & Baul', href: '/culture' },
            { title: 'Ancient Crafts', icon: '🏺', count: 'Dokra, Blue Pottery & Bidri', href: '/local-items' },
            { title: 'Handloom Silks', icon: '🧵', count: 'Banarasi, Kanchi & Baluchari', href: '/local-items' },
            { title: 'Flavors of India', icon: '🍯', count: 'Biryani, Dosa & Mithai', href: '/food' }
          ].map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500 hover:shadow-lg hover:-translate-y-1 transition-all group"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-stone-400 mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>


      {/* ========================================================= */}
      {/* 3. CANONICAL HERITAGE SITES SHOWCASE */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Preserved Treasures
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
              Featured Heritage Sites
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              From the Taj Mahal and Hampi ruins to Konark Sun Temple, Rajasthan fortresses, and Sundarbans.
            </p>
          </div>
          <Link href="/heritage" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
            <span>View All {CANONICAL_HERITAGE_SITES.length} Sites</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSites.map((site) => (
            <div
              key={site.id}
              className="rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all flex flex-col group"
            >
              {/* Site Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
                <HeritageSiteImage site={site} />
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-xs">
                    {site.state}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-200 backdrop-blur-md">
                    {site.district}
                  </span>
                </div>
                <button
                  onClick={() => toggleSaveSite(site.slug)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-stone-700 dark:text-stone-200 hover:text-rose-500 transition-colors"
                  title="Save site"
                >
                  <Heart className={`w-4 h-4 ${savedSiteSlugs.includes(site.slug) ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
                    <span>{site.historicalPeriod}</span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" /> ASI Verified
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition-colors">
                    {site.name}
                  </h3>

                  {(site.nativeName || site.bengaliName) && (
                    <p className="text-xs text-stone-400 font-medium">{site.nativeName || site.bengaliName}</p>
                  )}

                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {site.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span className="truncate max-w-[140px]">{site.address.split(',')[0]}</span>
                  </div>

                  <Link
                    href={`/heritage/${site.slug}`}
                    className="font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 flex items-center gap-1"
                  >
                    <span>Read History</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ========================================================= */}
      {/* 4. UPCOMING ARTISAN WORKSHOPS (WITH CERTIFICATE GUARANTEE) */}
      {/* ========================================================= */}
      <section className="bg-amber-50/50 dark:bg-stone-900/50 py-16 border-y border-amber-200/50 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Hands-on Cultural Immersion
              </span>
              <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
                Upcoming Artisan Workshops
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Learn Jaipur blue pottery, Thanjavur 22K gold foil art, and lost-wax Dokra metallurgy directly from national awardees. Includes verified QR certificate!
              </p>
            </div>
            <Link href="/workshops" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
              <span>View All Workshops</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingWorkshops.map((ws) => (
              <div
                key={ws.id}
                className="rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={ws.image} alt={ws.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-sm">
                        {ws.category}
                      </span>
                      {ws.state && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-900/85 text-amber-300 backdrop-blur-md">
                          {ws.state}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>{ws.date} • {ws.startTime}</span>
                      <span className="text-stone-300 dark:text-stone-700">•</span>
                      <span className="font-medium text-stone-700 dark:text-stone-300">{ws.district}, {ws.state}</span>
                    </div>

                    <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 leading-snug">
                      {ws.title}
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                      {ws.description}
                    </p>

                    <div className="flex items-center gap-2.5 pt-2">
                      <img src={ws.instructorPhoto} alt={ws.instructorName} className="w-7 h-7 rounded-full object-cover border border-stone-200" />
                      <div className="text-[11px]">
                        <span className="font-semibold text-stone-800 dark:text-stone-200">{ws.instructorName}</span>
                        <span className="text-stone-400"> (Master)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between pb-3 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                      <Award className="w-3.5 h-3.5" />
                      <span>Certificate & Kit Included</span>
                    </div>
                    <span className="text-base font-extrabold text-stone-900 dark:text-stone-100">₹{ws.price}</span>
                  </div>

                  <Link
                    href={`/workshops#${ws.id}`}
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Register / Book Seat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 5. VERIFIED LOCAL GUIDES */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Living Narrators
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
              Verified Heritage Guides
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Government-certified local storytellers, historians, and multilingual circuit experts.
            </p>
          </div>
          <Link href="/guides" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
            <span>Explore All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verifiedGuides.map((guide) => (
            <div
              key={guide.id}
              className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-500/40">
                    <img src={guide.photo} alt={guide.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 truncate">{guide.name}</h3>
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                    <p className="text-xs text-stone-500 font-medium">{guide.location} • {guide.state}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="font-bold">{guide.rating}</span>
                      <span className="text-stone-400">({guide.reviewsCount} tours)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                  {guide.bio}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {guide.specialities.map((spec, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block">Daily Circuit Rate</span>
                  <span className="text-base font-black text-stone-900 dark:text-stone-100">₹{guide.chargePerDay}</span>
                </div>
                <Link
                  href="/guides"
                  className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 text-white dark:text-stone-900 text-xs font-bold transition-colors"
                >
                  Book Tour
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ========================================================= */}
      {/* 6. SWEET DELICACIES & HANDCRAFTED ITEMS */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        {/* Sweets Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Taste of India
              </span>
              <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
                Famous Foods & Sweets of Indian States
              </h2>
            </div>
            <Link href="/food" className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1">
              <span>View Full Menu & Order</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sweetsAndFoods.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 relative">
                    <FoodItemImage food={item} />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow-xs">
                      {item.state}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">{item.name}</h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">{item.merchantName}</p>
                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 mt-1.5">{item.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-base font-extrabold text-stone-900 dark:text-stone-100">₹{item.price}</span>
                  <button
                    onClick={() => addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      quantity: 1,
                      type: 'FOOD',
                      merchantOrSeller: item.merchantName,
                      image: item.images[0]
                    })}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Handcrafts Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Village Guilds
              </span>
              <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
                Handcrafted Textiles & Folk Art
              </h2>
            </div>
            <Link href="/local-items" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
              <span>View All Handloom & Dokra</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {handicrafts.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 relative">
                    <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                    {prod.state && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-xs">
                        {prod.state}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">{prod.name}</h3>
                  <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold">{prod.craftHeritage}</p>
                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 mt-1.5">{prod.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-base font-extrabold text-stone-900 dark:text-stone-100">₹{prod.price}</span>
                  <button
                    onClick={() => addToCart({
                      id: prod.id,
                      name: prod.name,
                      price: prod.price,
                      quantity: 1,
                      type: 'PRODUCT',
                      merchantOrSeller: prod.sellerName,
                      image: prod.images[0]
                    })}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 text-white dark:text-stone-900 text-xs font-bold transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 7. CLEANLINESS INITIATIVES & COMMUNITY FUNDRAISERS */}
      {/* ========================================================= */}
      <section className="bg-teal-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                Community Responsibility
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                Preserving River Ghats & Heritage Grounds
              </h2>
              <p className="text-xs text-teal-200 mt-1 max-w-xl">
                Every fundraiser is vetted and approved by administrative moderators. Support volunteer clean-up crews protecting fragile terracotta and riverbanks.
              </p>
            </div>
            <Link href="/cleanliness" className="text-xs font-bold text-teal-300 hover:text-teal-200 flex items-center gap-1">
              <span>View All Cleanliness Drives</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeFundraisers.map((fund) => {
              const progressPct = Math.min(100, Math.round((fund.raisedAmount / fund.targetAmount) * 100));
              return (
                <div
                  key={fund.id}
                  className="p-6 rounded-2xl bg-teal-900/60 border border-teal-800/80 backdrop-blur-md flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-teal-300 font-semibold">
                      <span>{fund.crewName}</span>
                      <span>{fund.district}{fund.state ? `, ${fund.state}` : ''}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white leading-snug">
                      {fund.title}
                    </h3>

                    <p className="text-xs text-teal-100 leading-relaxed">
                      {fund.purpose}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-bold" suppressHydrationWarning>
                      <span suppressHydrationWarning>Raised ₹{fund.raisedAmount.toLocaleString('en-IN')}</span>
                      <span className="text-teal-300" suppressHydrationWarning>{progressPct}% of ₹{fund.targetAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-teal-950 overflow-hidden">
                      <div className="h-full bg-teal-400 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-teal-300">{fund.donorsCount} contributors</span>
                    <Link
                      href="/cleanliness"
                      className="px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-teal-950 font-bold text-xs transition-colors shadow-md"
                    >
                      Support / Donate
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 8. INTERACTIVE QUIZ PREVIEW */}
      {/* ========================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border-2 border-amber-300/80 dark:border-amber-800/50 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Quick Heritage Challenge</span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold">
              +20 Points
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
              Which 13th-century UNESCO World Heritage monument in Odisha is sculpted as a colossal 24-wheeled chariot of the Sun God?
            </h3>
            <p className="text-xs text-stone-500">Test your knowledge grounded in verified archive documentation.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['Konark Sun Temple', 'Modhera Sun Temple', 'Brihadisvara Temple', 'Hampi Stone Chariot'].map((monument, idx) => {
              const isCorrect = idx === 0;
              const isSelected = quickQuizSelected === idx;
              return (
                <button
                  key={monument}
                  disabled={quickQuizAnswered}
                  onClick={() => {
                    setQuickQuizSelected(idx);
                    setQuickQuizAnswered(true);
                  }}
                  className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all ${quickQuizAnswered
                    ? isCorrect
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : isSelected
                        ? 'bg-rose-500 text-white border-rose-600'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-transparent'
                    : 'bg-stone-50 dark:bg-stone-800 hover:bg-amber-50 hover:border-amber-400 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700'
                    }`}
                >
                  {monument}
                </button>
              );
            })}
          </div>

          {quickQuizAnswered && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between animate-in fade-in">
              <p>
                {quickQuizSelected === 0
                  ? '🎉 Correct! Konark Sun Temple was commissioned in 1250 CE by King Narasimhadeva I as a gigantic solar chariot with 24 carved stone wheels.'
                  : 'Almost! It is the Konark Sun Temple in Odisha, celebrated for its 24 monumental chariot sundial wheels.'}
              </p>
              <Link href="/quiz" className="font-bold underline text-amber-700 dark:text-amber-300 ml-4 shrink-0">
                Play Full 12-Question Quiz →
              </Link>
            </div>
          )}
        </div>
      </section>


      {/* ========================================================= */}
      {/* 9. AI SUITE BANNER: CHATBOT, TRIP PLANNER & LANDMARK SCANNER */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl gradient-terracotta text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-amber-200">
              AI-Assisted Tourism Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Plan Your Custom Indian Heritage Journey with <span className="notranslate" translate="no">Parampara</span> AI
            </h2>
            <p className="text-sm text-amber-100 leading-relaxed">
              Generate personalized multi-day itineraries, estimate travel costs, discover verified local guides, and scan landmark photos across all Indian states using our AI assistant grounded directly in canonical archive records.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/ai/trip-planner"
                className="px-5 py-3 rounded-xl bg-white text-orange-950 font-bold text-xs hover:bg-amber-100 transition-colors shadow-lg"
              >
                Launch AI Trip Planner
              </Link>
              <Link
                href="/ai"
                className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs transition-colors"
              >
                Chat with Heritage AI
              </Link>
              <Link
                href="/landmark"
                className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Scan Landmark Photo</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
