"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./jlpt.module.css";
import StandardQuizPage from "@/app/components/quiz/standardQuizPage";
import { levelFeature } from "@/app/components/quiz/features";
import type { Variant } from "@/lib/types/jukugoData";

const JLPT_LEVELS = [1, 2, 3, 4, 5];

const jlptFilter = (variant: Variant, randomKanji: string) =>
  Array.isArray(variant.priorities) &&
  variant.priorities.length > 0 &&
  variant.written.includes(randomKanji);

function JlptQuiz() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const levelParam = searchParams.get("level");
  const level = levelParam ? parseInt(levelParam, 10) : null;
  const fetchSource = level ? `jlpt-${level}` : null;

  const handleLevelSelect = (newLevel: number) => {
    router.replace(`/quiz/jlpt?level=${newLevel}`);
  };

  const extraFeatures = useMemo(
    () => [
      levelFeature({
        levels: JLPT_LEVELS,
        selected: level,
        onSelect: handleLevelSelect,
        className: styles.selectorRow,
      }),
    ],
    [level],
  );

  return (
    <StandardQuizPage
      fetchSource={fetchSource}
      filter={jlptFilter}
      extraFeatures={extraFeatures}
    />
  );
}

export default function JlptQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JlptQuiz />
    </Suspense>
  );
}
