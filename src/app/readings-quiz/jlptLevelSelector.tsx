import LevelButton from "../components/levelButton";
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
        <LevelButton
          key={level}
          level={level}
          selected={selected === level}
          onClick={onSelect}
          className={styles.levelButton}
        >
          N{level}
        </LevelButton>
      ))}
    </div>
  );
}
