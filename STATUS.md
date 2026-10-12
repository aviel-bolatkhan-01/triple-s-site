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

## 2026-09-09 — redesign: cut the clutter
Backup before this: `index-v5-maximalist-backup.html` + git tag `v5-before-redesign`.

Grounded in KlientBoost/NoGood: length wasn't the problem, **competing CTAs and competing visual devices were**. Cut the count-up stats band, the wasted-spend calculator, the tracked-funnel SVG, the badge-wall pills, the "in the wild" strip, the four reason cards, and "Get results like this" from every case card. Case studies, offers, tiers and process steps went from boxed cards to **editorial rows on hairline rules** — the green brand tiles are now the only boxes, so they lead the eye. ~4,500 bytes of dead CSS/JS removed; page ~800px shorter. Verified at 390/700/1100px.

## 2026-09-09 — services restructure + client wall
- **AI Lead Response removed** from the site and the pricing FAQ. Services is now only monthly management: h2 "Monthly management, priced by ad budget" with the three tiers as the section itself.
- **The $200 audit is a separate `.audit-band`** below the tiers (dark panel, green CTA — it must be `btn-green`, `btn-dark` is invisible there).
- **Client marquee → `.client-wall`**, an even grid of name tiles. Tile CSS already accepts an `<img>` (`max-height:38px; object-fit:contain`), so logos swap in 1:1.

## 2026-09-09 — client research, e-commerce split, top-bar cleanup
Email removed from the utility bar. Client identities researched and verified against the campaign names in his own dashboards: **premiermedct.com** (Berlin & Ridgefield CT — matches the campaign names exactly), **drmadnani.com**, **endoslimclinic.com**, **twentyfourc.com**.

Two corrections surfaced: **Dr Kellyann Kosma co-founded Premier Medical Aesthetics** (the wall listed one business twice — deduped), and **Twenty Four Carrots is an equine e-commerce brand**, not a clinic — it now has its own case study and was removed from the medical one. Five case studies total. Six client-wall tiles link to verified sites.

## 2026-09-09 — US/EU focus, testimonial, Google Partner badge
- **Search Ads 360 removed** everywhere (enterprise case, "6 platforms" → "5 platforms", FAQ list).
- **Cases reordered US-first:** clinics → Twenty Four Carrots → enterprise → Noodlers → anonymised rebuild.
- **New `.trust-band`** between the client wall and results: the **NKB Group testimonial** ("We had to stop the sales department because we are flooded with leads." — Director of Marketing) + a **Google Partner badge** built from the real Google mark in inline SVG. Note: `assets/google-partner-badge.png` is a screenshot of the Partners dashboard, NOT a usable badge.
- **LinkedIn → linkedin.com/company/triple-s-agency** (was the personal profile).

## Open items
- [ ] **Test the contact form in a real browser** — never verified (Cloudflare blocks automated testing)
- [ ] **Check the site on a real phone** — layout now verified at 390/600/860px (load the page in fixed-width iframes; media queries respond to iframe width, unlike `--window-size`), but a real device check is still worth doing once
- [ ] GA4 / GTM — still zero analytics ("i'll add the analytics later")
- [ ] Client testimonials — still the biggest conversion gap
- [ ] **Leroy Merlin and BIC were the Kazakhstan market**, not Europe (`leroymerlin.kz.png`, `bic.kz.png`, account `MCA_KZ` in Drive). The site leads with a US/EU positioning and the EU portfolio is effectively empty. Options given: leave it, label the market plainly, or move them below the UAE case. Awaiting his call.
- [ ] **Which "Harmony Medical Aesthetics" is yours?** `harmonymedical.uk` (Harley Street + Halifax) or `harmonymedicalaesthetics.com` — will not guess.
- [ ] Still unidentified: Defined Medical Ads, Beauty Space Clinic, Croissant Atelier, Atelier Beaute, Noodlers.
- [ ] Cannot be screenshotted headlessly: drmadnani.com (iframe popup), endoslimclinic.com (renders blank), leroymerlin.* (403). Logo files would solve all three.
- [ ] **LOGOS — logo files still beat homepages.** Drop them in `assets/`; tiles already accept an `<img>`. Either paste the URLs, or drop logo files into `assets/` (preferred, looks better). Needed for: Leroy Merlin (which market?), Dr Madnani, Premier Medical Aesthetics, Defined Medical Ads, Harmony Medical Aesthetics, EndoSlim Clinic, Beauty Space Clinic, Noodlers, Twenty Four Carrots, Croissant Atelier, Atelier Beaute, Dr Kellyann Kosma. Notes: **leroymerlin.fr and .it both 403 headless browsers** — that one cannot be captured at all; a full-Drive search for client URLs found nothing; do NOT guess URLs, several of these names match multiple real businesses.
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

