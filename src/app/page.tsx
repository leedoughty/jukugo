import Link from "next/link";
import styles from "../styles/page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Link href="/jukugo-client">Search Kanji Compounds</Link>
    </div>
  );
}
