import type { Variant } from "@/lib/types/jukugoData";
import { fetchJukugoData } from "./fetchJukugoData";

export async function fetchRandomizedJukugoQuizData(
  kanjiList: string[],
  filter?: (variant: Variant, kanji: string) => boolean
): Promise<{ kanji: string; variants: Variant[]; meanings: string[] } | null> {
  if (!kanjiList.length) {
    return null;
  }

  const randomKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];

  const { kanji, variants, meanings } = await fetchJukugoData(
    randomKanji,
    filter
  );

  if (variants.length === 0) {
    return fetchRandomizedJukugoQuizData(
      kanjiList.filter((k) => k !== randomKanji),
      filter
    );
  }

  return { kanji, variants, meanings };
}
