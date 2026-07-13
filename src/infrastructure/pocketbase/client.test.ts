import PocketBase from 'pocketbase';
import { describe, expect, it } from 'vitest';
import { createPocketBaseClient, resolvePocketBaseUrl } from './client';

describe('resolvePocketBaseUrl', () => {
  it('returns the provided URL as-is when valid', () => {
    expect(resolvePocketBaseUrl('https://pb.example.test')).toBe(
      'https://pb.example.test'
    );
  });

  it('throws an explicit error when URL is missing', () => {
    expect(() => resolvePocketBaseUrl(undefined)).toThrow(
      'Missing required configuration: VITE_POCKETBASE_URL must be provided.'
    );
    expect(() => resolvePocketBaseUrl('   ')).toThrow(
      'Missing required configuration: VITE_POCKETBASE_URL must be provided.'
    );
  });

  it('throws an explicit error when URL is invalid', () => {
    expect(() => resolvePocketBaseUrl('not-a-url')).toThrow(
      'Invalid configuration: VITE_POCKETBASE_URL is not a valid URL (received: not-a-url).'
    );
  });
});

describe('createPocketBaseClient', () => {
  it('creates a PocketBase client for a valid URL', () => {
    const client = createPocketBaseClient('https://pb.example.test');
    expect(client).toBeInstanceOf(PocketBase);
  });
});
