"use client";

import styles from "./kanjiRefresh.module.css";
import { useTheme } from "@/app/ThemeProvider";

type Props = {
  onPick: () => void;
};

export default function KanjiRefresh({ onPick }: Props) {
  const { dark } = useTheme();

  return (
    <button
      className={`${styles.pickButton} ${dark ? styles.pickButtonDark : ""}`}
      onClick={onPick}
      aria-label="Pick Random Word"
      type="button"
    >
      <span aria-hidden="true">
        <RefreshIcon />
      </span>
    </button>
  );
}

function RefreshIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15.79 15.79"
      width={24}
      height={24}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M0,10.93c0-.44.27-.81.72-.81h4.28c.4,0,.68.43.67.75-.02.4-.34.72-.75.72h-2.37c.41.42.74.79,1.17,1.16,1.84,1.58,4.39,2,6.7,1.03,2.03-.85,3.57-2.81,3.84-5.12.05-.42.29-.76.75-.76.39,0,.79.33.75.78-.19,2.01-1.17,3.84-2.67,5.16-3.08,2.7-7.73,2.59-10.67-.26l-.93-.9v2.38c-.01.41-.37.74-.74.73-.4,0-.74-.31-.74-.73v-4.12Z"
        fill="currentColor"
      />
      <path
        d="M10.86,5.67c-.44,0-.73-.35-.74-.71-.01-.39.29-.76.71-.76h2.41c-.36-.38-.65-.69-1.01-1.02-1.83-1.67-4.43-2.16-6.79-1.2-2.1.85-3.67,2.86-3.93,5.23-.04.38-.32.66-.68.68-.33.03-.79-.22-.76-.64C.17,5.16,1.2,3.25,2.75,1.91c3.11-2.68,7.73-2.49,10.67.36l.88.86V.68C14.33.28,14.7,0,15.05,0c.39,0,.74.3.74.74v4.19c0,.39-.31.74-.71.74h-4.22Z"
        fill="currentColor"
      />
    </svg>
  );
}
