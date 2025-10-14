import Link from "next/link";
import styles from "../styles/page.module.css";
import JLPTQuiz from "./jlpt-quiz/jlptQuiz";

export default function Home() {
  return (
    <div className={styles.page}>
      <JLPTQuiz />
    </div>
  );
}
