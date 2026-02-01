import type { Variant } from "@/lib/types/jukugoData";
import { fetchJukugoData } from "./fetchJukugoData";

export async function fetchRandomizedJukugoQuizData(
  kanjiList: string[],
  filter?: (variant: Variant, kanji: string) => boolean
): Promise<{ kanji: string; variants: Variant[]; meanings: string[] } | null> {
  const remaining = [...kanjiList];

  while (remaining.length > 0) {
    const index = Math.floor(Math.random() * remaining.length);
    const randomKanji = remaining[index];

    const { kanji, variants, meanings } = await fetchJukugoData(
      randomKanji,
      filter
    );

    if (variants.length > 0) {
      return { kanji, variants, meanings };
    }

    remaining.splice(index, 1);
  }

  return null;
}
