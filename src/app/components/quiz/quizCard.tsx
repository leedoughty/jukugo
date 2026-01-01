import { useState, useEffect } from "react";
import styles from "./quizCard.module.css";
import Button from "../layout/button";

type Props = {
  word: { written: string; pronounced: string };
  meaning: string;
  onNext: () => void;
};

export default function QuizCard({ word, meaning, onNext }: Props) {
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
    }
  };

  return (
    <div className={styles.quizCard}>
      <div className={styles.jukugoWord}>{word.written}</div>
      <div className={styles.jukugoMeaning}>{meaning}</div>
      <form onSubmit={handleSubmit} className={styles.inputRow}>
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="ひらがな"
          className={styles.input}
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
