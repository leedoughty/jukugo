import { useState, useRef, useEffect } from "react";
import { useQuizAnswerHistory } from "./useQuizAnswerHistory";
import type { AnswerHistoryItem } from "@/lib/types/answerHistoryItem";
import type { Variant } from "@/lib/types/jukugoData";

type UseQuizCommonProps = {
  words: Variant[];
  meanings: string[];
  selectedKanji: string | null | undefined;
  currentIndex: number;
  handleNext: () => void;
};

export function useQuizCommon({
  words,
  meanings,
  selectedKanji,
  currentIndex,
  handleNext,
}: UseQuizCommonProps) {
  const normalizedKanji = selectedKanji ?? undefined;
  const { answerHistory, addAnswer, setAnswerHistory } = useQuizAnswerHistory();
  const [timerKey, setTimerKey] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showHistory, setShowHistory] = useState(true);

  useEffect(() => {
    setHasAnswered(false);
    setTimerKey((k) => k + 1);
    setTimerRunning(timerEnabled);
  }, [currentIndex, normalizedKanji, timerEnabled]);

  const hasAnsweredRef = useRef(false);
  useEffect(() => {
    hasAnsweredRef.current = false;
  }, [currentIndex, normalizedKanji]);

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
    addAnswer({
      kanji,
      jukugo,
      meaning,
      userAnswer,
      correctAnswer,
      isCorrect: result === "correct",
    });
    setTimerRunning(false);
    if (isTimeout) {
      setTimeout(() => {
        handleNext();
      }, 500);
    }
  };

  const handleTimeout = () => {
    if (!timerRunning || !normalizedKanji || hasAnsweredRef.current) return;
    setTimeout(() => {
      handleAnswer(
        "incorrect",
        "",
        words[currentIndex]?.written || "",
        meanings[currentIndex]?.toString() || "",
        normalizedKanji?.toString() || "",
        words[currentIndex]?.pronounced || "",
        true,
      );
    }, 0);
  };

  return {
    answerHistory,
    setAnswerHistory,
    addAnswer,
    timerKey,
    timerRunning,
    setTimerRunning,
    timerEnabled,
    setTimerEnabled,
    hasAnswered,
    setHasAnswered,
    showHistory,
    setShowHistory,
    handleAnswer,
    handleTimeout,
  };
}
