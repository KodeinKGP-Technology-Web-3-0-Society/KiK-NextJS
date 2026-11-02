// Safe localStorage helpers for the lab's "completed" / "favourites" lists.
// A bad stored value (e.g. the string "undefined") must never crash the page.
export function readList(key) {
  if (typeof window === "undefined") return [];
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return Array.isArray(v) ? v : [];
  } catch {
    localStorage.removeItem(key);
    return [];
  }
}

export function writeList(key, value) {
  if (typeof window === "undefined" || !Array.isArray(value)) return;
  localStorage.setItem(key, JSON.stringify(value));
}
