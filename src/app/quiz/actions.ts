"use server";

import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import { fetchJukugoData } from "@/lib/utils/fetchJukugoData";
import { fetchRandomizedJukugoQuizData } from "@/lib/utils/fetchRandomizedJukugoQuizData";
import { fetchExampleSentences } from "@/lib/utils/fetchExampleSentences";
import type { Variant } from "@/lib/types/jukugoData";

export async function getKanjiList(path: string) {
  return fetchKanjiList(path);
}

export async function getQuizData(kanjiList: string[], filterType?: string) {
  const filters: Record<string, (variant: Variant, kanji: string) => boolean> =
    {
      jlpt: (variant, kanji) =>
        Array.isArray(variant.priorities) &&
        variant.priorities.length > 0 &&
        variant.written.includes(kanji),
    };
  const filter = filterType ? filters[filterType] : undefined;
  return fetchRandomizedJukugoQuizData(kanjiList, filter);
}

export async function getSearchQuizData(kanji: string) {
  return fetchJukugoData(kanji);
}

export async function getExampleSentences(term: string) {
  return fetchExampleSentences(term);
}
