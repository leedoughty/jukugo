"use client";

import styles from "./page.module.css";
import QuizMenu from "@/app/components/quiz/quizMenu";
import Intro from "@/app/components/layout/intro";

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
