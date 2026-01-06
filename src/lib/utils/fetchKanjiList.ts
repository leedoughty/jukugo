const KANJI_API_BASE_URL = "https://kanjiapi.dev/v1/kanji";

export async function fetchKanjiList(path: string): Promise<string[]> {
  const url = `${KANJI_API_BASE_URL}/${path}`;
  const response = await fetch(url);

  if (!response.ok) {
    return [];
  }

  return await response.json();
}
