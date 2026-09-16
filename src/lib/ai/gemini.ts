import { CANONICAL_HERITAGE_SITES } from '@/lib/data/heritage-sites';
import { CANONICAL_CULTURE_ENTRIES } from '@/lib/data/culture';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const GEMINI_MODEL = 'gemini-3.6-flash';

export interface ChatCitation {
  title: string;
  link: string;
}

export interface ChatResponse {
  text: string;
  citations: ChatCitation[];
}

export interface DayActivity {
  time: string;
  title: string;
  description: string;
  location: string;
  category: 'HERITAGE' | 'FOOD' | 'WORKSHOP' | 'EXPERIENCE';
  costEstimate: number;
  slug?: string;
}

export interface DayPlan {
  dayNumber: number;
  dayTitle: string;
  activities: DayActivity[];
}

// Helper to find matching sites & cultures for citations
function extractCitations(queryAndResponse: string): ChatCitation[] {
  const text = queryAndResponse.toLowerCase();
  const matched: ChatCitation[] = [];
  const seenLinks = new Set<string>();

  for (const site of CANONICAL_HERITAGE_SITES) {
    const nameLower = site.name.toLowerCase();
    if (text.includes(nameLower) || (site.district && text.includes(site.district.toLowerCase()) && text.includes('heritage'))) {
      const link = `/heritage/${site.slug}`;
      if (!seenLinks.has(link)) {
        seenLinks.add(link);
        matched.push({ title: site.name, link });
      }
    }
    if (matched.length >= 4) break;
  }

  if (matched.length < 3) {
    for (const cult of CANONICAL_CULTURE_ENTRIES) {
      const nameLower = cult.name.toLowerCase();
      if (text.includes(nameLower)) {
        const link = `/culture/${cult.slug}`;
        if (!seenLinks.has(link)) {
          seenLinks.add(link);
          matched.push({ title: cult.name, link });
        }
      }
      if (matched.length >= 4) break;
    }
  }

  return matched;
}

const SYSTEM_INSTRUCTION = `You are Parampara's AI Heritage & Cultural Guide, an expert scholar and warm ambassador of India's classical, architectural, intangible cultural, and historical heritage.
Your knowledge encompasses:
- UNESCO World Heritage sites across India (Sundarbans, DHR Toy Train, Santiniketan, Taj Mahal, Hampi, Ajanta, Ellora, Konark, Brihadisvara, Mahabalipuram, Khajuraho, Kaziranga, etc.)
- Living traditions (Durga Puja, Baul music, Chhau dance, Dokra metal craft, Baluchari & Jamdani handloom, Kantha embroidery)
- Regional culinary history, architectural periods (Malla terracotta, Chola granitic vimanas, Mughal, Rajput, Indo-Saracenic), and verified local crafts guilds.

Formatting rules:
- Provide rich, deeply engaging, accurate, and inspiring answers.
- Use clear paragraphs, markdown bolding for key terms, and bullet points where helpful.
- Suggest respectful, culturally immersive etiquette for visitors when relevant.
- Keep the tone respectful, welcoming, and culturally authentic.`;

export async function generateHeritageChat(
  message: string,
  history: { sender: 'USER' | 'AI'; text: string }[] = []
): Promise<ChatResponse> {
  const contents = [
    {
      role: 'user',
      parts: [{ text: SYSTEM_INSTRUCTION }]
    },
    {
      role: 'model',
      parts: [{ text: 'Namaste! I understand my role as Parampara’s AI Heritage Guide and am ready to assist.' }]
    }
  ];

  // Add conversation history
  const recentHistory = history.slice(-6);
  for (const msg of recentHistory) {
    contents.push({
      role: msg.sender === 'USER' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }

  // Add current message
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Gemini API error:', res.status, errText);
      throw new Error(`Gemini API returned ${res.status}`);
    }

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply) {
      const citations = extractCitations(message + ' ' + reply);
      return { text: reply, citations };
    }
  } catch (error) {
    console.error('Error in generateHeritageChat:', error);
  }

  // Graceful fallback if offline
  const fallbackCitations = extractCitations(message);
  return {
    text: `Namaste! As your Parampara Heritage Guide, I am delighted to share that ${message} is deeply intertwined with India's celebrated cultural tapestry. From classical monument preservation to sacred living craft lineages, our heritage directory catalogs verified details, visiting logistics, and archival histories for your journey.`,
    citations: fallbackCitations
  };
}

