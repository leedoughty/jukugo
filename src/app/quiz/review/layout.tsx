import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review — Jukugo",
  description: "Review the kanji compounds you answered incorrectly.",
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
