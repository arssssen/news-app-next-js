import { NewsArticle } from '@/entities/news';

const FAVORITES_STORAGE_KEY = 'favorite_articles_v1';

function readStorageValue(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(FAVORITES_STORAGE_KEY);
}

function writeStorageValue(value: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, value);
}

function removeStorageValue(): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(FAVORITES_STORAGE_KEY);
}

export async function readFavoritesFromStorage(): Promise<NewsArticle[]> {
  const rawValue = readStorageValue();
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as NewsArticle[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeFavoritesToStorage(
  articles: NewsArticle[],
): Promise<void> {
  writeStorageValue(JSON.stringify(articles));
}

export async function clearFavoritesStorage(): Promise<void> {
  removeStorageValue();
}
