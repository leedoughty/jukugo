"use client";

import { useEffect, useState } from "react";
import styles from "../joyo-quiz/joyo-quiz.module.css";
import QuizCard from "@/app/components/quiz/quizCard";

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

  return (
    <div className={styles.container}>
      {reviewList.length > 0 && currentIndex < reviewList.length ? (
        <QuizCard
          word={{
            written: reviewList[currentIndex].written,
            pronounced: reviewList[currentIndex].pronounced,
          }}
          meaning={reviewList[currentIndex].meaning}
          onNext={handleNext}
        />
      ) : (
        <div className={styles.complete}>
          {reviewList.length === 0
            ? "No words to review, answer some quiz cards and then come back here!"
            : "Review complete!"}
        </div>
      )}
    </div>
  );
}
