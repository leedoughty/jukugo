"use client";

import { useEffect, useState } from "react";
import styles from "./review.module.css";
import QuizCard from "@/app/components/quiz/quizCard";
import Sidebar from "@/app/components/quiz/sidebar";
import { progressFeature, deleteFeature } from "@/app/components/quiz/features";

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

  const totalCount = reviewList.length;
  const progress = totalCount > 0 ? Math.min(currentIndex + 1, totalCount) : 0;
  const currentKanji =
    reviewList.length > 0 && currentIndex < reviewList.length
      ? reviewList[currentIndex].written[0]
      : "";

  return (
    <>
      <Sidebar
        features={[
          progressFeature({
            selectedKanji: currentKanji,
            progress,
            totalCount,
          }),
          deleteFeature({
            onDelete: handleClear,
          }),
        ]}
        defaultOpen="progress"
      />
      {reviewList.length > 0 && currentIndex < reviewList.length ? (
        <QuizCard
          word={{
            written: reviewList[currentIndex].written,
            pronounced: reviewList[currentIndex].pronounced,
          }}
          meaning={reviewList[currentIndex].meaning}
          onNext={handleNext}
          kanji={currentKanji}
        />
      ) : (
        <div className={styles.complete}>
          {reviewList.length === 0
            ? "No words to review, answer some quiz cards and then come back here."
            : "Review complete."}
        </div>
      )}
    </>
  );
}
