import QuizCard from "@/app/components/quiz/quizCard";
import styles from "./quizScreen.module.css";
import SearchKanji from "@/app/components/quiz/searchKanji";

type QuizScreenProps = {
  selectedKanji: string | null;
  words: any[];
  meanings: string[];
  currentIndex: number;
  handleNext: () => void;
  Selector?: React.ReactNode;
  completeMessage?: string;
};

export default function QuizScreen({
  selectedKanji,
  words,
  meanings,
  currentIndex,
  handleNext,
  Selector,
  completeMessage = "Quiz complete!",
}: QuizScreenProps) {
  return (
    <>
      <div className={styles.selectorRow}>{Selector}</div>
      {selectedKanji && <SearchKanji kanji={selectedKanji} />}

      {words.length > 0 && currentIndex < words.length && (
        <QuizCard
          word={words[currentIndex]}
          meaning={meanings[currentIndex]}
          onNext={handleNext}
        />
      )}

      {words.length > 0 && currentIndex >= words.length && (
        <div className={styles.complete}>{completeMessage}</div>
      )}
    </>
  );
}
