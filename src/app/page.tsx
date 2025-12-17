"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../styles/page.module.css";
import QuizMenu from "./components/quizMenu";
import JLPTQuiz from "./jlpt-quiz/jlptQuiz";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className={styles.page}>
      <div className={styles.flexRow}>
        <QuizMenu />
      </div>
    </div>
  );
}
