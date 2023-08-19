import {
  ReadingHistory,
  useGetReadingHistory,
} from "@/context/ReadingHistoryContext";
import { getNormalizeHistory } from "@/lib/getNormalizeHistory";
import removeDuplicate from "@/lib/removeDuplicate";

export default function useGetNormalHistory() {
  const readingHistory = useGetReadingHistory();

  const items: ReadingHistory[] = removeDuplicate(readingHistory, "chapter");

  return getNormalizeHistory(items);
}
