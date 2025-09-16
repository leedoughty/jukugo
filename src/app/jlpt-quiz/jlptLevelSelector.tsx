import styles from "./jlpt-quiz.module.css";

type Props = {
  levels: number[];
  selected: number | null;
  onSelect: (level: number) => void;
};

export default function JLPTLevelSelector({
  levels,
  selected,
  onSelect,
}: Props) {
  return (
    <div className={styles.levels}>
      {levels.map((level) => (
        <button
          key={level}
          className={`${styles.levelButton} ${
            selected === level ? styles.selected : ""
          }`}
          onClick={() => onSelect(level)}
        >
          JLPT {level}
        </button>
      ))}
    </div>
  );
}
