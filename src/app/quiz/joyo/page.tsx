"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import QuizLayout from "../layout";
import KanjiRefresh from "@/app/components/quiz/kanjiRefresh";
import QuizScreen from "@/app/components/quiz/quizScreen";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import Sidebar from "@/app/components/quiz/sidebar";
import ProgressTracker from "@/app/components/quiz/progressTracker";
import QuizAnswerHistory from "@/app/components/quiz/quizAnswerHistory";
import TimerButton from "@/app/components/quiz/timerButton";
import styles from "./joyo.module.css";
import type { AnswerHistoryItem } from "@/lib/types/answerHistoryItem";

export default function JoyoQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JoyoQuiz />
    </Suspense>
  );
}

export function JoyoQuiz() {
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

  const [answerHistory, setAnswerHistory] = useState<AnswerHistoryItem[]>([]);
  const [timerKey, setTimerKey] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showHistory, setShowHistory] = useState(true);

  useEffect(() => {
    setHasAnswered(false);
    setTimerKey((k) => k + 1);
    if (timerEnabled) {
      setTimerRunning(true);
    } else {
      setTimerRunning(false);
    }
  }, [currentIndex, selectedKanji, timerEnabled]);

  const hasAnsweredRef = useRef(false);
  useEffect(() => {
    hasAnsweredRef.current = false;
  }, [currentIndex, selectedKanji]);

  const handleAnswer = (
    result: "correct" | "incorrect",
    userAnswer: string,
    jukugo: string,
    meaning: string,
    kanji: string,
    correctAnswer: string,
    isTimeout = false,
  ) => {
    if (hasAnsweredRef.current) return;
    hasAnsweredRef.current = true;
    setHasAnswered(true);
    setAnswerHistory((prev) => [
      ...prev,
      {
        kanji,
        jukugo,
        meaning,
        userAnswer,
        correctAnswer,
        isCorrect: result === "correct",
      },
    ]);
    setTimerRunning(false);
    if (isTimeout) {
      setTimeout(() => {
        handleNext();
      }, 500);
    }
  };

  const handleTimeout = () => {
    if (!timerRunning || !selectedKanji || hasAnsweredRef.current) {
      return;
    }
    setTimeout(() => {
      handleAnswer(
        "incorrect",
        "",
        words[currentIndex]?.written || "",
        meanings[currentIndex]?.toString() || "",
        selectedKanji?.toString() || "",
        words[currentIndex]?.pronounced || "",
        true,
      );
    }, 0);
  };

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
