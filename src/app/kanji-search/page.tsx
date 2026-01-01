"use client";

import { useActionState } from "react";
import { useEffect, useRef } from "react";
import { fetchJukugoWords } from "./actions";
import styles from "./kanji-search.module.css";
import { useTheme } from "@/app/ThemeProvider";
import Button from "@/app/components/layout/button";

export default function KanjiSearch() {
  const [state, formAction] = useActionState(fetchJukugoWords, []);
  const { dark } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      const input = formRef.current.elements.namedItem(
        "kanji"
      ) as HTMLInputElement;

      if (input) {
        input.value = "字";
        formRef.current.requestSubmit();
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <form ref={formRef} action={formAction} className={styles.form}>
        <input
          name="kanji"
          placeholder="Enter kanji"
          className={styles.input}
          defaultValue="字"
        />
        <Button type="submit">Search</Button>
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
