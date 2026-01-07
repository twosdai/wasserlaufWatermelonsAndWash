import { initNavLinks } from "./modules/nav-links.js";
import { initMelonClicker } from "./modules/melon-clicker.js";
import { initScore } from "./modules/score.js";
import { initShop } from "./modules/shop.js";

document.addEventListener("DOMContentLoaded", () => {
  console.info("[main] DOM ready, initializing modules");
  initNavLinks();
  initMelonClicker();
  initScore();
  initShop();
});
  
