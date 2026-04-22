# Zarori — Phase 1 PRD

**ضروری ہے بات کرنا** · *It's essential to talk.*

Owner: PM (you) · Eng: 2 · Design: 1 · Clinical Director: TBH · Pilot therapists: 3
Target: closed beta in 90 days · Public launch gated on clinical safety sign-off.

---

## 1. Problem
Pakistanis avoid therapy because it is (a) stigmatized as "mental illness," (b) expensive, (c) culturally tone-deaf when imported from US apps, (d) hard to access privately in joint-family homes, and (e) impossible to trust on data and credentials. Existing global players (BetterHelp) have eroded trust through dark-pattern subscriptions, FTC-grade data leaks, and undisclosed AI. Local clinics are fragmented, in-person only, and not private enough.

## 2. Positioning
Zarori is **emotional fitness, not mental illness**. Urdu-first. Anonymous by default. Pay-per-session. Verified Pakistani clinicians. AI companion that openly says it is AI.

## 3. North-star metric
**Verified completed sessions per active user per month** (depth of care, not vanity engagement). Secondary: 30-day retention of paid users; therapist NPS; crisis-route resolution time.

## 4. Phase 1 user segments (in priority order)
1. Urban PK women 22–40 — marital, in-law, career stress (P0)
2. Urban PK men 25–40 — career, parental, identity (P0)
3. Overseas Pakistanis — UK/US/GCC, loneliness, identity split (P1, premium pricing subsidizes local)
4. PK university students via partnerships (P2 in Phase 1, formalize Phase 2)

Out of scope Phase 1: under-18, severe psychiatric (psychotic, bipolar I, active SI requiring inpatient), couples therapy.

## 5. Phase 1 feature set

| # | Feature | Tier | Why now |
|---|---------|------|---------|
| 1 | Phone-OTP auth + anonymous handles + 2FA | **P0** | Trust floor; Pakistanis won't sign up with real names |
| 2 | Onboarding quiz (15–20 Q, PK-tuned) → top-3 therapist matches w/ transparent "why" | **P0** | Match quality is the product |
| 3 | Therapist public verification profiles (PCP reg #, university, supervisor, languages, faith literacy) | **P0** | Counters BetterHelp's vetting failure; SEO moat |
| 4 | Booking + per-session payment (JazzCash, EasyPaisa, card; Stripe for overseas) | **P0** | No subscription trap |
| 5 | Multi-modal session: text, voice note, voice call, video (LiveKit). Default text + voice note. | **P0** | Matches actual PK communication norms |
| 6 | Async messaging with published SLAs (24hr response weekdays, 48hr weekends) | **P0** | Honest version of BetterHelp's headline feature |
| 7 | Zarori Saathi v1 — Anthropic Claude-powered AI companion. Disclosed. Urdu + English. Triage + crisis escalation. Briefs human therapist before first session. | **P0** | Eliminates 24–48hr cold start; safety net |
| 8 | Crisis safety layer — panic button on every screen, Urdu/English/Roman-Urdu self-harm keyword detection, auto-route to Umang 0311-7786264 / Rozan / Taskeen | **P0** | Non-negotiable |
| 9 | Privacy dashboard — every data event visible, one-click export/delete, granular consent log | **P0** | Counters BetterHelp's FTC scandal; legal posture |
| 10 | Public Trust page — therapist verification, data policy in plain Urdu + English, security posture, partnership disclosures, refund stats | **P0** | Brand trust; SEO |
| 11 | One-click in-app subscription cancel + 48hr refund SLA + auto-approve eligible | **P0** | Killing dark patterns is the brand |
| 12 | Gender-safe matching (female-default-female unless opted out) | **P0** | PK reality |
| 13 | Free Urdu/Punjabi/Sindhi/Pashto meditation + sleep audio (top of funnel) | **P1** | Low-friction acquisition; non-clinical entry |
| 14 | Mahram-aware chaperone (opt-in: invite trusted family to view summaries) | **P1** | PK-only moat; needs careful UX |
| 15 | Streaks on journaling + meditation only (never on therapy) | **P1** | Engagement without ethical risk |
| 16 | Mobile app shell (React Native via Expo, fake-icon option for abuse survivors) | **P1** | Web-first launch, mobile follows |
| 17 | Mood logs + journal entries with private-by-default storage | **P1** | Data for client + optional therapist share |
| 18 | Therapist-side dashboard (schedule, notes, AI-assist disclosed to client, weekly load cap) | **P0** | Therapists are the supply side |
| 19 | Corporate EAP onboarding flow | **P2** | Phase 2 revenue, design hooks now |
| 20 | Lady Health Worker rural pilot integration | **P2** | Phase 2+, research only in Phase 1 |

## 6. Non-goals (Phase 1)
- Insurance integration
- Psychiatry / prescriptions
- Group therapy
- Couples therapy
- Under-18 flow (separate product workstream)
- Gamification of therapy itself

## 7. Tech stack (committed)
- Monorepo: Turborepo · pnpm
- Web: Next.js 15 (App Router) on Vercel
- Mobile: Expo (React Native), shared packages with web
- DB: Postgres on Neon (primary) — **data residency decision pending in risk register**
- ORM: Drizzle
- Auth: custom phone-OTP (Twilio + local SMS fallback) + WebAuthn 2FA
- AI: Anthropic Claude (Sonnet for triage, Haiku for low-stakes, Opus for clinical-edge cases — never autonomous)
- Realtime sessions: LiveKit (self-hosted in PK-acceptable region) for video/voice
- Payments: JazzCash + EasyPaisa direct; Stripe for international
- Observability: Sentry + Vercel Analytics (first-party only, zero third-party trackers on auth pages)
- i18n: next-intl, Urdu-first, English secondary

## 8. Trust & safety — non-negotiables
- Clinical safety review on every AI response path before launch
- Zero third-party ad/marketing trackers on authenticated pages
- Recording OFF by default; opt-in requires double consent
- Therapist load cap enforced in product (no hidden override)
- Every AI touch on a session is timestamped and visible to the client
- Therapist marketing copy never AI-generated without therapist sign-off

## 9. Phase 1 success criteria (gate to Phase 2)
- 200 paid sessions completed
- ≥80% therapist verification SLA met (≤14 days from application to onboarding decision)
- ≥4.5/5 client session rating across ≥150 ratings
- Zero unresolved data-handling complaints
- Crisis-route resolution: 100% of detected events routed to a human within 5 minutes
- Refund SLA: ≥95% resolved within 48hr
- Therapist NPS ≥40

## 10. Open decisions (block on these)
1. **Data residency**: Neon Singapore vs. self-hosted Postgres in PK colo. Risk-register call.
2. **Brand & domain**: confirm `zarori.pk` / `zarori.com` availability + PCP trademark search.
3. **Clinical Director hire**: gates launch. Recruiting in week 1.
4. **LiveKit hosting region**: Singapore vs. Karachi colo for video latency + residency.
5. **Repo decision**: nuke current Laravel scaffold or new repo for Turborepo monorepo.

---

*This PRD is the source of truth for Phase 1. Changes require PM approval and a dated diff in this file.*
