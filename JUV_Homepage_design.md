# design.md - JUV Homepage / Public Navigation

Product: UmrahHaji.com Jamaah/User View  
Module: Homepage, Public Navigation & Marketing Pages  
Source PRD: JUV PRD 01 - Homepage, Public Navigation & Marketing Pages  
UI Reference: muslim101.id homepage  
Platform: Mobile-first Responsive Web Platform  
Status: Draft Design Guide  
Last Updated: 26 June 2026  

---

## 1. Purpose

Use this guide to design the Jamaah/User View homepage for UmrahHaji.com.

The homepage is the primary public entry point for users who want to discover Umrah/Hajj packages, understand platform trust, read guidance content, view testimonials, access FAQ, contact support, and move into login, registration, package detail, or booking.

This document is separate from Admin Panel `design.md`. It is only for Jamaah/User View homepage and public navigation.

Primary UI benchmark: [muslim101.id](https://muslim101.id/), used as visual and structural reference for public package discovery, marketplace density, category navigation, package card hierarchy, trust-building blocks, article/FAQ placement, and mobile bottom navigation.

---

## 2. Design Goals

1. Help users find packages quickly.
2. Build trust before users book.
3. Explain that packages come from verified travel agencies.
4. Make login/register easy to find without blocking public browsing.
5. Promote package discovery, guidance content, FAQ, and support.
6. Keep the experience mobile-first and simple.
7. Use warm, modern, spiritual visual cues without becoming decorative-heavy.
8. Keep all package, testimonial, article, FAQ, and trust data connected to source modules.

---

## 3. Product Positioning

Homepage is a public acquisition and trust-building page.

It is not:

1. A booking checkout page.
2. A user dashboard.
3. A package management page.
4. A finance/payment page.
5. A support inbox.
6. A full Help Center.

It should guide users to the correct next step:

| User Need | Homepage Action |
| --- | --- |
| Search package | Use hero search panel |
| Browse promo | Open Limited Time Offers |
| Browse trusted package | Open Featured Packages |
| Understand trust | Read Trust Indicators |
| Learn Umrah/Hajj | Open Guide article |
| Ask common question | Open FAQ |
| Contact platform | Open Contact Us |
| Book | Open package detail or login/register gate |
| Continue trip | Logged-in user opens My Trip |

---

## 4. Visual Direction

The homepage should feel:

1. Modern.
2. Trustworthy.
3. Warm.
4. Premium but accessible.
5. Spiritual without being overly ornamental.
6. Clear enough for booking decisions.
7. Practical like a consumer marketplace, where users can compare packages quickly.
8. Friendly for English-speaking pilgrims and family decision-makers, with RM pricing and clear customer-facing English copy.

### 4.1 Visual Language

Use:

1. Primary color `#0694A2` for main actions, active states, search CTA, selected tabs, and brand accents.
2. Secondary color `#C27803` for promo emphasis, offer badges, discount highlights, and selected marketing accents.
3. White or very light backgrounds for content sections.
4. Subtle wave, arch, notched shape, or Makkah outline pattern only as background texture.
5. Real package, destination, hotel, airline, or travel-agency imagery where available.
6. Consistent rounded cards and soft shadows.
7. Plus Jakarta Sans typography.
8. Horizontal category chips/tabs for Umrah, Hajj, Muslim Trip, Promo, and Family.
9. Marketplace-style package sections with dense but readable metadata.
10. Trust and payment blocks that feel operational, not decorative only.

Avoid:

1. Heavy animation.
2. Dark blurred stock imagery.
3. Decorative gradient-only hero.
4. Oversized marketing cards that hide package utility.
5. Text on low-contrast background.
6. One-note teal/orange overload.
7. Copying muslim101.id brand assets, logo, illustrations, or exact content.
8. Making spiritual ornaments more dominant than search and package discovery.

### 4.2 Color Tokens

Core tokens:

| Token | Hex | Usage |
| --- | --- | --- |
| Primary | `#0694A2` | Main CTA, active nav, selected category tab, search button, focused form border |
| Primary Dark | `#057C88` | CTA hover/pressed, high-contrast icon background |
| Primary Soft | `#E6F7F9` | Soft section background, selected chip background, info banner |
| Secondary | `#C27803` | Promo badge, discount label, limited offer accent, secondary highlight |
| Secondary Dark | `#9A6002` | Secondary hover/pressed, text on light promo backgrounds |
| Secondary Soft | `#FFF3DC` | Promo card tint, offer banner background |
| Text Primary | `#172326` | Main text |
| Text Secondary | `#5D6B70` | Supporting text and metadata |
| Border | `#DDE7EA` | Card border, input border, divider |
| Surface | `#FFFFFF` | Cards, navbar, search panel |
| Page Background | `#F7FAFA` | Main page background |
| Error | `#DC2626` | Error message and destructive state |
| Success | `#16A34A` | Confirmed/available status |
| Warning | `#F59E0B` | Pending/warning state |

Color rules:

1. Primary `#0694A2` owns conversion: search, view detail, book, submit, active tab.
2. Secondary `#C27803` owns commercial emphasis: promo, discount, limited offer, featured highlight.
3. Do not use secondary as the main booking CTA if primary is already present in the same card.
4. Use soft color tokens for backgrounds so the page stays light and readable.
5. Text on primary or secondary backgrounds must pass contrast checks.
6. Package cards should not use more than one strong color area at once.
7. Use neutral text and border tokens for dense marketplace metadata.

### 4.3 Muslim101.id Reference Mapping

The design should adapt the following patterns from muslim101.id:

| Reference Pattern | How to Apply in JUV Homepage |
| --- | --- |
| Top navigation with product, program, partner, article, search, login, register | Use clear public nav with package discovery, guide/article, agency/travel partner entry, login, register |
| Prominent hero search for packages | Keep search as the first conversion object above the fold |
| Product tabs: Umrah, Hajj, Muslim Trip | Use category tabs/chips for main travel product types |
| Filter fields for hotel star, departure date, airport, airline | Adapt to PRD fields: category, departure, package type, price; add hotel/airport/airline only if supported by package data |
| Promo package carousel/list | Use Limited Time Offers with active promo packages only |
| Multiple package rows by category | Split Featured Packages into Promo, Regular Umrah, Umrah Plus, Hajj, and Family when inventory exists |
| Trust/experience block with pilgrim count and agency visuals | Use verified-agency, pilgrims served, transaction safety, and support indicators from platform data |
| Payment/security block | Add trust section explaining safe payment, booking status, and transaction visibility |
| Financing/saving education | Surface as optional content only if Payment/Financing modules are enabled |
| Testimonials | Use real pilgrim testimonials when approved/published |
| Articles and FAQ near footer | Keep Guide/Article and FAQ as trust and SEO support sections |
| Mobile bottom nav: Home, Wishlist, Transaction, Account | Adapt to JUV role: Home, Packages, My Trip, Guides, Profile |

---

## 5. Page Structure

Recommended order:

```text
Homepage
+-- Top Navbar
+-- Hero Search Panel
+-- Product Category Tabs
+-- Limited Time Offers
+-- Promo Banner
+-- Featured Packages
+-- Category Package Rows
+-- Trust Indicators
+-- Payment & Booking Safety
+-- Optional Financing / Saving Education
+-- Sacred Destinations
+-- Testimonials
+-- Umrah & Hajj Guide
+-- FAQ
+-- Footer
+-- Bottom Navigation Bar (mobile)
```

Public marketing pages linked from homepage:

```text
About Us
Contact Us
Terms & Conditions
Privacy Policy
```

---

## 6. Responsive Layout

### 6.1 Mobile

Mobile is the primary experience.

Rules:

1. Use single-column layout.
2. Keep hero search above the fold.
3. Place product category tabs directly after hero/search if they do not fit inside hero.
4. Use horizontal scroll for offers, category shortcuts, programs, and destinations.
5. Use vertical package cards for featured packages and category package rows.
6. Keep bottom navigation visible.
7. Use safe-area padding so bottom nav does not cover CTAs.
8. Use compact header: logo, menu/search, login/profile.
9. Avoid showing too many icons in the top bar.
10. Keep product listing density high enough that users see at least one package card without excessive scrolling.

### 6.2 Tablet

Rules:

1. Use 2-column cards where space allows.
2. Keep navbar readable.
3. Allow filter fields to wrap.
4. Use carousel or grid for offers.

### 6.3 Desktop

Rules:

1. Use full top navbar.
2. Use wider hero search panel.
3. Use 3-4 column package grids.
4. Use footer with multiple columns.
5. Hide bottom nav or replace with desktop navbar.
6. Show 4-column cards for package rows where space allows, matching marketplace browsing behavior.

---

## 7. Top Navbar

### 7.1 Desktop / Tablet

Required elements:

| Element | Behavior |
| --- | --- |
| Logo | Opens homepage |
| Packages link | Opens Package Discovery |
| Products menu | Opens category menu: Umrah, Hajj, Muslim Trip, Family |
| Program/Promo link | Opens program or promotion section/page |
| Travel Partner link | Opens agency/travel partner information page if public acquisition is enabled |
| Guide link | Opens Articles/Guide |
| FAQ link | Scrolls/opens FAQ |
| Contact link | Opens Contact Us |
| Search icon/input | Opens package search overlay or focuses hero search |
| Login button | Opens login |
| Register button | Opens registration |
| Notification bell | Logged-in only; guest opens login prompt if shown |
| Profile/avatar | Logged-in only |

Reference behavior:

1. Desktop nav may use dropdown menus for Products and Program.
2. Login and Register must be visibly separated from browsing links.
3. Search can be icon-only in the top bar if the hero search is visible.
4. Travel Partner link must not expose internal agency dashboard unless the user is authenticated as agency.

### 7.2 Mobile

Required elements:

| Element | Behavior |
| --- | --- |
| Compact logo | Opens homepage |
| Search icon | Opens package search or scrolls to hero search |
| Login/profile | Guest sees Login; logged-in sees avatar |
| Hamburger menu | Opens public menu drawer |

Mobile navbar priority:

1. Logo.
2. Search.
3. Login/profile.
4. Menu.

Do not show package/cart icon unless booking/cart concept is implemented.

---

## 8. Public Menu Drawer

Menu items:

1. Home.
2. Packages.
3. Umrah Packages.
4. Hajj Packages.
5. Muslim Trip.
6. Family Packages.
7. Promo/Program.
8. Articles.
9. Guide.
10. FAQ.
11. About Us.
12. Contact Us.
13. Travel Partner.
14. Login.
15. Register.

Logged-in additions:

1. My Trip.
2. My Bookings.
3. Transactions.
4. Profile.
5. Notifications.
6. Logout.

Rules:

1. Drawer must close after navigation.
2. Login/register must remain easy to find.
3. Drawer must support keyboard and screen-reader behavior.
4. Protected links show login/register prompt for guests.

---

## 9. Hero Search Panel

### 9.1 Purpose

The hero search panel is the main conversion area. It should help users search package options immediately.

Heading:

```text
Find Your Umrah & Hajj Package
```

Default supporting copy:

```text
Compare packages from verified travel agencies and choose the departure that fits your journey.
```

Dynamic supporting copy if data is available:

```text
Browse 500+ packages from 50+ trusted travel agencies.
```

### 9.2 Fields

| Field | Type | Placeholder |
| --- | --- | --- |
| Main search | Text input | Search packages, destinations, or agencies... |
| Category | Select | Category |
| Departure | Month/date range | Departure |
| Package Type | Select | Package Type |
| Price Range | Select/range | Price Range |
| Hotel Class | Select | Hotel star |
| Departure City | Select | Departure city |
| Airline | Select | Airline |

Phase 1 required fields are Main search, Category, Departure, Package Type, and Price Range.

Hotel Class, Departure City, and Airline should appear only if the package data model already supports those fields. If not supported, keep them out of the UI to avoid false filtering.

### 9.3 Options

Category:

```text
All, Umrah, Hajj, Muslim Trip, Family
```

Package Type:

```text
Economy, Standard, Premium, VIP, Express, Family
```

Departure:

```text
Any time, This month, Next month, Next 3 months, Custom
```

Price:

```text
Any price, Budget, Mid-range, Premium, Custom
```

### 9.4 CTA

Primary CTA:

```text
Search Packages
```

If result count is available:

```text
Search Packages (500+ results)
```

Secondary actions:

1. Compare Packages - Phase 2 or hidden.
2. Advanced Search - Phase 2.

### 9.5 Design Rules

1. Search must work with only the main input.
2. Empty search opens Package Discovery default listing.
3. Advanced fields can collapse on mobile.
4. Fields must have visible labels, not placeholder-only semantics.
5. CTA must be sticky/visible enough on mobile after filter expansion.
6. Hero background must not reduce input readability.
7. Use a bright white search card above `Primary Soft` hero surface.
8. Keep category tabs visually connected to search, not floating far below.
9. On mobile, advanced filters should open in a bottom sheet.
10. On desktop, advanced filters can appear inline as a second row.

### 9.6 Product Category Tabs

Product category tabs translate the Muslim101-style product switcher into JUV package discovery.

Recommended tabs:

```text
Umrah, Hajj, Muslim Trip, Promo, Family
```

Rules:

1. Tabs may sit inside hero search on desktop.
2. Tabs should become horizontal chips below hero on mobile.
3. Active tab updates package sections and search category.
4. If Muslim Trip is not in Phase 1 scope, show it as hidden until inventory exists.
5. Promo tab opens Limited Time Offers or filters Package Discovery by promo status.
6. Do not show a tab with zero published packages unless the business wants SEO landing pages.

---

## 10. Limited Time Offers

### 10.1 Purpose

Show active promotional packages and create booking interest.

Header:

```text
Limited Time Offers
Special promotions for Umrah, Hajj, Muslim Trip, and Family packages
```

### 10.2 Tabs

```text
All, Umrah, Hajj, Muslim Trip, Family
```

### 10.3 Layout

Mobile:

1. Horizontal scroll cards.
2. Snap-to-card behavior.
3. Visible "View All Promo" CTA.
4. Avoid text clipping.

Desktop:

1. Carousel or 4-column grid.
2. Show enough metadata for comparison.
3. Keep card density close to a travel marketplace: image, badge, agency, date, price, CTA.

### 10.4 Card Content

Each offer card should show:

1. Package image.
2. Category/promo badge.
3. Discount badge.
4. Package name.
5. Seats left if available.
6. Travel agency name.
7. Rating and review count if available.
8. Duration.
9. Departure date/month.
10. Original price.
11. Discounted price.
12. Book Now CTA.
13. Hotel class if available.
14. Departure city if available.
15. Airline if available.

### 10.5 Rules

1. Show only published packages.
2. Show only active promotions.
3. Hide expired promotions.
4. Hide seats-left label if availability is unknown.
5. Book Now opens package detail or login/register gate depending product decision.
6. Promo cards must use clear price hierarchy: original price smaller, final price dominant.
7. Do not show aggressive countdown UI unless expiry time is reliable.

---

## 11. Promo Banner

Purpose: Provide broad discovery CTA.

Content:

```text
Umrah, Hajj, and Muslim Trip packages from verified travel agencies
Compare prices, facilities, schedules, and agencies before booking
```

CTA:

```text
View All Packages
```

Rules:

1. CTA opens Package Discovery.
2. Banner can be static in Phase 1.
3. Do not over-style as a decorative ad block.
4. Keep text short on mobile.

---

## 12. Featured Packages

### 12.1 Purpose

Show curated, verified, or commercially important packages.

Header:

```text
Featured Packages
Premium, Budget, VIP & Express packages from verified partners
```

Tabs:

```text
All, Umrah, Hajj, Muslim Trip, Family
```

### 12.2 Layout

Mobile:

1. Vertical list cards.
2. Large image, compact details.
3. CTA at bottom of card.

Desktop:

1. Grid layout.
2. 3-4 columns depending width.

### 12.3 Card Content

Use same package card model as offers, plus:

1. Featured label.
2. Verified agency badge.
3. Package category.
4. Starting price.
5. View Details or Book Now CTA.
6. Hotel class and distance to Masjid if data exists.
7. Departure city and departure month.
8. Agency logo or short agency name.
9. Package quota or availability state if reliable.

Footer CTA:

```text
View All Packages
```

### 12.4 Category Package Rows

Inspired by Muslim101-style category rows, JUV homepage should support multiple package rows when inventory is sufficient.

Recommended rows:

1. Limited Time Offers.
2. Regular Umrah.
3. Umrah Plus.
4. Hajj.
5. Muslim Trip.
6. Family Package.

Rules:

1. Each row uses the same package card component.
2. Each row has a clear "View All" action.
3. Hide empty rows.
4. Prioritize active, published, verified-agency packages.
5. Do not repeat the same package too many times across rows unless it has multiple valid labels.
6. On mobile, package rows can be horizontal scroll if cards remain readable.

---

## 13. Trust Indicators

### 13.1 Purpose

Build confidence before users browse or book.

Header:

```text
Trusted Platform
Verified travel agencies, transparent booking, and pilgrim support
```

### 13.2 Stats

Recommended stats:

| Stat | Label | Source |
| --- | --- | --- |
| 100% | Verified Agencies | Travel Agency verification records |
| 25,000+ | Happy Pilgrims | Completed trips/bookings |
| 4.9 | Average Rating | Approved testimonials |
| 50+ | Partner Agencies | Active verified agencies |

Rules:

1. Do not show unverifiable claims.
2. Use approved marketing values if live numbers are not ready.
3. Keep numbers readable on mobile.
4. Add short sub-labels for clarity.
5. Position trust cards before or after main package sections so users see proof before conversion.
6. Avoid generic icon-only trust claims without supporting detail.

### 13.3 Trust Content Blocks

Recommended blocks:

1. Verified travel agencies.
2. Transparent package facilities.
3. Trackable booking status.
4. Visible payment confirmation.
5. Customer support access.
6. Published testimonials and ratings.

### 13.4 Payment & Booking Safety

Add a dedicated safety block if payment and booking modules are already part of the product.

Purpose:

1. Explain that booking status is trackable.
2. Explain that payments follow platform rules.
3. Reduce anxiety before users click Book Now.
4. Connect public homepage trust to logged-in booking/payment flows.

Recommended content:

| Item | Copy Direction |
| --- | --- |
| Verified agency | Packages are published by approved travel agencies |
| Transparent price | Show base price, promo price, and included facilities |
| Booking tracking | Pilgrims can follow booking and trip status after login |
| Payment confirmation | Payment status should be visible in transaction flow |
| Support | Help is available through platform support channels |

Rules:

1. Do not promise escrow or refund handling unless product/legal policy supports it.
2. Link payment claims to Payment Settings and booking PRDs.
3. If payment is handled outside platform, copy must say "payment instructions" instead of "secure payment".

### 13.5 Optional Financing / Saving Education

Muslim101 includes education around payment preparation. JUV can adapt this as a content block only when relevant.

Use only if one of these modules exists:

1. Installment or financing partner.
2. Savings/allowance feature.
3. Educational article about preparing Umrah/Hajj budget.

If unavailable, replace with a guide article row:

```text
Umrah & Hajj Budget Preparation Guide
```

---

## 14. Sacred Destinations

### 14.1 Purpose

Introduce key destinations and route users to filtered package discovery.

Header:

```text
Sacred Destinations
```

Cards:

1. Makkah.
2. Madinah.
3. Jeddah.

Card content:

1. Destination image.
2. Destination name.
3. Short description.
4. Package count if available.
5. CTA to filtered Package Discovery.

Layout:

1. Horizontal scroll on mobile.
2. 3-column grid on desktop.

---

## 15. Testimonials

### 15.1 Purpose

Show social proof from verified pilgrims.

Header:

```text
What Our Pilgrims Say
```

### 15.2 Stats Row

| Stat | Label |
| --- | --- |
| 4.9 | Average Rating |
| 3,247 | Total Reviews |
| 98% | Recommend |
| 100% | Verified Reviews |

### 15.3 Review Card

Fields:

1. Reviewer name or anonymous label.
2. Optional avatar.
3. Package name.
4. Travel agency name.
5. Rating.
6. Review date.
7. Quote excerpt.
8. Verified label.

Rules:

1. Show approved public testimonials only.
2. Hide private/sensitive content.
3. Respect anonymous flag.
4. Use quote excerpt, not full long review.
5. Media requires public display consent.

---

## 16. Umrah & Hajj Guide

### 16.1 Purpose

Educate users and support SEO/content discovery.

Header:

```text
Umrah & Hajj Guide
```

Tabs:

```text
Preparation & Guide
Travel Policy
```

Recommended cards:

1. Umrah Preparation.
2. Performing Umrah.
3. Makkah Helpful Tips.
4. Performing Second Umrah.
5. Travelling with Family.
6. Travel Policy & Documents.

Rules:

1. Cards link to published articles.
2. If fewer than 6 articles exist, show available cards only.
3. Admin can pin priority guide articles.
4. Do not present religious/legal/medical guidance as final authority.

---

## 17. FAQ

### 17.1 Purpose

Reduce repetitive support inquiries.

Header:

```text
Frequently Asked Questions
Get answers to common questions about booking and pilgrimage
```

Tabs:

```text
All, Booking, Payment, Cancellations, Preparation, Travel Partner
```

### 17.2 Recommended Questions

1. How do I book a Umrah or Hajj package?
2. What payment methods do you accept?
3. Can I cancel or modify my booking?
4. What documents do I need for Umrah/Hajj?
5. What's the difference between package types?
6. Do you provide support during the pilgrimage?
7. Are there discounts for group bookings?
8. How do you verify travel agencies?
9. How do I compare hotel, airline, and departure options?
10. Can I save or continue a package later?

Rules:

1. First item can be expanded by default.
2. On mobile, avoid expanding too many items by default.
3. Accordion must expose expanded/collapsed state.
4. FAQ structured data, if used, must match visible FAQ content.

---

## 18. Footer

Footer should include:

1. About Us.
2. Vision & Mission.
3. Testimonials.
4. Umrah Packages.
5. Hajj Packages.
6. Family Packages.
7. Muslim Trip.
8. Promo/Program.
9. Articles.
10. FAQ.
11. Contact Us.
12. Travel Partner.
13. Terms & Conditions.
14. Privacy Policy.

Rules:

1. Footer links are public.
2. Legal links must be crawlable.
3. Contact links must not expose internal staff data.
4. Keep footer compact on mobile with collapsible sections if needed.

---

## 19. Bottom Navigation Bar

Mobile tabs:

| Order | Label | Guest Behavior | Logged-in Behavior |
| ---: | --- | --- | --- |
| 1 | Home | Stay on homepage | Stay on homepage |
| 2 | Packages | Open Package Discovery | Open Package Discovery |
| 3 | My Trip | Login/register prompt | Open My Group Trip |
| 4 | Guides | Open public guide | Open checklist/guidance |
| 5 | Profile | Login/register prompt | Open Profile |

Muslim101 reference uses a mobile bottom navigation pattern for fast access to homepage, saved/transaction/account areas. JUV adapts this pattern to match existing role PRDs and avoid introducing a new Wishlist module unless Product Discovery later requires it.

Rules:

1. Active tab must be clear.
2. Bottom nav must not cover sticky CTAs.
3. Protected tabs must explain why login is needed.
4. Use safe-area padding.
5. If Wishlist/Saved Package is introduced later, place it under Packages or Profile before adding a sixth tab.
6. Do not replace My Trip with Transaction because My Trip is the stronger customer-facing anchor for pilgrims.

---

## 20. Guest vs Logged-In Behavior

| Interaction | Guest | Logged-in pilgrim |
| --- | --- | --- |
| Search packages | Allowed | Allowed |
| View package details | Allowed | Allowed |
| Book package | Prompt login/register or open package detail | Continue booking |
| View My Trip | Prompt login/register | Open My Group Trip |
| View Notifications | Prompt login/register | Open notifications |
| View Profile | Prompt login/register | Open profile |
| View Guides | Public guide | Personalized checklist/guidance |
| Referral | Prompt login/register | Open referral |

---

## 21. Public Marketing Pages

### 21.1 About Us

Sections:

1. Hero with short platform promise.
2. Platform story.
3. Mission and vision.
4. Trust indicators.
5. Partner/agency verification explanation.
6. CTA to browse packages and register.

### 21.2 Contact Us

Sections:

1. Public contact channels.
2. Operating hours.
3. Support categories.
4. Login gate for booking/payment/document-specific support.
5. Travel Partner contact path if agency acquisition is public.

Rules:

1. General inquiry can be public.
2. Booking/payment/document issues should route to authenticated support.
3. Do not expose internal staff contacts.

### 21.3 Terms & Privacy

Requirements:

1. Page title.
2. Version/effective date.
3. Last updated date.
4. Clear content body.
5. Public URL.

---

## 22. States

### 22.1 Loading

1. Hero fields can load immediately.
2. Package cards use skeleton cards.
3. Testimonials use skeleton cards.
4. Guide cards use skeleton cards.
5. Trust stats use fallback placeholders.

### 22.2 Empty

| Section | Empty Behavior |
| --- | --- |
| Limited Time Offers | Hide section or show no active promotions |
| Featured Packages | Show latest published packages |
| Destinations | Hide package count but keep card |
| Testimonials | Hide section if no approved reviews |
| Guide | Show default guide cards |
| FAQ | Show default FAQ |

### 22.3 Error

1. Package API fails: show retry and fallback content.
2. Image fails: show branded placeholder.
3. Search fails: keep user on page and show error.
4. Static page fails: show retry/support fallback.
5. Protected CTA for guest: show login/register prompt.

---

## 23. Performance Rules

1. Prioritize hero image/background for initial render.
2. Lazy-load offscreen package, destination, testimonial, and guide images.
3. Set image dimensions or aspect ratios to prevent layout shift.
4. Use responsive images.
5. Use compressed formats such as WebP/AVIF where supported.
6. Avoid heavy background animation.
7. Keep initial JavaScript payload low.
8. Cache public homepage content where practical.

Targets:

| Metric | Target |
| --- | --- |
| LCP | <= 2.5s on good mobile network |
| CLS | <= 0.1 |
| INP | <= 200ms |

---

## 24. SEO Rules

1. Homepage must have title and meta description.
2. Use semantic HTML headings.
3. Package cards link to crawlable package detail URLs.
4. Article cards link to crawlable article URLs.
5. FAQ content must be visible on page.
6. FAQ schema is optional and must match visible content.
7. Images must have meaningful alt text.
8. Canonical URL must be set.
9. About, Contact, Terms, and Privacy must have crawlable URLs.

---

## 25. Accessibility Rules

1. Buttons and links must be keyboard accessible.
2. Carousels must provide accessible controls.
3. Icons need labels or accessible names.
4. Form fields need labels.
5. FAQ accordion announces expanded/collapsed state.
6. Color cannot be the only indicator.
7. Bottom nav exposes selected/active state.
8. Touch targets must be comfortable on mobile.
9. Respect reduced motion preference.

---

## 26. Analytics Events

Recommended events:

1. `homepage_viewed`
2. `hero_search_submitted`
3. `hero_filter_changed`
4. `package_card_clicked`
5. `package_book_now_clicked`
6. `promo_view_all_clicked`
7. `featured_browse_all_clicked`
8. `compare_packages_clicked`
9. `advanced_search_clicked`
10. `destination_clicked`
11. `testimonial_view_all_clicked`
12. `guide_card_clicked`
13. `faq_item_expanded`
14. `footer_link_clicked`
15. `about_page_viewed`
16. `contact_page_viewed`
17. `legal_page_viewed`
18. `login_clicked`
19. `register_clicked`
20. `protected_nav_prompt_shown`

---

## 27. Component Checklist

Before implementation/design signoff, homepage must include:

1. Top navbar.
2. Mobile drawer.
3. Hero search panel.
4. Limited Time Offers.
5. Promo banner.
6. Featured Packages.
7. Trust Indicators.
8. Sacred Destinations.
9. Testimonials.
10. Umrah & Hajj Guide.
11. FAQ accordion.
12. Footer.
13. Mobile bottom navigation.
14. Guest login/register prompt.
15. Loading/empty/error states.

---

## 28. AI Design Direction & Anti-Generic Rules

This section should be used when asking an AI design agent, Figma agent, Claude, or frontend agent to create the homepage UI.

Do not start with:

```text
Create a nice homepage for UmrahHaji.com.
```

Start with visual direction and constraints first.

### 28.1 Required Design Direction Step

Before creating UI, the AI must define 3 unique visual directions.

Prompt:

```text
Before designing, define 3 unique visual directions for UmrahHaji.com.

Each direction must include:
- layout personality
- hero composition
- card style
- navigation style
- imagery style
- section rhythm
- what makes it non-generic

Do not create UI yet.
```

Recommended directions:

| Direction | Summary | When to Use |
| --- | --- | --- |
| Modern Pilgrimage Marketplace | Search-first package marketplace with dense comparison cards, verified agency trust, and warm spiritual accents | Default homepage direction |
| Guided Sacred Journey | More editorial and guidance-led, with package discovery supported by education and trip preparation | If content/guide is the business differentiator |
| Trusted Family Travel Hub | More family-friendly, reassurance-heavy, focused on safety, support, and group booking clarity | If target users are family/group pilgrims |

Default selected direction:

```text
Modern Pilgrimage Marketplace
```

### 28.2 Selected Visual Direction

Create the homepage visual direction called:

```text
Modern Pilgrimage Marketplace
```

The design should feel like a trusted travel marketplace for Umrah/Hajj, not a generic SaaS landing page.

Use:

1. Dense but readable package cards.
2. Real travel/package metadata.
3. Search-first hero.
4. Verified agency trust indicators.
5. Subtle Islamic geometry.
6. Primary `#0694A2` and secondary `#C27803` accents.
7. Mobile marketplace layout.
8. English-speaking pilgrim usability with RM pricing.

### 28.3 Anti-Generic Constraints

Avoid generic SaaS landing page patterns:

1. Oversized abstract hero.
2. Meaningless gradient blobs.
3. Generic "trusted by" logos.
4. Empty feature cards.
5. Random icons without product data.
6. Vague CTA like "Get Started".
7. Decorative sections without booking utility.
8. Generic testimonial blocks with no package/travel context.
9. Large feature grids that do not help users search, compare, trust, learn, or book.

Every homepage section must answer at least one of these user needs:

| Need | Valid Section Purpose |
| --- | --- |
| Search | Hero search, category tabs, package filters |
| Compare | Package cards, pricing, hotel class, duration, rating |
| Trust | Verified agency, booking safety, testimonials, support |
| Learn | Guide content, FAQ, preparation articles |
| Book | Package detail CTA, login/register gate, booking safety explanation |

### 28.4 Required Realistic Package Content

Package cards must use realistic content, not placeholders.

Required package card data:

1. Package name.
2. Travel agency.
3. Verified agency badge.
4. Hotel class.
5. Departure month.
6. Duration.
7. Seats left.
8. Rating.
9. Original price.
10. Promo price.
11. Airline if available.
12. Departure city if available.
13. Package category chip.
14. CTA.

Example card content:

| Field | Example |
| --- | --- |
| Package name | Regular Umrah 12 Days - Makkah & Madinah |
| Travel agency | Al Safwa Travel |
| Badge | Verified Agency |
| Hotel class | Hotel 4 Star |
| Departure | September 2026 |
| Duration | 12 days |
| Seats left | 8 seats left |
| Rating | 4.8 / 5 |
| Original price | RM 8,490 |
| Promo price | RM 7,890 |
| CTA | View Details |

### 28.5 Design Critique Loop

After the first UI output, the AI must review its own design as a Design Director.

Prompt:

```text
This design still feels generic.

Review it as a Design Director.

Identify:
1. Which parts feel generic
2. Why they feel generic
3. What visual decisions are too safe
4. What product-specific details are missing
5. How to make it feel more like UmrahHaji.com and less like a template

Then redesign it with stronger identity.
```

### 28.6 Final Redesign Prompt

Use this prompt when the output still looks like a generic landing page:

```text
Redesign this homepage so it no longer feels like a generic landing page.

Make it feel specifically built for an Umrah/Hajj package marketplace.

Prioritize:
- package discovery
- verified travel agency trust
- clear booking comparison
- mobile-first browsing
- spiritual warmth
- English-speaking pilgrim usability

Add product-specific UI details:
- verified agency badge
- departure month
- hotel class
- airline
- seats left
- promo badge
- package category chips
- booking safety explanation
- guide content
- login gate behavior

Avoid vague marketing sections.
Every section must help users search, compare, trust, learn, or book.
```

### 28.7 AI Output Acceptance Criteria

Reject the UI output if:

1. The hero looks like a generic SaaS hero.
2. Package cards do not contain realistic travel data.
3. CTAs are vague.
4. Trust sections are only icon cards.
5. The design could be reused for a non-travel product with minimal changes.
6. Mobile homepage does not prioritize package discovery.
7. The design uses decorative visuals more than functional booking content.

Accept the UI output only if:

1. Users can search packages immediately.
2. Users can compare packages from card metadata.
3. Users understand why agencies are trusted.
4. Users know what requires login.
5. The design feels specific to Umrah/Hajj and English-speaking pilgrims.
6. The visual system uses primary `#0694A2` and secondary `#C27803` intentionally.

---

## 29. Design QA Checklist

1. Is homepage usable without login?
2. Is package search immediately visible on mobile?
3. Are package cards readable and not clipped?
4. Are only published/approved items displayed?
5. Are trust stats approved or clearly sourced?
6. Are testimonials approved and privacy-safe?
7. Are CTAs clear for guest vs logged-in user?
8. Does bottom nav avoid covering CTAs?
9. Are images optimized and stable?
10. Are FAQ, carousel, nav, and forms accessible?
11. Are public pages reachable from footer/menu?
12. Does the design avoid becoming a dense dashboard?
13. Does the design avoid generic SaaS homepage patterns?
14. Does every section help users search, compare, trust, learn, or book?
15. Do package cards include realistic domain-specific travel data?

---

## 30. Final Design Decision

The JUV homepage should be designed as a mobile-first public discovery page that combines package search, package promotion, trust-building, education, testimonial proof, FAQ, public contact, and legal links.

It should be polished and warm, but every visible section must remain grounded in source modules: Package Management, Travel Agency Management, Articles Management, Testimonial Management, Admin content/settings, and Auth/User Management.

The accepted homepage direction is `Modern Pilgrimage Marketplace`: search-first, package-data-heavy, verified-agency-led, mobile-first, warm, English-first, RM-priced, and specific to Umrah/Hajj discovery.
