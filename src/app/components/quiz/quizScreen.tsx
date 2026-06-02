import QuizCard from "@/app/components/quiz/quizCard";
import styles from "./quizScreen.module.css";
import type { Variant } from "@/lib/types/jukugoData";

type QuizScreenProps = {
  selectedKanji: string | null;
  words: Variant[];
  meanings: string[];
  currentIndex: number;
  handleNext: () => void;
  completeMessage?: string;
  onAnswer?: (result: "correct" | "incorrect", userAnswer: string) => void;
};

export default function QuizScreen({
  selectedKanji,
  words,
  meanings,
  currentIndex,
  handleNext,
  completeMessage = "Quiz complete!",
  onAnswer,
}: QuizScreenProps) {
  return (
    <>
      {words.length > 0 && currentIndex < words.length && (
        <QuizCard
          key={`${selectedKanji ?? ""}-${currentIndex}`}
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
