import styles from "./intro.module.css";
import JukugoText from "./jukugoText";

export default function Intro() {
  return (
    <div className={styles.introWrapper}>
      <JukugoText />
      <div className={styles.label}>Japanese Compound words</div>
      <div className={styles.intro}>
        Learn Japanese compound words through quizzes and kanji search. Explore,
        play, and use this tool however you like.
      </div>
      <div className={styles.tag}>
        <span className={styles.tagText}>熟語 = Jukugo</span>
      </div>
    </div>
  );
}
