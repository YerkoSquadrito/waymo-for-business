import '@testing-library/jest-dom/vitest';

// Node 25 + jsdom currently exposes a `localStorage` global without a fully
// functional setItem in some environments. Replace it with a typed in-memory
// shim so persisted Zustand stores work in tests.
class MemoryStorage implements Storage {
  private map = new Map<string, string>();
  get length() {
    return this.map.size;
  }
  key(index: number): string | null {
    return Array.from(this.map.keys())[index] ?? null;
  }
  getItem(key: string): string | null {
    return this.map.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.map.set(key, String(value));
  }
  removeItem(key: string): void {
    this.map.delete(key);
  }
  clear(): void {
    this.map.clear();
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  value: new MemoryStorage(),
  writable: false,
  configurable: true,
});
Object.defineProperty(globalThis, 'sessionStorage', {
  value: new MemoryStorage(),
  writable: false,
  configurable: true,
});
