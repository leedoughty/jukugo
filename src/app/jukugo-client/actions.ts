"use server";

type Meaning = {
  glosses: string[];
};

type Variant = {
  written: string;
  pronounced: string;
};

type Word = {
  meanings: Meaning[];
  variants: Variant[];
};

type JukugoResult = {
  compound: string;
  reading: string;
  meaning: string;
};

export async function fetchJukugoWords(
  _previousState: unknown,
  formData: FormData
): Promise<JukugoResult[]> {
  const kanji = formData.get("kanji");
  if (!kanji) {
    return [];
  }

  const response = await fetch(`https://kanjiapi.dev/v1/words/${kanji}`);
  if (!response.ok) {
    return [];
  }

  const words: Word[] = await response.json();

  return words.flatMap((word) =>
    word.variants.map((variant) => ({
      compound: variant.written,
      reading: variant.pronounced,
      meaning: word.meanings?.[0]?.glosses?.[0] ?? "",
    }))
  );
}
