"use client";

import React from "react";
import styles from "./quizAnswerHistory.module.css";
import type { AnswerHistoryItem } from "@/lib/types/answerHistoryItem";
import { CorrectIcon, IncorrectIcon } from "./feedbackIcons";

type Props = {
  history: AnswerHistoryItem[];
  className?: string;
};

export default function QuizAnswerHistory({ history, className }: Props) {
  if (!history.length) return null;

  return (
    <div className={className ? className : styles.historyWrapper}>
      {history.map((item, i) => (
        <div
          key={`${item.jukugo}-${item.userAnswer}-${i}`}
          className={styles.card}
        >
          <div className={styles.kanjiRow}>
            {item.isCorrect ? <CorrectIcon /> : <IncorrectIcon />}
            <span className={styles.kanji}>{item.kanji}</span>
          </div>
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
