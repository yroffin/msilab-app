import { createContext, type ReactNode, useContext } from 'react';
import type { News } from '../../domain/news';

type ListPublicNewsUseCase = () => Promise<News[]>;

const PublicNewsContext = createContext<ListPublicNewsUseCase | null>(null);

export function PublicNewsProvider({
  children,
  listPublicNews
}: {
  children: ReactNode;
  listPublicNews: ListPublicNewsUseCase;
}) {
  return (
    <PublicNewsContext.Provider value={listPublicNews}>
      {children}
    </PublicNewsContext.Provider>
  );
}

export function useListPublicNews(): ListPublicNewsUseCase {
  const context = useContext(PublicNewsContext);
  if (context === null) {
    throw new Error('PublicNewsProvider is missing');
  }
  return context;
}
