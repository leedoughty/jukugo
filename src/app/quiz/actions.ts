"use server";

import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import { fetchJukugoData } from "@/lib/utils/fetchJukugoData";
import { fetchRandomizedJukugoQuizData } from "@/lib/utils/fetchRandomizedJukugoQuizData";
import type { Variant } from "@/lib/types/jukugoData";

const FILTERS: Record<string, (variant: Variant, kanji: string) => boolean> = {
  jlpt: (variant, kanji) =>
    Array.isArray(variant.priorities) &&
    variant.priorities.length > 0 &&
    variant.written.includes(kanji),
};

export async function getKanjiList(path: string) {
  return fetchKanjiList(path);
}

export async function getQuizData(
  kanjiList: string[],
  filterType?: string,
) {
  const filter = filterType ? FILTERS[filterType] : undefined;
  return fetchRandomizedJukugoQuizData(kanjiList, filter);
}

export async function getSearchQuizData(kanji: string) {
  return fetchJukugoData(kanji);
}
