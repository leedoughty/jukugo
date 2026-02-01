"use client";

import { useEffect, useState } from "react";
import sharedStyles from "../quizPage.module.css";
import styles from "./search.module.css";
import QuizCard from "@/app/components/quiz/quizCard";
import { getSearchQuizData } from "@/app/quiz/actions";
import { isKanji } from "@/lib/utils/kanji";
import Sidebar from "@/app/components/quiz/sidebar";
import QuizAnswerHistory from "@/app/components/quiz/quizAnswerHistory";
import type { Variant } from "@/lib/types/jukugoData";
import { useQuizCommon } from "@/lib/hooks/useQuizCommon";
import {
  progressFeature,
  refreshFeature,
  timerFeature,
  historyFeature,
  searchFeature,
} from "@/app/components/quiz/features";

export default function SearchQuizPage() {
  const [kanji, setKanji] = useState("");
  const [searchKanji, setSearchKanji] = useState("");
  const [words, setWords] = useState<Variant[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchKanji) {
      fetchWords(searchKanji);
    }
  }, [searchKanji]);

  const fetchWords = async (kanjiCharacter: string) => {
    setLoading(true);
    setWords([]);
    setMeanings([]);
    setCurrentIndex(0);

    const { variants, meanings } = await getSearchQuizData(kanjiCharacter);

    setWords(variants);
    setMeanings(meanings);
    setLoading(false);
  };

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

  const totalCount = words.length;
  const progress = totalCount > 0 ? Math.min(currentIndex + 1, totalCount) : 0;

  const {
    answerHistory,
    timerKey,
    timerRunning,
    setTimerRunning,
    timerEnabled,
    setTimerEnabled,
    showHistory,
    setShowHistory,
    handleAnswer,
    handleTimeout,
  } = useQuizCommon({
    words,
    meanings,
    selectedKanji: searchKanji,
    currentIndex,
    handleNext,
  });

  const features = [
    searchFeature({
      kanji,
      setKanji,
      error,
      setError,
      loading,
      handleSearch,
      styles,
    }),
    progressFeature({
      selectedKanji: searchKanji,
      progress,
      totalCount,
    }),
    refreshFeature({
      onRefresh: handleNext,
    }),
    timerFeature({
      currentIndex,
      totalCount,
      timerEnabled,
      timerRunning,
      timerKey,
      setTimerEnabled,
      setTimerRunning,
      handleTimeout,
    }),
    historyFeature({
      setShowHistory,
    }),
  ];

  return (
    <>
      <Sidebar features={features} defaultOpen="search" />
      <div className={sharedStyles.quizMainWrapper}>
        {words.length > 0 && (
          <QuizCard
            word={words[currentIndex]}
            meaning={meanings[currentIndex]}
            onNext={handleNext}
            kanji={searchKanji}
            onAnswer={(result, userAnswer) =>
              handleAnswer(
                result,
                userAnswer,
                words[currentIndex]?.written || "",
                meanings[currentIndex]?.toString() || "",
                searchKanji,
                words[currentIndex]?.pronounced || "",
              )
            }
          />
        )}

        {showHistory && (
          <QuizAnswerHistory
            history={answerHistory}
            className={sharedStyles.historyWrapper}
          />
        )}

        {!searchKanji && !loading && (
          <div className={styles.emptyPrompt}>
            Search a kanji to start the quiz.
          </div>
        )}

        {searchKanji && words.length === 0 && !loading && (
          <div className={styles.emptyPrompt}>No results found.</div>
        )}
      </div>
    </>
  );
}
