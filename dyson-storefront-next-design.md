# Dyson Storefront Next Demo: Design and PDP Prompt

Paste everything below the line into your coding assistant.

---

## PROGRESS TRACKER

### ✅ Done

**Section 1 — Visual System**
- Dark theme tokens: `#141414` background, `#f0ede8` foreground, `#1c1c1c` cards, `#242424` panels, `#000000` dark-band
- Tailwind token bridges for `panel`, `dark-band` colors
- `.display-heading` component class (serif, weight 300, tight tracking)
- Pill buttons (`--ui-radius: 9999px` on `[data-slot="button"]`)
- Input moderate rounding (`--ui-radius: 0.5rem`)
- `motion` (Framer Motion v14) installed

**Section 2 — Header & Mega Menu**
- `DysonNav`: 4-panel custom Radix NavigationMenu (Shop, Find your clean, Engineering, Support)
- Shop panel: featured V12s tile + all 13 Dyson category links + "Shop all"
- Find your clean panel: 8 goal icon-links + "Find your machine" dark tile
- Engineering panel: 4 static content cards (Inside the machine, Filtration & air, Testing, Sustainability)
- Support panel: 4 static links (Register, Repairs, Spare parts, Contact)
- Full-width nav dropdown (`position: fixed`) — Oura-style viewport takeover
- Transparent hero header: `data-transparent` attribute, scroll-driven opacity transition
- `heroTransparent` wired via `useMatches()` route handle in `_app.tsx`
- Header bottom border separating it from dark page background
- `lenis` smooth scroll installed and wired into app layout

**Section 3 — Home Page**
- `LenisProvider`: Lenis smooth scroll, RAF loop, wired into `_app.tsx`
- `ScrollReveal`: reusable Framer Motion `whileInView` wrapper, respects `prefers-reduced-motion`
- `DysonHero`: full-height split hero — serif H1 left, V12s product image right with parallax
- `StatementBand`: centred serif H2 + subhead + two pill CTAs, staggered reveal
- `GoalCarousel`: Embla carousel — 8 goal cards, animated progress bar, round arrows
- `ProofBand`: dark band — large serif statistic, 4 stat tiles, staggered scale-in
- `HotspotDiagram`: V12s image + 5 Radix Popover hotspots + pulse rings, keyboard accessible
- `RealHomes`: 3 testimonial cards with hover scale
- `CareCta`: warranty / spare parts / repair 3-card CTA
- Hero bleed: `main[data-hero-bleed="true"] { padding-top: 0 }` — hero sits flush under transparent header
- All copy DEMO-labelled, all strings in i18n (en-GB + en-US)

### 🔲 To Do

- **Section 4 — Proof & Trust pages**: Engineering page, Testing & Sustainability page, trust row on PDP/cart
- **Section 5a — PDP gallery**: Large rounded gallery, in-image arrows, segmented progress, mobile swipe
- **Section 5b — PDP sticky right panel**: Serif H1, tagline, finish swatches, summary line
- **Section 5c — PDP option cards**: Standard vs Complete tool set, compare dialog, home demo link
- **Section 5d — PDP buy panel**: Soft grey rounded panel, full-width Add to Cart pill, finance line
- **Section 5e — PDP below the fold**: Tech features, performance meters, range bar, specs accordion
- **Section 5f — PDP FAQ**: Centred serif heading, accordion rows with "Learn More" pill
- **Section 5g — PDP sticky bar**: Floating bar with product name + Add to Cart after buy panel scrolls out
- **Section 5h — Custom attributes import**: 13 missing spec attributes for `485296-01`
- **Section 6 — Cart & checkout restyle**: Rounded-card drawer, care plan add-on, checkout tokens

---

## ROLE

You are a senior Storefront Next engineer and UI designer. Restyle my Dyson UK demo storefront (site `dysonuk`, locale `en-US`, Storefront Next: React, React Router SSR, Tailwind, shadcn/ui, SCAPI via the Commerce SDK). The hero product is the V12s Detect Slim Submarine (PDP route `/p/485296-01`).

