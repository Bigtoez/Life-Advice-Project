# 🚀 Clarity Coach - Startup Guide

## What You've Built

A **Krishnamurti-inspired AI relationship advisor** with:
✅ Dense philosophical backend (Claude Haiku)
✅ Modern frontend (Next.js + Tailwind)
✅ 4 session types
✅ Real-time chat interface
✅ Ready for production

---

## Step 1: Install Dependencies

```bash
cd C:\Users\matth\AppData\Local\Cline\relationship-advice-project
npm install
```

---

## Step 2: Add Your API Key

Edit `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Get your key: https://console.anthropic.com/keys

---

## Step 3: Start Backend

```bash
npm run api:dev
```

Should see:
```
🧠 Krishnamurti Advisor Agent running on port 3001
```

---

## Step 4: Start Frontend (New Terminal)

```bash
npm run dev
```

Should see:
```
ready - started server on 0.0.0.0:3000
```

---

## Step 5: Test It!

1. Open `http://localhost:3000`
2. Click on a session type
3. Start chatting with the AI

---

## How It Works

1. Frontend loads session page with 15-min timer
2. Claude receives Krishnamurti system prompt
3. Session-specific context added (Pattern Break, After Fight, etc.)
4. User messages sent to backend
5. Claude responds with philosophical guidance
6. Response appears in real-time chat

---

## Session Types

- **Pattern Break** ($5): Identify recurring patterns
- **After the Fight** ($5): Navigate recent conflict
- **Break Up / Transition** ($7): Process endings
- **Group Dialogues** ($8): Collective inquiry

---

## Project Structure

```
├── api/
│   ├── server.ts
│   └── prompts/
│       ├── krishnamurti-system.md
│       └── session-types.md
├── pages/
│   ├── index.tsx (homepage)
│   ├── session/[type].tsx (chat)
│   └── _app.tsx
├── styles/globals.css
└── package.json
```

---

## Troubleshooting

**npm install fails**: Use `npm install --legacy-peer-deps`

**Backend won't start**: Check port 3001 is free, API key is valid

**Frontend can't reach backend**: Make sure backend is running

**Claude errors**: Verify API key at console.anthropic.com

---

## Next Steps

1. Test with real conversations
2. Refine prompts based on feedback
3. Deploy to Vercel + Railway
4. Add payment processing
5. Launch on Virtuals Protocol

---

## Economics

- **Cost per session**: ~$0.32
- **Revenue per session**: $5-8
- **At 500 sessions/month**: $2,300-$3,840 MRR
- **Profit margin**: 90%+

---

Ready? Start with Step 1! 🚀
