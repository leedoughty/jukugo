"use client";

import styles from "./page.module.css";
import QuizMenu from "@/app/components/quiz/quizMenu";
import Intro from "@/app/components/layout/intro";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <div className={styles.heroCol}>
          <Intro />
        </div>
        <div className={styles.menuCol}>
          <QuizMenu />
        </div>
      </div>
    </div>
  );
}
