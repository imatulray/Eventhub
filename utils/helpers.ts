export function randomString(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

export function randomEmail(): string {
  return `test_${randomString(6)}@example.com`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}
