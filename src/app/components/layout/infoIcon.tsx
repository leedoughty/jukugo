import Link from "next/link";
import styles from "./searchIcon.module.css";

type InfoIconProps = {
  dark: boolean;
};

export default function InfoIcon({ dark }: InfoIconProps) {
  return (
    <Link
      href="/about"
      className={`${styles.searchIcon} ${dark ? styles.searchIconDark : ""}`}
      aria-label="About"
    >
      <InfoSvg />
    </Link>
  );
}

function InfoSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={20}
      height={20}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle
        cx="8"
        cy="8"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect x="7.2" y="7" width="1.6" height="4.5" rx="0.4" fill="currentColor" />
      <circle cx="8" cy="5.2" r="1" fill="currentColor" />
    </svg>
  );
}
