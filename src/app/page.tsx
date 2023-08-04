import { CardSkeletonList } from "@/components/CardSkeleton";
import MangaList from "@/components/MangaList";
import { Typography } from "@mui/material";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { l: string };
}) {
  return (
    <main className="px-4">
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        Latest manga update
      </Typography>

      <MangaList l={searchParams.l} />
    </main>
  );
}
