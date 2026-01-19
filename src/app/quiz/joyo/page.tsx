"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QuizScreen from "@/app/components/quiz/quizScreen";
import QuizLayout from "../layout";
import styles from "./joyo.module.css";
import Sidebar from "@/app/components/quiz/sidebar";
import QuizAnswerHistory from "@/app/components/quiz/quizAnswerHistory";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import { useQuizCommon } from "@/lib/hooks/useQuizCommon";
import {
  progressFeature,
  refreshFeature,
  timerFeature,
  historyFeature,
} from "@/app/components/quiz/features";

function JoyoQuiz() {
  const {
    kanjiList,
    setKanjiList,
    selectedKanji,
    words,
    meanings,
    currentIndex,
    pickRandomKanji,
    handleNext,
  } = useJukugoQuiz();

  useEffect(() => {
    const fetchAndSetKanji = async () => {
      const kanjiList = await fetchKanjiList("joyo");
      setKanjiList(kanjiList);
      if (kanjiList.length > 0) {
        pickRandomKanji(kanjiList);
      }
    };
    fetchAndSetKanji();
  }, [setKanjiList]);

  const totalCount = words.length;
  const progress = totalCount > 0 ? Math.min(currentIndex + 1, totalCount) : 0;

  const {
    answerHistory,
    timerKey,
    timerRunning,
    setTimerRunning,
    timerEnabled,
    setTimerEnabled,
    showHistory,
    setShowHistory,
    handleAnswer,
    handleTimeout,
  } = useQuizCommon({
    words,
    meanings,
    selectedKanji,
    currentIndex,
    handleNext,
  });

  const features = [
    progressFeature({
      selectedKanji: selectedKanji ?? "",
      progress,
      totalCount,
    }),
    refreshFeature({ onRefresh: pickRandomKanji }),
    timerFeature({
      currentIndex,
      totalCount,
      timerEnabled,
      timerRunning,
      timerKey,
      setTimerEnabled,
      setTimerRunning,
      handleTimeout,
    }),
    historyFeature({ setShowHistory }),
  ];

  return (
    <QuizLayout>
      <Sidebar features={features} defaultOpen="progress" />
      <div className={styles.quizMainWrapper}>
        <QuizScreen
          selectedKanji={selectedKanji}
          words={words}
          meanings={meanings}
          currentIndex={currentIndex}
          handleNext={handleNext}
          onAnswer={(result, userAnswer) =>
            handleAnswer(
              result,
              userAnswer,
              words[currentIndex]?.written || "",
              meanings[currentIndex]?.toString() || "",
              selectedKanji?.toString() || "",
              words[currentIndex]?.pronounced || "",
              false,
            )
          }
        />
        {showHistory && (
          <QuizAnswerHistory
            history={answerHistory}
            className={styles.historyWrapper}
          />
        )}
      </div>
    </QuizLayout>
  );
}

export default function JoyoQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JoyoQuiz />
    </Suspense>
  );
}
