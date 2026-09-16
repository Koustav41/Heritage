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
  'Plan a 3-day heritage trail of Hampi and Badami.',
  'What makes the Kailasa temple at Ellora an architectural miracle?',
  'Tell me about the terracotta temples of Bishnupur.',
  'What is the history of Chola bronzes and Brihadisvara?',
  'Explain the history of Dokra lost-wax metallurgy.',
  'What are the must-see UNESCO World Heritage sites in Rajasthan?'
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'AI',
    text: 'Namaste & Welcome! I am Parampara’s AI Heritage Guide, powered by Google Gemini and grounded in India’s canonical heritage archives, UNESCO World Heritage monuments, living traditions, verified guides, and regional culinary cultures. How may I assist your cultural journey across India today?',
    timestamp: 'Just now'
  }
];

function FormattedText({ text }: { text: string }) {
  // Parse paragraphs and bullet points
  const paragraphs = text.split('\n\n');

  return (
    <div className="space-y-2 sm:text-sm leading-relaxed">
      {paragraphs.map((para, idx) => {
        const lines = para.split('\n');
        const isBulletList = lines.every(l => l.trim().startsWith('* ') || l.trim().startsWith('- ') || l.trim().match(/^\d+\.\s/));

        if (isBulletList) {
          return (
            <ul key={idx} className="list-disc list-inside space-y-1 my-1 pl-1">
              {lines.map((line, lIdx) => {
                const clean = line.replace(/^[\*\-]\s+/, '').replace(/^\d+\.\s+/, '');
                return <li key={lIdx}>{renderInline(clean)}</li>;
              })}
            </ul>
          );
        }

        return (
          <p key={idx}>
            {lines.map((l, lIdx) => (
              <React.Fragment key={lIdx}>
                {renderInline(l)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(str: string) {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-amber-700 dark:text-amber-400">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (textToSend?: string) => {
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

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (!res.ok) throw new Error('API failed');
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'AI',
        text: data.text,
        citations: data.citations || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI chat error:', err);
      // Fallback
      const q = text.toLowerCase();
      let answer = '';
      let citations: { title: string; link: string }[] = [];

      if (q.includes('taj mahal') || q.includes('agra')) {
        answer = 'The Taj Mahal in Agra, Uttar Pradesh, is a UNESCO World Heritage site and one of the New Seven Wonders of the World. Commissioned in 1632 by Mughal Emperor Shah Jahan as an ivory-white marble mausoleum for his beloved consort Mumtaz Mahal, it sits amidst classical Charbagh gardens on the banks of the Yamuna River.';
        citations = [
          { title: 'Taj Mahal Heritage Record', link: '/heritage/taj-mahal' },
          { title: 'Agra Fort Monument', link: '/heritage/agra-fort' }
        ];
      } else if (q.includes('bishnupur') || q.includes('terracotta') || q.includes('rasmancha')) {
        answer = 'Bishnupur in Bankura was the fortified capital of the Malla kings. In the absence of stone, sculptors molded alluvial Ganges clay into thousands of intricate narrative terracotta relief tiles illustrating the Ramayana, Mahabharata, and Krishna-lila. Key monuments include Rasmancha (1600 CE), Jor Bangla (1655 CE), and Shyam Rai (1643 CE).';
        citations = [
          { title: 'Rasmancha Heritage Record', link: '/heritage/rasmancha' },
          { title: 'Jor Bangla Terracotta Temple', link: '/heritage/jor-bangla-temple' },
          { title: 'Baluchari Silk Tradition', link: '/culture/baluchari-sari' }
        ];
      } else {
        answer = `Namaste! As your Parampara Heritage Guide, I am delighted to share that ${text} is deeply intertwined with India's celebrated cultural tapestry. From classical monument preservation to sacred living craft lineages, our heritage directory catalogs verified details, visiting logistics, and archival histories for your journey.`;
        citations = [
          { title: 'Browse 85+ Heritage Sites', link: '/heritage' },
          { title: 'Living Traditions & Culture', link: '/culture' }
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
    } finally {
      setIsTyping(false);
    }
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
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-stone-900 dark:text-stone-100">Parampara Heritage AI Guide</h1>
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Gemini Live
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Conversational intelligence grounded in India&apos;s verified cultural archives
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/ai/trip-planner"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/80 hover:border-amber-400 text-xs font-semibold text-stone-700 dark:text-stone-300 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Trip Planner</span>
          </Link>
          <button
            onClick={() => setMessages(INITIAL_MESSAGES)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Reset Conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
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

            <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 space-y-2 text-xs leading-relaxed shadow-xs ${
              msg.sender === 'USER'
                ? 'bg-amber-600 text-white rounded-tr-none'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 rounded-tl-none'
            }`}>
              {msg.sender === 'USER' ? (
                <p className="whitespace-pre-line sm:text-sm">{msg.text}</p>
              ) : (
                <FormattedText text={msg.text} />
              )}

              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-1 text-[11px]">
                  <span className="font-bold text-stone-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-amber-600" />
                    Verified Parampara References:
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
              <span className="ml-1 font-medium">Consulting Gemini heritage intelligence...</span>
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
          placeholder="Ask anything about Indian history, temples, festivals, crafts, or trip logistics..."
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
