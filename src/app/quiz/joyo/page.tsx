"use client";

import { Suspense, useEffect, useState } from "react";
import QuizLayout from "../layout";
import KanjiRefresh from "@/app/components/quiz/kanjiRefresh";
import QuizScreen from "@/app/components/quiz/quizScreen";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import Sidebar from "@/app/components/quiz/sidebar";
import ProgressTracker from "@/app/components/quiz/progressTracker";
import QuizAnswerHistory from "@/app/components/quiz/quizAnswerHistory";
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
      variant.written.includes(randomKanji)
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

  const handleAnswer = (
    result: "correct" | "incorrect",
    userAnswer: string,
    jukugo: string,
    meaning: string,
    kanji: string,
    correctAnswer: string
  ) => {
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
              words[currentIndex]?.pronounced || ""
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
