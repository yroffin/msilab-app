import type { News } from '../../domain/news';
import type { NewsRepositoryPort } from '../../domain/ports/news-repository-port';
import { pocketBaseClient } from './client';

interface PocketBaseNewsRecord {
  id: string;
  title: string;
  created: string;
  updated: string;
}

export class PocketBaseNewsRepository implements NewsRepositoryPort {
  async listPublicNews(): Promise<News[]> {
    const records = await pocketBaseClient
      .collection('news')
      .getFullList<PocketBaseNewsRecord>({
        sort: '-created'
      });

    return records.map((record) => ({
      id: record.id,
      title: record.title,
      created: record.created,
      updated: record.updated
    }));
  }
}
