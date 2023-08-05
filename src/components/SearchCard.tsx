import { MangaDetailSimplified } from "@/models/manga";
import {
  Box,
  CardActionArea,
  Paper,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GenreBadges from "./GenreBadges";
import SearchCardTheme from "./theme/typographySearchCard";

export default function SearchCard({ data }: { data: MangaDetailSimplified }) {
  const { src, width, height } = data.cover_image;

  const tableContents = [
    {
      title: "Rating",
      content: data.rating,
    },
    {
      title: "Alternative",
      content: data.alternative_title,
    },
    {
      title: "Authors",
      content: data.authors,
    },
    {
      title: "Artists",
      content: data.artists,
    },
    {
      title: "Genres",
      content: data.genres,
    },
    {
      title: "Status",
      content: data.status,
    },
    {
      title: "Release",
      content: data.release_date,
    },
  ];

  return (
    <SearchCardTheme>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          gap: 2,
          paddingTop: 2,
          width: { md: "70%" },
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { md: "space-around" },
          alignItems: { xs: "center", md: "start" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: { md: "25%" },
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            href={`/manga/${data.id}`}
            sx={{
              textAlign: "center",
              fontWeight: 700,
              fontFamily: "var(--cabin)",
            }}
          >
            {data.title}
          </Typography>
          <CardActionArea
            component={Link}
            href={`/manga/${data.id}`}
            sx={{ width: "fit-content" }}
          >
            <Image
              src={src}
              width={width}
              height={height}
              alt={data.title}
              className="rounded-sm shadow-md shadow-[rgba(0,0,0,.5)]"
            />
          </CardActionArea>
        </Box>

        <TableContainer sx={{ maxWidth: 500, width: { md: "75%" } }}>
          <Table>
            <TableBody>
              {tableContents.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">
                    {row.title === "Genres" ? (
                      <GenreBadges genres={row.content as string[]} />
                    ) : row.title === "Rating" ? (
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="end"
                        gap={1}
                      >
                        <Rating
                          value={row.content as number}
                          readOnly
                          precision={0.5}
                        />
                        <Typography
                          variant="caption"
                          sx={{ fontSize: "0.875rem" }}
                        >
                          {row.content} / 5
                        </Typography>
                      </Stack>
                    ) : (
                      row.content
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </SearchCardTheme>
  );
}
