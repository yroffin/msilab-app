import { describe, expect, it, vi } from 'vitest';
import type { ContentsRepositoryPort } from '../../domain/ports/news-repository-port';
import { ListPublicNewsError, listPublicNews } from './list-public-news';

describe('listPublicNews', () => {
  it('returns items from the repository', async () => {
    const repository: ContentsRepositoryPort = {
      listPublicNews: vi.fn().mockResolvedValue([
        { id: '1', title: 'News', created: '2026-07-13', updated: '2026-07-13' }
      ])
    };

    await expect(listPublicNews(repository)).resolves.toHaveLength(1);
  });

  it('wraps repository errors', async () => {
    const repository: ContentsRepositoryPort = {
      listPublicNews: vi.fn().mockRejectedValue(new Error('boom'))
    };

    await expect(listPublicNews(repository)).rejects.toBeInstanceOf(ListPublicNewsError);
  });
});
