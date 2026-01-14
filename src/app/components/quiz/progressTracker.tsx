import styles from "./progressTracker.module.css";

export default function ProgressTracker({
  kanji,
  progress,
  totalCount,
}: {
  kanji: string;
  progress: number;
  totalCount: number;
}) {
  return (
    <div className={styles.scoreDisplay}>
      <span className={styles.scoreKanji}>{kanji}</span>
      <span className={styles.scoreCount}>
        ({progress}/{totalCount})
      </span>
    </div>
  );
}
