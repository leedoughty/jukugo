import ProgressTracker from "./progressTracker";
import TimerButton from "./timerButton";
import React from "react";
import LevelSelector from "./levelSelector";
import Input from "../layout/input";
import Button from "../layout/button";
import {
  ProgressIcon,
  RefreshIcon,
  TimerIcon,
  HistoryIcon,
  DeleteIcon,
  LevelIcon,
  SearchIcon,
} from "./sidebarIcons";

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
    icon: <ProgressIcon />,
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
    icon: <RefreshIcon />,
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
    icon: <TimerIcon />,
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
    icon: <HistoryIcon />,
    label: "History",
    action: () => setShowHistory((v) => !v),
    instant: true,
  };
}

export function deleteFeature({ onDelete }: { onDelete: () => void }) {
  return {
    key: "delete",
    icon: <DeleteIcon />,
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
    icon: <LevelIcon />,
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
    icon: <SearchIcon />,
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
