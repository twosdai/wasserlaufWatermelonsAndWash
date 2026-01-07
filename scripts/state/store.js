export const gameState = {
  score: 0,
  cart: [],
  upgrades: [],
  scoreListeners: [],
};

export function addScore(amount) {
  gameState.score += amount;
  gameState.scoreListeners.forEach((listener) => listener(gameState.score));
}

export function onScoreChange(listener) {
  gameState.scoreListeners.push(listener);
  listener(gameState.score);
}
