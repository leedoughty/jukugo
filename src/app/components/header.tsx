import Link from "next/link";
import styles from "../../styles/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Link href="/">Jukugo</Link>
      </h1>
      <nav>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
