/**
 * Delays the program loop for the given amount of milliseconds
 */
export const delay = (ms: number): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, ms));
