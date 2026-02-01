import type { Metadata } from "next";
import { getKanjiList } from "@/app/quiz/actions";
import StandardQuizPage from "@/app/components/quiz/standardQuizPage";

export const metadata: Metadata = {
  title: "JLPT Quiz | Jukugo",
};

type Props = {
  searchParams: Promise<{ level?: string }>;
};

export default async function JlptQuizPage({ searchParams }: Props) {
  const { level } = await searchParams;
  const isAll = level === "all";
  const levelNum = !isAll && level ? parseInt(level, 10) : null;

  let kanjiList: string[] = [];
  if (isAll) {
    const lists = await Promise.all(
      [1, 2, 3, 4, 5].map((l) => getKanjiList(`jlpt-${l}`)),
    );
    kanjiList = [...new Set(lists.flat())];
  } else if (levelNum) {
    kanjiList = await getKanjiList(`jlpt-${levelNum}`);
  }

  return (
    <StandardQuizPage
      kanjiList={kanjiList}
      filterType="jlpt"
      levelConfig={{
        levels: [1, 2, 3, 4, 5, 0],
        selected: isAll ? 0 : levelNum,
      }}
    />
  );
}
