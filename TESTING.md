# Testing Clarity Coach

## Quick Test Scenarios

### Test 1: Pattern Break Session

1. Go to `http://localhost:3000`
2. Click "Pattern Break"
3. Send this message:
   ```
   I keep arguing with my partner about the same thing - they want to spend time 
   with their friends and I feel abandoned. It happens every weekend and I hate how 
   I react. I just get angry instead of talking about it.
   ```

**Expected**: Claude responds with philosophical questions that help you see the pattern, not advice.

---

### Test 2: After the Fight Session

1. Click "After the Fight"
2. Send:
   ```
   We had a big fight yesterday about plans. They wanted to go out, I wanted to stay 
   in. I said something mean and they got really quiet. Now it's awkward and I don't 
   know how to fix it.
   ```

**Expected**: Guides you through understanding both perspectives without judgment.

---

### Test 3: Break Up Session

1. Click "Break Up / Transition"
2. Send:
   ```
   My 5-year relationship just ended. I feel lost and I don't know who I am without 
   them. There's grief, but also relief, and I'm confused about that.
   ```

**Expected**: Deep exploration of the transition, not consolation.

---

### Test 4: Timer Check

- Open any session
- Verify 15:00 countdown starts
- Watch it tick down
- Should disable input when 0:00

---

## Testing Backend API Directly

### Start Session

```bash
curl -X POST http://localhost:3001/api/sessions/start \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user-1","sessionType":"pattern-break"}'
```

Response should include `sessionId`.

### Send Message

```bash
curl -X POST http://localhost:3001/api/sessions/{SESSION_ID}/message \
  -H "Content-Type: application/json" \
  -d '{"message":"I keep repeating the same mistakes in relationships"}'
```

Should get back Claude response.

### Get History

```bash
curl http://localhost:3001/api/sessions/{SESSION_ID}
```

Shows all messages in session.

### Health Check

```bash
curl http://localhost:3001/api/health
```

Should return `{"status":"ok"}`

---

## Quality Checks

- [ ] Responses feel philosophical, not prescriptive
- [ ] Questions invite self-reflection
- [ ] No advice given ("you should...")
- [ ] Tone is warm and non-judgmental
- [ ] Session ends gracefully when timer reaches 0
- [ ] Chat scrolls to latest message
- [ ] No API errors in console
- [ ] Styling looks clean and professional

---

## Performance Tests

- [ ] First message response < 3 seconds
- [ ] Subsequent messages < 2 seconds
- [ ] No memory leaks with multiple sessions
- [ ] UI responsive on desktop
- [ ] Works on mobile browser

---

## Before Production

- [ ] All 4 session types tested
- [ ] At least 5 conversations per type
- [ ] Prompts refined based on responses
- [ ] No console errors
- [ ] API error handling works
- [ ] Environment variables set correctly
- [ ] .env.local added to .gitignore (already done)

---

## Debugging Tips

Check backend logs for error details.

Test with verbose curl:
```bash
curl -v http://localhost:3001/api/health
```

Check frontend console (F12) for API errors.

Verify Claude is responding by checking .env.local has valid key.

---

## When Ready for Prod

- [ ] Deploy backend to Railway
- [ ] Deploy frontend to Vercel
- [ ] Set environment variables in deployment
- [ ] Test deployed URLs work
- [ ] Set up logging & monitoring
- [ ] Create user authentication
- [ ] Add payment processing
