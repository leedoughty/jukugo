"use client";

import { useState, useEffect } from "react";
import styles from "./jukugoCycle.module.css";

const WORDS = [
  { kanji: "花火", reading: "はなび", meaning: "fireworks" },
  { kanji: "時計", reading: "とけい", meaning: "clock" },
  { kanji: "天気", reading: "てんき", meaning: "weather" },
  { kanji: "地図", reading: "ちず", meaning: "map" },
  { kanji: "風鈴", reading: "ふうりん", meaning: "wind chime" },
  { kanji: "星空", reading: "ほしぞら", meaning: "starry sky" },
  { kanji: "本棚", reading: "ほんだな", meaning: "bookshelf" },
  { kanji: "海岸", reading: "かいがん", meaning: "coast" },
];

const HOLD_MS = 3000;
const FADE_MS = 600;

export default function JukugoCycle() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, FADE_MS);
    }, HOLD_MS + FADE_MS);

    return () => clearInterval(interval);
  }, []);

  const word = WORDS[index];

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.word} ${visible ? styles.visible : styles.hidden}`}
      >
        <span className={styles.kanji}>{word.kanji}</span>
        <div className={styles.meta}>
          <span className={styles.reading}>{word.reading}</span>
          <span className={styles.meaning}>{word.meaning}</span>
        </div>
      </div>
    </div>
  );
}
