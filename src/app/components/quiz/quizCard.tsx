import { useState, useEffect, useRef } from "react";
import styles from "./quizCard.module.css";
import Button from "../layout/button";
import SearchKanji from "./searchKanji";
import Input from "../layout/input";
import type { ReviewItem } from "@/lib/types/reviewItem";
import { CorrectIcon, IncorrectIcon } from "./feedbackIcons";

type Props = {
  word: { written: string; pronounced: string };
  meaning: string;
  onNext: () => void;
  kanji?: string;
  onAnswer?: (result: "correct" | "incorrect", userAnswer: string) => void;
};

export default function QuizCard({
  word,
  meaning,
  onNext,
  kanji,
  onAnswer,
}: Props) {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<null | "correct" | "incorrect">(
    null,
  );
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUserInput("");
    setFeedback(null);
    inputRef.current?.focus();
  }, [word]);

  useEffect(() => {
    if (feedback && nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  }, [feedback]);

  useEffect(() => {
    if (feedback === null) {
      inputRef.current?.focus();
    }
  }, [feedback]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userInput.trim() === word.pronounced.trim()) {
      setFeedback("correct");
      onAnswer?.("correct", userInput);
    } else {
      setFeedback("incorrect");
      onAnswer?.("incorrect", userInput);

      try {
        const reviewList: ReviewItem[] = JSON.parse(
          localStorage.getItem("jukugoReviewList") || "[]",
        );

        if (
          !reviewList.some(
            (item) =>
              item.written === word.written &&
              item.pronounced === word.pronounced,
          )
        ) {
          reviewList.push({
            written: word.written,
            pronounced: word.pronounced,
            meaning,
          });

          localStorage.setItem(
            "jukugoReviewList",
            JSON.stringify(reviewList),
          );
        }
      } catch {
        localStorage.removeItem("jukugoReviewList");
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
          ref={inputRef}
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
          aria-live="polite"
          aria-atomic="true"
        >
          <div className={styles.feedbackRow}>
            <span tabIndex={-1}>
              {feedback === "correct" ? <><CorrectIcon /> Correct!</> : <><IncorrectIcon /> Incorrect.</>}
              <br />
              <strong>Answer:</strong> {word.pronounced}
            </span>
            <Button
              className={styles.nextButton}
              onClick={onNext}
              ref={nextButtonRef}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
