import { useEffect, useState } from 'react';
import type { ContentsProps } from '../../domain/contents';
import { useListPublicContents } from '../providers/public-contents-provider';


interface UsePublicContentsState {
  content: ContentsProps | undefined;
  isLoading: boolean;
  error: string | null;
}

const CACHE_KEY = 'public-contents-cache';

export function usePublicContents(): UsePublicContentsState {
  const listPublicContents = useListPublicContents();
  const [state, setState] = useState<UsePublicContentsState>({
    content: undefined,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached !== null) {
      try {
        const parsed = JSON.parse(cached) as ContentsProps;
        setState({ content: parsed, isLoading: true, error: null });
      } catch {
        localStorage.removeItem(CACHE_KEY);
      }
    }

    let isCancelled = false;

    listPublicContents()
      .then((content) => {
        if (isCancelled) {
          return;
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(content));
        setState({ content: content, isLoading: false, error: null });
      })
      .catch((error: unknown) => {
        if (isCancelled) {
          return;
        }
        setState((current) => ({
          content: current.content,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }));
      });

    return () => {
      isCancelled = true;
    };
  }, [listPublicContents]);

  return state;
}
