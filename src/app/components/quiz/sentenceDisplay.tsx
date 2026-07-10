"use client";

import { useEffect, useState } from "react";
import styles from "./sentenceDisplay.module.css";
import Button from "../layout/button";
import { getExampleSentences } from "@/app/quiz/actions";
import type {
  ExampleSentence,
  ExampleSentencesResult,
} from "@/lib/types/exampleSentence";

const sentenceCache = new Map<string, ExampleSentence[]>();

const SLOW_THRESHOLD_MS = 8000;

function highlightTarget(japanese: string, jukugo: string) {
  const parts = japanese.split(jukugo);
  if (parts.length === 1) return japanese;
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <em key={i} className={styles.target}>
            {jukugo}
          </em>,
          part,
        ],
  );
}

export default function SentenceDisplay({ jukugo }: { jukugo: string }) {
  const [result, setResult] = useState<ExampleSentencesResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [slow, setSlow] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!jukugo) return;

    const cached = sentenceCache.get(jukugo);
    if (cached) {
      setResult({ status: "ok", sentences: cached });
      setLoading(false);
      setSlow(false);
      return;
    }

    let stale = false;
    setResult(null);
    setLoading(true);
    setSlow(false);
    const slowTimer = setTimeout(() => setSlow(true), SLOW_THRESHOLD_MS);

    const fetchSentences = async () => {
      let next: ExampleSentencesResult;
      try {
        next = await getExampleSentences(jukugo);
      } catch {
        next = { status: "error" };
      }
      if (!stale) {
        if (next.status === "ok") {
          sentenceCache.set(jukugo, next.sentences);
        }
        setResult(next);
        setLoading(false);
      }
    };

    fetchSentences();
    return () => {
      stale = true;
      clearTimeout(slowTimer);
    };
  }, [jukugo, retryCount]);

  if (!jukugo) return null;

  const sentence = result?.status === "ok" ? result.sentences[0] : undefined;

  return (
    <div className={styles.sentenceBlock} aria-live="polite">
      <span className={styles.label}>Example</span>
      {loading && (
        <span className={styles.message}>
          {slow
            ? "Still loading — the sentence service may be waking up."
            : "Loading example…"}
        </span>
      )}
      {result?.status === "error" && (
        <>
          <span className={styles.message}>
            Couldn&apos;t load an example sentence.
          </span>
          <Button
            className={styles.retry}
            onClick={() => setRetryCount((c) => c + 1)}
          >
            Retry
          </Button>
        </>
      )}
      {result?.status === "ok" &&
        (sentence ? (
          <>
            <p className={styles.japanese} lang="ja">
              {highlightTarget(sentence.japanese, jukugo)}
            </p>
            <p className={styles.english}>{sentence.english}</p>
          </>
        ) : (
          <span className={styles.message}>No example sentence found.</span>
        ))}
    </div>
  );
}
