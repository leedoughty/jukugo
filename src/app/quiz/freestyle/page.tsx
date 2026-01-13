"use client";

import { useEffect, useCallback } from "react";
import { useJukugoQuiz } from "@/lib/hooks/useJukugoQuiz";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import type { Variant } from "@/lib/types/jukugoData";
import QuizLayout from "../layout";
import KanjiRefresh from "@/app/components/quiz/kanjiRefresh";
import QuizScreen from "@/app/components/quiz/quizScreen";
import Sidebar from "@/app/components/quiz/sidebar";

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
      <Sidebar>
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
