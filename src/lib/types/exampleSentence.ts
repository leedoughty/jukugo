export type ExampleSentence = {
  japanese: string;
  english: string;
  entryId: number;
};

export type ExampleSentencesResult =
  | { status: "ok"; sentences: ExampleSentence[] }
  | { status: "error" };
