import type { Variant } from "@/lib/types/jukugoData";
import { fetchJukugoData } from "./fetchJukugoData";

export async function fetchRandomizedJukugoQuizData(
  kanjiList: string[],
  filter?: (variant: Variant, kanji: string) => boolean,
): Promise<{ kanji: string; variants: Variant[]; meanings: string[] } | null> {
  const remaining = [...kanjiList];

  for (let i = remaining.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
  }

  const BATCH_SIZE = 3;

  for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
    const batch = remaining.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map((k) => fetchJukugoData(k, filter)),
    );
    const match = results.find((r) => r.variants.length > 0);
    if (match) {
      return {
        kanji: match.kanji,
        variants: match.variants,
        meanings: match.meanings,
      };
    }
  }

  return null;
}
