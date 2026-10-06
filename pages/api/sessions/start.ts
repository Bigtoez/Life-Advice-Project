import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { VALID_TYPES } from '../../../lib/systemPrompt';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { sessionType } = req.body || {};
  if (!VALID_TYPES.includes(sessionType)) {
    return res.status(400).json({ error: 'Invalid session type' });
  }
  return res.status(200).json({ sessionId: uuidv4() });
}
