"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./freestyle.module.css";
import QuizLayout from "../layout";
import QuizCard from "@/app/components/quiz/quizCard";
import KanjiPicker from "@/app/components/quiz/kanjiPicker";
import { fetchKanjiWithWords } from "@/lib/utils/fetchKanjiWithWords";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import type { Variant } from "@/lib/types/kanji";

export default function FreestyleQuizPage() {
  const [kanjiList, setKanjiList] = useState<string[]>([]);
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
  const [words, setWords] = useState<Variant[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadKanjiList = useCallback(async () => {
    const data = await fetchKanjiList("all");

    setKanjiList(data);
  }, []);

  useEffect(() => {
    loadKanjiList();
  }, [loadKanjiList]);

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
