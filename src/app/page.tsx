import MangaList from "@/components/MangaList";

export default async function Home() {
  return (
    <main>
      <div className="gap-2 flex flex-col">
        <MangaList title="Latest update" />
        <MangaList title="Popular manhwa" variant="popular" />
        <MangaList title="Top of the day" variant="trending" />
        <MangaList title="Random manhwa" variant="latest" page={Math.floor(Math.random() * 50) + 50} />
      </div>
    </main>
  );
}
