import styles from "./intro.module.css";
import JukugoText from "./jukugoText";

export default function Intro() {
  return (
    <div className={styles.introWrapper}>
      <JukugoText />
      <div className={styles.intro}>
        Jukugo helps you learn Japanese compound words (熟語) through fun
        quizzes and a handy kanji search. Explore, play, and use this tool
        however you like, and enjoy a smoother Japanese learning journey!
      </div>
    </div>
  );
}
