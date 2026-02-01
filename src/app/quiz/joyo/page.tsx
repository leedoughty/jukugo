import type { Metadata } from "next";
import { getKanjiList } from "@/app/quiz/actions";
import StandardQuizPage from "@/app/components/quiz/standardQuizPage";

export const metadata: Metadata = {
  title: "Joyo Quiz | Jukugo",
};

export default async function JoyoQuizPage() {
  const kanjiList = await getKanjiList("joyo");
  return <StandardQuizPage kanjiList={kanjiList} />;
}
