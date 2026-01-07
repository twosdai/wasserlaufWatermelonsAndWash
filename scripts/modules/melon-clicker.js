import { addScore } from "../state/store.js";

let audioContext = null;
const melonSize = 80;
const initialMelonCount = 4;
const maxMelonCount = 10;
const spawnIntervalMs = 700;

function playPop() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(520, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    180,
    audioContext.currentTime + 0.08
  );

  gain.gain.setValueAtTime(0.2, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.08
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.09);
}

function randomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function assignMelonPath(melon, box) {
  const bounds = box.getBoundingClientRect();
  const maxX = Math.max(0, Math.floor(bounds.width - melonSize));
  const maxY = Math.max(0, Math.floor(bounds.height - melonSize));

  const startX = randomInt(maxX);
  const startY = randomInt(maxY);
  const quarterX = randomInt(maxX);
  const quarterY = randomInt(maxY);
  const midX = randomInt(maxX);
  const midY = randomInt(maxY);
  const threeQuarterX = randomInt(maxX);
  const threeQuarterY = randomInt(maxY);

  const duration = (6 + Math.random() * 4).toFixed(2);
  const delay = (Math.random() * 2).toFixed(2);

  melon.style.setProperty("--start-x", `${startX}px`);
  melon.style.setProperty("--start-y", `${startY}px`);
  melon.style.setProperty("--quarter-x", `${quarterX}px`);
  melon.style.setProperty("--quarter-y", `${quarterY}px`);
  melon.style.setProperty("--mid-x", `${midX}px`);
  melon.style.setProperty("--mid-y", `${midY}px`);
  melon.style.setProperty("--three-quarter-x", `${threeQuarterX}px`);
  melon.style.setProperty("--three-quarter-y", `${threeQuarterY}px`);
  melon.style.setProperty("--end-x", `${startX}px`);
  melon.style.setProperty("--end-y", `${startY}px`);
  melon.style.setProperty("--melon-duration", `${duration}s`);
  melon.style.setProperty("--melon-delay", `${delay}s`);
}

function createMelon(box) {
  const melon = document.createElement("img");
  melon.src = "https://i.imgur.com/uGpvvh6.jpeg";
  melon.alt = "Floating melon";
  melon.className = "melon";
  melon.dataset.melon = "";
  assignMelonPath(melon, box);
  return melon;
}

function wireMelon(melon) {
  melon.addEventListener("click", (event) => {
    if (melon.dataset.popped) {
      return;
    }
    melon.dataset.popped = "true";

    const box = melon.closest("[data-melon-box]");
    if (box) {
      const boxRect = box.getBoundingClientRect();
      const clickX = event.clientX - boxRect.left;
      const clickY = event.clientY - boxRect.top;
      createSplash(box, clickX, clickY);
    }

    playPop();
    addScore(1);
    melon.remove();
  });
}

export function initMelonClicker() {
  const box = document.querySelector("[data-melon-box]");
  if (!box) {
    return;
  }

  const initialMelons = Array.from(box.querySelectorAll("[data-melon]"));
  initialMelons.forEach((melon) => {
    assignMelonPath(melon, box);
    wireMelon(melon);
  });

  if (initialMelons.length < initialMelonCount) {
    for (let i = initialMelons.length; i < initialMelonCount; i += 1) {
      const melon = createMelon(box);
      wireMelon(melon);
      box.appendChild(melon);
    }
  }

  setInterval(() => {
    const currentCount = box.querySelectorAll("[data-melon]").length;
    if (currentCount >= maxMelonCount) {
      return;
    }

    const melon = createMelon(box);
    wireMelon(melon);
    box.appendChild(melon);
  }, spawnIntervalMs);

  window.addEventListener("resize", () => {
    box.querySelectorAll("[data-melon]").forEach((melon) => {
      assignMelonPath(melon, box);
    });
  });
}

function createSplash(box, x, y) {
  const splash = document.createElement("div");
  splash.className = "melon-splash";
  splash.style.left = `${x}px`;
  splash.style.top = `${y}px`;

  const seedCount = 8 + randomInt(4);
  for (let i = 0; i < seedCount; i += 1) {
    const seed = document.createElement("span");
    seed.className = "seed";
    const distance = 40 + randomInt(50);
    const angle = Math.random() * Math.PI * 2;
    const seedX = Math.cos(angle) * distance;
    const seedY = Math.sin(angle) * distance;
    const rotation = Math.round((Math.random() - 0.5) * 120);
    seed.style.setProperty("--seed-x", `${seedX}px`);
    seed.style.setProperty("--seed-y", `${seedY}px`);
    seed.style.setProperty("--seed-rot", `${rotation}deg`);
    splash.appendChild(seed);
  }

  box.appendChild(splash);
  splash.addEventListener(
    "animationend",
    () => {
      splash.remove();
    },
    { once: true }
  );
}
