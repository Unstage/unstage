import { LRUCache } from "lru-cache";

// biome-ignore lint/suspicious/noExplicitAny: Generic cache can store any type
export const cache = new LRUCache<string, any>({
  max: 5_000, // up to 5k entries (adjust based on memory)
  ttl: 1000 * 60 * 30, // 30 minutes in milliseconds
});

const prefix = "user";

export const userCache = {
  get: (key: string) => cache.get(`${prefix}:${key}`),
  // biome-ignore lint/suspicious/noExplicitAny: Generic cache can store any type
  set: (key: string, value: any) => cache.set(`${prefix}:${key}`, value),
  delete: (key: string) => cache.delete(`${prefix}:${key}`),
};
