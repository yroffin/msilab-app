import type { Settings } from '../settings';

export interface SettingsRepositoryPort {
  getSettings(id: string): Promise<Settings>;
}
