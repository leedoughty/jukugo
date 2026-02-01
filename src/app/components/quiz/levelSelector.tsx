"use client";

import { useTheme } from "@/app/ThemeProvider";
import styles from "./levelSelector.module.css";

type Props = {
  levels: number[];
  selected: number | null;
  onSelect: (level: number) => void;
};

export default function LevelSelector({ levels, selected, onSelect }: Props) {
  const { dark } = useTheme();

  return (
    <div className={styles.levels}>
      {levels.map((level) => (
        <button
          type="button"
          key={level}
          className={[
            styles.levelButton,
            dark ? styles.levelButtonDark : "",
            selected === level ? styles.selected : "",
          ].join(" ")}
          aria-pressed={selected === level}
          onClick={() => onSelect(level)}
        >
          {level === 0 ? "All" : `N${level}`}
        </button>
      ))}
    </div>
  );
}
