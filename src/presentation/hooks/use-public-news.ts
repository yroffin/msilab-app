import { useEffect, useState } from 'react';
import type { Contents } from '../../domain/contents';
import { useListPublicNews } from '../providers/public-news-provider';

interface UsePublicNewsState {
  items: Contents[];
  isLoading: boolean;
  error: string | null;
}

const CACHE_KEY = 'public-news-cache';

export function usePublicNews(): UsePublicNewsState {
  const listPublicNews = useListPublicNews();
  const [state, setState] = useState<UsePublicNewsState>({
    items: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached !== null) {
      try {
        const parsed = JSON.parse(cached) as Contents[];
        setState({ items: parsed, isLoading: true, error: null });
      } catch {
        localStorage.removeItem(CACHE_KEY);
      }
    }

    let isCancelled = false;

    listPublicNews()
      .then((items) => {
        if (isCancelled) {
          return;
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(items));
        setState({ items, isLoading: false, error: null });
      })
      .catch((error: unknown) => {
        if (isCancelled) {
          return;
        }
        setState((current) => ({
          items: current.items,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }));
      });

    return () => {
      isCancelled = true;
    };
  }, [listPublicNews]);

  return state;
}
