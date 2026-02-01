"use client";

import { useActionState } from "react";
import { useRef, useState } from "react";
import { fetchJukugoWords } from "./actions";
import styles from "./kanji-search.module.css";
import { useTheme } from "@/app/ThemeProvider";
import Button from "@/app/components/layout/button";
import Input from "@/app/components/layout/input";
import { isKanji } from "@/lib/utils/kanji";
import ErrorMessage from "@/app/components/layout/errorMessage";

export default function KanjiSearch() {
  const [state, formAction] = useActionState(fetchJukugoWords, []);
  const { dark } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!isKanji(inputValue)) {
      e.preventDefault();
      setError("Please enter a kanji character.");
    }
  };

  return (
    <div className={styles.container}>
      <form
        ref={formRef}
        action={formAction}
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <Input
          name="kanji"
          placeholder="Enter kanji"
          maxLength={1}
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button type="submit">Search</Button>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && state.length === 0 && (
        <div
          className={`${styles.emptyPrompt} ${
            dark ? styles.emptyPromptDark : ""
          }`}
        >
          Enter a kanji to explore related Jukugo meanings and readings.
        </div>
      )}
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
