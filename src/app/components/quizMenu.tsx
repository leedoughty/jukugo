import React from "react";
import Link from "next/link";
import styles from "../../styles/quizMenu.module.css";
import LevelButton from "./levelButton";
import { useTheme } from "../ThemeProvider";

const JLPT_LEVELS = [1, 2, 3, 4, 5];

export default function QuizMenu() {
  const { dark } = useTheme();

  return (
    <div
      className={`${styles.introContainer} ${
        dark ? styles.introContainerDark : ""
      }`}
    >
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
            className={styles.levelButtons}
            href={`/readings-quiz?level=${level}`}
            passHref
          >
            <LevelButton level={level} className={styles.startButton}>
              JLPT N{level}
            </LevelButton>
          </Link>
        ))}
      </div>
    </div>
  );
}
