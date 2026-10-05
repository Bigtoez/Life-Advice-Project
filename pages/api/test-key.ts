import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is NOT set in environment' });
  }
  
  // Show first and last 10 chars to verify it's there
  const masked = apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 10);
  
  return res.status(200).json({ 
    message: 'API key is set',
    masked: masked,
    length: apiKey.length
  });
}
