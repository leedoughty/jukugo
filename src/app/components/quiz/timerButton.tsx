"use client";

import React from "react";
import Timer from "./timer";
import styles from "./timerButton.module.css";
import { useTheme } from "@/app/ThemeProvider";

interface TimerButtonProps {
  timerEnabled: boolean;
  timerRunning: boolean;
  timerKey: number;
  onEnable: () => void;
  onDisable: () => void;
  onTimeout: () => void;
  duration?: number;
}

const TimerButton: React.FC<TimerButtonProps> = ({
  timerEnabled,
  timerRunning,
  timerKey,
  onEnable,
  onDisable,
  onTimeout,
  duration = 10,
}) => {
  const { dark } = useTheme();
  const buttonClass = dark
    ? `${styles.timerButton} ${styles.timerButtonDark}`
    : styles.timerButton;
  return !timerEnabled ? (
    <button type="button" className={buttonClass} onClick={onEnable}>
      Use timer
    </button>
  ) : (
    <Timer
      onTimeout={onTimeout}
      isRunning={timerRunning}
      keyReset={timerKey}
      duration={duration}
      onClick={onDisable}
    />
  );
};

export default TimerButton;