## 2026-09-09 — SEO foundation + three service pages

**The site had no technical SEO at all.** No `robots.txt`, no `sitemap.xml` (both 404 live),
no canonical on the homepage, no structured data, no Twitter card. Fixed and deployed.

Also found: **the four archived design files were live and crawlable at 200**
(`index-v2-amber-backup.html`, `index-v4-founder-backup.html`, `index-v5-maximalist-backup.html`,
`style-reference.html`) — near-duplicates of the homepage competing with it. They now carry
`noindex,nofollow` + canonical to `/`, and are `Disallow`ed in robots.txt. **Any future backup
file saved at the repo root must get the same treatment or it becomes a duplicate again.**

Added on the homepage: `rel=canonical`, robots meta (`max-image-preview:large`),
`og:site_name`/`og:locale`, full `twitter:*` set, and a JSON-LD `@graph`
(ProfessionalService + WebSite + FAQPage with all 7 FAQs).

### Three new service pages
Google ranks pages, not sites — the one-pager was the ceiling on rank. Each new page targets
one query, with its own canonical, OG/Twitter meta and Service + BreadcrumbList + FAQPage JSON-LD:

| Page | Target query |
|---|---|
| `/google-ads-management/` | google ads management agency |
| `/meta-ads-agency/` | meta ads agency |
| `/ads-audit/` | google ads audit (sells the $200 48h audit) |

Copy constraints held: real numbers only, no country names, **no free deliverable implied
anywhere** — the only free thing is the 30-min call. Drafts came from the free-tool stack but
needed heavy editing: the models fabricated service levels ("checked hourly", "reviewed daily",
"10,000+ negative keywords") and implied a free audit. **Never ship that copy unedited.**

