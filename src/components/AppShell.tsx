'use client';

import React, { useState } from 'react';
import { PorjotokProvider } from '@/lib/store/porjotok-context';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { CartDrawer } from '@/components/CartDrawer';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <PorjotokProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0C0D12] text-stone-900 dark:text-stone-100 selection:bg-amber-500 selection:text-white transition-colors duration-200">
        <Navbar 
          onOpenSearch={() => setSearchOpen(true)} 
          onOpenCart={() => setCartOpen(true)} 
        />
        
        <main className="flex-1 w-full">
          {children}
        </main>
        
        <Footer />

        <SearchModal 
          isOpen={searchOpen} 
          onClose={() => setSearchOpen(false)} 
        />

        <CartDrawer 
          isOpen={cartOpen} 
          onClose={() => setCartOpen(false)} 
        />
      </div>
    </PorjotokProvider>
  );
}
