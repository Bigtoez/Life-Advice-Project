import { NextApiRequest, NextApiResponse } from 'next';
import { Anthropic } from '@anthropic-ai/sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Test with Haiku 4.5 model
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: 'Say hello',
        },
      ],
    });

    return res.status(200).json({ 
      success: true,
      message: response.content[0]?.type === 'text' ? response.content[0].text : 'No response'
    });
  } catch (error: any) {
    return res.status(500).json({ 
      error: error?.message,
      status: error?.status,
      details: error?.error
    });
  }
}
