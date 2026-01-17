import React, { useEffect, useRef, useState } from "react";
import styles from "./timer.module.css";

interface TimerProps {
  duration: number;
  onTimeout: () => void;
  isRunning: boolean;
  keyReset?: any;
  onClick?: () => void;
}

export const TIMER_MIN = 5;
export const TIMER_MAX = 15;
export const TIMER_DEFAULT = 10;

const Timer: React.FC<TimerProps> = ({
  duration,
  onTimeout,
  isRunning,
  keyReset,
  onClick,
}) => {
  const safeDuration =
    typeof duration === "number" && duration > 0 ? duration : TIMER_DEFAULT;
  const [timeLeft, setTimeLeft] = useState(safeDuration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(safeDuration);
  }, [keyReset, safeDuration]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, onTimeout, keyReset, safeDuration]);

  return (
    <div
      className={styles.timerWrapper}
      aria-label="Timer"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div
        className={styles.timerBar}
        style={{
          width: `${safeDuration > 0 ? (timeLeft / safeDuration) * 100 : 0}%`,
        }}
      />
      <span className={styles.timerText}>
        {!isNaN(timeLeft) && timeLeft >= 0 ? timeLeft : 0}s
      </span>
    </div>
  );
};

export default Timer;
