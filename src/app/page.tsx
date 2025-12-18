"use client";

import styles from "../styles/page.module.css";
import QuizMenu from "./components/quizMenu";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.flexRow}>
        <QuizMenu />
      </div>
    </div>
  );
}
