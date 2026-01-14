import QuizCard from "@/app/components/quiz/quizCard";
import styles from "./quizScreen.module.css";

type QuizScreenProps = {
  selectedKanji: string | null;
  words: any[];
  meanings: string[];
  currentIndex: number;
  handleNext: () => void;
  Selector?: React.ReactNode;
  completeMessage?: string;
  onAnswer?: (result: "correct" | "incorrect", userAnswer: string) => void;
};

export default function QuizScreen({
  selectedKanji,
  words,
  meanings,
  currentIndex,
  handleNext,
  Selector,
  completeMessage = "Quiz complete!",
  onAnswer,
}: QuizScreenProps) {
  return (
    <>
      <div className={styles.selectorRow}>{Selector}</div>

      {words.length > 0 && currentIndex < words.length && (
        <QuizCard
          word={words[currentIndex]}
          meaning={meanings[currentIndex]}
          onNext={handleNext}
          kanji={selectedKanji ?? undefined}
          onAnswer={onAnswer}
        />
      )}

      {words.length > 0 && currentIndex >= words.length && (
        <div className={styles.complete}>{completeMessage}</div>
      )}
    </>
  );
}
