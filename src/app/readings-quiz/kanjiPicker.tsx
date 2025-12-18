import styles from "./jlpt-quiz.module.css";
import { useTheme } from "../ThemeProvider";

type Props = {
  kanjiList: string[];
  onPick: () => void;
};

export default function KanjiPicker({ kanjiList, onPick }: Props) {
  const { dark } = useTheme();

  return (
    <div>
      {kanjiList.length > 0 && (
        <button
          className={`${styles.pickButton} ${styles.pickButtonMobile} ${
            dark ? styles.pickButtonDark : ""
          }`}
          onClick={onPick}
          aria-label="Pick Random Kanji"
        >
          <span aria-hidden="true">🔄</span>
        </button>
      )}
    </div>
  );
}
