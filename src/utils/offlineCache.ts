import { ModelQuestionSet } from '../types';

const CACHE_KEYS = {
  PREVIOUSLY_VIEWED_SETS: 'grammar_pwa_previously_viewed_sets_v1',
  OFFLINE_DASHBOARD_SNAPSHOT: 'grammar_pwa_dashboard_snapshot_v1',
  OFFLINE_SYNC_QUEUE: 'grammar_pwa_offline_sync_queue_v1',
  LAST_CACHE_TIMESTAMP: 'grammar_pwa_last_cache_ts',
};

export interface CachedSetMetadata {
  setId: number;
  title: string;
  totalQuestions: number;
  cachedAt: number;
  categorySummary?: string[];
}

/**
 * Saves a question set into offline storage for instant retrieval when connection is unstable
 */
export function cacheViewedQuestionSet(set: ModelQuestionSet): void {
  try {
    const existing = getPreviouslyViewedCachedSets();
    const filtered = existing.filter((item) => item.setId !== set.id);
    const updated: CachedSetMetadata[] = [
      {
        setId: set.id,
        title: set.title,
        totalQuestions: set.questions.length,
        cachedAt: Date.now(),
        categorySummary: Array.from(new Set(set.questions.map((q) => q.category))).slice(0, 4),
      },
      ...filtered,
    ].slice(0, 35); // Keep up to all 35 sets

    localStorage.setItem(CACHE_KEYS.PREVIOUSLY_VIEWED_SETS, JSON.stringify(updated));
    localStorage.setItem(`grammar_set_data_${set.id}`, JSON.stringify(set));
    localStorage.setItem(CACHE_KEYS.LAST_CACHE_TIMESTAMP, Date.now().toString());
  } catch (err) {
    console.warn('Could not cache viewed question set to localStorage:', err);
  }
}

/**
 * Returns list of metadata for previously viewed / cached question sets
 */
export function getPreviouslyViewedCachedSets(): CachedSetMetadata[] {
  try {
    const data = localStorage.getItem(CACHE_KEYS.PREVIOUSLY_VIEWED_SETS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Retrieves full question set from local offline cache
 */
export function getCachedSetData(setId: number): ModelQuestionSet | null {
  try {
    const data = localStorage.getItem(`grammar_set_data_${setId}`);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/**
 * Caches core dashboard snapshot (student stats, streaks, weak areas)
 */
export function cacheDashboardSnapshot(snapshot: Record<string, any>): void {
  try {
    localStorage.setItem(
      CACHE_KEYS.OFFLINE_DASHBOARD_SNAPSHOT,
      JSON.stringify({
        data: snapshot,
        timestamp: Date.now(),
      })
    );
  } catch (err) {
    console.warn('Could not cache dashboard snapshot:', err);
  }
}

/**
 * Retrieves cached dashboard snapshot for offline display
 */
export function getCachedDashboardSnapshot(): Record<string, any> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEYS.OFFLINE_DASHBOARD_SNAPSHOT);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.data || null;
  } catch {
    return null;
  }
}

/**
 * Checks if a specific set is stored in offline cache
 */
export function isSetStoredOffline(setId: number): boolean {
  try {
    return !!localStorage.getItem(`grammar_set_data_${setId}`);
  } catch {
    return false;
  }
}
