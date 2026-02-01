"use server";

import { fetchJukugoData } from "@/lib/utils/fetchJukugoData";

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

  if (!kanji || typeof kanji !== "string") {
    return [];
  }

  const { variants, meanings } = await fetchJukugoData(kanji);

  return variants.map((variant, i) => ({
    compound: variant.written,
    reading: variant.pronounced,
    meaning: meanings[i] ?? "",
  }));
}
