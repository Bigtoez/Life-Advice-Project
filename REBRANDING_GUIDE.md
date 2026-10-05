# 🎯 UNPACKED - Complete Rebranding Guide

## 📋 What's Changed

### Visual Branding
- **Logo**: 📦 Box emoji (represents "unpacking")
- **Color**: Purple (#9333EA primary, shades for accents)
- **Typography**: Bold, Gen Z-friendly ("font-black" for headings)
- **Tone**: Real, vulnerable, authentic (no corporate speak)

### Name/Copy
- **Old**: "Clarity Coach" 
- **New**: "Unpacked"
- **Tagline**: "See patterns. Change your future."
- **Subheading**: "Relationship Truths Nobody Says"

### Session Names
```
pattern-break       → Pattern Break (same)
after-fight         → After the Fight (same)
break-up-transition → Breakup Breakdown (CHANGED)
group               → Group Unpacked (CHANGED)
```

### Pricing (Updated)
```
Pattern Break    $5 → $7
After the Fight  $5 → $7
Breakup          $7 → $7
Group            $8 → $8
```

---

## 🎨 Updated Pages

### pages/index.tsx
✅ **Complete Rebrand**
- Navigation: "Unpacked" with 📦 emoji
- Hero: "You keep choosing the same person. Different face, same ending."
- Added social proof section with testimonials
- Session cards have "hooks" (Patterns You Can't Unsee, etc.)
- Features section: Gen Z friendly
- Colors: Blue → Purple
- Footer updated with new tagline

### pages/session/[type].tsx
✅ **Complete Rebrand**
- Added Link import
- SESSION_TITLES: Breakup Breakdown, Group Unpacked
- SESSION_INTROS: Gen Z messaging for each session
- Back to Unpacked link in header
- User messages: Purple theme
- Buttons: Purple with hover effects

---

## 🔧 Files Needing Manual Review

### api/server.ts
- Session type names referenced
- Error messages should say "Unpacked"
- Consider updating API response messages

### api/prompts/
- krishnamurti-system.md - May reference old branding
- session-types.md - Check for old names

### package.json
- [ ] Name: "relationship-advisor-agent" → "unpacked"
- [ ] Description: Update to "Unpacked: 15-Min Relationship Sessions"

### README.md
- [ ] Update with new branding
- [ ] Update hero section
- [ ] Add social media links when ready

---

## 💳 Stripe Integration (TODO)

**Not yet implemented. Next phase:**

1. Install Stripe SDK
   ```bash
   npm install @stripe/react-stripe-js stripe
   ```

2. Add payment processing to session page
3. Create /api/payment endpoints
4. Support card + Virtuals token payments
5. Add email confirmation flow

---

## 🌐 Domain & Social Setup

**Your Next Actions:**

1. **Domain**: unpacked.app (~$16/year)
2. **TikTok**: @unpacked
3. **Instagram**: @unpacked
4. **Twitter/X**: @unpackedapp
5. **Email**: contact@unpacked.app

See SOCIAL_MEDIA_TEMPLATES.md for content ready to post.

---

## 🚀 Launch Checklist

**Week 1:** Deploy + Claim handles
**Week 2:** First content (TikTok + Instagram)
**Week 3:** Email campaign launch
**Week 4:** Stripe integration (optional for MVP)

---

## 📊 Key Metrics to Track

- TikTok views (target: 500+ first video)
- Comments/engagement rate (target: 5%+)
- Email subscribers (target: 100+ week 1)
- Session bookings (target: 5-10 week 1)
- Repeat customer rate

---

## ✅ Summary

**Rebranding Status:**
✅ Homepage completely redone with Unpacked branding
✅ Session pages updated with Gen Z copy
✅ Colors changed from blue to purple throughout
✅ Social media templates created and ready
✅ Email copy templates prepared
✅ Pricing updated ($5→$7)

**Ready to deploy!**
