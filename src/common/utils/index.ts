export const waitFor = (delay = 3000) => {
  return new Promise((resolve) => setTimeout(() => resolve(null), delay));
};
