'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { usePorjotok } from '@/lib/store/porjotok-context';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, placeOrder } = usePorjotok();
  const [address, setAddress] = useState('Flat 4B, Heritage Enclave, South Avenue, Kolkata 700029');
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const orderId = placeOrder(address);
    setOrderSuccessId(orderId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-500" />
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">Your Heritage Cart</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold">
              {cart.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orderSuccessId ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">Order Placed Successfully!</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Order <span className="font-mono font-bold text-amber-600">{orderSuccessId}</span> has been routed to the verified local merchant.
              </p>
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300 text-left">
                <strong>Tip:</strong> Switch to the <em>Local Food Merchant</em> role in the top navbar to accept or update preparation status in real-time!
              </div>
              <button
                onClick={() => {
                  setOrderSuccessId(null);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors"
              >
                Done & View Order
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-20 text-center text-stone-500">
              <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-700 mb-3" />
              <p className="font-medium text-stone-800 dark:text-stone-200">Your cart is empty</p>
              <p className="text-xs text-stone-400 mt-1">Explore authentic sweets, Bengali street foods, and handcrafts.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-3.5 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-stone-200 dark:bg-stone-700">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-stone-900 dark:text-stone-100 text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">{item.merchantOrSeller}</p>
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">
                        ₹{item.price * item.quantity}
                      </span>
                      
                      <div className="flex items-center gap-2 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-700 px-1.5 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-500 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Delivery Address Form */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Delivery / Pickup Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!orderSuccessId && cart.length > 0 && (
          <div className="p-6 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-600 dark:text-stone-400">Subtotal</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-base">₹{cartTotal}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Local Community Support Fee</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">₹0 (Free)</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-all shadow-md shadow-amber-600/20"
            >
              <span>Place Order (₹{cartTotal})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
