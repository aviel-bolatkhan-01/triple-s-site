# Triple S Agency Site — STATUS

Updated: 2026-07-18

## Live
- **Site:** https://aviel-bolatkhan-01.github.io/triple-s-site/ (GitHub Pages, builds from `main` root, ~30s after push)
- **Repo:** https://github.com/aviel-bolatkhan-01/triple-s-site (public)

## Current version: V4 — WebFX-style light theme
Light green-tinted page, white cards, navy-green text, green #17A05E accent. Utility bar → sticky nav ("Get a Proposal") → hero with mailto proposal form + SVG Unit Economics Engine ring → client marquee → count-up stats → 3 case studies with real dashboard screenshots → services (3 offers) → process stepper + funnel art → dark founder band (photo + bio + Google Partner badge) → dark CTA band (green S³ glow bg) → footer.

All numbers real (from CV/dashboards): 8,492 conv @ $0.14; CPL $0.82→$0.18 Google, $1.02→$0.36 Meta; EV $10→$1; 300% ROAS; $30K+/mo. Offers: $200 audit / from $800/mo management / AI Lead Response $400–800 + $150/mo.

## History
- V1 dark amber one-pager → V2 WebFX-structure dark → V3 green dark → V4 light (backups of each in repo root)
- Built via codex (cdx) from BRIEF.md / BRIEF-V2.md / BRIEF-V3.md; every codex build needed a copy-review pass (leaks spec language)
- cdx wrapper fixed for macOS (timeout → gtimeout → none fallback)

## Workflow
Edit `index.html` → commit → `git push` → live. Assets in `assets/` (portfolio dashboards resized via sips; og-image generated with genimg).

## Next
- [ ] Custom domain ($12 in EXIT-30 budget) — point at Pages or move to Firebase Hosting
- [ ] Real founder headshot to replace casual selfie (conversion factor for US/UK/AU clients)
- [ ] Optional: green versions of funnel art (currently amber with CSS hue-rotate on CTA bg only)
- [ ] Booking link (Calendly-style) instead of bare mailto, when ready
