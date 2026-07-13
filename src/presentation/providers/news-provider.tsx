import { createContext, type ReactNode, useContext } from 'react';
import type { NewsRepositoryPort } from '../../domain/ports/news-repository-port';
import { PocketBaseNewsRepository } from '../../infrastructure/pocketbase/news-repository';

const NewsRepositoryContext = createContext<NewsRepositoryPort | null>(null);

const repository = new PocketBaseNewsRepository();

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

export function useNewsRepository(): NewsRepositoryPort {
  const context = useContext(NewsRepositoryContext);
  if (context === null) {
    throw new Error('NewsRepositoryProvider is missing');
  }
  return context;
}
