import React from "react";

export function CorrectIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 18 18"
      width={18}
      height={18}
      fill="none"
      aria-hidden="true"
      focusable={false}
      style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }}
      {...props}
    >
      <circle cx="9" cy="9" r="8" stroke="var(--green)" strokeWidth={1.5} />
      <polyline
        points="5.5 9.5 8 12 12.5 6.5"
        stroke="var(--green)"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function IncorrectIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 18 18"
      width={18}
      height={18}
      fill="none"
      aria-hidden="true"
      focusable={false}
      style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }}
      {...props}
    >
      <circle cx="9" cy="9" r="8" stroke="var(--red)" strokeWidth={1.5} />
      <line x1="6" y1="6" x2="12" y2="12" stroke="var(--red)" strokeWidth={1.8} strokeLinecap="round" />
      <line x1="12" y1="6" x2="6" y2="12" stroke="var(--red)" strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}
