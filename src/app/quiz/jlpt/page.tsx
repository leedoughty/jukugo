"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./jlpt.module.css";
import QuizCard from "@/app/components/quiz/quizCard";
import KanjiPicker from "@/app/components/quiz/kanjiPicker";
import LevelSelector from "@/app/components/quiz/levelSelector";

type Meaning = { glosses: string[] };
type Variant = { written: string; pronounced: string; priorities?: string[] };
type Word = { meanings: Meaning[]; variants: Variant[] };

const JLPT_LEVELS = [1, 2, 3, 4, 5];

export default function JLPTQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JLPTQuiz />
    </Suspense>
  );
}

export function JLPTQuiz() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [level, setLevel] = useState<number | null>(null);
  const [kanjiList, setKanjiList] = useState<string[]>([]);
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
  const [words, setWords] = useState<Variant[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");

  const fetchKanjiList = useCallback(async (jlptLevel: number) => {
    setSelectedKanji(null);
    setWords([]);
    setMeanings([]);
    setCurrentIndex(0);
    setUserInput("");

    const response = await fetch(
      `https://kanjiapi.dev/v1/kanji/jlpt-${jlptLevel}`
    );
    const data: string[] = await response.json();

    setKanjiList(data);

    if (data.length > 0) {
      pickRandomKanji(data);
    }
  }, []);

  useEffect(() => {
    const levelParam = searchParams.get("level");
    if (levelParam) {
      const lvl = parseInt(levelParam, 10);
      setLevel(lvl);
      fetchKanjiList(lvl);
    }
  }, [searchParams, fetchKanjiList]);

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
    const meanings: string[] = [];

    data.forEach((word) => {
      word.variants.forEach((variant) => {
        if (
          variant.priorities &&
          variant.priorities.length > 0 &&
          variant.written.includes(randomKanji)
        ) {
          variants.push(variant);
          meanings.push(word.meanings?.[0]?.glosses?.[0] ?? "");
        }
      });
    });

    if (variants.length === 0) {
      await pickRandomKanji(sourceList.filter((k) => k !== randomKanji));
      return;
    }

    setSelectedKanji(randomKanji);
    setWords(variants);
    setMeanings(meanings);
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
    <div className={styles.container}>
      <div className={styles.selectorRow}>
        <LevelSelector
          levels={JLPT_LEVELS}
          selected={level}
          onSelect={handleLevelSelect}
        />

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
