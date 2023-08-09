import * as React from "react";
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
    <div className="snap-center min-w-[140px] sm:min-w-[170px]">
      <CardActionArea LinkComponent={Link} href={`/manga/${data.id}`}>
        <CardMedia
          className="hover:brightness-75 rounded-md shadow-md shadow-[rgba(0,0,0,.05)] transition-all"
          component="img"
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
    </div>
  );
}
