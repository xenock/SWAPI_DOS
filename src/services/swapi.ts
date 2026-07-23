import { SwapiCategory, SwapiEntity, SwapiListResponse, DatFileEntry } from '../types/swapi';

export class SwapiClient {
  private baseUrls: string[];
  private cache: Map<string, any>;
  private storagePrefix = 'swapi_cache_';
  private retroDelayMs = 180;

  constructor(customUrls?: string[], retroDelayMs: number = 180) {
    this.baseUrls = customUrls || [
      'https://swapi.py4e.com/api/',
      'https://swapi.dev/api/'
    ];
    this.cache = new Map<string, any>();
    this.retroDelayMs = retroDelayMs;
  }

  public getCacheSize(): number {
    let storageCount = 0;
    if (typeof window !== 'undefined' && window.localStorage) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.storagePrefix)) {
          storageCount++;
        }
      }
    }
    return Math.max(this.cache.size, storageCount);
  }

  public clearCache(): void {
    this.cache.clear();
    if (typeof window !== 'undefined' && window.localStorage) {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.storagePrefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    }
  }

  private getFromCache<T>(key: string): T | null {
    if (this.cache.has(key)) {
      return this.cache.get(key) as T;
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const raw = localStorage.getItem(this.storagePrefix + key);
        if (raw) {
          const parsed = JSON.parse(raw);
          this.cache.set(key, parsed);
          return parsed as T;
        }
      } catch {
        // Fallback silently if storage read fails
      }
    }
    return null;
  }

  private saveToCache(key: string, data: any): void {
    this.cache.set(key, data);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(this.storagePrefix + key, JSON.stringify(data));
      } catch {
        // Fallback silently if storage quota exceeded
      }
    }
  }

  private async fetchWithMirrorFallback<T>(path: string): Promise<T> {
    const cacheKey = path.toLowerCase();
    const cachedData = this.getFromCache<T>(cacheKey);

    if (cachedData !== null) {
      // Simulate retro disk/modem read delay even when serving from cache
      if (this.retroDelayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, this.retroDelayMs));
      }
      return cachedData;
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
        this.saveToCache(cacheKey, data);
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
