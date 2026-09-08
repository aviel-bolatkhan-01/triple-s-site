# Triple S Agency Site — STATUS

Updated: 2026-09-08

## Live
- **Site:** https://triples.agency/ (custom domain, GitHub Pages, builds from `main` root, ~30s after push)
- **Repo:** https://github.com/aviel-bolatkhan-01/triple-s-site (public)
- **Contact:** abzal.business.01@gmail.com · Calendly https://calendly.com/abzal-bolatkhan-01/30min

## Current version: V4 — WebFX-style light theme
Light green-tinted page, white cards, navy-green text, green #17A05E accent. Utility bar (book-a-call + email) → sticky nav → hero with mailto proposal form + SVG Unit Economics Engine ring → client marquee → count-up stats → 3 case studies with real dashboard screenshots → services (3 offers) → wasted-spend calculator → process stepper + SVG tracked-funnel card → dark about band → FAQ → dark CTA band with two booking routes → footer.

All numbers real (from CV/dashboards): 8,492 conv @ $0.14; CPL $0.82→$0.18 Google, $1.02→$0.36 Meta; EV $10→$1; 300% ROAS; $30K+/mo. Offers: $200 audit / from $800/mo management / AI Lead Response $400–800 + $150/mo.

## 2026-09-08 round — Calendly + gmail + own visuals
- Email switched everywhere: contact@triples.agency → abzal.business.01@gmail.com (utility bar, CTA, footer, hero-form mailto JS)
- Calendly added in 4 places: utility bar, hero fineprint, FAQ "How do we start?", and the contact band
- Contact band rebuilt as **"Two ways to start"** — two route cards (Option 01 book a 30-min call → Calendly, primary/green; Option 02 send the account → mailto), Upwork/LinkedIn demoted to a secondary line
- **All AI-generated art removed.** `assets/funnel-art.jpg` and `assets/s3-glow.jpg` deleted.
  - Process section: hand-built inline SVG "tracked funnel" (Impressions → Clicks → Tracked conversions → Reported revenue, each tagged with its measurement layer, ending in the real $0.14/conversion outcome plate)
  - CTA band background: CSS-only (radial green glows + faint grid + outlined S³ monogram watermark)
  - `assets/og-image.jpg` regenerated from a hand-built HTML card rendered in headless Chrome (source: scratchpad `og-card.html`)

## 2026-09-08 round 2 — ad-spend ceiling removed
The `$1–10K/mo` range is gone from both the Monthly Ads Management card ("Flat fee or 10–15% of spend — at any account size.") and the "What ad spend do I need?" FAQ — some clients spend well above $10K/mo and the cap was screening them out. Minimum engagement $1K+ stays.

Note: a report of "iCloud emails on the site" was a false alarm — the site only ever contains abzal.business.01@gmail.com. Apple Mail composes `mailto:` drafts From: the Mac's default (iCloud) account; visitors never see that.

