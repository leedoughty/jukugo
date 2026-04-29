import type { ReviewItem } from "@/lib/types/reviewItem";

const KEY = "jukugoReviewList";

export function getReviewList(): ReviewItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item: unknown): item is ReviewItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as ReviewItem).written === "string" &&
        typeof (item as ReviewItem).pronounced === "string" &&
        typeof (item as ReviewItem).meaning === "string",
    );
  } catch {
    return [];
  }
}

export function addToReviewList(item: ReviewItem): void {
  const list = getReviewList();
  const exists = list.some(
    (existing) =>
      existing.written === item.written &&
      existing.pronounced === item.pronounced,
  );
  if (!exists) {
    list.push(item);
    localStorage.setItem(KEY, JSON.stringify(list));
  }
}

export function clearReviewList(): void {
  localStorage.removeItem(KEY);
}
