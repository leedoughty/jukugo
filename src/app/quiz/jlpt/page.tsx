"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QuizLayout from "../layout";
import styles from "./jlpt.module.css";
import QuizCard from "@/app/components/quiz/quizCard";
import KanjiPicker from "@/app/components/quiz/kanjiPicker";
import LevelSelector from "@/app/components/quiz/levelSelector";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import type { Variant } from "@/lib/types/jukugoData";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, setKanjiList]);

  const handleLevelSelect = (newLevel: number) => {
    router.replace(`/quiz/jlpt?level=${newLevel}`);
  };

  return (
    <QuizLayout>
      <div className="selectorRow">
        <LevelSelector
          levels={JLPT_LEVELS}
          selected={level}
          onSelect={handleLevelSelect}
        />
      </div>

      {selectedKanji && <h2 className={styles.kanji}>{selectedKanji}</h2>}

      {words.length > 0 && currentIndex < words.length && (
        <QuizCard
          word={words[currentIndex]}
          meaning={meanings[currentIndex]}
          onNext={handleNext}
        />
      )}

      {words.length > 0 && currentIndex >= words.length && (
        <div className={styles.complete}>Quiz complete!</div>
      )}

      <KanjiPicker onPick={() => pickRandomKanji()} />
    </QuizLayout>
  );
}
