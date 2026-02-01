"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
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
  levelFeature,
} from "@/app/components/quiz/features";

type Feature = {
  key: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
  label: string;
  action?: () => void;
  instant?: boolean;
};

type StandardQuizPageProps = {
  kanjiList: string[];
  filterType?: string;
  extraFeatures?: Feature[];
  defaultSidebarOpen?: string;
  levelConfig?: {
    levels: number[];
    selected: number | null;
  };
};

export default function StandardQuizPage({
  kanjiList,
  filterType,
  extraFeatures = [],
  defaultSidebarOpen = "progress",
  levelConfig,
}: StandardQuizPageProps) {
  const router = useRouter();

  const {
    selectedKanji,
    words,
    meanings,
    currentIndex,
    pickRandomKanji,
    handleNext,
  } = useJukugoQuiz(kanjiList, filterType);

  useEffect(() => {
    if (kanjiList.length > 0) {
      pickRandomKanji(kanjiList);
    }
  }, [kanjiList]);

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

  const levelFeatureItem = useMemo(() => {
    if (!levelConfig) return null;
    return levelFeature({
      levels: levelConfig.levels,
      selected: levelConfig.selected,
      onSelect: (newLevel: number) => {
        router.replace(`/quiz/jlpt?level=${newLevel === 0 ? "all" : newLevel}`);
      },
      className: sharedStyles.selectorRow,
    });
  }, [levelConfig, router]);

  const features = [
    progressFeature({
      selectedKanji: selectedKanji ?? "",
      progress,
      totalCount,
    }),
    refreshFeature({ onRefresh: pickRandomKanji }),
    ...extraFeatures,
    ...(levelFeatureItem ? [levelFeatureItem] : []),
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
