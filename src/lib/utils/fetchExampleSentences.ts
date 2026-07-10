import type { ExampleSentencesResult } from "@/lib/types/exampleSentence";
import { EXAMPLES_ENDPOINT } from "./endpoints";

const EXAMPLES_LIMIT = 1;

export async function fetchExampleSentences(
  term: string,
): Promise<ExampleSentencesResult> {
  try {
    const response = await fetch(
      `${EXAMPLES_ENDPOINT}?q=${encodeURIComponent(term)}&limit=${EXAMPLES_LIMIT}`,
      {
        next: { revalidate: 86400 },
        signal: AbortSignal.timeout(60_000),
      },
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch example sentences for "${term}": ${response.status}`,
      );
      return { status: "error" };
    }

    return { status: "ok", sentences: await response.json() };
  } catch (error) {
    console.error(`Failed to fetch example sentences for "${term}":`, error);
    return { status: "error" };
  }
}
