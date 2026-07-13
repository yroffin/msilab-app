import { describe, it, expect, vi, beforeAll } from 'vitest';

// Stub out the Workbox globals that sw.ts relies on at module level
// so we can import the constants without triggering the SW registration.
beforeAll(() => {
  // @ts-expect-error global stub
  globalThis.self = { __WB_MANIFEST: [], location: { origin: '' } };
});

vi.mock('workbox-core', () => ({ clientsClaim: vi.fn() }));
vi.mock('workbox-routing', () => ({ registerRoute: vi.fn() }));
vi.mock('workbox-precaching', () => ({
  precacheAndRoute: vi.fn(),
  createHandlerBoundToURL: vi.fn()
}));
vi.mock('workbox-strategies', () => ({
  CacheFirst: vi.fn(),
  NetworkOnly: vi.fn(),
  StaleWhileRevalidate: vi.fn()
}));

import { PRIVATE_PATHS, PUBLIC_PATHS } from '../infrastructure/sw/sw';

/**
 * Verifies that the Service Worker cache partitioning constants enforce the
 * required boundaries:
 *  - public paths are NOT blocked by PRIVATE_PATHS
 *  - member/private paths ARE blocked by PRIVATE_PATHS
 *
 * These tests run in jsdom; actual Workbox routing is not exercised here —
 * that is tested at build/e2e level. These unit tests guard the source-of-
 * truth path lists against accidental modifications.
 */

const isPrivate = (pathname: string) =>
  PRIVATE_PATHS.some((p) => pathname.startsWith(p));

describe('SW cache policy — PRIVATE_PATHS', () => {
  it('blocks /members/ navigation', () => {
    expect(isPrivate('/members/')).toBe(true);
    expect(isPrivate('/members/chat')).toBe(true);
  });

  it('blocks /api/auth/ endpoints', () => {
    expect(isPrivate('/api/auth/')).toBe(true);
    expect(isPrivate('/api/auth/token')).toBe(true);
  });

  it('blocks /api/chat/ endpoints', () => {
    expect(isPrivate('/api/chat/')).toBe(true);
    expect(isPrivate('/api/chat/rooms')).toBe(true);
  });

  it('blocks /api/sse/ endpoints', () => {
    expect(isPrivate('/api/sse/')).toBe(true);
    expect(isPrivate('/api/sse/events')).toBe(true);
  });

  it('blocks /api/private/ endpoints', () => {
    expect(isPrivate('/api/private/data')).toBe(true);
  });

  it('blocks /auth/ endpoints', () => {
    expect(isPrivate('/auth/callback')).toBe(true);
  });
});

describe('SW cache policy — PUBLIC_PATHS', () => {
  it('public paths are not in PRIVATE_PATHS', () => {
    for (const path of PUBLIC_PATHS) {
      expect(isPrivate(path)).toBe(false);
    }
  });

  it('root / is not blocked', () => {
    expect(isPrivate('/')).toBe(false);
  });

  it('public static assets are not blocked', () => {
    expect(isPrivate('/assets/index-abc123.js')).toBe(false);
    expect(isPrivate('/icons/icon.svg')).toBe(false);
  });
});
