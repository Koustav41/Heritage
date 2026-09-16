import { NextResponse } from 'next/server';
import { generateAITripPlan } from '@/lib/ai/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { destination, durationDays, budgetTier, travelPace, selectedInterests } = body;

    if (!destination) {
      return NextResponse.json({ error: 'Destination is required' }, { status: 400 });
    }

    const plan = await generateAITripPlan({
      destination,
      durationDays: Number(durationDays) || 3,
      budgetTier: budgetTier || 'BALANCED',
      travelPace: travelPace || 'BALANCED',
      selectedInterests: selectedInterests || []
    });

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('API Error in /api/ai/trip-planner:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary' },
      { status: 500 }
    );
  }
}
