"use client";

import { useEffect, useState, useRef } from "react";
import TimerButton from "@/app/components/quiz/timerButton";
import styles from "./search.module.css";
import QuizLayout from "../layout";
import QuizCard from "@/app/components/quiz/quizCard";
import KanjiRefresh from "@/app/components/quiz/kanjiRefresh";
import Button from "@/app/components/layout/button";
import Input from "@/app/components/layout/input";
import { fetchJukugoData } from "@/lib/utils/fetchJukugoData";
import { isKanji } from "@/lib/utils/kanji";
import Sidebar from "@/app/components/quiz/sidebar";
import ProgressTracker from "@/app/components/quiz/progressTracker";
import QuizAnswerHistory from "@/app/components/quiz/quizAnswerHistory";
import type { AnswerHistoryItem } from "@/lib/types/answerHistoryItem";
import type { Variant } from "@/lib/types/jukugoData";

export default function SearchQuizPage() {
  const [kanji, setKanji] = useState("");
  const [searchKanji, setSearchKanji] = useState("");
  const [words, setWords] = useState<Variant[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [answerHistory, setAnswerHistory] = useState<AnswerHistoryItem[]>([]);
  const [timerKey, setTimerKey] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showHistory, setShowHistory] = useState(true);

  useEffect(() => {
    setHasAnswered(false);
    setTimerKey((k) => k + 1);
    if (timerEnabled && words.length > 0) {
      setTimerRunning(true);
    } else {
      setTimerRunning(false);
    }
  }, [currentIndex, searchKanji, timerEnabled, words.length]);

  const hasAnsweredRef = useRef(false);
  useEffect(() => {
    hasAnsweredRef.current = false;
  }, [currentIndex, searchKanji]);

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
    if (searchKanji) fetchWords(searchKanji);
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

  const totalCount = words.length;
  const progress = totalCount > 0 ? Math.min(currentIndex + 1, totalCount) : 0;

  const handleAnswer = (
    result: "correct" | "incorrect",
    userAnswer: string,
    jukugo: string,
    meaning: string,
    kanji: string,
    correctAnswer: string,
    isTimeout = false,
  ) => {
    if (hasAnsweredRef.current) return;
    hasAnsweredRef.current = true;
    setHasAnswered(true);
    setAnswerHistory((prev) => [
      ...prev,
      {
        kanji,
        jukugo,
        meaning,
        userAnswer,
        correctAnswer,
        isCorrect: result === "correct",
      },
    ]);
    setTimerRunning(false);
    if (isTimeout) {
      setTimeout(() => {
        handleNext();
      }, 500);
    }
  };

  const handleTimeout = () => {
    if (!timerRunning || !searchKanji || hasAnsweredRef.current) {
      return;
    }
    setTimeout(() => {
      handleAnswer(
        "incorrect",
        "",
        words[currentIndex]?.written || "",
        meanings[currentIndex]?.toString() || "",
        searchKanji,
        words[currentIndex]?.pronounced || "",
        true,
      );
    }, 0);
  };

  return (
    <QuizLayout>
      <Sidebar
        features={[
          {
            key: "search",
            icon: (
              <span role="img" aria-label="Search">
                🔍
              </span>
            ),
            content: (
              <form onSubmit={handleSearch} className={styles.inputRow}>
                <Input
                  value={kanji}
                  onChange={(e) => {
                    setKanji(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter kanji"
                  disabled={loading}
                  maxLength={1}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Searching..." : "Search"}
                </Button>
              </form>
            ),
            label: "Search",
          },
          {
            key: "progress",
            icon: (
              <span role="img" aria-label="Progress">
                📈
              </span>
            ),
            content:
              searchKanji && totalCount > 0 ? (
                <ProgressTracker
                  kanji={searchKanji}
                  progress={progress}
                  totalCount={totalCount}
                />
              ) : null,
            label: "Progress",
          },
          {
            key: "refresh",
            icon: (
              <span role="img" aria-label="Refresh">
                🔄
              </span>
            ),
            label: "Refresh",
            action: handleNext,
            instant: true,
          },
          {
            key: "timer",
            icon: (
              <span role="img" aria-label="Timer">
                ⏲️
              </span>
            ),
            content:
              searchKanji && currentIndex < totalCount ? (
                <TimerButton
                  timerEnabled={timerEnabled}
                  timerRunning={timerRunning}
                  timerKey={timerKey}
                  onEnable={() => {
                    setTimerEnabled(true);
                    setTimerRunning(true);
                  }}
                  onDisable={() => {
                    setTimerEnabled(false);
                    setTimerRunning(false);
                  }}
                  onTimeout={handleTimeout}
                  duration={10}
                />
              ) : null,
            label: "Timer",
          },
          {
            key: "history",
            icon: (
              <span role="img" aria-label="History">
                🗂️
              </span>
            ),
            label: "History",
            action: () => setShowHistory((v) => !v),
            instant: true,
          },
        ]}
        defaultOpen="search"
      />
      <div className={styles.quizMainWrapper}>
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
            className={styles.historyWrapper}
          />
        )}

        {error && <div className={styles.feedback}>{error}</div>}

        {!searchKanji && !loading && (
          <div className={styles.complete}>
            Search a kanji to start the quiz.
          </div>
        )}

        {searchKanji && words.length === 0 && !loading && (
          <div className={styles.complete}>No results found.</div>
        )}
      </div>
    </QuizLayout>
  );
}