### CSS architecture — important
`assets/site.css` is **generated** from index.html's inline `<style>` block. The homepage keeps
its CSS inline; the service pages link the extracted copy. **After editing homepage styles, run
`python3 tools/build-css.py`** or the service pages drift. The service pages also ship their own
small IntersectionObserver script — `.reveal` is `opacity:0` without JS, so content would be
invisible otherwise (there's a `<noscript>` fallback too).

Homepage now links all three pages (services section + footer). `sitemap.xml` lists 5 URLs.

### Testing note (cost an iteration)
`--window-size=390,900` on headless Chrome **does not give a 390px viewport** — it clamps to 500
and crops the screenshot, which looks exactly like broken mobile layout. Measure inside a
`<iframe width="390">` on a wider host page instead. Verified: `scrollWidth == 390`, no overflow.

### Still open — needs the user
- **No analytics.** Still zero GA4/GTM. Need the measurement ID. `privacy.html` currently states
  no tracking runs — **update that section when GA4 goes in.**
- **Google Search Console not set up.** Verify the property, then submit
  `https://triples.agency/sitemap.xml`.
- **Backlinks.** Nothing on-page fixes a 2-month-old domain with no links. Directories
  (Clutch, DesignRush), Google Business Profile, LinkedIn.
- Web3Forms hero form is still **UNVERIFIED** by a human submission (see 2026-09-08 round 3).

### 2026-09-09 later — footer regression fixed
Adding the three service links to the footer (same day, above) was a regression. `.footer-grid`'s
third track is `auto`, so an 8-link row sized to its 619px max-content and starved the stats
column to 305px — stat boxes became 69px wide with 39px of usable space while labels needed 65px
and values 69px. **Every stat box overflowed.** User spotted it.

Fix: homepage footer back to its original 5 links, service pages to 4 (their top nav and
"Other services" section already carry the cross-links, so nothing became uncrawlable), plus
`.footer-links{max-width:380px}` as a permanent guard so that column can never starve the stats
again. Boxes 69px → 109px, `scrollWidth == clientWidth` on every value and label.

**Rule going forward: `.footer-links` sits in an `auto` grid track — adding links there steals
width from the stats. Check the stat boxes after touching the footer.**

## 2026-09-15 — "de-AI" redesign — REVERTED the same day

**Current state: the site is back to the pre-redesign version** (identical to tag
`v6-before-declaude`). After seeing the redesign live the user said: *"revert back to what it was.
this looks terrible"*. Both design commits were undone with `git revert` (history kept);
`assets/hero-report.jpg` was removed with them. Everything below this line describes the rejected
attempt, kept for reference only — none of it is on the site now.

**Next time:** any redesign gets a preview (screenshots or a private preview page) and the user's
yes BEFORE it is pushed to main.

User's original request: *"my triples site looks claude made. its design is too obviously claude developed. fix the design."*

**Restore point:** git tag `v6-before-declaude` (pushed). `git checkout v6-before-declaude -- index.html assets/site.css tools/build-css.py` brings the old look back.

### What made it look AI-built (removed)
- Monospace, UPPERCASE, wide-letter-spaced labels on everything (eyebrows, nav, buttons, pills, footer)
- Bricolage Grotesque with very tight tracking
- The "Unit Economics Engine" ring diagram in the hero (a made-up framework graphic)
- Mint glow gradients, grid-line background + giant S³ watermark, pill badges, pulsing "live" dot,
  green glow shadows, the same rounded corners on every box
- Formula headlines ("Results. The receipt matters.", "Built by engineers, not account managers.",
  "Partner in the AI Era") and 26 em dashes

### New look
- **One font: Archivo.** Sentence case everywhere. Warm paper background `#F5F3EE`, near-black ink
  `#121412`, deeper brand green `#0F7A45` (better contrast for small green text). Flat colours, no
  shadows, 4px corners on buttons, square section bands.
- **Hero = a real Google Ads report** (`assets/hero-report.jpg`, from the DTC mattress account):
  only the Cost / Conv. rate / Conversions / Cost-per-conv columns. Campaign names ("_KZ"), account
  IDs and agency name were cropped out on purpose (US/EU-first positioning).
- **H1:** "Ad accounts run to your cost per lead". Section heads: "Recent client work", "Monthly
  management, priced by ad budget", "How we work", "Founded by software engineers", "Frequently
  asked questions", "Book a call or ask for a proposal".
- Verified: no number on the page added or removed (scripted before/after diff), JS + JSON-LD
  valid, no horizontal scroll at 390/768px on the homepage and service pages.

### How fonts reach the service pages
`tools/build-css.py` now copies the Google Fonts URL from index.html's `<link>` into an `@import`
at the top of the generated `assets/site.css`. Change the font in index.html → run the script →
service pages follow. (Their old Bricolage `<link>` tags still load but are unused: one-line cleanup
per page, not done yet.)

### Not done / follow-ups
- **Service pages' COPY still reads AI-written** (their styling updated automatically via site.css
  and looks right). Title Case H1s ("Google Ads Management, Built on Tracking You Can Trust"),
  "not X" formulas ("Start with the account, not the pitch.", "It is paid, and that is
  deliberate.", "What management actually covers."), em dashes, and "CPL CUT FOR OUR CLIENTS" typed
  in capitals in their utility bar. Needs edits in 3 files — offered to the user, not done.
- `privacy.html` has its own inline styles and still has the OLD look.
- Remove the unused Bricolage/Spline font `<link>` from the 3 service pages + privacy.html.
- Everything under "Still open — needs the user" above is still open (GA4, Search Console,
  backlinks, Web3Forms test submission).

### Known debt: CSS override block (NOT cleaned up)
The first redesign pass appended an override block near the END of the `<style>` block in
index.html (starts at the comment `/* Homepage reset: restrained editorial system ... */`, ~line
1864) instead of editing the original rules above it. The page renders correctly, but **editing an
original rule higher up will appear to do nothing, because the override block wins. Edit the rule
in the override block instead** (or fold it back in first).

The cleanup pass was written (brief kept in the session scratchpad) and a pixel-for-pixel check was
set up (headless renders proven byte-identical across runs at 1440px and 390px), but **Codex hit its
usage limit mid-run — locked until 2026-10-15** — and made no changes. Not delegated to Codestral:
too risky for a 1,800-line cascade rewrite. Redo it when Codex is back, and only keep it if the
screenshots match byte for byte.

## 2026-10-11 — worldwide copy, calculator back, simpler hero/contact (LOCAL ONLY, not pushed)
- Region lists removed everywhere: hero now says "brands worldwide, with campaigns run across US, European and Asian markets"; About "across five regions" → "worldwide"; mini-stat → "Worldwide / US, European and Asian markets"; footer stat "5 regions" → "Global / client markets" (homepage + 3 service pages); JSON-LD `areaServed` → "Worldwide" on all 4 pages.
- Hero ring diagram ("Unit Economics Engine") replaced by a plain 4-step card: Ads → Visitors → Leads & sales → Profit, plus "Up to 90% lower cost per lead for our clients" (existing claim).
- `#calculator` section restored between Results and Services. Two sliders (monthly spend $500–$100K, share not bringing customers 5–60%, default 20%); result = spend × share, ×12 for the year; labelled as an estimate, NOT a benchmark (the old "25–40% we typically find" claim was dropped). CTA → /ads-audit/.
- Contact band: one primary green button (Calendly), email proposal as secondary, Upwork/LinkedIn underneath. Old `.route-card` CSS removed.
- Small polish: nav underline on hover, FAQ hover/open state, step-number hover, tier hover, shadows on client wall + audit band, balanced h1 wrap.
- Previews: `_preview/before/`, `_preview/after/` (gitignored).

## 2026-10-12 — v5 positioning round (branch `site-v5-positioning`, NOT pushed, NOT merged)
- Homepage repositioned to US medspas + DTC: new H1/subhead/title/meta/OG/Twitter, new og-image.jpg, top bar links to #results, "For medspas" in nav.
- Email is now hello@triples.agency everywhere (all pages, JSON-LD, form JS, privacy). **Mailbox must exist before merge.**
- Google Partner badge + "Contributor · 2023" replaced by a "Certified" block; client wall renamed "Brands I've managed media for" + enterprise footnote; $22.70 clinic proof chip + $0.14 chip (market wording TODO); Upwork proof link (rating TODO).
- Founder block "You work directly with me" (initials tile until a real headshot exists) + Person JSON-LD.
- New pages: /case-studies/ + 5 case pages, /medspa-ads/, /blog/ + 3 outline stubs (noindex), article template in `_templates/` (not published by Jekyll). Sitemap now 16 URLs.
- Lead magnet form (Web3Forms) under the calculator: PDF does not exist yet. Sticky mobile "Book a free 30-min call". 2 hidden testimonial slots.
- **Correction:** the "$0.35 CPM, down from $0.46" stat was on Noodlers but the screenshot is the mattress brand's TikTok account. Moved to the mattress case.
- All TODOs are marked `TODO(aviel)` in the HTML: `grep -rn "TODO(aviel)" --include=*.html .`
- Previews: `_preview/v5/` (gitignored). New pages are generated from scratchpad scripts. They are plain HTML now; edit them directly.

## 2026-10-12 — v5b universal positioning (branch `site-v5b-universal`, NOT pushed, NOT merged)
Owner: "it's an universal agency… mostly Ecom, DTC, B2B… keep [medspa] very optional."
- Homepage H1 → "Meta & Google ads for e-commerce, DTC and B2B brands — every sale tracked to revenue."; eyebrow "E-commerce · DTC · B2B · Worldwide"; title/meta/OG/Twitter/JSON-LD rewritten to match; new `assets/og-image.jpg` (source: `_preview/v5b/og-card-source.html`). 2 alternative H1s in the TODO(aviel) comment above the H1.
- Hero proof: $0.14 DTC chip first, new $30K+/mo enterprise retail chip (Leroy Merlin/BIC, existing claim), $22.70 clinic chip now a compact full-width third chip (`.proof-chip--compact`).
- Case order everywhere (homepage, /case-studies/ + ItemList, "More case studies"): enterprise → DTC mattress → Twenty Four Carrots → Noodlers → clinics last.
- "For medspas" removed from the nav on every page. /medspa-ads/ now reached from a footer link ("Medspa ads", all pages) and an "Industries we work in" line under the client wall. Page stays live + in sitemap; hero eyebrow "Industries · Clinics & medspas" + intro sentence framing it as one industry.
- Client wall reordered (non-clinic brands first). Founder bio leads with e-commerce/DTC/B2B. Meta page, blog index and case-studies meta de-medspa'd.
- Footer stat boxes 107px → 104px from the extra footer link; no overflow (measured).
- Previews: `_preview/v5b/` (gitignored).

## 2026-10-12 — v5c contact/proof cleanup (same branch `site-v5b-universal`, NOT pushed)
Owner: new email hello@triples.agency everywhere, new Calendly, remove "ad budget managed" everywhere, remove Upwork altogether.
- **Email:** live pages were already hello@; the last gmail copies (2 design backups + 3 BRIEF docs) switched too. Mailbox must exist before merge.
- **Calendly:** all 92 links → `https://calendly.com/triples-agency/30min` (17 pages + template). Old slug: 0.
- **$30K+/mo stat removed:** footer stat on 15 pages + homepage, hero chip, homepage enterprise case card, 5 "More case studies" summaries, enterprise case page (meta/OG/Twitter/JSON-LD description, intro, KPI tile, results bullet), Google + Meta service-page intros. Hero chip replaced by the existing **"$10 → $1" EV dealership CPL** claim (links to the enterprise case). Footer stats grid 4 → 3 columns (boxes 104px → 141px at 1440). OG image: stat → "300% ROAS on Meta".
- **Upwork removed:** top-bar link, hero "Agency profile on Upwork" card + its TODO, contact "Also on" link, footer link, JSON-LD sameAs, `.upwork-*` CSS. 0 in live pages.
- **New `_config.yml`:** Jekyll `exclude` stops GitHub Pages publishing STATUS.md, BRIEF*.md, the 3 index backups, style-reference.html and tools/. **They were all publicly reachable (200) on triples.agency** — including this file and the personal "EXIT-30 · $3K plan" doc. Those archives still contain Upwork/$30K text; they just won't be served after merge. Restore points remain as git tags.
- **Screenshots that can't be edited:** `ecom-google-conversions.webp` (Twenty Four Carrots case) and `leroy-merlin-google-ads.webp` (enterprise case) show `abzal.business.01@gmail.com` in the Google Ads header; `center-matrasov-meta.webp` (DTC mattress case) shows "logged in as Abzal Bolatkhan". No image shows Upwork or $30K.
- Pre-existing, not fixed: at ~860–1000px wide the footer stat boxes are still narrow enough to break words ("Glob/al"). Was worse before (58px boxes, now 81–85px).
- Previews: `_preview/v5c/` (gitignored).

## 2026-10-12 — v5d consistency + agency voice (branch `site-fixes-consistency` off main c1b4944, NOT pushed, NOT merged)
Owner: "ev dealership case doesn't match. fix that. and all similar issues." + founder block should be founder-only (agency, not one person running every account).
- **New case page `/case-studies/ev-dealership-lead-gen/`** (NKB Group, EV dealership, CPL $10 → $1 in one month, outbound sales paused, NKB quote). Uses only existing site/CV wording. Hero $10→$1 chip, NKB testimonial ("Read the case →") and a new homepage case card point at it; added to /case-studies/ (card + ItemList), every "More case studies" list, sitemap (now 17 URLs).
- **Enterprise (Leroy Merlin/BIC) case cleaned:** its KPI tiles, results and quote were the EV dealership + 300% ROAS (other clients). Now describes only the Leroy/BIC work shown. Homepage enterprise card "Also: EV… 300% ROAS" line replaced.
- **Service pages:** Google page called the EV result "an enterprise funnel" and claimed "300% ROAS across managed accounts" (CV: one DTC brand, on Meta) → attributed + linked; Meta page 300% scoped to one DTC brand; Audit page dropped unverifiable "after an audit" + "enterprise funnel".
- Footer "200%+ average lead growth" → "lead growth, DTC case" (17 pages; source is one account). Clinic $22.70 "per qualified lead" → "per lead".
- **Founder block:** "Founded by Aviel Bolatkhan." / title "Founder" / 2-sentence third-person bio; promise line removed. Person JSON-LD jobTitle "Founder".
- **Voice sweep:** senior specialist/buyer, no juniors/hand-offs, "I reply personally", "Brands I've managed", "senior attention", "one senior media buyer", "lead media buyer" bylines all gone. New meta description (155 chars max) + hero lede. OG image regenerated (source `_preview/v5d/og-card-source.html`).
- Previews: `_preview/v5d/` (gitignored). TODO(aviel) new: confirm NKB = EV dealership + platform/market; EV screenshot; Leroy/BIC numbers; 300% ROAS brand/screenshot.

## 2026-10-12 — motion graphic live
- Added canvas animation (`assets/motion.js`, section "Tracking first. Everything in writing.", under the 4-step runbook). Commit b4c4bd2. Pure function of t; `?motion_t=8` freezes a frame; pauses off-screen; reduced-motion = static end frame; mobile uses a taller 4:5 layout.
- Numbers are ONLY from the DTC mattress case: 8,492 tracked conversions, $0.14/conversion, Google CPL $0.82→$0.18 (8 months), 200%+ lead growth. No impressions/clicks/revenue figures (not on the site) — stages show names only; caption says dot counts are illustrative.
- **Claims NOT on the site:** "300% ROAS" and "$30K+/mo" (listed above as real) appear nowhere on the live pages — confirm with the client data before using them anywhere.
- Unverified: continuous playback in a real browser, a real phone, Web3Forms form (still untested). Preview copy remains at `_preview/triples-motion.html`.

## 2026-10-12 — trust / CTA / agency round (working tree on main, NOT committed by the implementer)
- One primary CTA everywhere: free 5-minute Loom video review form (website, email, monthly ad spend → Web3Forms, same key) in the hero + a shared `#contact`/`#review` band on every page; secondary = Calendly 30-min call. Handler moved to `assets/review-form.js` (all pages).
- "Up to 90%" removed (utility bar, hero). Hero card now "65–78% lower CPL on one DTC account over 8 months (Central Asia)". H1 option 1 in use; 3 options in a TODO above the H1.
- Founder photo `assets/aviel-480.webp` / `aviel-600.webp` (About, contact band, /for-agencies/). First-person copy site-wide. Footer: "Operated by Bolatkhan LLC, Almaty, Kazakhstan · Working US & EU hours".
- Pricing: Starter $3K–5K spend; under $3K → audit; effective-rate note on Growth; audit refund guarantee ($500/mo threshold).
- New `/for-agencies/` (white-label, $600 / $1,000 / custom per account). In nav + footer on every page, sitemap.
- Mobile: utility bar hidden <560px; nav is a single scrollable row <700px; tap targets ≥44px.

## 2026-10-13 — agency voice, one free offer, hero row moved (working tree, NOT committed by implementer)
- Agency "we" voice site-wide again; About = "Founded by Aviel Bolatkhan." (no team-size or solo claims).
- Hero row removed: Ads→Visitors→Leads & sales→Profit flow now a strip in #process above the runbook; 65–78% callout in #results header; the 3 proof chips deleted (Results already covers them).
- Only free offer: 5-minute video review (ad spend optional, "Not running ads yet" option, blank sent as "Not provided"). Checklist magnet, free agency audit and all Calendly buttons removed; Calendly only as "Prefer to talk? Book a call" in the contact band + /for-agencies/. Agency form = white-label enquiry (id agency-audit-form kept).
- review-form.js v3 (generic fields, one form_success push), site.css v4.

## 2026-10-13 (2) — no-ads-history friendly (working tree, NOT committed by implementer)
- H1 "Get customers from Google and Meta ads, with every lead and sale tracked to revenue." + newcomer-inclusive subhead; title/meta/OG/JSON-LD match.
- Free offer = "free 5-minute video review of your website" (+ "Already running ads? Add your ad spend and we'll look at the account too."). Spend dropdown "Ad spend per month (optional)", first option "Not running ads yet".
- New FAQ "We've never run ads. Is this for us?" (visible + schema); audit labelled as for businesses already running ads; pricing note for newcomers; calculator link "Already running ads? Estimate your wasted spend."
- site.css v5, review-form.js v4 (JS file itself unchanged).

## 2026-10-13 (3) — shorter hero, 3 featured cases (working tree, NOT committed by implementer)
- Hero: eyebrow "E-commerce · Lead gen · B2B", H1 "Get customers from ads, with every lead and sale tracked to revenue.", one-sentence subhead, extra form line removed, 2-line animation caption.
- Results: featured = US clinics → Twenty Four Carrots → Noodlers (UAE); EV, DTC mattress, Leroy Merlin/BIC in a closed "More case studies" <details>. 65–78% callout one line. /case-studies/ index reordered (cards + ItemList).
- "Medspa ads" footer link removed everywhere; /medspa-ads/ linked from the clinic case (homepage), /case-studies/ index and the clinic case page. site.css v6.

## 2026-10-13 (4) — agency-first About, founder once; no Looker Studio (working tree, NOT committed by implementer)
- About: H2 "A performance marketing agency built on tracking."; founder = one small line (56px round avatar, "Founded in 2022 by Aviel Bolatkhan · Google Ads certified · LinkedIn →"). Big photo/name card and the duplicate cert chip removed.
- Contact band photo + founder block removed on every page; /for-agencies/ hero photo card removed.
- Owner has no Looker Studio experience: all "Looker Studio report(s)" → "a clear monthly report on unit economics" (homepage pricing intro + runbook step 4, Google page, medspa page). Backups still mention it (not published).
- site.css v7.

## 2026-10-13 (5) — pricing clarity, no waste guarantee (working tree, NOT committed by implementer)
- Starter back to "Under $5K/mo ad spend" ($800 flat). All "$3K floor" / "under $3K → audit" routing removed (homepage, FAQ + schema, Google/Meta/medspa pages + Offer schema). Footnote: "Month-to-month, no lock-in at any tier. New to ads? Start with the free video review and we'll recommend the tier that fits."
- $200 audit = "Optional paid deep dive" for businesses already running ads, credited to month one. The $500 waste refund guarantee is removed everywhere (bands, /ads-audit/ order block, FAQ + schema, meta/OG, Offer schema). site.css v8.
