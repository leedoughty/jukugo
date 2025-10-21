import React from "react";
import styles from "../../styles/introduction.module.css";

export default function Introduction() {
  return (
    <div className={styles.introContainer}>
      <h2 className={styles.heading}>Welcome to Jukugo</h2>
      <p className={styles.text}>
        Practice your Japanese by quizzing yourself on kanji compounds (熟語).
      </p>
      <p className={styles.text}>
        Pick a JLPT level to get started, or click below to jump right in!
      </p>
      <div className={styles.arrowRow}>
        <span className={styles.arrowIcon}>↑</span>
        <span className={styles.arrowText}>
          Pick a JLPT level to start your quiz.
        </span>
      </div>
    </div>
  );
}
