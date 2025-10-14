import Link from "next/link";
import styles from "../../styles/searchIcon.module.css";

export default function SearchIcon() {
  return (
    <Link
      href="/kanji-search"
      className={styles.searchIcon}
      aria-label="Search Kanji Compounds"
    >
      🔍
    </Link>
  );
}
