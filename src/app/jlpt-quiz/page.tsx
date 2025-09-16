"use client";

import { useState } from "react";
import styles from "./jlpt-quiz.module.css";
import QuizCard from "./quizCard";
import KanjiPicker from "./kanjiPicker";
import JLPTLevelSelector from "./jlptLevelSelector";

type Meaning = { glosses: string[] };
type Variant = { written: string; pronounced: string; priorities?: string[] };
type Word = { meanings: Meaning[]; variants: Variant[] };

const JLPT_LEVELS = [1, 2, 3, 4, 5];

export default function JLPTQuiz() {
  const [level, setLevel] = useState<number | null>(null);
  const [kanjiList, setKanjiList] = useState<string[]>([]);
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
  const [words, setWords] = useState<Variant[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<null | "correct" | "incorrect">(
    null
  );

  const fetchKanjiList = async (jlptLevel: number) => {
    setLoading(true);
    setSelectedKanji(null);
    setWords([]);
    setMeanings([]);
    setCurrentIndex(0);
    setFeedback(null);
    setUserInput("");

    const response = await fetch(
      `https://kanjiapi.dev/v1/kanji/jlpt-${jlptLevel}`
    );
    const data: string[] = await response.json();

    setKanjiList(data);
    setLoading(false);
  };

  const pickRandomKanji = async () => {
    if (!kanjiList.length) {
      return;
    }

    setLoading(true);
    setCurrentIndex(0);
    setFeedback(null);
    setUserInput("");

    const randomKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
    setSelectedKanji(randomKanji);
    const response = await fetch(
      `https://kanjiapi.dev/v1/words/${randomKanji}`
    );
    const data: Word[] = await response.json();

    const variants: Variant[] = [];
    const meanings: string[] = [];

    data.forEach((word) => {
      word.variants.forEach((variant) => {
        if (variant.priorities && variant.priorities.length > 0) {
          variants.push(variant);
          meanings.push(word.meanings?.[0]?.glosses?.[0] ?? "");
        }
      });
    });

    setWords(variants);
    setMeanings(meanings);
    setLoading(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!words.length) {
      return;
    }

    if (userInput.trim() === words[currentIndex].pronounced.trim()) {
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setUserInput("");
    setCurrentIndex((index) => index + 1);
  };

  return (
    <div className={styles.container}>
      <JLPTLevelSelector
        levels={JLPT_LEVELS}
        selected={level}
        onSelect={(level) => {
          setLevel(level);
          fetchKanjiList(level);
        }}
      />

      {loading && <div>Loading...</div>}

      <KanjiPicker
        kanjiList={kanjiList}
        selectedKanji={selectedKanji}
        onPick={pickRandomKanji}
      />

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
