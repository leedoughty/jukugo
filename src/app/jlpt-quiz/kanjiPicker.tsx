import styles from "./jlpt-quiz.module.css";

type Props = {
  kanjiList: string[];
  onPick: () => void;
};

export default function KanjiPicker({ kanjiList, onPick }: Props) {
  return (
    <div>
      {kanjiList.length > 0 && (
        <button
          className={styles.pickButton}
          onClick={onPick}
          aria-label="Pick Random Kanji"
        >
          <span aria-hidden="true">🔄</span>
        </button>
      )}
    </div>
  );
}
