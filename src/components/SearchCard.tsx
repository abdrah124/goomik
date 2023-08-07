import { MangaDetailSimplified } from "@/models/manga";
import {
  CardActionArea,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SearchCard({ data }: { data: MangaDetailSimplified }) {
  const { src, width, height } = data.cover_image;

  return (
    <Paper
      elevation={11}
      sx={{
        display: "flex",
        gap: 2,
        padding: 1.2,
        borderRadius: 2,
        width: "100%",
        maxWidth: 400,
        flexDirection: "row",
      }}
    >
      <CardActionArea
        component={Link}
        href={`/manga/${data.id}`}
        sx={{
          width: "fit-content",
          alignSelf: "center",
          display: "flex",
        }}
      >
        <Image
          src={src}
          width={width}
          height={height}
          alt={data.title}
          className="shadow-md h-auto min-w-[90px] max-w-[100px] shadow-[rgba(0,0,0,.1)] rounded-md"
        />
      </CardActionArea>
      <Stack direction="column" gap={1} sx={{ flex: 1, maxWidth: "60%" }}>
        <Typography
          variant="subtitle1"
          component={Link}
          href={`/manga/${data.id}`}
          sx={{ fontWeight: 700, width: "100%" }}
          noWrap
          title={data.title}
        >
          {data.title}
        </Typography>
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ fontWeight: 600, width: "100%", fontSize: "0.75rem" }}
        >
          Authors: {data.authors}
        </Typography>
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ fontWeight: 700, width: "100%", fontSize: "0.75rem" }}
        >
          Artists: {data.artists}
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <Rating
            value={data.rating}
            readOnly
            sx={{ fontSize: 16 }}
            precision={0.5}
          />
          <Typography
            variant="subtitle2"
            sx={{ fontSize: "0.75rem", fontWeight: 700 }}
          >
            {data.rating} / 5
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
