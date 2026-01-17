"use client";

import { Suspense, useEffect, useState, useRef } from "react";
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
import type { AnswerHistoryItem } from "@/lib/types/answerHistoryItem";

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
          <LevelSelector
            levels={JLPT_LEVELS}
            selected={level}
            onSelect={handleLevelSelect}
          />
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
              false,
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

export default function JlptQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JlptQuiz />
    </Suspense>
  );
}
