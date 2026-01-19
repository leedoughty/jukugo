import ProgressTracker from "./progressTracker";
import TimerButton from "./timerButton";
import React from "react";
import LevelSelector from "./levelSelector";
import Input from "../layout/input";
import Button from "../layout/button";

export function progressFeature({
  selectedKanji,
  progress,
  totalCount,
}: {
  selectedKanji: string;
  progress: number;
  totalCount: number;
}) {
  return {
    key: "progress",
    icon: (
      <span role="img" aria-label="Progress">
        📈
      </span>
    ),
    content: selectedKanji ? (
      <ProgressTracker
        kanji={selectedKanji}
        progress={progress}
        totalCount={totalCount}
      />
    ) : null,
    label: "Progress",
  };
}

export function refreshFeature({ onRefresh }: { onRefresh: () => void }) {
  return {
    key: "refresh",
    icon: (
      <span role="img" aria-label="Refresh">
        🔄
      </span>
    ),
    label: "Refresh",
    action: onRefresh,
    instant: true,
  };
}

export function timerFeature({
  currentIndex,
  totalCount,
  timerEnabled,
  timerRunning,
  timerKey,
  setTimerEnabled,
  setTimerRunning,
  handleTimeout,
}: {
  currentIndex: number;
  totalCount: number;
  timerEnabled: boolean;
  timerRunning: boolean;
  timerKey: number | string;
  setTimerEnabled: (enabled: boolean) => void;
  setTimerRunning: (running: boolean) => void;
  handleTimeout: () => void;
}) {
  return {
    key: "timer",
    icon: (
      <span role="img" aria-label="Timer">
        ⏲️
      </span>
    ),
    content:
      currentIndex < totalCount ? (
        <TimerButton
          timerEnabled={timerEnabled}
          timerRunning={timerRunning}
          timerKey={typeof timerKey === "number" ? timerKey : Number(timerKey)}
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
  };
}

export function historyFeature({
  setShowHistory,
}: {
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return {
    key: "history",
    icon: (
      <span role="img" aria-label="History">
        🗂️
      </span>
    ),
    label: "History",
    action: () => setShowHistory((v) => !v),
    instant: true,
  };
}

export function deleteFeature({ onDelete }: { onDelete: () => void }) {
  return {
    key: "delete",
    icon: (
      <span role="img" aria-label="Delete">
        🗑️
      </span>
    ),
    label: "Delete",
    action: onDelete,
    instant: true,
  };
}

export function levelFeature({
  levels,
  selected,
  onSelect,
  className,
}: {
  levels: number[];
  selected: number | null;
  onSelect: (level: number) => void;
  className?: string;
}) {
  return {
    key: "level",
    icon: (
      <span role="img" aria-label="Level">
        🎚️
      </span>
    ),
    content: (
      <div className={className}>
        <LevelSelector
          levels={levels}
          selected={selected}
          onSelect={onSelect}
        />
      </div>
    ),
    label: "Level",
  };
}

export function searchFeature({
  kanji,
  setKanji,
  error,
  setError,
  loading,
  handleSearch,
  styles,
}: {
  kanji: string;
  setKanji: (value: string) => void;
  error: string;
  setError: (value: string) => void;
  loading: boolean;
  handleSearch: (e: React.FormEvent) => void;
  styles: { [key: string]: string };
}) {
  return {
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
  };
}
