import Link from "next/link";
import styles from "./searchIcon.module.css";

type SearchIconProps = {
  dark: boolean;
};

export default function SearchIcon({ dark }: SearchIconProps) {
  return (
    <Link
      href="/kanji-search"
      className={`${styles.searchIcon} ${dark ? styles.searchIconDark : ""}`}
      aria-label="Search Kanji Compounds"
    >
      🔍
    </Link>
  );
}
