import { onScoreChange } from "../state/store.js";

export function initScore() {
  const scoreDisplays = document.querySelectorAll("[data-score]");
  if (scoreDisplays.length === 0) {
    return;
  }

  onScoreChange((score) => {
    scoreDisplays.forEach((display) => {
      display.textContent = `${score} pops`;
    });
  });
}
