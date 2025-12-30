import styles from "./kanjiPicker.module.css";
import { useTheme } from "@/app/ThemeProvider";

type Props = {
  onPick: () => void;
};

export default function KanjiPicker({ onPick }: Props) {
  const { dark } = useTheme();

  return (
    <button
      className={`${styles.pickButton} ${styles.pickButtonMobile} ${
        dark ? styles.pickButtonDark : ""
      }`}
      onClick={onPick}
      aria-label="Pick Random Word"
      type="button"
    >
      <span aria-hidden="true">🔄</span>
    </button>
  );
}
