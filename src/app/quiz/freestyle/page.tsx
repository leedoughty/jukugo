"use client";

import { useEffect, useState } from "react";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import type { Variant } from "@/lib/types/jukugoData";
import QuizLayout from "../layout";
import KanjiRefresh from "@/app/components/quiz/kanjiRefresh";
import QuizScreen from "@/app/components/quiz/quizScreen";
import Sidebar from "@/app/components/quiz/sidebar";
import ProgressTracker from "@/app/components/quiz/progressTracker";
import QuizAnswerHistory from "@/app/components/quiz/quizAnswerHistory";
import styles from "./freestyle.module.css";

type AnswerHistoryItem = {
  kanji: string;
  jukugo: string;
  meaning: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

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
