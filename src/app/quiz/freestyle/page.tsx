import type { Metadata } from "next";
import { getKanjiList } from "@/app/quiz/actions";
import StandardQuizPage from "@/app/components/quiz/standardQuizPage";

export const metadata: Metadata = {
  title: "Freestyle Quiz | Jukugo",
};

export default async function FreestyleQuizPage() {
  const kanjiList = await getKanjiList("all");
  return <StandardQuizPage kanjiList={kanjiList} />;
}
