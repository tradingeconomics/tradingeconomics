export function isMockEnabled(): boolean {
  return process.env.USE_MOCK === "true";
}
