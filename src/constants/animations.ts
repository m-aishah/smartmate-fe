
export const ANIMATION_DELAYS = {
  card1: "0.1s",
  card2: "0.2s", 
  card3: "0.3s",
  card4: "0.4s",
  card5: "0.5s",
} as const;

export const ANIMATION_DURATIONS = {
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
} as const;

export const ANIMATION_EASINGS = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
} as const;
