import styles from "./jukugoText.module.css";

export default function JukugoText() {
  return (
    <div className={styles.jukugoText} aria-hidden="true">
      <span className={styles.kanji}>熟語</span>
    </div>
  );
}
