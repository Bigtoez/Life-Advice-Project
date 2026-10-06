import { NextApiRequest, NextApiResponse } from 'next';
import { Anthropic } from '@anthropic-ai/sdk';
import { buildSystemPrompt, VALID_TYPES } from '../../../../lib/systemPrompt';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY = 20;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionType, history, message } = req.body || {};

  if (!VALID_TYPES.includes(sessionType) || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return res.status(400).json({ error: 'Message too long' });
  }

  const past = Array.isArray(history) ? history.slice(-MAX_HISTORY) : [];
  const cleanHistory = past
    .filter(
      (m: any) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string'
    )
    .map((m: any) => ({ role: m.role as 'user' | 'assistant', content: String(m.content).slice(0, 2000) }));

  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [
    ...cleanHistory,
    { role: 'user', content: message },
  ];
  // The API requires the first message to be from the user
  while (messages.length && messages[0].role !== 'user') messages.shift();

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: buildSystemPrompt(sessionType),
      messages,
    });
    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
    return res.status(200).json({ response: text });
  } catch (apiError: any) {
    console.error('Anthropic API error:', apiError?.status, apiError?.message);
    return res.status(500).json({ error: 'Failed to get response' });
  }
}
