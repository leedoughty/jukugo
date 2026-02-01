"use client";

import { useEffect } from "react";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import QuizScreen from "@/app/components/quiz/quizScreen";
import Sidebar from "@/app/components/quiz/sidebar";
import QuizAnswerHistory from "@/app/components/quiz/quizAnswerHistory";
import sharedStyles from "@/app/quiz/quizPage.module.css";
import { useQuizCommon } from "@/lib/hooks/useQuizCommon";
import {
  progressFeature,
  refreshFeature,
  timerFeature,
  historyFeature,
} from "@/app/components/quiz/features";
import type { Variant } from "@/lib/types/jukugoData";

type Feature = {
  key: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
  label: string;
  action?: () => void;
  instant?: boolean;
};

type StandardQuizPageProps = {
  fetchSource: string | null;
  filter?: (variant: Variant, kanji: string) => boolean;
  extraFeatures?: Feature[];
  defaultSidebarOpen?: string;
};

export default function StandardQuizPage({
  fetchSource,
  filter,
  extraFeatures = [],
  defaultSidebarOpen = "progress",
}: StandardQuizPageProps) {
  const {
    setKanjiList,
    selectedKanji,
    words,
    meanings,
    currentIndex,
    pickRandomKanji,
    handleNext,
  } = useJukugoQuiz([], filter);

  useEffect(() => {
    if (!fetchSource) return;

    fetchKanjiList(fetchSource).then((list) => {
      setKanjiList(list);
      if (list.length > 0) {
        pickRandomKanji(list);
      }
    });
  }, [fetchSource, setKanjiList]);

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
    ...extraFeatures,
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
    <>
      <Sidebar features={features} defaultOpen={defaultSidebarOpen} />
      <div className={sharedStyles.quizMainWrapper}>
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
            className={sharedStyles.historyWrapper}
          />
        )}
      </div>
    </>
  );
}
