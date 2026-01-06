"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QuizLayout from "../layout";
import styles from "./jlpt.module.css";
import QuizCard from "@/app/components/quiz/quizCard";
import KanjiPicker from "@/app/components/quiz/kanjiPicker";
import LevelSelector from "@/app/components/quiz/levelSelector";
import { fetchKanjiList } from "@/lib/utils/fetchKanjiList";
import { fetchKanjiWithWords } from "@/lib/utils/fetchKanjiWithWords";
import type { Variant } from "@/lib/types/kanji";

const JLPT_LEVELS = [1, 2, 3, 4, 5];

export default function JlptQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JlptQuiz />
    </Suspense>
  );
}

export function JlptQuiz() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [level, setLevel] = useState<number | null>(null);
  const [kanjiList, setKanjiList] = useState<string[]>([]);
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
  const [words, setWords] = useState<Variant[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");

  const fetchJlptKanjiList = useCallback(async (jlptLevel: number) => {
    setSelectedKanji(null);
    setWords([]);
    setMeanings([]);
    setCurrentIndex(0);
    setUserInput("");

    const data = await fetchKanjiList(`jlpt-${jlptLevel}`);
    setKanjiList(data);

    if (data.length > 0) {
      pickRandomKanji(data);
    }
  }, []);

  useEffect(() => {
    const levelParam = searchParams.get("level");

    if (levelParam) {
      const jlptLevel = parseInt(levelParam, 10);
      setLevel(jlptLevel);
      fetchJlptKanjiList(jlptLevel);
    }
  }, [searchParams, fetchJlptKanjiList]);

  const pickRandomKanji = async (list?: string[]) => {
    const sourceList = list ?? kanjiList;
    const result = await fetchKanjiWithWords(
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
    setUserInput("");
  };

  const handleNext = () => {
    setUserInput("");
    setCurrentIndex((index) => index + 1);
  };

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
