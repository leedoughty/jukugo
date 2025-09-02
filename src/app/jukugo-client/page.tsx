"use client";

import { useActionState } from "react";
import { fetchJukugoWords } from "./actions";

export default function JukugoClient() {
  const [state, formAction] = useActionState(fetchJukugoWords, []);

  return (
    <div>
      <form action={formAction}>
        <input name="kanji" placeholder="Enter kanji" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {state.map((word, i) => (
          <li key={i}>
            <strong>{word.compound}</strong> ({word.reading}): {word.meaning}
          </li>
        ))}
      </ul>
    </div>
  );
}
