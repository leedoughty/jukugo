"use client";

import { useEffect, useCallback } from "react";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import type { Variant } from "@/lib/types/jukugoData";
import QuizLayout from "../layout";
import KanjiPicker from "@/app/components/quiz/kanjiPicker";
import QuizScreen from "@/app/components/quiz/quizScreen";

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

  return (
    <QuizLayout>
      <QuizScreen
        selectedKanji={selectedKanji}
        words={words}
        meanings={meanings}
        currentIndex={currentIndex}
        handleNext={handleNext}
      />
      <KanjiPicker onPick={() => pickRandomKanji()} />
    </QuizLayout>
  );
}
