export const logger = {
  log(...args: any[]) {
    const timeStamp = new Date().toISOString();
    console.log(`[${timeStamp}]:`, ...args);
  },
  error(...args: any[]) {
    const timeStamp = new Date().toISOString();
    console.error(`[${timeStamp}]:`, ...args);
  },
} as Console;
