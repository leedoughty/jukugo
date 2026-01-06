"use client";

import { useEffect, useCallback } from "react";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import type { Variant } from "@/lib/types/jukugoData";
import styles from "./freestyle.module.css";
import QuizLayout from "../layout";
import QuizCard from "@/app/components/quiz/quizCard";
import KanjiPicker from "@/app/components/quiz/kanjiPicker";

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
    fetchKanjiList("all").then((list) => {
      setKanjiList(list);
      if (list.length > 0) {
        pickRandomKanji(list);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setKanjiList]);

  return (
    <QuizLayout>
      <div className={styles.selectorRow}>
        <KanjiPicker onPick={() => pickRandomKanji()} />
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
    </QuizLayout>
  );
}
