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
      <MagnifyingGlassIcon />
    </Link>
  );
}

function MagnifyingGlassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={20}
      height={20}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M15.78,14.72c.31.31.26.78,0,1.06-.22.24-.73.33-1.02.04l-4.23-4.22c-2.71,2.15-6.6,1.77-8.87-.76S-.53,4.33,1.9,1.9s6.31-2.54,8.89-.28,2.97,6.18.81,8.91l4.19,4.19ZM9.94,2.88c-2.25-2.14-5.81-1.73-7.55.79-1.32,1.91-1.14,4.48.42,6.19s4.07,2.15,6.11,1.02c1.38-.76,2.31-2.14,2.53-3.62.24-1.65-.31-3.24-1.5-4.37Z"
        fill="currentColor"
      />
    </svg>
  );
}