## DESIGN INSPIRATION

**Primary reference: [ouraring.com](https://ouraring.com/)**

Take layout patterns, interaction patterns, and overall UX feel from Oura Ring's site. Specifically:
- Full-width mega-menu dropdowns that "take over" the top of the page
- Clean dark theme with high-contrast warm off-white text
- Large full-bleed product imagery with minimal UI chrome
- Section rhythm: hero → statement band → feature carousel → proof band → CTA
- Generous white space, restrained typography hierarchy, no visual clutter
- Floating panels, subtle shadows, smooth scroll-driven animations

Do not copy Oura's copy, imagery, product names, pricing, or brand assets. Take only the look and feel.

## DESIGN INTENT

Make the site feel like premium, calm, engineering-led home technology. The branding is Dyson throughout — product names, categories, pricing, and copy all come from the Dyson catalog. The visual execution takes inspiration from Oura: clean, dark, engineering-led, with a serif headline voice, human lifestyle photography, and engineering shown rather than shouted. The story is "obsessively engineered, made for real homes."

Do not reuse any third-party copy, imagery, names or logos. Do not use Dyson logos, proprietary fonts or assets from dyson.co.uk.

## STEP 0: DISCOVER (before coding)

1. Inspect the repo: layout, header/footer, home route, PLP, PDP, Tailwind theme, i18n, Page Designer setup.
2. Pull real catalog data via SCAPI: categories, products, images, variation attributes, custom attributes.
3. Output a plan and gap table (section vs. data present vs. missing).
4. WAIT for my OK before coding.

## 1. VISUAL SYSTEM

Define these as Tailwind theme tokens. No hard-coded hex in components.

- Page background: warm off-white (~#F6F1EA). Cards: white. Panels: soft warm grey (~#E9E5DF). Dark bands: warm near-black (~#141414).
- Headlines: a serif display font with tight tracking and leading. Hero H1 is about 64-72px desktop and 40px mobile. Section H2 is about 44px. Body copy is a clean sans-serif. Secondary text is a muted grey.
- One accent colour for primary actions and selected states.
- Buttons are fully rounded pills.
  - Primary: accent.
  - Secondary: dark charcoal.
  - Overlay: white pill on imagery.
- Cards: 20-24px radius, full-bleed photo, bottom-left text overlay on a soft gradient.
- Max content width ~1200px. Section padding is 96px desktop and 48px mobile.
- Subtle scroll-in motion and hover lift. Honour `prefers-reduced-motion`.
- Photography direction: real rooms, soft daylight, hands and floors, close-ups of materials and dust being lifted. Use catalog images or royalty-free placeholders.

## 2. HEADER AND MEGA MENU

- A transparent header over the hero, with a plain-text wordmark placeholder (no Dyson logo). Centred items: Shop, Find your clean, Engineering, Support. Cart on the right. A thin promo line sits above the header.
- Menus open as a floating rounded white panel with a soft shadow, and the page behind is blurred.
- **Shop panel:** 2 featured machine tiles (with circular arrow buttons) plus a link list of the real product families from the catalog and "Shop all products".
- **"Find your clean" panel:** start from the job, not the model. It has one featured tile ("Find your machine", a short guided picker) plus icon links, each opening its own landing page:
  - Pet hair
  - Hard floors
  - Carpets and rugs
  - Allergies and cleaner air
  - Small spaces and stairs
  - Whole-home clean
  - Wet and dry cleaning
  - Quiet cleaning

  Map each to catalog categories or attributes (`plpMainFeature`, `techFeatures`). Hide goals that have no products.
- **"Engineering" panel:** Inside the machine, Filtration and air, Testing, Sustainability and repair.
- Keyboard accessible (arrows, Escape, focus management), with `aria-expanded` and `aria-controls`.

## 3. HOME PAGE

a. **Hero:** split layout. The left side has the serif headline ("Engineered to clean deeper." as demo copy), a one-line subhead and a "Shop Now" pill. The right side has a large product or lifestyle image bleeding to the edge.

b. **Statement:** a centred serif H2 ("See what you've been missing.") with a short paragraph and two dark pills ("Why Dyson", "How it works").

c. **Find your clean:** a horizontal carousel of tall rounded image cards (3 visible on desktop, 1.2 on mobile), each with a tag pill and a serif overlay headline ("Pet hair, gone.", "Floors that shine.", "Air you can trust."). One wider featured card shows a small live-style readout panel (demo values, e.g. a particle count falling from "High" to "Low") and a "Learn More" pill. Add round prev/next arrows and a thin progress line.

d. **Engineering proof band:** a centred serif statistic with a source note and a dark "See the testing" pill. Beneath it are floating device-screen mockups, such as the LCD particle-count display and a generic companion-app screen (placeholder UI).

e. **Inside the machine:** an eyebrow, serif H2 and paragraph in a dark rounded container. It uses an interactive hotspot diagram of the V12s Detect Slim Submarine with 4-5 hotspots (laser head, piezo sensor, cyclones, filtration, Submarine wet roller). Each hotspot opens a short explainer card. Content comes from `techFeatures`.

f. **Real homes:** a band of short customer-home stories, each with a quote chip, a room photo and a before/after dust or floor visual (all DEMO content).

g. **Care and repair CTA:** warranty, spare parts availability and repair options as three cards, then the footer.

## 4. PROOF AND TRUST

- **Engineering page:** how the machine is built and tested. Cover independent lab results, filtration and certification claims, noise testing, battery testing, and a list of standards. All content is Content Assets and is labelled DEMO.
- **Testing and Sustainability page:** opens with a short engineering-lead letter (demo copy: "A clean home starts with honest testing."), then recyclability, repairability, parts availability and warranty terms.
- Add a trust row on the PDP and cart: warranty, free delivery, easy returns, secure checkout.

## 5. PDP (V12s Detect Slim Submarine, `/p/485296-01`)

- **Left:** a large rounded gallery (about 60% width) with in-image arrows and a segmented progress indicator. On mobile it is a swipe slider.
- **Right (sticky on desktop):** a serif H1, a tagline (`modelDescription`), round finish swatches with a selected ring, and a summary line "Finish – £price" from the selected variant.
- **Option cards** (two large bordered cards with a check circle when selected):
  - "Standard tools": the machine as shown.
  - "Complete tool set": adds the accessory bundle from the catalog, with the price delta shown.

  An info icon opens a dialog comparing the two. If the catalog has no bundle, hide the cards.
- Under the cards, add a "Book a free home demo" link opening a dialog (a request form, demo only, with no data sent to real services).
- **Buy panel:** a soft grey rounded panel with a full-width accent "Add to Cart" pill, a finance line (`financingText` attribute, demo copy) and a "Check purchase power" link.
- **Below the fold:** Technical Features, Performance meters (Suction, Run time, Filtration), range bar with a Vacuum/Wet clean toggle, storytelling blocks, Technical Specifications accordion, Guarantees, Pairs well with, You may also like. Build these as in my existing PDP prompt, restyled with this design system.
- **FAQ:** a centred serif "Frequently Asked Questions" heading with soft-grey rounded accordion rows. The open row shows its answer and a dark "Learn More" pill. Sample questions: How long does the battery last? Can it clean wet and dry? Is it good for pet hair? How do I empty and clean it? How do I register my warranty?
- **Sticky bar** after the buy panel scrolls out of view: a floating white rounded bar with the product name and an accent "Add to Cart" pill, plus a floating chat button.

## 6. CART

- A cart drawer in the same rounded-card style. Show the selected tool set, and show the care plan as an optional add-on.
- Keep the checkout flow as-is, restyled with the tokens.

## 7. DATA RULES

- The existing Dyson catalog is the only product source. Do not invent products or change IDs, URLs, prices or inventory.
- Do not hard-code specs. Read them from the catalog.
- All marketing copy, statistics, quotes and test claims are DEMO content in Content Assets or Page Designer attributes, labelled "DEMO", so I can swap them.
- Hide any section with no data. Never show empty placeholders.
- For missing data, give me (a) custom attribute IDs and (b) catalog XML import snippets.
- Expected attributes: `badge`, `promoBadge`, `plpMainFeature`, `techFeatures`, `suctionLevel`, `runtimeLevel`, `filtrationLevel`, `modeLabels`, `vacRangeMin`/`vacRangeMax`, `wetRangeMin`/`wetRangeMax`, `modelDescription`, `financingText`, `complementaryProducts`, `relatedProducts`, `enableCompleteTheSet`, `toolBundle`.

## 8. TECHNICAL REQUIREMENTS

- SSR loaders, Tailwind tokens, shadcn/ui, SVG icons, i18n for all strings.
- Build the home sections, goal carousel, hotspot diagram, proof band and story band as Page Designer components with typed attributes.
- Accessibility: 4.5:1 contrast (including text over images), visible focus, keyboard-operable menus, carousels and hotspots, alt text, reduced motion.
- Performance: eager/preload the hero image, lazy-load the rest, reserve aspect ratios, minimal client JS.
- Unit tests for the mega menu, carousel, hotspot diagram, option cards, sticky bar and accordion.

## 9. IMPLEMENTATION STACK (React components and interactions)

Use existing project dependencies first. Add a library only if it isn't already installed, and tell me which ones you add.

| Interaction | Implementation |
|---|---|
| Mega menu (floating panel, blurred backdrop) | shadcn/Radix `NavigationMenu`, with a backdrop-blur overlay |
| Goal-card carousel, gallery, mobile sliders | shadcn `Carousel` (Embla), with a custom scroll-progress component (thin line or segmented) and round prev/next buttons |
| Scroll-in fade/slide on sections, hero parallax | `motion` (Framer Motion): `whileInView` for reveals, `useScroll` and `useTransform` for parallax. Reveal once, and keep the animation lightweight |
| Card hover lift and image zoom | Tailwind `transition`, `hover:` and `group` utilities (no JS) |
| Option cards (Standard / Complete tool set) | Radix `RadioGroup` styled as cards, with a check-circle indicator |
| Product finish swatches | `RadioGroup` or links with `aria-current`, depending on how variation URLs work in the project |
| FAQ and Technical Specifications accordions | shadcn `Accordion`, with +/- icon and animated height |
| Dialogs (info, compare, home demo, reviews) | shadcn `Dialog` |
| Hotspot diagram | An absolutely positioned button per hotspot over the image, opening a Radix `Popover` card. Keyboard focusable, with an `aria-label` |
| Sticky "Add to Cart" bar | A custom `useInView` hook (`IntersectionObserver`) on the buy panel, with a fade transition |
| Performance range bar and meters | Plain React components using CSS grid, with the highlighted range set from `grid-column` |

Rules for all interactive components:
- Every animation respects `prefers-reduced-motion` (disable parallax and reveal transitions, keep instant state changes).
- Make them client components only where interaction needs it. Keep the rest server-rendered.
- Keep keyboard behaviour correct: arrow keys in carousels, radio groups and menus, Escape to close, visible focus.
- Don't block first paint. Lazy-load `motion` features and below-the-fold components.
- Provide a small Storybook story or test per custom component (carousel progress, hotspot, sticky bar, range bar).

## DELIVERABLES

1. Gap table and plan, then wait for approval.
2. Tailwind theme and font setup.
3. Header, mega menu, footer.
4. Home page (Page Designer components + a sample page).
5. "Find your clean" landing page template.
6. Engineering and Testing page templates.
7. Restyled PDP with option cards and the home demo link.
8. Cart drawer restyle.
9. Custom attribute list, catalog XML snippet and Content Asset definitions.
10. How to run locally and verify against the sandbox.
