import type { Contents } from '../../domain/contents';
import type { ContentsRepositoryPort } from '../../domain/ports/contents-repository-port';
import { pocketBaseClient } from './client';

interface PocketBaseContentsRecord {
  id: string;
  title: string;
  body: string;
  tag: string;
  created: string;
  updated: string;
}

export class PocketBaseContentsRepository implements ContentsRepositoryPort {
  async listPublicContents(tag: string): Promise<Contents[]> {
    const records = await pocketBaseClient
      .collection('contents')
      .getFullList<PocketBaseContentsRecord>({
        sort: '-created',
        filter: `tag='${tag}'`
      });

    return records.map((record) => ({
      id: record.id,
      title: record.title,
      body: record.body,
      tag: record.tag,
      created: record.created,
      updated: record.updated
    }));
  }
  async getPublicContents(id: string): Promise<Contents> {
    const record = await pocketBaseClient
      .collection('contents')
      .getOne<PocketBaseContentsRecord>(id);

    return {
      id: record.id,
      title: record.title,
      body: record.body,
      tag: record.tag,
      created: record.created,
      updated: record.updated
    };
  }
}
