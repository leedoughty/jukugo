"use client";

import styles from "../styles/page.module.css";
import QuizMenu from "./components/quizMenu";
import Intro from "./components/Intro";

export default function Home() {
  return (
    <div className={styles.page}>
      <Intro />
      <div className={styles.flexRow}>
        <QuizMenu />
      </div>
    </div>
  );
}
