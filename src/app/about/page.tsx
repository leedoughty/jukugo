import Header from "../components/header";
import styles from "../../styles/page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <Header />
      <p>A tool for learning Japanese compound words</p>
    </main>
  );
}
