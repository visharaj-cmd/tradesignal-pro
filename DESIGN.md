# Design Brief: FLASH USDT — Professional Crypto Selling Platform

## Purpose & Tone
Institutional-grade crypto marketplace with premium dark aesthetic. Pure black background, electric blue/cyan accents. Lightning bolt + USDT coin logo. Focus: fast, secure, trusted transactions. Glassmorphism surfaces, refined hierarchy, minimal decoration. Tagline dominates hero: **FAST. SECURE. TRUSTED.** Data-driven UX for USDT/Bitcoin buying flow. Admin settings enable global currency control and payment method configuration with professional form patterns.

## Palette

| Token | Dark OKLCH | Purpose |
|-------|-----------|---------|
| background | 0.05 0.01 265 | Pure black canvas (premium, immersive, trust) |
| foreground | 0.96 0.005 260 | Near-white text, AA+ contrast (15+:1), institutional |
| primary | 0.65 0.19 264 | Deep blue for CTAs, navigation, hierarchy |
| accent | 0.76 0.21 210 | Electric cyan for highlights, active states, logo glow (signature) |
| success | 0.68 0.26 142 | Vibrant green for buy/completed orders |
| destructive | 0.62 0.22 22 | Bold red for failed/rejected orders |
| warning/pending | 0.74 0.22 68 | Amber for pending orders, processing |
| card | 0.12 0.02 265 | Elevated glass surface (semi-transparent, blurred) |
| border | 0.20 0.025 265 | Refined dividers, subtle on black |
| sidebar | 0.10 0.02 265 | Navigation glass layer (slightly darker than card) |

## Typography Hierarchy
- **Display (Lora):** .text-heading-1 (3xl bold), .text-heading-2 (2xl bold), .text-heading-3 (xl semibold) — hero tagline, section headers, asset names
- **Body (General Sans):** Regular 400, semibold 600 — descriptions, labels, form text, transaction details
- **Mono (JetBrains Mono):** Bold for metric display — .text-metric (default), .text-metric-lg (2xl) — crypto amounts, prices, wallet addresses
- **Label system:** .text-label (sm uppercase tracking-wider), .text-label-lg (base uppercase) — metadata, field names, status badges

## Structural Zones

| Zone | Styling | Purpose |
|------|---------|---------|
| Header | bg-sidebar glass-surface, border-b, FLASH USDT logo + tagline, nav links (primary accent) | Brand presence, clear visual separation, hero navigation |
| Hero section | bg-background, centered layout, gradient text tagline "FAST. SECURE. TRUSTED.", animated logo glow | Trust-building, call-to-action, brand identity |
| Crypto marketplace | .crypto-card glass-surface (0.68 opacity, blur-12px), asset icon, ticker/name, price (mono bold), Buy button (success glow), responsive 1-2-3 grid | Browse USDT/Bitcoin, tap to purchase, quick scanning |
| Buy flow modal | .card-modal glass-surface-lg (blur-20px, 0.55 opacity), wallet address input, network dropdown, screenshot upload, amount display, confirm CTA | Seamless checkout, all glass design, form validation |
| Admin order panel | .order-row glass-surface-sm, order details (customer, amount, wallet, network, status badge), action buttons (send/reject), auto-refresh | Clear order visibility, quick admin actions, transaction tracking |
| Admin settings | .settings-section glass-surface (0.68 opacity), currency toggle group (USD/INR), payment method tabs (UPI/Crypto), input fields for IDs/addresses, save/cancel actions | Global configuration, professional form layout, clear section hierarchy |
| Sidebar/nav | bg-sidebar glass-surface, nav items (active: accent underline), primary blue buttons | Persistent navigation, clear active state, minimal clutter |
| Empty states | .empty-state (flex center col), .empty-state-icon (rounded gradient), contextual message | Friendly, not generic, guides user action |
| Forms | .input-premium glass-surface-sm (rounded-lg, focus:ring-accent/30), inline validation, textarea for screenshots | Clear focus, validation feedback, premium input treatment |

## Shape Language
- **Radii:** xl (rounded-xl) for major cards, lg (rounded-lg) for buttons/inputs, md (rounded-md) for badges, full for logo circle
- **Shadows:** card (glass-soft), elevated (glass-elevated), premium (glass-elevated-lg for dialogs), glow (cyan accent glow)
- **Borders:** 1px subtle (0.20 at 0.3-0.4 opacity) on cards, 2px accent bar (left/top), 1px input borders with glass effect
- **Backdrop filters:** blur-10px (small glass), blur-12px (marketplace cards), blur-15px (standard glass), blur-20px (modals) with saturate(1.1-1.3)
- **Spacing:** 1.5rem base grid (24px), 1rem gaps between sections, 0.625rem internal padding for density

