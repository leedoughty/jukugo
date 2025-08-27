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

export default async function JukugoServer() {
  const response = await fetch("https://kanjiapi.dev/v1/words/語");
  const words: Word[] = await response.json();

  return (
    <div>
      {words.map((word) =>
        word.variants.map((variant, id) => (
          <div key={id}>
            <div>
              <span>Word: {variant.written}</span>
            </div>
            <div>
              <span>Reading: {variant.pronounced}</span>
            </div>
            <div>
              <span>Meaning: {word.meanings?.[0]?.glosses?.[0] ?? ""}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
