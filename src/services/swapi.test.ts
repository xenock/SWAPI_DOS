import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SwapiClient } from './swapi';
import { SwapiPlanet, SwapiStarship } from '../types/swapi';

describe('SwapiClient', () => {
  let client: SwapiClient;

  beforeEach(() => {
    client = new SwapiClient(['https://mirror1.com/api/', 'https://mirror2.com/api/']);
    vi.restoreAllMocks();
  });

  it('formats entities into DOS .DAT entries correctly', () => {
    const mockEntities = [
      { name: 'Luke Skywalker', height: '172' } as any,
      { title: 'A New Hope', episode_id: 4 } as any
    ];

    const datEntries = client.formatAsDatEntries('people', mockEntities);

    expect(datEntries.length).toBe(2);
    expect(datEntries[0].filename).toBe('001_LUKE_SKYWALKER.DAT');
    expect(datEntries[0].category).toBe('people');
    expect(datEntries[1].filename).toBe('002_A_NEW_HOPE.DAT');
  });

  it('uses memory cache for duplicate network requests', async () => {
    const mockResponse = { count: 1, next: null, previous: null, results: [{ name: 'Tatooine' }] };
    
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    }) as any;

    const res1 = await client.getCategoryList('planets', 1);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect((res1.results[0] as SwapiPlanet).name).toBe('Tatooine');

    // Second call should hit cache and NOT invoke fetch again
    const res2 = await client.getCategoryList('planets', 1);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect((res2.results[0] as SwapiPlanet).name).toBe('Tatooine');
    expect(client.getCacheSize()).toBe(1);
  });

  it('fails over to secondary mirror URL if primary mirror fails', async () => {
    const mockSuccessResponse = { count: 1, next: null, previous: null, results: [{ name: 'X-Wing' }] };

    globalThis.fetch = vi.fn()
      .mockRejectedValueOnce(new Error('Network failure on primary mirror'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuccessResponse,
      }) as any;

    const result = await client.getCategoryList('starships', 1);

    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    expect((result.results[0] as SwapiStarship).name).toBe('X-Wing');
  });
});
