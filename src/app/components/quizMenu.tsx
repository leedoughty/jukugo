import React from "react";
import Link from "next/link";
import styles from "../../styles/quizMenu.module.css";

const JLPT_LEVELS = [1, 2, 3, 4, 5];

export default function QuizMenu() {
  return (
    <div className={styles.introContainer}>
      <h2 className={styles.heading}>Jukugo Quizzes</h2>
      <p className={styles.text}>
        Practice your Japanese by quizzing yourself on kanji compounds (熟語).
      </p>
      <p className={styles.text}>
        Choose a JLPT level to start the Readings Quiz:
      </p>
      <div className={styles.levelsRow}>
        {JLPT_LEVELS.map((level) => (
          <Link
            key={level}
            className={styles.startButton}
            href={`/readings-quiz?level=${level}`}
          >
            JLPT N{level}
          </Link>
        ))}
      </div>
    </div>
  );
}
