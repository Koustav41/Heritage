'use client';

import React, { useState, useMemo } from 'react';
import { Utensils, Star, ShieldCheck, ShoppingBag, MapPin, Clock, Search, Sparkles } from 'lucide-react';
import { CANONICAL_FOOD_ITEMS } from '@/lib/data/food-items';
import { usePorjotok } from '@/lib/store/porjotok-context';

export default function LocalFoodPage() {
  const { addToCart } = usePorjotok();
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const states = useMemo(() => {
    return ['ALL', ...Array.from(new Set(CANONICAL_FOOD_ITEMS.map(f => f.state))).sort()];
  }, []);

  const categories = [
    { id: 'ALL', label: 'All Delicacies' },
    { id: 'TRADITIONAL_MEAL', label: 'Traditional Meals (थाली / ಭೋಜನ)' },
    { id: 'SWEET', label: 'Artisanal Sweets (মিষ্টি / मिठाई)' },
    { id: 'STREET_FOOD', label: 'Iconic Street Food' },
    { id: 'SNACK', label: 'Snacks & Savories' },
    { id: 'BEVERAGE', label: 'Heritage Beverages & Chai' }
  ];

  const filteredItems = useMemo(() => {
    return CANONICAL_FOOD_ITEMS.filter(f => {
      const matchesState = selectedState === 'ALL' || f.state === selectedState;
      const matchesCategory = selectedCategory === 'ALL' || f.category === selectedCategory;
      const matchesSearch = 
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.nativeName?.includes(searchQuery) ||
        f.bengaliName?.includes(searchQuery);

      return matchesState && matchesCategory && matchesSearch;
    });
  }, [selectedState, selectedCategory, searchQuery]);

  const handleAdd = (item: typeof CANONICAL_FOOD_ITEMS[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      type: 'FOOD',
      merchantOrSeller: item.merchantName,
      image: item.images[0]
    });
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 text-xs font-semibold">
          <Utensils className="w-3.5 h-3.5" />
          <span>Gastronomic Heritage of India • GI-Tagged Sweets, Curries & Heritage Kitchens</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Famous Foods & Sweets of Indian States
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          From fiery Rajasthani Dal Baati Churma and melt-in-mouth Awadhi Galouti Kebabs to crisp Madurai Ghee Roast Dosa, Mumbai Vada Pav, and classic Banglar Rosogolla—savor India’s authentic culinary traditions.
        </p>
      </div>

      {/* State Filter Ribbon */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
          <span>Filter by State:</span>
          {selectedState !== 'ALL' && (
            <button 
              onClick={() => setSelectedState('ALL')}
              className="text-rose-600 font-semibold hover:underline normal-case"
            >
              Clear State Filter
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {states.map(st => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedState === st
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-rose-400'
              }`}
            >
              {st === 'ALL' ? 'All of India' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Controls: Search and Categories */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search famous dishes by name, state, city, or merchant..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-stone-100 dark:border-stone-800">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Showing counter */}
      <div className="text-xs text-stone-500 flex items-center justify-between">
        <span>Showing <strong>{filteredItems.length}</strong> delicacies across India</span>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((food) => (
          <div
            key={food.id}
            className="rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={food.images[0]}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow-xs">
                    {food.state}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 backdrop-blur-md">
                    {food.district}
                  </span>
                </div>

                {food.isVegetarian && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                    🌱 Pure Veg
                  </span>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>FSSAI Verified Merchant</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 font-bold text-[11px]">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{food.merchantRating}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-stone-900 dark:text-stone-100 group-hover:text-rose-600 transition-colors">
                    {food.name}
                  </h3>
                  {(food.nativeName || food.bengaliName) && (
                    <p className="text-xs text-stone-400 font-medium">{food.nativeName || food.bengaliName}</p>
                  )}
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                  {food.description}
                </p>

                <div className="pt-2 text-[11px] text-stone-500 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="font-medium text-stone-800 dark:text-stone-200 truncate">{food.merchantName} ({food.merchantLocation})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Open: {food.openingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-stone-100 dark:border-stone-800 mt-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 block">Price</span>
                <span className="text-xl font-black text-stone-900 dark:text-stone-100">₹{food.price}</span>
              </div>

              <button
                onClick={() => handleAdd(food)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                  justAddedId === food.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-600 hover:bg-rose-700 text-white'
                }`}
              >
                {justAddedId === food.id ? (
                  <span>Added to Cart!</span>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-20 text-center text-stone-500 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
          <Utensils className="w-12 h-12 mx-auto text-rose-500/40 mb-3" />
          <p className="text-lg font-bold text-stone-800 dark:text-stone-200">No delicacies match your filter</p>
          <p className="text-xs text-stone-400 mt-1">Try selecting "All of India" or choosing a different category.</p>
        </div>
      )}

    </div>
  );
}
