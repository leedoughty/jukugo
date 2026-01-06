import type { Variant, Word } from "@/lib/types/kanji";

export async function fetchKanjiWithWords(
  kanjiList: string[],
  filter?: (variant: Variant, randomKanji: string) => boolean
): Promise<{ kanji: string; variants: Variant[]; meanings: string[] } | null> {
  if (!kanjiList.length) {
    return null;
  }

  const randomKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
  const response = await fetch(`https://kanjiapi.dev/v1/words/${randomKanji}`);

  if (!response.ok) {
    return null;
  }

  const data: Word[] = await response.json();

  const variants: Variant[] = [];
  const meanings: string[] = [];

  data.forEach((word) => {
    word.variants.forEach((variant) => {
      if (
        filter
          ? filter(variant, randomKanji)
          : variant.written.includes(randomKanji)
      ) {
        variants.push(variant);
        meanings.push(word.meanings?.[0]?.glosses?.[0] ?? "");
      }
    });
  });

  if (variants.length === 0) {
    return fetchKanjiWithWords(
      kanjiList.filter((k) => k !== randomKanji),
      filter
    );
  }

  return { kanji: randomKanji, variants, meanings };
}
