import { createClient } from "@insforge/sdk";

let client: ReturnType<typeof createClient> | null = null;

export function getInsForge() {
  if (!client) {
    const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
    const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;
    if (!baseUrl || !anonKey) return null;
    try {
      client = createClient({ baseUrl, anonKey });
    } catch {
      return null;
    }
  }
  return client;
}
