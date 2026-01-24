import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <p className={styles.paragraph}>
        Jukugo is an app for learning Japanese compound words (熟語).
      </p>
      <p className={styles.paragraph}>
        Understanding Japanese compound words can be challenging. You may know
        the individual kanji, but their combined meanings and readings often
        shift unexpectedly. Jukugo addresses this through level-specific quizzes
        that focus on reading compound words for a particular kanji. By
        observing how the same kanji function across different compounds, you'll
        develop pattern recognition and strengthen vocabulary retention. This is
        an ongoing project with additional features in development. I hope
        you'll find it valuable.
      </p>
      <p className={styles.paragraph}>
        For the best experience, I'd suggest turning off "Live Conversion" on
        your device. On Mac, click the language settings in the Menu bar, select
        Japanese, and make sure "Live Conversion" is unchecked. This lets you
        type hiragana smoothly without kanji appearing automatically.
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
