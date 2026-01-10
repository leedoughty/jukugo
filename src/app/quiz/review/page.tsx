"use client";

import { useEffect, useState } from "react";
import QuizLayout from "../layout";
import styles from "./review.module.css";
import QuizCard from "@/app/components/quiz/quizCard";
import Button from "@/app/components/layout/button";
import SearchKanji from "@/app/components/quiz/searchKanji";

type ReviewItem = {
  written: string;
  pronounced: string;
  meaning: string;
};

export default function ReviewQuizPage() {
  const [reviewList, setReviewList] = useState<ReviewItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("jukugoReviewList");
    if (stored) {
      setReviewList(JSON.parse(stored));
    }
  }, []);

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
  };

  const handleClear = () => {
    localStorage.removeItem("jukugoReviewList");
    setReviewList([]);
    setCurrentIndex(0);
  };

  const currentKanji =
    reviewList.length > 0 && currentIndex < reviewList.length
      ? reviewList[currentIndex].written[0]
      : "";

  return (
    <QuizLayout>
      {reviewList.length > 0 && currentIndex < reviewList.length ? (
        <>
          <SearchKanji kanji={currentKanji} />
          <QuizCard
            word={{
              written: reviewList[currentIndex].written,
              pronounced: reviewList[currentIndex].pronounced,
            }}
            meaning={reviewList[currentIndex].meaning}
            onNext={handleNext}
          />
          <Button
            className={styles.nextButton}
            onClick={handleClear}
            type="button"
          >
            Clear Review Questions
          </Button>
        </>
      ) : (
        <div className={styles.complete}>
          {reviewList.length === 0
            ? "No words to review, answer some quiz cards and then come back here!"
            : "Review complete!"}
          {reviewList.length > 0 && (
            <Button
              className={styles.nextButton}
              onClick={handleClear}
              type="button"
            >
              Clear Review Questions
            </Button>
          )}
        </div>
      )}
    </QuizLayout>
  );
}
