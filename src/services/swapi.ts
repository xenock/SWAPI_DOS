import { SwapiCategory, SwapiEntity, SwapiListResponse, DatFileEntry } from '../types/swapi';

export class SwapiClient {
  private baseUrls: string[];
  private cache: Map<string, any>;

  constructor(customUrls?: string[]) {
    this.baseUrls = customUrls || [
      'https://swapi.py4e.com/api/',
      'https://swapi.dev/api/'
    ];
    this.cache = new Map<string, any>();
  }

  public getCacheSize(): number {
    return this.cache.size;
  }

  public clearCache(): void {
    this.cache.clear();
  }

  private async fetchWithMirrorFallback<T>(path: string): Promise<T> {
    const cacheKey = path.toLowerCase();
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as T;
    }

    let lastError: Error | null = null;
    for (const baseUrl of this.baseUrls) {
      try {
        const fullUrl = path.startsWith('http') ? path : `${baseUrl}${path.replace(/^\//, '')}`;
        const response = await fetch(fullUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        this.cache.set(cacheKey, data);
        return data as T;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
      }
    }

    throw lastError || new Error('Failed to fetch from all SWAPI mirror endpoints');
  }

  public async getCategoryList(category: SwapiCategory, page: number = 1): Promise<SwapiListResponse<SwapiEntity>> {
    return this.fetchWithMirrorFallback<SwapiListResponse<SwapiEntity>>(`${category}/?page=${page}`);
  }

  public async searchEntities(category: SwapiCategory, query: string): Promise<SwapiListResponse<SwapiEntity>> {
    return this.fetchWithMirrorFallback<SwapiListResponse<SwapiEntity>>(`${category}/?search=${encodeURIComponent(query)}`);
  }

  public async getEntityByUrl<T extends SwapiEntity>(url: string): Promise<T> {
    return this.fetchWithMirrorFallback<T>(url);
  }

  public formatAsDatEntries(category: SwapiCategory, entities: SwapiEntity[]): DatFileEntry[] {
    return entities.map((item, index) => {
      const displayName = 'name' in item ? item.name : 'title' in item ? item.title : `RECORD_${index + 1}`;
      const safeName = displayName.toUpperCase().replace(/[^A-Z0-9]/g, '_').substring(0, 18);
      const filename = `${String(index + 1).padStart(3, '0')}_${safeName}.DAT`;
      const jsonSize = (JSON.stringify(item).length / 1024).toFixed(2);

      return {
        filename,
        name: displayName,
        sizeKb: `${jsonSize} KB`,
        category,
        data: item
      };
    });
  }
}

export const swapiClient = new SwapiClient();