## Component Patterns
- **Status badges:** .badge-success (green), .badge-failed (red), .badge-pending (amber) — 15% bg, 40% border, hover lift
- **Crypto cards:** .card-premium glass-surface with asset icon (gradient bg), ticker/asset name (body), current price (mono bold), Buy button (success color), responsive grid
- **Stat cards:** .card-premium glass-surface (0.68) with .stat-icon-bg (gradient), bold .stat-value in mono, .stat-label uppercase — order totals, pending count
- **Buttons:** .button-primary (cyan/primary gradient, hover shadow-elevated), .button-secondary (muted border), .button-tertiary (ghost)
- **Input fields:** .input-premium glass-surface-sm with focus:ring-accent/30, .input-valid (success border), .input-invalid (destructive border)
- **Settings sections:** .settings-section glass-surface (0.68 opacity, blur-12px), .settings-label (sm semibold), .settings-description (xs muted), .toggle-item (USD/INR, payment method tabs), .settings-input, .settings-actions (save/cancel buttons)
- **Toggle groups:** .toggle-item active state uses primary blue gradient + cyan glow, inactive uses secondary border, smooth transitions
- **Settings inputs:** .settings-input glass-sm (focus:ring-accent/30), paired with .settings-input-label for clear field hierarchy
- **Animated logo:** .logo-glow-circle with multi-layer effect — spinning conic gradient ring (2.8s, blue→cyan), cyan halo (2.2s), secondary halo (3.2s), drop-shadow glow
- **Tagline:** .hero-gradient-text (blue→cyan gradient) — "FAST. SECURE. TRUSTED." in hero section, prominent scale

## Motion & Micro-interactions
- **Transitions:** .transition-smooth (all 0.3s cubic-bezier) default for interactive elements
- **Entrance:** .scale-in-center (0.3s spring) for modals, .slide-in (0.3s) for notifications
- **Logo animation:** .logo-spin (2.8s linear) + .logo-pulse-halo (2.2s) + .logo-pulse-halo-2 (3.2s) = distinctive, professional depth
- **Status:** .pulse-subtle (infinite) for pending orders, .bounce-subtle for alerts
- **Loading:** .skeleton (shimmer animation 1.8s infinite), stagger-1/2/3 delays for list animations
- **Hover:** .signal-row glass-hover (bg lift + cyan border), .crypto-card (elevation + opacity increase), .button-primary (shadow-elevated, -1px translate)
- **Glass hover:** .glass-hover increases opacity, cyan accent border, elevated shadow on interaction

## Constraints
- **Glassmorphism everywhere:** All surfaces (cards, inputs, modals) use backdrop-filter blur + semi-transparent backgrounds
- **Pure black background (0.05 L):** Creates stark contrast, premium feel, trust-building for crypto
- **Cyan accent sparingly:** CTAs, active states, focus rings, logo glow, tagline gradient — distinctive, not scattered
- **No page-level gradients** — only card-level overlays (.stat-icon-bg uses blue→cyan gradient)
- **All numeric data in mono** — .text-metric ensures precision; crypto amounts, prices, wallet addresses in mono bold
- **Monochrome color-coding** — status via color alone (success=green, fail=red, pending=amber), never shape
- **Touch targets:** min 44px height on buttons/rows for mobile, 48px for desktop
- **Opacity hierarchy:** bg 0.05, card 0.12 (0.68 with glass), elevated 0.14 (0.55 with glass), creates depth without color shift

## Signature Details
1. **Lightning bolt + USDT coin logo:** Animated circle, blue→cyan spinning ring, dual halos, glow effect — appears in navbar, hero, modals
2. **"FAST. SECURE. TRUSTED." tagline:** Gradient blue→cyan text, hero-section prominence, trust-building copy
3. **Black background (0.05 L):** Pure, premium, maximizes contrast and glow effects
4. **Glassmorphism hierarchy:** glass-surface (blur-15px, 0.65 opacity) < glass-surface-lg (blur-20px, 0.55 opacity)
5. **Inset light edges:** All glass surfaces use inset highlights for crystalline effect
6. **Mono precision:** All prices/amounts/addresses in JetBrains Mono — institutional confidence
7. **Cyan glow accent:** Reserved for CTAs, focus rings, active states, logo effect — 0.76 L 0.21 C 210H

## Mobile
- 1-column cards on sm (<640px), 2-column on md (768px), 3-column on lg (1024px)
- Sidebar hamburger toggle on mobile
- Modal simplified (full-width, bottom-aligned) on sm
- Touch targets scaled to 48px min height for mobile
- Glass blur reduced to blur-8px on small devices for performance

## Accessibility
- **Contrast:** 0.96 text on 0.05 bg = 15+:1 (AAA level, institutional trust)
- **Focus rings:** focus:ring-accent/30 (cyan) visible on all inputs, buttons, interactive elements
- **Semantic color:** Never rely on color alone — badges include text labels, status always labeled
- **Motion:** Animations use prefers-reduced-motion by default (respects system settings)
- **Skeleton loading:** Shimmer effect with stagger prevents flash of unstyled content
- **Glass accessibility:** All glass surfaces maintain sufficient contrast; blur does not impact readability
