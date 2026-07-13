import type { News } from '../news';

export interface NewsRepositoryPort {
  listPublicNews(): Promise<News[]>;
}
