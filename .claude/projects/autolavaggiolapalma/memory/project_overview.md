# Project Memory: AUTOLAVAGGIO LA PALMA

## Overview
- **Project Name:** autolavaggiolapalma
- **Type:** Static website (Vanilla HTML, CSS, JavaScript)
- **Purpose:** Premium Car Wash landing page and booking site.
- **Build Step:** None. Can be run locally using `npx serve . -p 8080`.

## Key Technical Details
- **Pricing Data:** The pricing cards are fully dynamic and rendered via JavaScript. All tier/pricing data lives in the `pricingData` object in `script.js` (do not edit prices in HTML).
- **Animations:** Elements with the `.reveal` class gain the `.in-view` class when scrolled into view via an `IntersectionObserver`.
- **Media:** 
  - The hero section uses an animated CSS gradient (`hero-gradient`) as a fallback for an empty `<video>` tag.
  - Video section placeholders are ready to be replaced with YouTube `<iframe>` embeds.
- **Forms:** The booking form uses a simulated submission delay. It is ready to be wired to a real backend like Formspree or EmailJS.

## History & Context
- The workspace originally contained a Next.js clone (`prime-garage-clone`). This was completely removed to focus exclusively on the static car wash site.
- Project documentation is maintained in `CLAUDE.md`.
