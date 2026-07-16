import type { Contents } from '../../domain/contents';
import type { ContentsRepositoryPort } from '../../domain/ports/contents-repository-port';

export class ListPublicNewsError extends Error {
  constructor(message = 'Unable to load public news') {
    super(message);
    this.name = 'ListPublicNewsError';
  }
}

export async function listPublicNews(
  repository: ContentsRepositoryPort
): Promise<Contents[]> {
  try {
    return await repository.listPublicContents("news");
  } catch (error) {
    throw new ListPublicNewsError(
      error instanceof Error ? error.message : 'Unknown PocketBase error'
    );
  }
}
