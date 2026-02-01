import type { ReviewItem } from "@/lib/types/reviewItem";

const KEY = "jukugoReviewList";

export function getReviewList(): ReviewItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
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
