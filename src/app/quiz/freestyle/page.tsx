"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./freestyle.module.css";
import QuizCard from "@/app/components/quiz/quizCard";
import KanjiPicker from "@/app/components/quiz/kanjiPicker";

type Meaning = { glosses: string[] };
type Variant = { written: string; pronounced: string; priorities?: string[] };
type Word = { meanings: Meaning[]; variants: Variant[] };

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
      if (!sourceList.length) {
        setSelectedKanji(null);
        setWords([]);
        setMeanings([]);
        setCurrentIndex(0);
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
          if (variant.written.includes(randomKanji)) {
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
