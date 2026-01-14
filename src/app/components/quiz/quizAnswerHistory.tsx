import React from "react";
import styles from "./quizAnswerHistory.module.css";
import { useTheme } from "@/app/ThemeProvider";

type AnswerHistoryItem = {
  kanji: string;
  jukugo: string;
  meaning: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

type Props = {
  history: AnswerHistoryItem[];
  className?: string;
};

export default function QuizAnswerHistory({ history, className }: Props) {
  const { dark } = useTheme();

  if (!history.length) return null;

  return (
    <div
      className={`${className ? className : styles.historyWrapper} ${
        dark ? styles.historyWrapperDark : ""
      }`}
    >
      {history.map((item, i) => (
        <div
          key={i}
          className={`${styles.card} ${
            item.isCorrect ? styles.correct : styles.incorrect
          } ${dark ? styles.cardDark : ""}`}
        >
          <div className={styles.kanji}>{item.kanji}</div>
          <div className={styles.jukugo}>{item.jukugo}</div>
          <div className={styles.meaning}>{item.meaning}</div>
          <div className={styles.answers}>
            <div>
              <span className={styles.label}>Your answer:</span>{" "}
              {item.userAnswer}
            </div>
            <div>
              <span className={styles.label}>Correct:</span>{" "}
              {item.correctAnswer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
