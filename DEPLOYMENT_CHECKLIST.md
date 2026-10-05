# 🚀 DEPLOYMENT CHECKLIST - itscomplicated.app

**Status**: Domain purchased ✅
**Goal**: Get live in next few hours

---

## IMMEDIATE: Test Locally (Do This First!)

```bash
cd C:\Users\matth\AppData\Local\Cline\relationship-advice-project
npm run dev
```

Visit http://localhost:3000 and verify:
- [ ] Homepage loads
- [ ] "It's complicated. Let's talk about it." tagline shows
- [ ] All 4 sessions show "20 min"
- [ ] "Real Talk" and "20 Minutes of Honesty" visible
- [ ] Click "Start a Session" - timer counts down 20 minutes
- [ ] Chat responds (test with a question)
- [ ] No console errors (F12 > Console tab)

**If this works**: Ready for production!

---

## STEP 1: Set Up Vercel (30 minutes)

**Why Vercel**: Built for Next.js, automatic HTTPS, easiest deployment

1. Go to https://vercel.com
2. Click "Sign Up" → Choose GitHub
3. Authorize and connect your GitHub account
4. Find your `relationship-advice-project` repo
5. Click "Import"
6. Set environment variables:
   - `ANTHROPIC_API_KEY` = (your key)
   - `NEXT_PUBLIC_API_URL` = https://itscomplicated.app
7. Click "Deploy"
8. **Wait for deployment to complete** (usually 2-5 minutes)

---

## STEP 2: Point Domain to Vercel (10 minutes)

**In Vercel Dashboard**:
1. Click your project
2. Go to Settings > Domains
3. Add domain: `itscomplicated.app`
4. Choose "Nameserver" option (easier)
5. Vercel shows 4 nameservers
6. Copy these nameservers

**In Your Domain Registrar** (GoDaddy, Namecheap, etc.):
1. Log in to where you bought itscomplicated.app
2. Find DNS/Nameserver settings
3. Replace current nameservers with Vercel's
4. Save

**Wait 24 hours for DNS to propagate** (but often works in 30 minutes)

---

## STEP 3: Test Production (30 minutes)

After DNS updates, visit https://itscomplicated.app

**Critical checks**:
- [ ] Homepage loads (no 404)
- [ ] HTTPS certificate works (green lock icon)
- [ ] All sessions visible and show "20 min"
- [ ] Click into a session
- [ ] Timer counts down 20 minutes
- [ ] Chat works (type something, get a response)
- [ ] No errors in console (F12)

---

## STEP 4: Test Payment (15 minutes)

**If you have Stripe set up**:

1. Go to https://itscomplicated.app
2. Click "Start a Session"
3. Look for payment button
4. Click it
5. Use test card: `4242 4242 4242 4242`
6. Any future date (e.g., 12/25)
7. Any 3-digit CVC (e.g., 123)
8. Click Pay
9. Should see "Payment successful"

---

## STEP 5: Final Verification

Before announcing:
- [ ] Homepage loads instantly
- [ ] All 4 sessions appear
- [ ] "20 min" duration visible
- [ ] Session timer works
- [ ] Chat responds
- [ ] Mobile responsive (test on phone)
- [ ] HTTPS secure

---

## Go Live! 🎉

Once everything works:

1. **Social Media**
   ```
   "It's Complicated is live 🔀

   A 20-minute conversation about why 
   you keep choosing the same person.
   
   itscomplicated.app
   
   #relationships #honesty"
   ```

2. **Share with early users**
   - Friends, beta testers
   - Ask for feedback
   - Collect testimonials

3. **Monitor**
   - Check Vercel logs for errors
   - Monitor API usage
   - Gather user feedback

---

## If Something Breaks

**Check Vercel logs**:
1. Go to Vercel dashboard
2. Click your project
3. Deployments tab
4. Click latest deployment
5. View logs

**Common issues**:
- Missing environment variables (add them in Settings > Environment Variables)
- API key invalid (update ANTHROPIC_API_KEY)
- DNS not pointed (verify nameservers)

---

## Success = You're Live! 🚀

When https://itscomplicated.app works:
✅ You're live
✅ People can book sessions
✅ Payments process
✅ Krishnamurti coaching happens
✅ You're transforming lives

**That's it. You're done with deployment.**

Next phase: Market, gather feedback, iterate.

---

## Timeline

- Test locally: **Now** (30 min)
- Set up Vercel: **In 30 min** (30 min)
- Configure domain: **In 1 hour** (10 min)
- Wait for DNS: **In 1.5 hours** (24 hours, but often 30 min)
- Verify production: **Tomorrow** (30 min)
- Go live: **Tomorrow** 🎉

---

**You're hours away from launching a transformation tool.**

Let's go. 🔀
