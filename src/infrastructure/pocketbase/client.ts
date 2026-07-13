import PocketBase from 'pocketbase';

export function resolvePocketBaseUrl(rawUrl: string | undefined): string {
  const baseUrl = rawUrl?.trim();
  if (baseUrl === undefined || baseUrl === '') {
    throw new Error(
      'Missing required configuration: VITE_POCKETBASE_URL must be provided.'
    );
  }

  try {
    // Use the platform URL parser to reject malformed values early.
    new URL(baseUrl);
  } catch {
    throw new Error(
      `Invalid configuration: VITE_POCKETBASE_URL is not a valid URL (received: ${baseUrl}).`
    );
  }

  return baseUrl;
}

export function createPocketBaseClient(baseUrl: string): PocketBase {
  return new PocketBase(baseUrl);
}

const baseUrl = resolvePocketBaseUrl(import.meta.env.VITE_POCKETBASE_URL);

export const pocketBaseClient = createPocketBaseClient(baseUrl);
