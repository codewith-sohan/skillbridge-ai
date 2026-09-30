import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'GEMINI_API_KEY environment variable is not configured. Please add GEMINI_API_KEY in your Vercel Project Settings > Environment Variables.',
      }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { query, district = 'Maharashtra', sector = 'All' } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const systemPrompt = `You are the Principal Policy Advisor to the Directorate of Vocational Education & Training (DVET), Government of Maharashtra, for Smart India Hackathon 2026.
You are advising state administrators on Challenge 134 (Skill Development Alignment with Industry Demand) and Challenge 135 (Longitudinal Employment Outcome Tracking).

Provide an authoritative, high-density, quantitative executive brief answering the user query.
Context:
- District/Jurisdiction: ${district}
- Sector Focus: ${sector}
- State Targets: 85% placement rate, 85% on-the-job skill utilization, ₹6.5+ LPA median starting package.

Structure your response with:
1. Executive Assessment (2 sentences maximum, high clarity)
2. Quantitative Diagnosis & Bottlenecks (specific percentages, equipment gaps, or curriculum lag)
3. Immediate 90-Day Policy Interventions (bulleted, with estimated capital costs in INR Crores/Lakhs)
4. Projected Outcome on Placement & Wage Retention (statistically grounded projection)

Be professional, concise, and decisive. Avoid fluff.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nAdministrator Query: ${query}` }],
        },
      ],
    });

    const text = response.text || 'Unable to generate policy brief.';

    return NextResponse.json({
      success: true,
      answer: text,
    });
  } catch (error: any) {
    console.error('Quick advisor error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate advisory response' },
      { status: 500 }
    );
  }
}
