"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./search.module.css";
import QuizLayout from "../layout";
import QuizCard from "@/app/components/quiz/quizCard";
import KanjiRefresh from "@/app/components/quiz/kanjiRefresh";
import Button from "@/app/components/layout/button";
import { fetchJukugoData } from "@/lib/utils/fetchJukugoData";
import { isKanji } from "@/lib/utils/kanji";
import SearchKanji from "@/app/components/quiz/searchKanji";
import Sidebar from "@/app/components/quiz/sidebar";

type Meaning = { glosses: string[] };
type Variant = { written: string; pronounced: string; priorities?: string[] };
type Word = { meanings: Meaning[]; variants: Variant[] };

export default function SearchQuizPage() {
  const [kanji, setKanji] = useState("");
  const [searchKanji, setSearchKanji] = useState("");
  const [words, setWords] = useState<Variant[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchWords = async (kanjiCharacter: string) => {
    setLoading(true);
    setWords([]);
    setMeanings([]);
    setCurrentIndex(0);

    const { variants, meanings } = await fetchJukugoData(kanjiCharacter);

    setWords(variants);
    setMeanings(meanings);
    setLoading(false);
  };

  useEffect(() => {
    fetchWords(searchKanji);
  }, [searchKanji]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isKanji(kanji.trim())) {
      setError("Please enter a single kanji character.");
      return;
    }
    setError("");
    setSearchKanji(kanji.trim());
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
    <QuizLayout>
      <Sidebar>
        <form onSubmit={handleSearch} className={styles.inputRow}>
          <input
            ref={inputRef}
            value={kanji}
            onChange={(e) => {
              setKanji(e.target.value);
              if (error) setError("");
            }}
            placeholder="Enter kanji"
            className={styles.input}
            disabled={loading}
            maxLength={1}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>
        <KanjiRefresh onPick={handleNext} />
        {error && <div className={styles.feedback}>{error}</div>}
      </Sidebar>

      <SearchKanji kanji={searchKanji} />

      {words.length > 0 && (
        <QuizCard
          word={words[currentIndex]}
          meaning={meanings[currentIndex]}
          onNext={handleNext}
        />
      )}

      {!searchKanji && !loading && (
        <div className={styles.complete}>Search a kanji to start the quiz.</div>
      )}

      {searchKanji && words.length === 0 && !loading && (
        <div className={styles.complete}>No results found.</div>
      )}
    </QuizLayout>
  );
}
