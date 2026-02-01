import { getKanjiList } from "@/app/quiz/actions";
import StandardQuizPage from "@/app/components/quiz/standardQuizPage";

export default async function FreestyleQuizPage() {
  const kanjiList = await getKanjiList("all");
  return <StandardQuizPage kanjiList={kanjiList} />;
}
