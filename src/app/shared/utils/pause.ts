export const pause = (delay = 100) =>
  new Promise((resolve) => setTimeout(resolve, delay));
