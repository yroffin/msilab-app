import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getFullList, collection } = vi.hoisted(() => {
  const getFullList = vi.fn();
  const collection = vi.fn(() => ({ getFullList }));

  return { getFullList, collection };
});

vi.mock('./client', () => ({
  pocketBaseClient: {
    collection
  }
}));

import { PocketBaseNewsRepository } from './news-repository';

describe('PocketBaseNewsRepository', () => {
  beforeEach(() => {
    collection.mockClear();
    getFullList.mockReset();
  });

  it('maps news records from the news collection', async () => {
    getFullList.mockResolvedValue([
      { id: 'n1', title: 'Hello', created: '2026-07-13', updated: '2026-07-13' }
    ]);

    const repository = new PocketBaseNewsRepository();
    const result = await repository.listPublicNews();

    expect(collection).toHaveBeenCalledWith('news');
    expect(result).toEqual([
      { id: 'n1', title: 'Hello', created: '2026-07-13', updated: '2026-07-13' }
    ]);
  });
});
