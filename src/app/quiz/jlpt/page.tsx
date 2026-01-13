"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QuizScreen from "@/app/components/quiz/quizScreen";
import QuizLayout from "../layout";
import styles from "./jlpt.module.css";
import Sidebar from "@/app/components/quiz/sidebar";
import KanjiRefresh from "@/app/components/quiz/kanjiRefresh";
import LevelSelector from "@/app/components/quiz/levelSelector";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";

const JLPT_LEVELS = [1, 2, 3, 4, 5];

export default function JlptQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JlptQuiz />
    </Suspense>
  );
}

export function JlptQuiz() {
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

  return (
    <QuizLayout>
      <Sidebar>
        <LevelSelector
          levels={JLPT_LEVELS}
          selected={level}
          onSelect={handleLevelSelect}
        />
        <KanjiRefresh onPick={() => pickRandomKanji()} />
      </Sidebar>
      <QuizScreen
        selectedKanji={selectedKanji}
        words={words}
        meanings={meanings}
        currentIndex={currentIndex}
        handleNext={handleNext}
      />
    </QuizLayout>
  );
}
