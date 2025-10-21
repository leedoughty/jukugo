"use client";

import { useState } from "react";
import styles from "../styles/page.module.css";
import Introduction from "./components/introduction";
import JLPTQuiz from "./jlpt-quiz/jlptQuiz";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className={styles.page}>
      <div className={styles.flexRow}>
        {showIntro && <Introduction />}
        <JLPTQuiz onLevelSelect={() => setShowIntro(false)} />
      </div>
    </div>
  );
}
