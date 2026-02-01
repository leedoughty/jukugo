import React from "react";
import Link from "next/link";
import styles from "./quizMenu.module.css";
import LevelButton from "./levelButton";
import { useTheme } from "@/app/ThemeProvider";

const JLPT_LEVELS = [1, 2, 3, 4, 5, 0];

const MODES = [
  { href: "/quiz/joyo", label: "Joyo", sub: "Common use" },
  { href: "/quiz/freestyle", label: "Freestyle", sub: "All kanji" },
  { href: "/quiz/search", label: "Search", sub: "Custom set" },
  { href: "/quiz/review", label: "Review", sub: "Past mistakes" },
];

export default function QuizMenu() {
  const { dark } = useTheme();

  return (
    <div className={styles.menu}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>JLPT Levels</span>
        <span className={styles.sectionCount}>{JLPT_LEVELS.length}</span>
      </div>
      <div className={styles.levelsGrid}>
        {JLPT_LEVELS.map((level) => (
          <Link
            key={level}
            className={styles.levelLink}
            href={`/quiz/jlpt?level=${level === 0 ? "all" : level}`}
          >
            <LevelButton level={level} className={styles.levelButtonLarge}>
              <span className={styles.levelN}>
                {level === 0 ? "All" : `N${level}`}
              </span>
            </LevelButton>
          </Link>
        ))}
      </div>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Modes</span>
        <span className={styles.sectionCount}>{MODES.length}</span>
      </div>
      <div className={styles.modesGrid}>
        {MODES.map((mode) => (
          <Link key={mode.href} href={mode.href} className={styles.modeLink}>
            <div
              className={`${styles.modeCard} ${dark ? styles.modeCardDark : ""}`}
            >
              <span className={styles.modeLabel}>{mode.label}</span>
              <span className={styles.modeSub}>{mode.sub}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
