import type { Metadata } from "next";
import styles from "./about.module.css";
import JukugoCycle from "@/app/components/layout/jukugoCycle";

export const metadata: Metadata = {
  title: "About | Jukugo",
};

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <span className={styles.label}>About</span>
      </div>
      <div className={styles.contentRow}>
        <div className={styles.content}>
          <div className={styles.lead}>
            <p>
              Jukugo is an app for learning Japanese compound words (熟語).
            </p>
          </div>
          <div className={styles.body}>
            <p className={styles.paragraph}>
              Understanding Japanese compound words can be challenging. You may
              know the individual kanji, but their combined meanings and
              readings often shift unexpectedly. Jukugo addresses this through
              level-specific quizzes that focus on reading compound words for a
              particular kanji. By observing how the same kanji function across
              different compounds, you'll develop pattern recognition and
              strengthen vocabulary retention. This is an ongoing project with
              additional features in development. I hope you'll find it
              valuable.
            </p>
            <p className={styles.paragraph}>
              For the best experience, I'd suggest turning off &ldquo;Live
              Conversion&rdquo; on your device. On Mac, click the language
              settings in the Menu bar, select Japanese, and make sure
              &ldquo;Live Conversion&rdquo; is unchecked. This lets you type
              hiragana smoothly without kanji appearing automatically.
            </p>
          </div>
        </div>
        <div className={styles.displayCol}>
          <JukugoCycle />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerCol}>
          <span className={styles.footerLabel}>Data</span>
          <a
            href="https://kanjiapi.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
          >
            kanjiapi.dev
          </a>
        </div>
        <div className={styles.footerCol}>
          <span className={styles.footerLabel}>Source</span>
          <a
            href="https://github.com/leedoughty/jukugo"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
          >
            github.com/leedoughty/jukugo
          </a>
        </div>
      </div>
    </main>
  );
}
