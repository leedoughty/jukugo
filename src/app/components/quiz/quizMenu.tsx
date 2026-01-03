import React from "react";
import Link from "next/link";
import styles from "./quizMenu.module.css";
import LevelButton from "./levelButton";
import { useTheme } from "@/app/ThemeProvider";

const JLPT_LEVELS = [1, 2, 3, 4, 5];

export default function QuizMenu() {
  const { dark } = useTheme();

  return (
    <div className={styles.layoutRow}>
      <div className={styles.buttonGroup}>
        <div className={styles.levelsSection}>
          <p className={styles.text}>Level</p>
          <div className={styles.levelsRow}>
            {JLPT_LEVELS.map((level) => (
              <Link
                key={level}
                className={styles.levelButtons}
                href={`/jlpt-quiz?level=${level}`}
                passHref
              >
                <LevelButton
                  level={level}
                  className={`${styles.levelButtonLarge} `}
                >
                  JLPT N{level}
                </LevelButton>
              </Link>
            ))}
            <Link href="/joyo-quiz" className={styles.levelButtons}>
              <LevelButton level={0} className={`${styles.levelButtonLarge} `}>
                Jōyō
              </LevelButton>
            </Link>
            <Link href="/freestyle-quiz" className={styles.levelButtons}>
              <LevelButton level={0} className={`${styles.levelButtonLarge} `}>
                Freestyle
              </LevelButton>
            </Link>
            <Link href="/search-quiz" className={styles.levelButtons}>
              <LevelButton level={0} className={`${styles.levelButtonLarge} `}>
                Search mode
              </LevelButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
