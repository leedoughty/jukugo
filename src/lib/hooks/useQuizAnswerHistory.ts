import { useState } from "react";
import type { AnswerHistoryItem } from "@/lib/types/answerHistoryItem";

export function useQuizAnswerHistory() {
  const [answerHistory, setAnswerHistory] = useState<AnswerHistoryItem[]>([]);

  const addAnswer = (item: AnswerHistoryItem) => {
    setAnswerHistory((prev) => [...prev, item]);
  };

  return { answerHistory, addAnswer, setAnswerHistory };
}
