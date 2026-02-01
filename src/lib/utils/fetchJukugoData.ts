import type { Variant, Word } from "@/lib/types/jukugoData";
import { WORDS_ENDPOINT } from "./endpoints";

export async function fetchJukugoData(
  kanji: string,
  filter?: (variant: Variant, kanji: string) => boolean
): Promise<{ kanji: string; variants: Variant[]; meanings: string[] }> {
  const response = await fetch(`${WORDS_ENDPOINT}/${kanji}`, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    console.error(`Failed to fetch jukugo data for "${kanji}": ${response.status}`);
    return { kanji, variants: [], meanings: [] };
  }

  const data: Word[] = await response.json();

  const variants: Variant[] = [];
  const meanings: string[] = [];

  data.forEach((word) => {
    word.variants.forEach((variant) => {
      if (filter ? filter(variant, kanji) : variant.written.includes(kanji)) {
        variants.push(variant);
        meanings.push(word.meanings?.[0]?.glosses?.[0] ?? "");
      }
    });
  });

  return { kanji, variants, meanings };
}
