import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

interface Session {
  id: string;
  type: string;
  userId: string;
  startTime: Date;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  status: 'active' | 'completed';
}

// In-memory storage (for MVP)
const sessions = new Map<string, Session>();

function loadSystemPrompt(sessionType: string): string {
  try {
    const krishnamurtiPath = path.join(process.cwd(), 'api/prompts/krishnamurti-system.md');
    const sessionTypesPath = path.join(process.cwd(), 'api/prompts/session-types.md');
    
    const krishnamurti = fs.readFileSync(krishnamurtiPath, 'utf-8');
    const sessionTypes = fs.readFileSync(sessionTypesPath, 'utf-8');

    let typeSpecificPrompt = '';

    switch (sessionType) {
      case 'pattern-break':
        typeSpecificPrompt =
          '## SESSION TYPE 1: Pattern Break\n' +
          sessionTypes.split('## SESSION TYPE 1: Pattern Break')[1].split('---')[0];
        break;
      case 'after-fight':
        typeSpecificPrompt =
          '## SESSION TYPE 2: After the Fight\n' +
          sessionTypes.split('## SESSION TYPE 2: After the Fight')[1].split('---')[0];
        break;
      case 'breakup':
        typeSpecificPrompt =
          '## SESSION TYPE 3: Breakup Breakdown\n' +
          sessionTypes.split('## SESSION TYPE 3: Breakup Breakdown')[1].split('---')[0];
        break;
      case 'group':
        typeSpecificPrompt =
          '## SESSION TYPE 4: Group Session\n' +
          sessionTypes.split('## SESSION TYPE 4: Group Session')[1];
        break;
    }

    return krishnamurti + '\n\n' + typeSpecificPrompt;
  } catch (error) {
    console.error('Error loading system prompt:', error);
    return 'You are a compassionate relationship coach using Krishnamurti inquiry methods.';
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionType, userId } = req.body;

    if (!sessionType || !userId) {
      return res.status(400).json({ error: 'Missing sessionType or userId' });
    }

    const sessionId = uuidv4();
    const systemPrompt = loadSystemPrompt(sessionType);

    const session: Session = {
      id: sessionId,
      type: sessionType,
      userId,
      startTime: new Date(),
      messages: [],
      status: 'active',
    };

    sessions.set(sessionId, session);

    return res.status(200).json({
      sessionId,
      systemPrompt,
      message: 'Session started successfully',
    });
  } catch (error) {
    console.error('Error starting session:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
