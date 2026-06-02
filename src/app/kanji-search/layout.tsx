import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kanji Search — Jukugo",
  description: "Look up Japanese kanji compounds, readings, and meanings.",
};

export default function KanjiSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
