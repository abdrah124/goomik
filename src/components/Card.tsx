import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Rating } from "@mui/material";
import Link from "next/link";
import { MangaDetailSimplified } from "@/models/manga";

interface Props {
  data: MangaDetailSimplified;
}

export default function MangaCard({ data }: Props) {
  return (
    <Card
      sx={{
        minWidth: { xs: 140, sm: 170 },
        boxShadow: "none",
        scrollSnapAlign: "center",
      }}
      className="snap-center"
    >
      <CardActionArea LinkComponent={Link} href={`/manga/${data.id}`}>
        <CardMedia
          className="hover:brightness-75 rounded-md shadow-md shadow-[rgba(0,0,0,.2)] transition-all"
          component="img"
          height={data.cover_image.height}
          width={data.cover_image.width}
          image={data.cover_image.src}
          srcSet={data.cover_image.srcset}
          alt={data.title}
        />
      </CardActionArea>
      <Box
        sx={{
          paddingTop: 1,
        }}
      >
        <Link href={`/manga/${data.id}`}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontSize: { xs: 12 }, fontWeight: 500 }}
            gutterBottom
          >
            {data.title}
          </Typography>
        </Link>
        <Box display={"flex"} gap={1} justifyItems={"center"}>
          <Rating
            size="small"
            sx={{ fontSize: 16 }}
            name="manga-rating"
            value={data.rating}
            precision={0.5}
            readOnly
          />
          <Typography variant="caption" component="h5">
            {data.rating}
          </Typography>
        </Box>
      </Box>
      {/* <CardActions
        sx={{ paddingX: { xs: 1 }, paddingBottom: { xs: 1 }, width: "100%" }}
      >
        <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
          {data.chapter_list.map((e) => (
            <Link
              key={e.id}
              href={`/manga/${data.id}/${e.id}`}
              className="flex gap-1 w-full items-center"
            >
              <Chip
                sx={{ fontWeight: 700, fontSize: 10 }}
                label={"Chapter " + e.chapter}
                color="info"
                size="small"
              />

              {e.release_date === "new" ? <NewBadge /> : e.release_date}
            </Link>
          ))}
        </Stack>
      </CardActions> */}
    </Card>
  );
}
