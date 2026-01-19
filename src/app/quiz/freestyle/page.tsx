"use client";

import { useEffect } from "react";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import QuizLayout from "../layout";
import KanjiRefresh from "@/app/components/quiz/kanjiRefresh";
import QuizScreen from "@/app/components/quiz/quizScreen";
import Sidebar from "@/app/components/quiz/sidebar";
import ProgressTracker from "@/app/components/quiz/progressTracker";
import QuizAnswerHistory from "@/app/components/quiz/quizAnswerHistory";
import TimerButton from "@/app/components/quiz/timerButton";
import styles from "./freestyle.module.css";
import { useQuizCommon } from "@/lib/hooks/useQuizCommon";

export default function FreestyleQuizPage() {
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
      const kanjiList = await fetchKanjiList("all");

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

  return (
    <QuizLayout>
      <Sidebar
        features={[
          {
            key: "progress",
            icon: (
              <span role="img" aria-label="Progress">
                📈
              </span>
            ),
            content: selectedKanji ? (
              <ProgressTracker
                kanji={selectedKanji}
                progress={progress}
                totalCount={totalCount}
              />
            ) : null,
            label: "Progress",
          },
          {
            key: "refresh",
            icon: (
              <span role="img" aria-label="Refresh">
                🔄
              </span>
            ),
            label: "Refresh",
            action: () => pickRandomKanji(),
            instant: true,
          },
          {
            key: "timer",
            icon: (
              <span role="img" aria-label="Timer">
                ⏲️
              </span>
            ),
            content:
              currentIndex < totalCount ? (
                <TimerButton
                  timerEnabled={timerEnabled}
                  timerRunning={timerRunning}
                  timerKey={timerKey}
                  onEnable={() => {
                    setTimerEnabled(true);
                    setTimerRunning(true);
                  }}
                  onDisable={() => {
                    setTimerEnabled(false);
                    setTimerRunning(false);
                  }}
                  onTimeout={handleTimeout}
                  duration={10}
                />
              ) : null,
            label: "Timer",
          },
          {
            key: "history",
            icon: (
              <span role="img" aria-label="History">
                🗂️
              </span>
            ),
            label: "History",
            action: () => setShowHistory((v) => !v),
            instant: true,
          },
        ]}
        defaultOpen="progress"
      />
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
