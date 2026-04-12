# Design Brief: TradeSignal Pro — Premium Fintech Elevation

## Purpose & Tone
Institutional fintech dashboard for professional traders. Premium elevation through refined layers, sophisticated micro-interactions, and bold typography hierarchy. Data-centric precision balanced with distinctive visual experience. Zero compromise on clarity — every decision serves both aesthetics and functionality.

## Palette

| Token | Dark OKLCH | Purpose |
|-------|-----------|---------|
| background | 0.11 0.02 265 | Deep navy canvas (immersive, calm, data-focused) |
| foreground | 0.94 0.01 260 | Bright text, AA+ contrast (12:1), max readability |
| primary | 0.72 0.19 220 | Rich indigo for CTAs, navigation, hierarchy |
| accent | 0.76 0.21 210 | Cyan highlights, sparingly for active/focus (signature) |
| success | 0.65 0.25 142 | Vibrant green for buy/success trades |
| destructive | 0.62 0.22 22 | Bold red for sell/failed trades |
| warning/pending | 0.72 0.22 68 | Amber for pending signals, expiring alerts |
| card | 0.155 0.026 265 | Elevated primary surface (1 step lighter than bg) |
| border | 0.24 0.03 265 | Refined dividers, subtle contrast |
| sidebar | 0.135 0.026 265 | Navigation layer (slightly darker than card) |

## Typography Hierarchy
- **Display (Space Grotesk):** .text-heading-1 (3xl bold), .text-heading-2 (2xl bold), .text-heading-3 (xl semibold) — navigation, section headers, stat titles
- **Body (Plus Jakarta Sans):** Regular 400, semibold 600 — description copy, labels, form text
- **Mono (JetBrains Mono):** Bold for metric display — .text-metric (default), .text-metric-lg (2xl) — prices, UTR, counts, trade amounts
- **Label system:** .text-label (sm uppercase tracking-wider), .text-label-lg (base uppercase) — metadata, field names

## Structural Zones

| Zone | Styling | Purpose |
|------|---------|---------|
| Header/Sidebar | bg-sidebar (0.135), border-b, primary accent actions, focus rings visible | Navigation tier, clear visual separation from content |
| Main content area | bg-background (0.11), card-grid layout with 1-2-3 col breakpoints | Clean canvas for signal cards & stat cards |
| Stat cards | .card-premium + .stat-icon-bg (gradient overlay), .stat-value, .stat-label | Metric display with icon-accent emphasis |
| Signal/trade rows | .signal-row (hover:bg-muted/15), inline action buttons, status badges | Scannable data rows with hover feedback |
| Modals/overlays | .card-modal (shadow-premium, backdrop-blur-xl), scale-in entrance | Premium depth, frosted glass effect |
| Empty states | .empty-state (flex center col), .empty-state-icon (rounded-full muted), contextual message | Friendly, not generic |
| Forms | .input-premium (rounded-lg, border-input, focus:ring-accent/30), inline validation states | Clear focus, validation feedback |

## Shape Language
- **Radii:** xl (rounded-xl) for major cards, lg (rounded-lg) for buttons/inputs, md (rounded-md) for badges
- **Shadows:** card (2px lift), elevated (4px lift), premium (8px lift for dialogs), glow (accent accent highlight)
- **Borders:** 1px subtle (0.24) on cards, 2px accent bar (left/top), 1px input borders
- **Spacing:** 1.5rem base grid (24px), 1rem gaps between sections, 0.625rem internal padding for density

## Component Patterns
- **Status badges:** .badge-buy (green), .badge-sell (red), .badge-success (green), .badge-failed (red), .badge-pending (amber) — 15% bg, 40% border, hover lift
- **Stat cards:** .card-premium with .stat-icon-bg (gradient indigo→cyan), bold .stat-value in mono, .stat-label uppercase
- **Subscription timer:** .timer-digit (mono bold 2xl), .timer-warning (amber) at <5min, .timer-critical (red) at <1min
- **Buttons:** .button-primary (accent bg, hover shadow-elevated), .button-secondary (muted border), .button-tertiary (ghost)
- **Input fields:** .input-premium with focus:ring-accent/30, .input-valid (success border), .input-invalid (destructive border)
- **Badge animations:** .pulse-subtle (2s infinite) for active subscriptions, .hover-lift for card elevation

## Motion & Micro-interactions
- **Transitions:** .transition-smooth (all 0.3s cubic-bezier) default for interactive elements
- **Entrance:** .scale-in-center (0.3s spring) for modals, .slide-in (0.3s) for notifications
- **Status:** .pulse-subtle (infinite) for verification badge, .bounce-subtle for timer warnings
- **Loading:** .skeleton (shimmer animation 1.8s infinite), stagger-1/2/3 delays for list animations
- **Hover:** .signal-row (hover:bg-muted/15), .stat-card (border→accent/40), .button-primary (shadow-elevated)

## Constraints
- **No page-level gradients** — only card-level overlays (.stat-icon-bg uses gradient for icon bg)
- **Minimal accent usage** — CTAs, active states, focus rings, stat card accents only
- **All numeric data in mono** — .text-metric ensures trading precision
- **Monochrome color-coding** — status via color alone (success=green, fail=red, pending=amber), never shape
- **Touch targets:** min 44px height on buttons/rows for mobile

## Signature Details
1. **Gradient icon backgrounds:** .stat-icon-bg (indigo→cyan gradient) for metric card icons — premium without overwhelming
2. **Frosted glass modals:** .card-modal (backdrop-blur-xl) for dialogs — modern fintech depth
3. **Refined shadow stack:** card < elevated < premium creates visual hierarchy without heavy drops
4. **Numeric precision:** All prices/counts/UTR in JetBrains Mono — institutional confidence
5. **Accent sparingly:** Cyan (0.76) reserved for CTAs, focus rings, active navigation — distinctive, not scattered

## Mobile
- 1-column cards on sm (<640px), 2-column on md (768px), 3-column on lg (1024px)
- Sidebar hamburger toggle on mobile
- Modal simplified (full-width, bottom-aligned) on sm
- Touch targets scaled to 48px min height for mobile

## Accessibility
- **Contrast:** 0.94 text on 0.11 bg = 12.4:1 (AAA level in dark mode)
- **Focus rings:** focus:ring-accent/30 (cyan) visible on all inputs, buttons, interactive elements
- **Semantic color:** Never rely on color alone — badges include text labels
- **Motion:** Animations use prefers-reduced-motion by default (respects system settings)
- **Skeleton loading:** Shimmer effect with stagger prevents flash of unstyled content
