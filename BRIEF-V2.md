# BRIEF V2: Triple S — WebFX-class redesign

## Task
Rewrite `index.html` (overwrite it) as a much richer, agency-grade one-pager modeled on webfx.com's homepage structure, but keeping the Triple S dark+amber design system from `style-reference.html` (same CSS variables --ink #1C1410, --panel, --cream #F2E8DA, --dim, --lamp #F0A438, --money #8FBF97; same fonts Bricolage Grotesque / Spline Sans / Spline Sans Mono). Single file, inline CSS/JS, only external request = Google Fonts. Real images live in `assets/` (relative paths).

## What "WebFX-class" means (their homepage patterns, adapted)
- Sticky top nav (blur backdrop): logo left; anchor links Results · Services · Why us · Contact; amber "Get a proposal" button right.
- Hero leads with PROOF: big headline + a dominant stat, primary CTA "Get a free proposal" (mailto) + secondary "See results" (#results anchor). Right side (desktop): two overlapping dashboard screenshots in CSS browser-window frames (top bar with 3 dots), slightly rotated, amber glow. Stack below text on mobile.
- Client name strip under hero: "Campaigns run for" → Leroy Merlin · BIC · Askona · Center Matrasov · Noodlers · Fortex · Emotion Technology (styled text wordmarks in mono caps, no fake logos; subtle infinite marquee, pause on hover, static if reduced-motion).
- Big-number stats band (WebFX-style counters, count-up on scroll via IntersectionObserver, instant if reduced-motion).
- Case study cards WITH real screenshots + "the receipt" framing.
- Services organized by outcome with deliverables lists.
- Process timeline (4 steps) — agencies that show process look established.
- Certification badge wall including a real Google Partner badge image.
- Full-width final CTA panel; footer with mini-stats + links.
- Section numbering (01–06 in mono) and generous whitespace. No emoji, no stock-icon clipart, no generic gradients-on-white. Everything on the dark ink palette.

## Anti-AI-slop rules
- No invented numbers, no fake testimonials, no fake team. Solo-founder agency presented honestly ("founder-led", not "750 experts").
- No words: revolutionize, unlock, elevate, empower, seamless, cutting-edge, supercharge.
- Short punchy sentences. Numbers carry the page.
- Real screenshots are the design. Frame them well (browser chrome, border 1px var(--line), rounded 10px, subtle shadow); never stretch; `loading="lazy"` everywhere except hero; width/height attributes to prevent layout shift; descriptive alt text.

## Facts (unchanged from BRIEF.md — reuse exactly; never invent)
Brand Triple S (S³), founded 2022, founder Aviel Bolatkhan, 4+ yrs, remote EU timezone.
Stats: $30K+/mo managed · 200%+ avg lead growth · up to 90% CPL reduction · 6 ad platforms · 7 markets (US, UK, Australia, UAE, Turkey, Poland, Kazakhstan).
Email abzal.bolatkhan.01@gmail.com · Upwork https://www.upwork.com/agencies/1553470846164299776/ · LinkedIn https://www.linkedin.com/in/aviel-bolatkhan
Offers: 48-Hour Ads Audit $200 flat · Monthly Ads Management from $800/mo (accounts $1–10K/mo spend, flat or 10–15% of spend, fixed deliverables: setup, weekly optimization, monthly Looker Studio report) · AI Lead Response $400–800 setup + $150/mo (voice/WhatsApp agent answering leads in minutes).
Certifications: Google Partner (contributor) · Google Ads Search/Display/Video/Measurement · Google Analytics GA4 · DV360 · CM360 · Meta Social Media Marketing · HubSpot · Semrush PPC.

## Hero copy
- Kicker: "Performance marketing agency · Google · Meta · TikTok"
- H1: "Most agencies sell clicks. We sell unit economics." (amber on "unit economics")
- Lede: "Founder-led performance marketing for e-commerce and B2B. We build ad accounts around CPL, CAC and ROAS — and track every dollar from click to conversion."
- Dominant hero stat chip: "8,492 conversions at $0.14 each — one account, one screenshot below."

## Stats band (real, count-up)
- 8,492 — conversions in one Google Ads account at $0.14 cost/conversion
- 90% — largest CPL reduction ($10 → $1 in one month)
- 200%+ — average lead volume growth
- $30K+ — monthly ad budget managed

## Case studies (#results) — 3 big cards, image + text side by side (alternate sides on desktop)
1. **Center Matrasov — DTC mattress brand (Kazakhstan)** — img `assets/center-matrasov-google-ads.jpg` (Google Ads dashboard: 8,492 conversions, $0.14/conv, 66.8% conv rate) + secondary thumb `assets/center-matrasov-meta.jpg`. Copy: 8 months of multi-channel optimization. Google Ads CPL $0.82 → $0.18. Meta CPL $1.02 → $0.36. 200%+ lead growth. Channels: Google, Meta, TikTok.
2. **Noodlers — food delivery brand (UAE)** — img `assets/noodlers-tiktok.jpg` + thumb `assets/tiktok-cpm-case.jpg`. Copy: TikTok CPM optimization in a high-competition Gulf market; full-funnel tracking via GTM. (No invented numbers — describe qualitatively.)
3. **Enterprise media buying — Leroy Merlin, BIC, Askona (via MCA, Google Partner agency)** — img `assets/leroy-merlin-google-ads.jpg` + thumbs `assets/bic-dv360.jpg`, `assets/askona-youtube.jpg`. Copy: $30K+/mo across Google Ads, DV360, Search Ads 360 and Meta for enterprise retail; work contributed to the agency's Google Partner badge. Plus text-only line: "Also: EV dealership CPL $10 → $1 in one month (full account rebuild); 300% ROAS on Meta for a DTC brand."
Each card: "Get results like this →" link to #contact.

## Services (#services) — 3 offer cards (same pricing as facts) each with a 3–4 item deliverables checklist (mono, amber → markers)
## Process — 4 numbered steps: 01 Audit (48h) → 02 Rebuild (tracking first: GA4, GTM, server-side) → 03 Optimize (weekly, in writing) → 04 Report (monthly Looker Studio, unit economics not vanity metrics)
## Why Triple S — 4 cards: Technical precision / AI-powered (founder builds AI outreach pipelines, voice agents, LLM tools) / Proven scale / Global reach
## Credentials — `assets/google-partner-badge.png` image (max-width ~320px, framed) + text badge wall + line "Accounts managed under MCA (Google Partner) and Emotion Technology."
## Extra flourish (optional, tasteful): small framed `assets/ad-creative-matrasov.jpg` and `assets/emotion-linkedin.jpg`, `assets/fortex-meta.jpg` as a 3-thumb "in the wild" strip.
## CTA (#contact) — panel: H2 "Get a free proposal." / sub "Or start with the $200 48-hour audit — applied to your first month if we work together." / buttons: mailto (subject=Proposal%20Request) primary; Upwork; LinkedIn / meta line "Reply within 24 hours · EU timezone · English / Russian / Kazakh"
## Footer — S³ wordmark, mini-stats row, links, "Triple S · Founded 2022 · Remote, EU timezone"

## Meta/SEO
Same title/description/OG as current file, plus `<meta property="og:image" content="assets/og-image.jpg">` (file will be added later — fine if 404 for now). Favicon: inline SVG data-URI, amber S on dark rounded square.

## JS (vanilla, tiny)
Count-up stats + scroll-reveal (IntersectionObserver, threshold .3, both no-op under prefers-reduced-motion), marquee pause on hover, smooth anchor scroll. No libraries.
