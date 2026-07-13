import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { ReactNode } from 'react';
import { PublicNewsProvider } from '../providers/public-news-provider';
import { usePublicNews } from './use-public-news';

afterEach(() => {
  localStorage.clear();
});

describe('usePublicNews', () => {
  it('loads items through the use-case provider', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <PublicNewsProvider
        listPublicNews={async () => [
          { id: '1', title: 'Loaded news', created: '2026-07-13', updated: '2026-07-13' }
        ]}
      >
        {children}
      </PublicNewsProvider>
    );

    const { result } = renderHook(() => usePublicNews(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.items[0]?.title).toBe('Loaded news');
  });

  it('preserves cached items when loading fails', async () => {
    localStorage.setItem(
      'public-news-cache',
      JSON.stringify([{ id: '1', title: 'Cached', created: '2026-07-13', updated: '2026-07-13' }])
    );

    const wrapper = ({ children }: { children: ReactNode }) => (
      <PublicNewsProvider listPublicNews={async () => { throw new Error('offline'); }}>
        {children}
      </PublicNewsProvider>
    );

    const { result } = renderHook(() => usePublicNews(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.items[0]?.title).toBe('Cached');
    expect(result.current.error).toBe('offline');
  });
});
