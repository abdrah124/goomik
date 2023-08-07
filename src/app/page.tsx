import MangaList from "@/components/MangaList";
import { Stack } from "@mui/material";

export default async function Home() {
  return (
    <main>
      <div className="gap-2 flex flex-col">
        <MangaList title="Latest update" />
        <MangaList title="Popular manhwa" variant="popular" />
        <MangaList title="Top of the day" variant="trending" />
      </div>
    </main>
  );
}