export async function generateAITripPlan(params: {
  destination: string;
  durationDays: number;
  budgetTier: 'BUDGET' | 'BALANCED' | 'LUXURY';
  travelPace: 'RELAXED' | 'BALANCED' | 'INTENSIVE';
  selectedInterests: string[];
}): Promise<DayPlan[]> {
  const prompt = `Generate a detailed, authentic ${params.durationDays}-day cultural and heritage itinerary for "${params.destination}".
Pace: ${params.travelPace}.
Budget Tier: ${params.budgetTier}.
Key Traveler Interests: ${params.selectedInterests.join(', ')}.

Output STRICT valid JSON without markdown fences, with exactly this schema:
[
  {
    "dayNumber": 1,
    "dayTitle": "Short descriptive title for Day 1",
    "activities": [
      {
        "time": "09:00 AM - 11:30 AM",
        "title": "Activity name",
        "description": "2-3 sentences explaining historical/cultural experience",
        "location": "Locality or Site name",
        "category": "HERITAGE", // One of: HERITAGE, FOOD, WORKSHOP, EXPERIENCE
        "costEstimate": 150 // in INR
      }
    ]
  }
]
Ensure each day has 3 to 4 distinct, engaging activities including morning heritage exploration, traditional local cuisine, artisan craft or workshop, and scenic evening cultural immersion.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (res.ok) {
      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // Clean possible json code blocks
      const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed: DayPlan[] = JSON.parse(cleanJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error generating AI Trip Plan via Gemini:', error);
  }

  // Fallback programmatic generation tailored to days
  const fallbackPlans: DayPlan[] = [];
  for (let d = 1; d <= params.durationDays; d++) {
    fallbackPlans.push({
      dayNumber: d,
      dayTitle: `Day ${d}: Immersive Heritage & Cultural Discovery in ${params.destination}`,
      activities: [
        {
          time: '09:00 AM - 12:00 PM',
          title: `${params.destination} Landmark Heritage Exploration`,
          description: `Morning architectural tour exploring the historical monuments and regional architectural craftsmanship of ${params.destination}.`,
          location: `${params.destination} Heritage Precinct`,
          category: 'HERITAGE',
          costEstimate: params.budgetTier === 'LUXURY' ? 500 : 50,
          slug: '/heritage'
        },
        {
          time: '12:30 PM - 02:00 PM',
          title: 'Authentic Regional Culinary Tasting',
          description: `Enjoy traditional delicacies and seasonal heritage recipes prepared by veteran local master cooks.`,
          location: `${params.destination} Historic Quarter`,
          category: 'FOOD',
          costEstimate: params.budgetTier === 'LUXURY' ? 1200 : (params.budgetTier === 'BALANCED' ? 450 : 200)
        },
        {
          time: '03:00 PM - 05:30 PM',
          title: 'Artisan Living Craft Guild & Workshop',
          description: `Engage with traditional master weavers, terracotta or brass artisans preserving ancient craftsmanship.`,
          location: `${params.destination} Crafts Guild`,
          category: 'WORKSHOP',
          costEstimate: params.budgetTier === 'LUXURY' ? 2500 : 750,
          slug: '/workshops'
        },
        {
          time: '06:00 PM - 07:30 PM',
          title: 'Twilight Cultural Gathering & Evening Stroll',
          description: `Relax amidst temple lamps, sacred evening chants, or folk musical performances by local artists.`,
          location: `${params.destination} Promenade`,
          category: 'EXPERIENCE',
          costEstimate: 0
        }
      ]
    });
  }

  return fallbackPlans;
}
