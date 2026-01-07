# AGENTS.md

## Repo summary
- Static whimsical site for Wasserlauf Watermelons & Wash.
- Pages: `index.html` (hero/video), `shop.html` (products), `about.html` (story).
- Shared styles live in `styles.css`; the JS entrypoint is `scripts/main.js`.
- Site is hosted via GitHub Pages; keep static hosting constraints in mind.
- `CNAME` is present for custom-domain hosting.

## JS module layout
- `scripts/main.js` is the module entrypoint; it calls feature initializers.
- `scripts/modules/` holds feature modules: `nav-links.js`, `melon-clicker.js`, `score.js`, `shop.js`.
- `scripts/state/store.js` is a shared state container for score/cart/upgrades.
- Prefer data-attribute hooks for new UI: `data-melon`, `data-score`, `data-shop`.

## Planned interactivity
- Melon clicking: own click targets and emit score changes.
- Score counter: render and persist score across pages.
- Basic shop: read item data, update cart, and reflect totals in UI.
