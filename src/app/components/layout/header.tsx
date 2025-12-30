"use client";

import Link from "next/link";
import styles from "./header.module.css";
import { useTheme } from "@/app/ThemeProvider";
import ThemeIcon from "./themeIcon";
import SearchIcon from "./searchIcon";

export default function Header() {
  const { dark, setDark } = useTheme();

  return (
    <header className={`${styles.header} ${dark ? styles.headerDark : ""}`}>
      <h1>
        <Link href="/" className={styles.titleLink}>
          Jukugo
        </Link>
      </h1>
      <nav className={styles.nav}>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <SearchIcon dark={dark} />
        <button
          aria-label="Toggle dark mode"
          onClick={() => setDark((d) => !d)}
          className={styles.darkModeToggle}
        >
          <ThemeIcon dark={dark} />
        </button>
      </nav>
    </header>
  );
}
