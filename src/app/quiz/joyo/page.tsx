"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import QuizLayout from "../layout";
import styles from "./joyo.module.css";
import QuizCard from "@/app/components/quiz/quizCard";
import KanjiPicker from "@/app/components/quiz/kanjiPicker";
import { fetchRandomizedJukugoQuizData } from "@/lib/utils/fetchRandomizedJukugoQuizData";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import type { Variant } from "@/lib/types/jukugoData";

export default function JoyoQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JoyoQuiz />
    </Suspense>
  );
}

export function JoyoQuiz() {
  const [kanjiList, setKanjiList] = useState<string[]>([]);
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
  const [words, setWords] = useState<Variant[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadKanjiList = useCallback(async () => {
    const data = await fetchKanjiList("joyo");

    setKanjiList(data);

    if (data.length > 0) {
      pickRandomKanji(data);
    }
  }, []);

  useEffect(() => {
    loadKanjiList();
  }, [loadKanjiList]);

  const pickRandomKanji = async (list?: string[]) => {
    const sourceList = list ?? kanjiList;
    const result = await fetchRandomizedJukugoQuizData(
      sourceList,
      (variant, randomKanji) =>
        Array.isArray(variant.priorities) &&
        variant.priorities.length > 0 &&
        variant.written.includes(randomKanji)
    );

    if (!result) {
      setSelectedKanji(null);
      setWords([]);
      setMeanings([]);
      return;
    }

    setSelectedKanji(result.kanji);
    setWords(result.variants);
    setMeanings(result.meanings);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    setCurrentIndex((index) => index + 1);
  };

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
