"use client";

import { useEffect, useState, useRef } from "react";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import type { Variant } from "@/lib/types/jukugoData";
import QuizLayout from "../layout";
import KanjiRefresh from "@/app/components/quiz/kanjiRefresh";
import QuizScreen from "@/app/components/quiz/quizScreen";
import Sidebar from "@/app/components/quiz/sidebar";
import ProgressTracker from "@/app/components/quiz/progressTracker";
import QuizAnswerHistory from "@/app/components/quiz/quizAnswerHistory";
import TimerButton from "@/app/components/quiz/timerButton";
import styles from "./freestyle.module.css";
import type { AnswerHistoryItem } from "@/lib/types/answerHistoryItem";

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

  const [answerHistory, setAnswerHistory] = useState<AnswerHistoryItem[]>([]);
  const [timerKey, setTimerKey] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

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
      <Sidebar>
        {selectedKanji && (
          <ProgressTracker
            kanji={selectedKanji}
            progress={progress}
            totalCount={totalCount}
          />
        )}
        <KanjiRefresh onPick={() => pickRandomKanji()} />
        <div className={styles.selectorRow}>
          {currentIndex < totalCount && (
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
          )}
        </div>
      </Sidebar>
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
            )
          }
        />
        <QuizAnswerHistory
          history={answerHistory}
          className={styles.historyWrapper}
        />
      </div>
    </QuizLayout>
  );
}
