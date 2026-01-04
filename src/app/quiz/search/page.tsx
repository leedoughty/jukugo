"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./search.module.css";
import QuizCard from "@/app/components/quiz/quizCard";
import KanjiPicker from "@/app/components/quiz/kanjiPicker";
import Button from "@/app/components/layout/button";

type Meaning = { glosses: string[] };
type Variant = { written: string; pronounced: string; priorities?: string[] };
type Word = { meanings: Meaning[]; variants: Variant[] };

export default function SearchQuizPage() {
  const [kanji, setKanji] = useState("字");
  const [searchKanji, setSearchKanji] = useState("字");
  const [words, setWords] = useState<Variant[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchWords = async (kanjiChar: string) => {
    setLoading(true);
    setWords([]);
    setMeanings([]);
    setCurrentIndex(0);

    const response = await fetch(`https://kanjiapi.dev/v1/words/${kanjiChar}`);
    const data: Word[] = await response.json();

    const variants: Variant[] = [];
    const meaningsArr: string[] = [];

    data.forEach((word) => {
      word.variants.forEach((variant) => {
        if (variant.written.includes(kanjiChar)) {
          variants.push(variant);
          meaningsArr.push(word.meanings?.[0]?.glosses?.[0] ?? "");
        }
      });
    });

    setWords(variants);
    setMeanings(meaningsArr);
    setLoading(false);
  };

  useEffect(() => {
    fetchWords(searchKanji);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKanji]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (kanji.trim()) {
      setSearchKanji(kanji.trim());
    }
  };

  const handleNext = () => {
    if (words.length > 1) {
      let nextIndex = Math.floor(Math.random() * words.length);
      if (nextIndex === currentIndex) {
        nextIndex = (nextIndex + 1) % words.length;
      }
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectorRow}>
        <form onSubmit={handleSearch} className={styles.inputRow}>
          <input
            ref={inputRef}
            value={kanji}
            onChange={(e) => setKanji(e.target.value)}
            placeholder="Enter kanji"
            className={styles.input}
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>
        <KanjiPicker onPick={handleNext} />
      </div>

      {searchKanji && <h2 className={styles.kanji}>{searchKanji}</h2>}

      {words.length > 0 && (
        <QuizCard
          word={words[currentIndex]}
          meaning={meanings[currentIndex]}
          onNext={handleNext}
        />
      )}

      {words.length === 0 && !loading && (
        <div className={styles.complete}>No results found.</div>
      )}
    </div>
  );
}
