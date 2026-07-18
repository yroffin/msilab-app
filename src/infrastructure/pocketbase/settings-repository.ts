import type { Settings } from '../../domain/settings';
import type { SettingsRepositoryPort } from '../../domain/ports/settings-repository-port';
import { pocketBaseClient } from './client';

interface PocketBaseSettingsRecord {
  id: string;
  data: any;
  created: string;
  updated: string;
}

export class PocketBaseSettingsRepository implements SettingsRepositoryPort {
  async getSettings(id: string): Promise<Settings> {
    const record = await pocketBaseClient
      .collection('settings')
      .getOne<PocketBaseSettingsRecord>(id);

    return {
      id: record.id,
      data: record.data,
      created: record.created,
      updated: record.updated
    };
  }

  async setSettings(data: Settings): Promise<Settings> {
    const record = await pocketBaseClient
      .collection('settings')
      .update<PocketBaseSettingsRecord>(data.id, data);

    return {
      id: record.id,
      data: record.data,
      created: record.created,
      updated: record.updated
    };
  }
}
