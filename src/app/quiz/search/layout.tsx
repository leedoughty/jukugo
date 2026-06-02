import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Quiz — Jukugo",
  description: "Search a kanji and quiz yourself on its compounds.",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
