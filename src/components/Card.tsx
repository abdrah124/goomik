import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardActionArea,
  CardActions,
  Chip,
  Rating,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { MangaDetailSimplified } from "@/models/manga";
import NewBadge from "./NewBadge";

interface Props {
  data: MangaDetailSimplified;
}

export default function MangaCard({ data }: Props) {
  return (
    <Card sx={{ minWidth: { xs: 140, sm: 170 } }}>
      <CardActionArea LinkComponent={Link} href={`/manga/${data.id}`}>
        <CardMedia
          className="hover:brightness-75 transition-all"
          component="img"
          height={data.cover_image.height}
          width={data.cover_image.width}
          image={data.cover_image.src}
          srcSet={data.cover_image.srcset}
          alt={data.title}
        />
      </CardActionArea>
      <CardContent
        sx={{
          paddingX: { xs: 1 },
          paddingTop: { xs: 1 },
          paddingBottom: 0,
        }}
      >
        <Link href={`/manga/${data.id}`}>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{ fontSize: { xs: 13 } }}
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
      </CardContent>
      <CardActions
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
      </CardActions>
    </Card>
  );
}
