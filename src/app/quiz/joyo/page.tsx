"use client";

import { Suspense, useEffect } from "react";
import QuizLayout from "../layout";
import styles from "./joyo.module.css";
import QuizCard from "@/app/components/quiz/quizCard";
import KanjiPicker from "@/app/components/quiz/kanjiPicker";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";

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
    fetchKanjiList("joyo").then((list) => {
      setKanjiList(list);
      if (list.length > 0) {
        pickRandomKanji(list);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setKanjiList]);

  return (
    <QuizLayout>
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

      <div className="selectorRow">
        <KanjiPicker onPick={() => pickRandomKanji()} />
      </div>
    </QuizLayout>
  );
}
