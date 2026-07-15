import { createContext, type ReactNode, useContext } from 'react';
import { ContentsProps } from '../../domain/contents';

type ListPublicContentsUseCase = () => Promise<ContentsProps>;

const PublicContentsContext = createContext<ListPublicContentsUseCase | null>(null);

export function PublicContentsProvider({
  children,
  listPublicContents
}: {
  children: ReactNode;
  listPublicContents: ListPublicContentsUseCase;
}) {
  return (
    <PublicContentsContext.Provider value={listPublicContents}>
      {children}
    </PublicContentsContext.Provider>
  );
}

export function useListPublicContents(): ListPublicContentsUseCase {
  const context = useContext(PublicContentsContext);
  if (context === null) {
    throw new Error('PublicContentsProvider is missing');
  }
  return context;
}
