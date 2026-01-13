import { useState, useEffect } from "react";
import styles from "./quizCard.module.css";
import Button from "../layout/button";
import SearchKanji from "./searchKanji";
import Input from "../layout/input";

type Props = {
  word: { written: string; pronounced: string };
  meaning: string;
  onNext: () => void;
  kanji?: string;
};

export default function QuizCard({ word, meaning, onNext, kanji }: Props) {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<null | "correct" | "incorrect">(
    null
  );

  useEffect(() => {
    setUserInput("");
    setFeedback(null);
  }, [word]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userInput.trim() === word.pronounced.trim()) {
      setFeedback("correct");
    } else {
      setFeedback("incorrect");

      const reviewList = JSON.parse(
        localStorage.getItem("jukugoReviewList") || "[]"
      );

      if (
        !reviewList.some(
          (item: any) =>
            item.written === word.written && item.pronounced === word.pronounced
        )
      ) {
        reviewList.push({
          written: word.written,
          pronounced: word.pronounced,
          meaning,
        });

        localStorage.setItem("jukugoReviewList", JSON.stringify(reviewList));
      }
    }
  };

  return (
    <div className={styles.quizCard}>
      {kanji && <SearchKanji kanji={kanji} />}
      <div className={styles.jukugoWord}>{word.written}</div>
      <div className={styles.jukugoMeaning}>{meaning}</div>
      <form onSubmit={handleSubmit} className={styles.inputRow}>
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="ひらがな"
          disabled={feedback !== null}
        />
        <Button type="submit" disabled={feedback !== null}>
          Submit
        </Button>
      </form>
      {feedback && (
        <div
          className={`${styles.feedback} ${
            feedback === "correct" ? styles.correct : styles.incorrect
          }`}
        >
          {feedback === "correct" ? "✅ Correct!" : "❌ Incorrect."}
          <br />
          <strong>Answer:</strong> {word.pronounced}
          <div>
            <Button className={styles.nextButton} onClick={onNext}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
