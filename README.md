# Clarity Coach - Krishnamurti-Inspired Relationship Advisor

A transformative AI relationship coaching agent powered by Jiddu Krishnamurti's philosophical teachings, available on the Virtuals Protocol.

## Overview

Clarity Coach combines:
- **Philosophical Foundation**: Krishnamurti's teachings on consciousness and relationships
- **AI Intelligence**: Claude Haiku for fast, insightful responses
- **Session-Based Structure**: 15-minute focused conversations
- **Blockchain Integration**: Built for Virtuals Protocol

## Quick Start

### Installation

```bash
cd relationship-advice-project
npm install
```

### Configuration

Edit `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-xxxxx
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Development

```bash
# Terminal 1 - Backend
npm run api:dev

# Terminal 2 - Frontend
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
├── api/server.ts                    # Express + Claude backend
├── api/prompts/
│   ├── krishnamurti-system.md       # Core philosophy
│   └── session-types.md             # Session guides
├── pages/
│   ├── index.tsx                    # Home page
│   └── session/[type].tsx           # Chat interface
├── styles/globals.css               # Tailwind styles
└── package.json
```

## Session Types

1. **Pattern Break** ($5, 15 min)
   - Identify recurring relationship patterns
   - Explore roots and triggers

2. **After the Fight** ($5, 15 min)
   - Process conflict with clarity
   - Restore connection

3. **Break Up / Transition** ($7, 15 min)
   - Navigate endings
   - Integrate lessons

4. **Group Dialogues** ($8, 30 min)
   - Collective wisdom exploration
   - Shared perspective learning

## API Endpoints

```
POST /api/sessions/start
POST /api/sessions/:sessionId/message
GET /api/sessions/:sessionId
POST /api/sessions/:sessionId/end
GET /api/health
```

## Tech Stack

- Backend: Node.js, TypeScript, Express
- Frontend: Next.js, React, Tailwind
- AI: Anthropic Claude Haiku
- Deployment: Vercel + Railway

## Cost Economics

- Per session cost: ~$0.32
- Per session price: $5-$8
- **Profit margin: 90%+**
- At 500 sessions/month: $2,340-$3,840 MRR

## Deployment

### Frontend (Vercel)
```bash
vercel
```

### Backend (Railway)
- Connect GitHub repo
- Set ANTHROPIC_API_KEY
- Deploy

## Future Enhancements

- [ ] PostgreSQL persistence
- [ ] User authentication
- [ ] Payment processing
- [ ] Virtuals Protocol registration
- [ ] Group sessions
- [ ] Mobile app

## Philosophy

Built on Krishnamurti's approach:
- Direct seeing over advice
- Questions over answers
- Freedom through understanding
- Authentic, non-judgmental presence

---

**Note**: This is not professional mental health care. Refer serious issues to qualified professionals.
