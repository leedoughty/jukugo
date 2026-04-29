"use client";

import { useEffect, useState } from "react";
import styles from "./review.module.css";
import QuizCard from "@/app/components/quiz/quizCard";
import Sidebar from "@/app/components/quiz/sidebar";
import { progressFeature, deleteFeature } from "@/app/components/quiz/features";
import { getReviewList, clearReviewList } from "@/lib/utils/reviewListStorage";
import type { ReviewItem } from "@/lib/types/reviewItem";
import sharedStyles from "../quizPage.module.css";

export default function ReviewQuizPage() {
  const [reviewList, setReviewList] = useState<ReviewItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setReviewList(getReviewList());
  }, []);

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
  };

  const handleClear = () => {
    clearReviewList();
    setReviewList([]);
    setCurrentIndex(0);
  };

  const totalCount = reviewList.length;
  const progress = totalCount > 0 ? Math.min(currentIndex + 1, totalCount) : 0;
  const currentKanji =
    reviewList.length > 0 && currentIndex < reviewList.length
      ? reviewList[currentIndex].written?.[0] ?? ""
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
      <div className={sharedStyles.quizMainWrapper}>
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
      </div>
    </>
  );
}
