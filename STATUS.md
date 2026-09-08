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
- **ACTION REQUIRED:** `index.html` still has `value="REPLACE_WITH_WEB3FORMS_ACCESS_KEY"` in the hidden `access_key` field. Get a free key at web3forms.com (enter email, key is emailed) and paste it there. **Until then the form safely falls back to the old mailto behaviour** — nothing is broken, but nothing is captured either.
- Honeypot field `botcheck` included for spam.

Still missing: the site has **no analytics at all** (0 gtag/GTM). An agency selling tracking should measure its own funnel.

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
