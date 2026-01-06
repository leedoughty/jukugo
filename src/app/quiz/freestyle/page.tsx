"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./freestyle.module.css";
import QuizLayout from "../layout";
import QuizCard from "@/app/components/quiz/quizCard";
import KanjiPicker from "@/app/components/quiz/kanjiPicker";
import { fetchKanjiWithWords } from "@/lib/utils/fetchKanjiWithWords";
import type { Variant } from "@/lib/types/kanji";

export default function FreestyleQuizPage() {
  const [kanjiList, setKanjiList] = useState<string[]>([]);
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
  const [words, setWords] = useState<Variant[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchAllKanji() {
      const response = await fetch("https://kanjiapi.dev/v1/kanji/all");
      const data: string[] = await response.json();
      setKanjiList(data);
    }

    fetchAllKanji();
  }, []);

  const pickRandomKanji = useCallback(
    async (list?: string[]) => {
      const sourceList = list ?? kanjiList;
      const result = await fetchKanjiWithWords(sourceList);

      if (!result) {
        setSelectedKanji(null);
        setWords([]);
        setMeanings([]);
        setCurrentIndex(0);
        return;
      }

      setSelectedKanji(result.kanji);
      setWords(result.variants);
      setMeanings(result.meanings);
      setCurrentIndex(0);
    },
    [kanjiList]
  );

  useEffect(() => {
    if (kanjiList.length > 0) {
      pickRandomKanji(kanjiList);
    }
  }, [kanjiList, pickRandomKanji]);

  const handleNext = () => {
    setCurrentIndex((index) => index + 1);
  };

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
