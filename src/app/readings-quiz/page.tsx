"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./jlpt-quiz.module.css";
import QuizCard from "./quizCard";
import KanjiPicker from "./kanjiPicker";
import JLPTLevelSelector from "./jlptLevelSelector";

type Meaning = { glosses: string[] };
type Variant = { written: string; pronounced: string; priorities?: string[] };
type Word = { meanings: Meaning[]; variants: Variant[] };

const JLPT_LEVELS = [1, 2, 3, 4, 5];

export default function JLPTQuiz() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [level, setLevel] = useState<number | null>(null);
  const [kanjiList, setKanjiList] = useState<string[]>([]);
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
  const [words, setWords] = useState<Variant[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<null | "correct" | "incorrect">(
    null
  );

  useEffect(() => {
    const levelParam = searchParams.get("level");
    if (levelParam) {
      const lvl = parseInt(levelParam, 10);
      setLevel(lvl);
      fetchKanjiList(lvl);
    }
  }, [searchParams]);

  const fetchKanjiList = async (jlptLevel: number) => {
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

    if (data.length > 0) {
      pickRandomKanji(data);
    }
  };

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
    setFeedback(null);
    setUserInput("");
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

  const handleLevelSelect = (newLevel: number) => {
    router.replace(`/readings-quiz?level=${newLevel}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectorRow}>
        <JLPTLevelSelector
          levels={JLPT_LEVELS}
          selected={level}
          onSelect={handleLevelSelect}
        />

        <KanjiPicker kanjiList={kanjiList} onPick={() => pickRandomKanji()} />
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
