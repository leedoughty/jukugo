import React from "react";
import styles from "./searchKanji.module.css";

type Props = {
  kanji: string;
};

export default function SearchKanji({ kanji }: Props) {
  if (!kanji) {
    return null;
  }

  return <h2 className={styles.kanji}>{kanji}</h2>;
}
