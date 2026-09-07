'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  BookOpen, 
  Compass, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { CANONICAL_HERITAGE_SITES } from '@/lib/data/heritage-sites';
import { CANONICAL_CULTURE_ENTRIES } from '@/lib/data/culture';

interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  citations?: { title: string; link: string }[];
  timestamp: string;
}

const SAMPLE_PROMPTS = [
  'Tell me about the terracotta temples of Bishnupur.',
  'What is the connection between Kumartuli and Durga Puja?',
  'What is special about the Darjeeling Himalayan Railway?',
  'Which heritage sites can I visit near Murshidabad?',
  'Explain the history of Dokra lost-wax metallurgy.'
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'AI',
    text: 'Nomoshkar! I am Porjotok’s AI Heritage Assistant. I am grounded directly in West Bengal’s 55+ canonical heritage archives, living traditions, verified guides, and culinary masters. How may I assist your cultural journey today?',
    timestamp: 'Just now'
  }
];

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // AI answer matching engine
    setTimeout(() => {
      const q = text.toLowerCase();
      let answer = '';
      let citations: { title: string; link: string }[] = [];

      if (q.includes('bishnupur') || q.includes('terracotta') || q.includes('rasmancha')) {
        answer = 'Bishnupur in Bankura was the fortified capital of the Malla kings. In the absence of stone, sculptors molded alluvial Ganges clay into thousands of intricate narrative terracotta relief tiles illustrating the Ramayana, Mahabharata, and Krishna-lila. Key monuments include Rasmancha (1600 CE), Jor Bangla (1655 CE), and Shyam Rai (1643 CE). Bishnupur is also the birthplace of the Bishnupur Gharana of Dhrupad classical music and GI-certified Baluchari silk weaving.';
        citations = [
          { title: 'Rasmancha Heritage Record', link: '/heritage/rasmancha' },
          { title: 'Jor Bangla Terracotta Temple', link: '/heritage/jor-bangla-temple' },
          { title: 'Baluchari Silk Tradition', link: '/culture/baluchari-sari' }
        ];
      } else if (q.includes('kumartuli') || q.includes('durga puja')) {
        answer = 'Kumartuli is the 300-year-old potters’ quarter located on the banks of the Hooghly River in North Kolkata. Generations of master artisans (Pals) sculpt thousands of earthen Durga idols every autumn using holy Ganga silt (entel mati), straw frames, and natural paints. On the dawn of Mahalaya, artisans perform "Chokkhu Daan" (painting of the eyes), infusing the idol with divine life before it is worshipped across community pandals in UNESCO-inscribed Durga Puja.';
        citations = [
          { title: 'Durga Puja UNESCO Heritage', link: '/culture/durga-puja' },
          { title: 'Kumartuli Clay Idol Making', link: '/culture/kumartuli-idol-making' }
        ];
      } else if (q.includes('darjeeling') || q.includes('toy train') || q.includes('railway')) {
        answer = 'The Darjeeling Himalayan Railway (DHR), affectionately known as the "Toy Train", was opened in 1881 and is inscribed on the UNESCO World Heritage list. It scales from New Jalpaiguri to Darjeeling at 7,400 feet elevation on a 2-foot narrow gauge using innovative loops and zig-zag reverses, such as the famous Batasia Loop overlooking Mount Kanchenjunga.';
        citations = [
          { title: 'Darjeeling Himalayan Railway', link: '/heritage/darjeeling-himalayan-railway' }
        ];
      } else if (q.includes('murshidabad') || q.includes('hazarduari') || q.includes('siraj')) {
        answer = 'Murshidabad was the capital of the Nawabs of Bengal. Its centerpiece is the magnificent Hazarduari Palace (Palace of 1,000 Doors) built in 1837 by Colonel Duncan MacLeod for Nawab Humayun Jah. Nearby, you can explore the Nizamat Imambara, the peaceful cemetery garden of Khushbagh where Nawab Alivardi Khan and Siraj-ud-Daulah rest, and the medieval Sultanate ruins of Gour and Pandua in neighboring Malda.';
        citations = [
          { title: 'Hazarduari Palace Archive', link: '/heritage/hazarduari-palace' },
          { title: 'Tomb of Siraj-ud-Daulah', link: '/heritage/tomb-of-siraj-ud-daulah' }
        ];
      } else if (q.includes('dokra')) {
        answer = 'Dokra is a 4,000-year-old non-ferrous metal casting craft that uses the ancient lost-wax (cire perdue) process, tracing unbroken continuity to the Dancing Girl of Mohenjo-daro. In West Bengal, Bikna village in Bankura and Dariyapur in Purba Bardhaman are the premier craft clusters where artisans mold beeswax threads around clay cores before casting with molten bell metal.';
        citations = [
          { title: 'Dokra Metal Casting', link: '/culture/dokra-metal-casting' },
          { title: 'Dokra Lost-Wax Workshop', link: '/workshops' }
        ];
      } else {
        answer = `According to Porjotok’s verified heritage catalogue, West Bengal features over 55 canonical sites and 15 living traditions spanning ancient Buddhist Pala kingdoms, medieval Sultanate mosques in Malda, terracotta temples in Bankura, Nawabi heritage in Murshidabad, and Kolkata’s Renaissance landmarks. You can explore curated circuits, book verified guides, or use our AI Trip Planner for a customized day-by-day itinerary.`;
        citations = [
          { title: 'Browse 55 Heritage Sites', link: '/heritage' },
          { title: 'Launch AI Trip Planner', link: '/ai/trip-planner' }
        ];
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'AI',
        text: answer,
        citations,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 flex flex-col h-[calc(100vh-5rem)]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl gradient-terracotta text-white flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              Porjotok Heritage AI
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Grounded in Canonical Archive
              </span>
            </h1>
            <p className="text-xs text-stone-500">Retrieving from 55 canonical sites, living traditions, and verified services</p>
          </div>
        </div>

        <Link
          href="/ai/trip-planner"
          className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
        >
          <span>Custom Trip Planner</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'AI' && (
              <div className="w-8 h-8 rounded-full gradient-terracotta text-white flex items-center justify-center shrink-0 text-xs shadow-xs mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[80%] rounded-2xl p-4 space-y-2 text-xs leading-relaxed shadow-xs ${
              msg.sender === 'USER'
                ? 'bg-amber-600 text-white rounded-tr-none'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 rounded-tl-none'
            }`}>
              <p className="whitespace-pre-line sm:text-sm">{msg.text}</p>

              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-1 text-[11px]">
                  <span className="font-bold text-stone-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-amber-600" />
                    Verified Porjotok References:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.citations.map((cite, i) => (
                      <Link
                        key={i}
                        href={cite.link}
                        className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-semibold hover:underline"
                      >
                        {cite.title} ↗
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <span className={`block text-[9px] text-right ${msg.sender === 'USER' ? 'text-amber-200' : 'text-stone-400'}`}>
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'USER' && (
              <div className="w-8 h-8 rounded-full bg-stone-300 dark:bg-stone-700 text-stone-700 dark:text-stone-200 flex items-center justify-center shrink-0 text-xs mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full gradient-terracotta text-white flex items-center justify-center shrink-0 text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-1 font-medium">Retrieving archive knowledge...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts Bar */}
      <div className="space-y-1.5">
        <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Suggested Queries</div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {SAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-500 hover:text-amber-600 shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 p-2 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Bengal history, temples, festivals, or trips..."
          className="flex-1 px-3 py-2 text-xs sm:text-sm bg-transparent border-none outline-none text-stone-900 dark:text-stone-100 placeholder-stone-400"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
