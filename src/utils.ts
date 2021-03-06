// NOTE: As this is a "server bot",
// we don't avoid logging on production, as users will be able
// to see logs from their individual instances
export function error(...args: string[]): void {
  console.error(`${Date.now()}:`, ...args);
}
export function log(...args: string[]): void {
  console.log(`${Date.now()}:`, ...args);
}

const Warned = new Map();
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function warnOnce(domain, ...args) {
  if (!Warned.get(domain)) {
    Warned.set(domain, true);
    console.warn(`${Date.now()}:`, ...args);
  }
}
