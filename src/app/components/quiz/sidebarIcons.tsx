import React from "react";

const defaults: React.SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ProgressIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" {...defaults} {...props}>
      <polyline points="2 16 7 9 11 12 18 4" fill="none" />
      <polyline points="14 4 18 4 18 8" fill="none" />
    </svg>
  );
}

export function RefreshIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 15.79 15.79"
      width={20}
      height={20}
      aria-hidden="true"
      focusable={false}
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

export function TimerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" {...defaults} {...props}>
      <circle cx="10" cy="11" r="7" fill="none" />
      <line x1="10" y1="11" x2="10" y2="7.5" />
      <line x1="10" y1="11" x2="13" y2="11" />
      <line x1="8" y1="2" x2="12" y2="2" />
    </svg>
  );
}

export function HistoryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" {...defaults} {...props}>
      <rect x="3" y="2" width="14" height="16" rx="1" fill="none" />
      <line x1="6.5" y1="6" x2="13.5" y2="6" />
      <line x1="6.5" y1="10" x2="13.5" y2="10" />
      <line x1="6.5" y1="14" x2="10.5" y2="14" />
    </svg>
  );
}

export function DeleteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" {...defaults} {...props}>
      <path d="M4 5h12" />
      <path
        d="M5.5 5v11a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V5"
        fill="none"
      />
      <path d="M8 3h4a1 1 0 0 1 1 1v1H7V4a1 1 0 0 1 1-1z" fill="none" />
      <line x1="8.5" y1="8.5" x2="8.5" y2="14" />
      <line x1="11.5" y1="8.5" x2="11.5" y2="14" />
    </svg>
  );
}

export function LevelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" {...defaults} {...props}>
      <line x1="4" y1="3" x2="4" y2="17" />
      <line x1="10" y1="3" x2="10" y2="17" />
      <line x1="16" y1="3" x2="16" y2="17" />
      <circle cx="4" cy="13" r="2" fill="currentColor" stroke="none" />
      <circle cx="10" cy="7" r="2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" {...defaults} {...props}>
      <circle cx="8.5" cy="8.5" r="5.5" fill="none" />
      <line x1="12.5" y1="12.5" x2="17.5" y2="17.5" />
    </svg>
  );
}

export function SentenceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" {...defaults} {...props}>
      <path d="M3 3.5h14v10H8l-4 3.5v-3.5H3z" fill="none" />
      <line x1="6.5" y1="7" x2="13.5" y2="7" />
      <line x1="6.5" y1="10" x2="11.5" y2="10" />
    </svg>
  );
}