## 2026-09-08 round 3 — hero form actually captures leads
The hero form used to be a `mailto:` link — it opened the visitor's mail app with a draft they still had to send, and did nothing at all on machines with no mail client. Now:
- Two fields (website + email, both required) posting to **Web3Forms** via fetch, with inline "Sending…" / success / error states. No page reload, no backend.
- Second action next to it: **Book a 30-min call** → Calendly (`.btn-outline-dark`).
- Access key `eaaf4af3-428e-4271-b661-1d4900d1aaf5` is in and live (it's a public client-side key by design).
- **UNVERIFIED — needs a human test.** `api.web3forms.com` sits behind Cloudflare bot protection, so an automated browser can't complete a submission: JSON fetch fails CORS preflight, FormData fetch fails, a plain cross-origin form POST lands on a Cloudflare "Performing security verification" page, and curl is refused outright (server-side needs their Pro plan). None of that proves the code is wrong — it proves the automation is blocked. **Submit the form once in a real browser and check the inbox.** If it fails there too, the fallback message (email + Calendly link) still shows, so there's no dead end.
- Honeypot field `botcheck` included for spam.

Still missing: the site has **no analytics at all** (0 gtag/GTM). An agency selling tracking should measure its own funnel.

## 2026-09-08 round 4 — positioning reset, free audit killed
- **No country names in case studies.** Markets are stated as regions: US, Europe, Australia, CIS, Middle East. Niches: B2B, B2C, D2C, e-commerce. Verticals named in About: restaurants, auto dealerships, medical procedures, cosmetics, furniture. "7 markets" → "5 regions" (About mini-stat + footer stat).
- **The free 3-minute video audit is gone.** User: "i don't want to do free audits." Entry points are now the free 30-min Calendly call or the paid $200 48-hour audit (credited to first month). Hero button is "Get a Proposal"; contact Option 02 is "Start with the audit". Only one "free" remains on the page and it's the call. **Do not re-introduce a free deliverable.**
- Internal playbook (private artifact): https://claude.ai/code/artifact/b34a98a3-def5-4d71-8ec3-6efb9303f7c2

## 2026-09-08 round 5 — Russian assets out, pricing tiers, privacy, WebP
- **Deleted the two fully-Russian screenshots** (`ad-creative-matrasov.jpg`, `emotion-linkedin.jpg`) — they undercut the US/Europe positioning. Three sections reflowed. `center-matrasov-meta` kept (English UI, some Cyrillic campaign names).
- **Retainer tiers by ad spend:** Starter under $5K → $800/mo flat · Growth $5K–$25K → 12% of spend, min $1,200/mo · Enterprise $25K+ → custom. FAQ updated to match.
- **NKB lead-volume story** added to the enterprise case (client paused outbound sales after CPL $10 → $1).
- **`/privacy.html`** added and footer-linked. It states no analytics or tracking cookies run — **update that section when GA4 goes in.**
- **All in-page images are WebP now.** Assets 1.6MB → 800KB via `cwebp -q 82 -m 6` (needed `brew install webp`). `og-image.jpg` stays JPEG for social scrapers.

## 2026-09-09 — case studies lead with the brand, reports on demand
Ad dashboards no longer front the case studies. Each one shows a `.brand-tile` (a captured homepage in `--shot`, or a typographic mark in `--mark`) and the screenshots sit inside `<details class="report">` behind "View performance report" — native element, no JS.

CIS de-emphasised per positioning: Center Matrasov is now an unnamed "DTC mattress brand" (numbers intact), **Askona and Fortex deleted entirely**, marquee cleaned and the US/UK clinics added. BIC's live homepage captured to `assets/brand-bic.webp`.

## Open items
- [ ] **Test the contact form in a real browser** — never verified (Cloudflare blocks automated testing)
- [ ] **Check the site on a real phone** — layout now verified at 390/600/860px (load the page in fixed-width iframes; media queries respond to iframe width, unlike `--window-size`), but a real device check is still worth doing once
- [ ] GA4 / GTM — still zero analytics ("i'll add the analytics later")
- [ ] Client testimonials — still the biggest conversion gap
- [ ] **Brand assets for the case studies.** Need from user: URLs for Noodlers, Dr Madnani, Harmony Medical Aesthetics, EndoSlim Clinic, Beauty Space Clinic, Twenty Four Carrots, Croissant Atelier, Atelier Beaute, Dr Kellyann Kosma. Any logo files go in `assets/` and take priority over homepages. Note: **leroymerlin.fr 403s headless browsers** so it cannot be captured automatically.
- [ ] Consider a 4th case study built around the US/UK medical-aesthetics clinics — best proof for the target market (suggested, not approved)

## History
- V1 dark amber one-pager → V2 WebFX-structure dark → V3 green dark → V4 light (backups of each in repo root)
- Built via codex (cdx) from BRIEF.md / BRIEF-V2.md / BRIEF-V3.md; every codex build needed a copy-review pass (leaks spec language). Small surgical edit lists: do directly, codex hangs on them.
- cdx wrapper fixed for macOS (timeout → gtimeout → none fallback)

## Workflow
Edit `index.html` → commit → `git push` → live. Assets in `assets/` (portfolio dashboards resized via sips).

## Next
- [ ] Client testimonials (top conversion priority — still owed)
- [ ] Real founder headshot (if a founder section ever comes back)
- [ ] Decide guarantee wording (month-to-month / audit-free-if-nothing-found / 90-day-results-or-free)
- [ ] Upwork JSS badge once reviews exist
