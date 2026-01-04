"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import styles from "./joyo.module.css";
import QuizCard from "@/app/components/quiz/quizCard";
import KanjiPicker from "@/app/components/quiz/kanjiPicker";

type Meaning = { glosses: string[] };
type Variant = { written: string; pronounced: string; priorities?: string[] };
type Word = { meanings: Meaning[]; variants: Variant[] };

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

  const fetchKanjiList = useCallback(async () => {
    setSelectedKanji(null);
    setWords([]);
    setMeanings([]);
    setCurrentIndex(0);

    const response = await fetch("https://kanjiapi.dev/v1/kanji/joyo");
    const data: string[] = await response.json();

    setKanjiList(data);

    if (data.length > 0) {
      pickRandomKanji(data);
    }
  }, []);

  useEffect(() => {
    fetchKanjiList();
  }, [fetchKanjiList]);

  const pickRandomKanji = async (list?: string[]) => {
    const sourceList = list ?? kanjiList;
    if (!sourceList.length) {
      setSelectedKanji(null);
      setWords([]);
      setMeanings([]);
      return;
    }

    const randomKanji =
      sourceList[Math.floor(Math.random() * sourceList.length)];

    const response = await fetch(
      `https://kanjiapi.dev/v1/words/${randomKanji}`
    );
    const data: Word[] = await response.json();

    const variants: Variant[] = [];
    const meaningsArr: string[] = [];

    data.forEach((word) => {
      word.variants.forEach((variant) => {
        if (
          variant.priorities &&
          variant.priorities.length > 0 &&
          variant.written.includes(randomKanji)
        ) {
          variants.push(variant);
          meaningsArr.push(word.meanings?.[0]?.glosses?.[0] ?? "");
        }
      });
    });

    if (variants.length === 0) {
      await pickRandomKanji(sourceList.filter((k) => k !== randomKanji));
      return;
    }

    setSelectedKanji(randomKanji);
    setWords(variants);
    setMeanings(meaningsArr);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    setCurrentIndex((index) => index + 1);
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
}
