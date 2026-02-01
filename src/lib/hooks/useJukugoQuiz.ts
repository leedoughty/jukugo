import { useState, useCallback } from "react";
import type { Variant } from "@/lib/types/jukugoData";
import { getQuizData } from "@/app/quiz/actions";

export function useJukugoQuiz(
  initialKanjiList: string[] = [],
  filterType?: string,
) {
  const [kanjiList] = useState(initialKanjiList);
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
  const [words, setWords] = useState<Variant[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pickRandomKanji = useCallback(
    async (list?: string[]) => {
      const sourceList = list ?? kanjiList;
      const result = await getQuizData(sourceList, filterType);

      if (!result) {
        setSelectedKanji(null);
        setWords([]);
        setMeanings([]);
        setCurrentIndex(0);
        return;
      }

      setSelectedKanji(result.kanji);
      setWords(result.variants);
      setMeanings(result.meanings);
      setCurrentIndex(0);
    },
    [kanjiList, filterType],
  );

  const handleNext = useCallback(() => {
    setCurrentIndex((index) => index + 1);
  }, []);

  return {
    kanjiList,
    selectedKanji,
    words,
    meanings,
    currentIndex,
    pickRandomKanji,
    handleNext,
  };
}
