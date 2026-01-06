export type Meaning = { glosses: string[] };
export type Variant = {
  written: string;
  pronounced: string;
  priorities?: string[];
};
export type Word = { meanings: Meaning[]; variants: Variant[] };
