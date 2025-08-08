import { randomBytes } from "node:crypto";

/**
 * Generates a new API key with the format unstage_{random_string}
 * @returns A new API key string
 */
export function generateApiKey(): string {
  // Generate 32 random bytes and convert to hex
  const randomString = randomBytes(32).toString("hex");
  return `unstage_${randomString}`;
}

/**
 * Validates if a string is a valid API key format
 * @param key The key to validate
 * @returns True if the key starts with 'unstage_' and has the correct length
 */
export function isValidApiKeyFormat(key: string): boolean {
  return key.startsWith("unstage_") && key.length === 72; // unstage_ (8) + 64 hex chars
}
