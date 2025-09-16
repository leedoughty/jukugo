import styles from "./jlpt-quiz.module.css";

type Props = {
  kanjiList: string[];
  selectedKanji: string | null;
  onPick: () => void;
};

export default function KanjiPicker({
  kanjiList,
  selectedKanji,
  onPick,
}: Props) {
  return (
    <div>
      {kanjiList.length > 0 && (
        <button className={styles.pickButton} onClick={onPick}>
          Pick Random Kanji
        </button>
      )}

      {selectedKanji && (
        <h2 className={styles.kanji}>Kanji: {selectedKanji}</h2>
      )}
    </div>
  );
}
