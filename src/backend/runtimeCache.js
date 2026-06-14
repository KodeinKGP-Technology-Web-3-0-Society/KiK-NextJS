const runtimeCacheStore = globalThis.__dekodexRuntimeCache || new Map();
globalThis.__dekodexRuntimeCache = runtimeCacheStore;

export function getCacheEntry(key) {
  const entry = runtimeCacheStore.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    runtimeCacheStore.delete(key);
    return null;
  }

  return entry.value;
}

export function setCacheEntry(key, value, ttlMs) {
  runtimeCacheStore.set(key, {
    value,
    expiresAt: Date.now() + Math.max(0, Number(ttlMs) || 0),
  });
}

export function deleteCacheEntry(key) {
  runtimeCacheStore.delete(key);
}

export function deleteCacheByPrefix(prefix) {
  for (const key of runtimeCacheStore.keys()) {
    if (key.startsWith(prefix)) {
      runtimeCacheStore.delete(key);
    }
  }
}
