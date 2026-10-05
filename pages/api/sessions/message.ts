import { NextApiRequest, NextApiResponse } from 'next';
import { Anthropic } from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// In-memory storage - in production use a real database
const sessions = new Map<string, any>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId, message, systemPrompt } = req.body;

    if (!sessionId || !message || !systemPrompt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get or create session
    let session = sessions.get(sessionId) || {
      id: sessionId,
      messages: [],
    };

    // Add user message
    session.messages.push({
      role: 'user',
      content: message,
    });

    try {
      // Call Anthropic API
      const response = await client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: systemPrompt,
        messages: session.messages,
      });

      const assistantMessage = response.content[0]?.type === 'text' ? response.content[0].text : '';

      // Add assistant response to session
      session.messages.push({
        role: 'assistant',
        content: assistantMessage,
      });

      // Store session
      sessions.set(sessionId, session);

      return res.status(200).json({
        response: assistantMessage,
        sessionId,
      });
    } catch (apiError: any) {
      console.error('Anthropic API error:', apiError);
      
      if (apiError?.status === 401) {
        return res.status(401).json({ error: 'Invalid API key' });
      }
      
      if (apiError?.status === 429) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }

      return res.status(500).json({ error: 'Failed to get AI response' });
    }
  } catch (error) {
    console.error('Error processing message:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
