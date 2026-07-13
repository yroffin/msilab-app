import type { News } from '../../domain/news';
import type { NewsRepositoryPort } from '../../domain/ports/news-repository-port';

export class ListPublicNewsError extends Error {
  constructor(message = 'Unable to load public news') {
    super(message);
    this.name = 'ListPublicNewsError';
  }
}

export async function listPublicNews(
  repository: NewsRepositoryPort
): Promise<News[]> {
  try {
    return await repository.listPublicNews();
  } catch (error) {
    throw new ListPublicNewsError(
      error instanceof Error ? error.message : 'Unknown PocketBase error'
    );
  }
}
