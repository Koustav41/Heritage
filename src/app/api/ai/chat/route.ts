import { NextResponse } from 'next/server';
import { generateHeritageChat } from '@/lib/ai/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const response = await generateHeritageChat(message, history || []);
    return NextResponse.json(response);
  } catch (error) {
    console.error('API Error in /api/ai/chat:', error);
    return NextResponse.json(
      { error: 'Failed to process AI chat request' },
      { status: 500 }
    );
  }
}
