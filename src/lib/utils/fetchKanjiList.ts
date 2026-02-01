import { KANJI_ENDPOINT } from "./endpoints";

export async function fetchKanjiList(path: string): Promise<string[]> {
  const url = `${KANJI_ENDPOINT}/${path}`;
  const response = await fetch(url, { next: { revalidate: 86400 } });

  if (!response.ok) {
    return [];
  }

  return await response.json();
}
