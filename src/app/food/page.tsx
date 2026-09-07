'use client';

import React, { useState } from 'react';
import { Utensils, Star, ShieldCheck, ShoppingBag, Plus, Sparkles, MapPin, Clock } from 'lucide-react';
import { CANONICAL_FOOD_ITEMS } from '@/lib/data/food-items';
import { usePorjotok } from '@/lib/store/porjotok-context';

export default function LocalFoodPage() {
  const { addToCart } = usePorjotok();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'ALL', label: 'All Delicacies' },
    { id: 'SWEET', label: 'Artisanal Sweets (মিষ্টি)' },
    { id: 'STREET_FOOD', label: 'Kolkata Street Food' },
    { id: 'TRADITIONAL_MEAL', label: 'Traditional Meals' },
    { id: 'SNACK', label: 'Snacks & Savories' }
  ];

  const filteredItems = selectedCategory === 'ALL'
    ? CANONICAL_FOOD_ITEMS
    : CANONICAL_FOOD_ITEMS.filter(f => f.category === selectedCategory);

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
          <span>Bengal Culinary Heritage • GI-Tagged Sweets & Heritage Kitchens</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Authentic Sweets & Local Food
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          Savor spongy Banglar Rosogolla from Bagbazar, date-palm Nolen Gur Sandesh, spicy Kolkata mutton rolls, and matir bhar mishti doi from verified confectioners.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
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
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100">
                  {food.district}
                </span>

                {food.isVegetarian && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1">
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
                  {food.bengaliName && (
                    <p className="text-xs text-stone-400 font-medium">{food.bengaliName}</p>
                  )}
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {food.description}
                </p>

                <div className="pt-2 text-[11px] text-stone-500 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="font-medium text-stone-800 dark:text-stone-200">{food.merchantName}</span>
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

    </div>
  );
}
