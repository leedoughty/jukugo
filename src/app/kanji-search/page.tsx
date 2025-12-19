"use client";

import { useActionState } from "react";
import { fetchJukugoWords } from "./actions";
import styles from "./kanji-search.module.css";
import { useTheme } from "../ThemeProvider";

export default function KanjiSearch() {
  const [state, formAction] = useActionState(fetchJukugoWords, []);
  const { dark } = useTheme();

  return (
    <div className={styles.container}>
      <form action={formAction} className={styles.form}>
        <input
          name="kanji"
          placeholder="Enter kanji"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <ul className={styles.wordList}>
        {state.map((word, i) => (
          <li
            key={i}
            className={`${styles.wordCard} ${dark ? styles.wordCardDark : ""}`}
          >
            <div>
              <strong>{word.compound}</strong>
            </div>
            <div>
              <span
                className={`${styles.reading} ${
                  dark ? styles.readingDark : ""
                }`}
              >
                {word.reading}
              </span>
            </div>
            <div>
              <span
                className={`${styles.meaning} ${
                  dark ? styles.meaningDark : ""
                }`}
              >
                {word.meaning}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
