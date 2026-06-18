import { useReducer, useState, useCallback } from "react";
import type { Variant } from "@/lib/types/jukugoData";
import { getQuizData } from "@/app/quiz/actions";

type QuizState = {
  selectedKanji: string | null;
  words: Variant[];
  meanings: string[];
  currentIndex: number;
};

type QuizAction =
  | { type: "loaded"; kanji: string; words: Variant[]; meanings: string[] }
  | { type: "cleared" }
  | { type: "next" };

const initialState: QuizState = {
  selectedKanji: null,
  words: [],
  meanings: [],
  currentIndex: 0,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "loaded":
      return {
        selectedKanji: action.kanji,
        words: action.words,
        meanings: action.meanings,
        currentIndex: 0,
      };
    case "cleared":
      return initialState;
    case "next":
      return { ...state, currentIndex: state.currentIndex + 1 };
    default:
      return state;
  }
}

export function useJukugoQuiz(
  initialKanjiList: string[] = [],
  filterType?: string,
) {
  const [kanjiList] = useState(initialKanjiList);
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const pickRandomKanji = useCallback(
    async (list?: string[]) => {
      const sourceList = list ?? kanjiList;
      const result = await getQuizData(sourceList, filterType);

      if (!result) {
        dispatch({ type: "cleared" });
        return;
      }

      dispatch({
        type: "loaded",
        kanji: result.kanji,
        words: result.variants,
        meanings: result.meanings,
      });
    },
    [kanjiList, filterType],
  );

  const handleNext = useCallback(() => {
    dispatch({ type: "next" });
  }, []);

  return {
    kanjiList,
    selectedKanji: state.selectedKanji,
    words: state.words,
    meanings: state.meanings,
    currentIndex: state.currentIndex,
    pickRandomKanji,
    handleNext,
  };
}
