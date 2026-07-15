import { createContext, type ReactNode, useContext } from 'react';
import type { ContentsRepositoryPort } from '../../domain/ports/news-repository-port';
import { PocketBaseContentsRepository } from '../../infrastructure/pocketbase/contents-repository';

const NewsRepositoryContext = createContext<ContentsRepositoryPort | null>(null);

const repository = new PocketBaseContentsRepository();

export function NewsRepositoryProvider({
  children
}: {
  children: ReactNode;
}) {
  return (
    <NewsRepositoryContext.Provider value={repository}>
      {children}
    </NewsRepositoryContext.Provider>
  );
}

export function useNewsRepository(): ContentsRepositoryPort {
  const context = useContext(NewsRepositoryContext);
  if (context === null) {
    throw new Error('NewsRepositoryProvider is missing');
  }
  return context;
}
