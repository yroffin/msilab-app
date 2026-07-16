import type { ContentsProps } from '../../domain/contents';
import type { ContentsRepositoryPort } from '../../domain/ports/contents-repository-port';

export class ListPublicContentsError extends Error {
  constructor(message = 'Unable to load public contents') {
    super(message);
    this.name = 'ListPublicContentsError';
  }
}

export async function listPublicContents(
  repository: ContentsRepositoryPort
): Promise<ContentsProps> {
  try {
    let aPropos = await repository.getPublicContents("apropos");
    let contactUs = await repository.getPublicContents("contact");
    let legal = await repository.getPublicContents("legal");
    return {
      aPropos: aPropos,
      contactUs: contactUs,
      legal : legal
    }
  } catch (error) {
    throw new ListPublicContentsError(
      error instanceof Error ? error.message : 'Unknown PocketBase error'
    );
  }
}
