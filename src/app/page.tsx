import MangaList from "@/components/MangaList";
import { Stack } from "@mui/material";

export default async function Home() {
  return (
    <main>
      <Stack direction="column" gap={2}>
        <MangaList title="Latest update" />
        <MangaList title="Popular manhwa" variant="popular" />
        <MangaList title="Top of the day" variant="trending" />
      </Stack>
    </main>
  );
}
