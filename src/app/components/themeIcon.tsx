import styles from "../../styles/themeIcon.module.css";

type ThemeIconProps = {
  dark: boolean;
};

export default function ThemeIcon({ dark }: ThemeIconProps) {
  return <span className={styles.themeIcon}>{dark ? "🌜" : "💡"}</span>;
}
