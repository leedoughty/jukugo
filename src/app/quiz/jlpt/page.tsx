import { getKanjiList } from "@/app/quiz/actions";
import StandardQuizPage from "@/app/components/quiz/standardQuizPage";

type Props = {
  searchParams: Promise<{ level?: string }>;
};

export default async function JlptQuizPage({ searchParams }: Props) {
  const { level } = await searchParams;
  const levelNum = level ? parseInt(level, 10) : null;
  const kanjiList = levelNum ? await getKanjiList(`jlpt-${levelNum}`) : [];

  return (
    <StandardQuizPage
      kanjiList={kanjiList}
      filterType="jlpt"
      levelConfig={{ levels: [1, 2, 3, 4, 5], selected: levelNum }}
    />
  );
}
