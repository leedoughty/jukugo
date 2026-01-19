"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QuizScreen from "@/app/components/quiz/quizScreen";
import QuizLayout from "../layout";
import styles from "./jlpt.module.css";
import Sidebar from "@/app/components/quiz/sidebar";
import ProgressTracker from "@/app/components/quiz/progressTracker";
import TimerButton from "@/app/components/quiz/timerButton";
import KanjiRefresh from "@/app/components/quiz/kanjiRefresh";
import LevelSelector from "@/app/components/quiz/levelSelector";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import QuizAnswerHistory from "@/app/components/quiz/quizAnswerHistory";
import { useQuizCommon } from "@/lib/hooks/useQuizCommon";
import {
  progressFeature,
  refreshFeature,
  timerFeature,
  historyFeature,
  levelFeature,
} from "@/app/components/quiz/features";

const JLPT_LEVELS = [1, 2, 3, 4, 5];

function JlptQuiz() {
  const {
    kanjiList,
    setKanjiList,
    selectedKanji,
    words,
    meanings,
    currentIndex,
    pickRandomKanji,
    handleNext,
  } = useJukugoQuiz(
    [],
    (variant, randomKanji) =>
      Array.isArray(variant.priorities) &&
      variant.priorities.length > 0 &&
      variant.written.includes(randomKanji),
  );

  const totalCount = words.length;
  const progress = totalCount > 0 ? Math.min(currentIndex + 1, totalCount) : 0;

  const searchParams = useSearchParams();
  const router = useRouter();
  const [level, setLevel] = useState<number | null>(null);

  useEffect(() => {
    const levelParam = searchParams.get("level");

    if (levelParam) {
      const jlptLevel = parseInt(levelParam, 10);

      setLevel(jlptLevel);
      fetchKanjiList(`jlpt-${jlptLevel}`).then((list) => {
        setKanjiList(list);
        if (list.length > 0) {
          pickRandomKanji(list);
        }
      });
    }
  }, [searchParams, setKanjiList]);

  const handleLevelSelect = (newLevel: number) => {
    router.replace(`/quiz/jlpt?level=${newLevel}`);
  };

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
    levelFeature({
      levels: JLPT_LEVELS,
      selected: level,
      onSelect: handleLevelSelect,
      className: styles.selectorRow,
    }),
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

export default function JlptQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JlptQuiz />
    </Suspense>
  );
}
