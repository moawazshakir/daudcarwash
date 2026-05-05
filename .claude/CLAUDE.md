# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## What This Repo Is

This repository contains the code for the AUTOLAVAGGIO LA PALMA car wash static site.

---

## AUTOLAVAGGIO LA PALMA (Static Site)

### Run
```bash
# From repo root — any static server works
npx serve . -p 8080
```
Open `index.html` directly in a browser also works — no server required.

### Non-obvious patterns

**Pricing cards are 100% JS-rendered.**
Do not edit prices or features in `index.html` — they don't exist there.
All pricing data (4 tiers × 3 vehicle types) lives in the `pricingData` object at the top of `script.js`.

**Hero background video.**
The `<video>` tag in the hero is intentionally empty. A CSS animated gradient (`hero-gradient`) is the visible fallback.
To enable real video: add `<source src="your-file.mp4" type="video/mp4">` inside the `<video>` tag.

**Video section placeholders.**
Two `<div class="video-placeholder">` blocks exist — one main, one short clip.
Each has an `<!-- HOW TO ADD YOUR VIDEO -->` comment directly above it showing the exact `<iframe>` to paste.

**Scroll reveal.**
Service cards need the `.reveal` class in HTML and gain `.in-view` via `IntersectionObserver` in `script.js`. Adding a new animated card: add `.reveal` to its HTML element.

**Booking form.**
The `#booking-form` submit handler is in `script.js` (simulated delay only). Wire it to a real service like [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com) when going live.



## What Still Needs Real Content (Customization Checklist)

- [ ] Replace placeholder gallery images with real photos
- [ ] Add actual car wash video to hero `<video>` tag
- [ ] Replace both video section placeholders with YouTube `<iframe>` embeds
- [ ] Update contact info: address, phone, email in `index.html`
- [ ] Update pricing numbers in `script.js → pricingData`
- [ ] Wire `#booking-form` and `#contact-form` to a real form service
- [ ] Add real customer names/testimonials in `index.html`
