import { useState, useCallback } from "react";
import type { Variant } from "@/lib/types/jukugoData";
import { fetchRandomizedJukugoQuizData } from "@/lib/utils/fetchRandomizedJukugoQuizData";

export function useJukugoQuiz(
  initialKanjiList: string[] = [],
  filter?: (variant: Variant, kanji: string) => boolean
) {
  const [kanjiList, setKanjiList] = useState(initialKanjiList);
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
  const [words, setWords] = useState<Variant[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pickRandomKanji = useCallback(
    async (list?: string[]) => {
      const sourceList = list ?? kanjiList;
      const result = await fetchRandomizedJukugoQuizData(sourceList, filter);

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
    [kanjiList, filter]
  );

  const handleNext = useCallback(() => {
    setCurrentIndex((index) => index + 1);
  }, []);

  return {
    kanjiList,
    setKanjiList,
    selectedKanji,
    words,
    meanings,
    currentIndex,
    pickRandomKanji,
    handleNext,
  };
}
