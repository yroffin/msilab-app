import type { Contents } from '../contents';

export interface ContentsRepositoryPort {
  listPublicContents(tag: string): Promise<Contents[]>;
  getPublicContents(id: string): Promise<Contents>;
}
