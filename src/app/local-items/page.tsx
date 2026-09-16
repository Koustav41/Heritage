'use client';

import React, { useState, useMemo } from 'react';
import { ShoppingBag, Star, ShieldCheck, Sparkles, MapPin, Tag, Compass } from 'lucide-react';
import { CANONICAL_PRODUCTS } from '@/lib/data/products';
import { usePorjotok } from '@/lib/store/porjotok-context';

export default function LocalItemsPage() {
  const { addToCart } = usePorjotok();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'ALL', label: 'All Handicrafts' },
    { id: 'TEXTILE', label: 'Handloom Silks & Shawls' },
    { id: 'CRAFT', label: 'Metalwork & Woodcraft' },
    { id: 'POTTERY', label: 'Ceramics & Terracotta' },
    { id: 'FOOD_PRODUCT', label: 'Estate Teas & Edibles' },
    { id: 'PAINTING', label: 'Traditional Paintings' }
  ];

  const allStates = useMemo(() => {
    const states = Array.from(new Set(CANONICAL_PRODUCTS.map(p => p.state).filter(Boolean))).sort();
    return ['ALL', ...states];
  }, []);

  const filteredProducts = useMemo(() => {
    return CANONICAL_PRODUCTS.filter(p => {
      const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
      const matchState = selectedState === 'ALL' || p.state === selectedState;
      return matchCat && matchState;
    });
  }, [selectedCategory, selectedState]);

  const handleAdd = (item: typeof CANONICAL_PRODUCTS[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      type: 'PRODUCT',
      merchantOrSeller: item.sellerName,
      image: item.images[0]
    });
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 text-xs font-semibold">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Artisans & Guilds Marketplace • GI-Certified Genuine Crafts of India</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Handmade Items, Master Crafts & Traditional Textiles of India
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          Support verified weaver cooperatives, artisan clusters, and tribal guilds directly across Indian states. From royal Banarasi and Kanchipuram silks to Jaipur Blue Pottery, Kashmiri Pashmina, lost-wax Dokra brass sculptures, and fresh Darjeeling spring flushes.
        </p>
      </div>

      {/* State Filter Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          State:
        </span>
        {allStates.map(st => (
          <button
            key={st}
            onClick={() => setSelectedState(st)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedState === st
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-blue-300'
            }`}
          >
            {st === 'ALL' ? 'All India' : st}
          </button>
        ))}
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-stone-100 shadow-xs">
                    {prod.district}, {prod.state}
                  </span>
                </div>

                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 backdrop-blur-md text-amber-300">
                  Only {prod.stock} left in stock
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-700 dark:text-blue-400 font-bold text-[11px]">
                    {prod.craftHeritage}
                  </span>
                  <div className="flex items-center gap-1 text-amber-600 font-bold text-[11px]">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{prod.sellerRating}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors leading-snug">
                    {prod.name}
                  </h3>
                  {(prod.nativeName || prod.bengaliName) && (
                    <p className="text-xs text-stone-400 font-medium">{prod.nativeName || prod.bengaliName}</p>
                  )}
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {prod.description}
                </p>

                <div className="pt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>By <strong>{prod.sellerName}</strong></span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-stone-100 dark:border-stone-800 mt-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 block">Price</span>
                <span className="text-xl font-black text-stone-900 dark:text-stone-100">₹{prod.price}</span>
              </div>

              <button
                onClick={() => handleAdd(prod)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                  justAddedId === prod.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 text-white dark:text-stone-900'
                }`}
              >
                {justAddedId === prod.id ? (
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

    </div>
  );
}
