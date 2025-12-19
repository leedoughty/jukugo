import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <p className={styles.paragraph}>
        Jukugo is an app for learning Japanese compound words (熟語).
      </p>
      <p className={styles.paragraph}>
        Compound words can be surprisingly slippery. You might know the kanji
        already, but once they come together, the meaning shifts, the reading
        changes, and suddenly the word doesn't feel as solid as it should.
        Jukugo is designed to help with that. It focuses on compounds as whole
        units, while still showing the pieces they're made from. By seeing how
        the same kanji appear across different words, patterns start to feel
        familiar, and new vocabulary becomes easier to grasp and remember.
      </p>
      <p className={styles.paragraph}>
        This project uses kanjiapi.dev to fetch Japanese compound words and
        related information. See{" "}
        <a
          href="https://kanjiapi.dev"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.inlineLink}
        >
          https://kanjiapi.dev/
        </a>{" "}
        for more details about available endpoints and usage.
      </p>
      <p className={styles.paragraph}>
        Check out the code at:{" "}
        <a
          href="https://github.com/leedoughty/jukugo"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.inlineLink}
        >
          https://github.com/leedoughty/jukugo
        </a>
      </p>
    </main>
  );
}
