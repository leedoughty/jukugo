import styles from "./progressTracker.module.css";
import { useTheme } from "@/app/ThemeProvider";

export default function ProgressTracker({
  kanji,
  progress,
  totalCount,
}: {
  kanji: string;
  progress: number;
  totalCount: number;
}) {
  const { dark } = useTheme();

  return (
    <div
      className={`${styles.scoreDisplay} ${
        dark ? styles.scoreDisplayDark : ""
      }`}
    >
      <span className={styles.scoreKanji}>{kanji}</span>
      <span className={styles.scoreCount}>
        ({progress}/{totalCount})
      </span>
    </div>
  );
}
