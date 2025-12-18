import React from "react";
import styles from "@/styles/levelButton.module.css";
import { useTheme } from "../ThemeProvider";

type LevelButtonProps = {
  level: number;
  selected?: boolean;
  onClick?: (level: number) => void;
  className?: string;
  children?: React.ReactNode;
};

export default function LevelButton({
  level,
  selected = false,
  onClick,
  className = "",
  children,
}: LevelButtonProps) {
  const { dark } = useTheme();

  return (
    <button
      type="button"
      className={`${styles.levelButton} ${dark ? styles.levelButtonDark : ""} ${
        selected ? styles.selected : ""
      } ${className}`}
      aria-pressed={selected}
      onClick={() => onClick?.(level)}
    >
      {children ?? `JLPT N${level}`}
    </button>
  );
}
