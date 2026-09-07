'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Award, ShieldCheck, CheckCircle2, Calendar, User, Compass, ArrowLeft, QrCode } from 'lucide-react';

export default function PublicCertificateVerificationPage() {
  const params = useParams();
  const certId = (params?.certificateId as string) || 'WS-7821';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-8">
      
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-600"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Porjotok Home
        </Link>
      </div>

      {/* Verified Status Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Officially Authenticated Digital Heritage Certificate</span>
        </div>
        <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
          STATUS: VERIFIED
        </span>
      </div>

      {/* Certificate Parchment Document */}
      <div className="relative p-8 sm:p-14 rounded-3xl bg-[#FAF6EE] dark:bg-[#151821] border-8 border-double border-amber-600/60 shadow-2xl text-center space-y-8 overflow-hidden text-stone-900 dark:text-stone-100">
        
        {/* Decorative corner accents */}
        <div className="absolute top-4 left-4 text-amber-600 font-serif text-2xl select-none">❖</div>
        <div className="absolute top-4 right-4 text-amber-600 font-serif text-2xl select-none">❖</div>
        <div className="absolute bottom-4 left-4 text-amber-600 font-serif text-2xl select-none">❖</div>
        <div className="absolute bottom-4 right-4 text-amber-600 font-serif text-2xl select-none">❖</div>

        {/* Certificate Header */}
        <div className="space-y-2">
          <div className="w-16 h-16 rounded-2xl gradient-terracotta text-white flex items-center justify-center mx-auto shadow-md">
            <Award className="w-9 h-9 text-amber-200" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Government of West Bengal • Tourism & Cultural Affairs Directorate
          </p>
          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-stone-900 dark:text-stone-100">
            Certificate of Traditional Artistry
          </h1>
          <p className="text-xs text-stone-500 font-mono">
            Unique Verification Hash: {certId}
          </p>
        </div>

        {/* Recipient & Achievement */}
        <div className="space-y-3 max-w-lg mx-auto">
          <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
            This certifies that
          </p>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-900 dark:text-amber-200 border-b-2 border-dashed border-amber-400 pb-2">
            Ananya Sen
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pt-2">
            has successfully completed the intensive hands-on masterclass in <br />
            <strong className="text-stone-900 dark:text-stone-100 font-serif text-sm sm:text-base">
              Ancient Dokra Lost-Wax Bell Metal Casting
            </strong> <br />
            held at Bikna Village, Bankura District, West Bengal.
          </p>
        </div>

        {/* Verification Signatures & QR Code */}
        <div className="pt-8 border-t border-amber-300/60 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-600 dark:text-stone-400">
          
          <div className="text-left space-y-1">
            <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
              Shyamal Karmakar
            </div>
            <div className="text-[10px] text-stone-500">Master Conductor • National Awardee</div>
            <div className="text-[10px] text-amber-600">Bikna Dokra Shilpi Samity</div>
          </div>

          {/* QR Code Graphic Simulator */}
          <div className="p-3 rounded-2xl bg-white dark:bg-stone-900 border-2 border-amber-400 shadow-md flex flex-col items-center">
            <QrCode className="w-16 h-16 text-stone-900 dark:text-white" />
            <span className="text-[9px] font-mono font-bold text-stone-500 mt-1">
              SCAN TO VERIFY
            </span>
          </div>

          <div className="text-right space-y-1">
            <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
              Porjotok Oversight
            </div>
            <div className="text-[10px] text-stone-500">SIH 26197 Digital Registrar</div>
            <div className="text-[10px] text-emerald-600 font-bold">Cryptographically Validated</div>
          </div>

        </div>

      </div>

    </div>
  );
}
