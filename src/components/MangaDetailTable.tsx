import { MangaDetailFull } from "@/models/manga";
import {
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
import React from "react";
import GenreBadges from "./GenreBadges";
import { DetailTableTheme } from "./theme/DetailTableTheme";

export default function MangaDetailTable({
  mangaDetails,
}: {
  mangaDetails: MangaDetailFull;
}) {
  const items = [
    {
      title: "Rating",
      content: `${mangaDetails.rating} / 5`,
    },
    {
      title: "Alternative",
      content: mangaDetails.alternative_title,
    },
    {
      title: "Author",
      content: mangaDetails.authors,
    },
    {
      title: "Artist",
      content: mangaDetails.artists,
    },
    {
      title: "Genre",
      content: mangaDetails.genres,
    },
    {
      title: "Type",
      content: mangaDetails.type,
    },
    { title: "Tags", content: mangaDetails.tags },
    {
      title: "Release",
      content: mangaDetails.release_date,
    },
    {
      title: "Status",
      content: mangaDetails.status,
    },
  ];

  return (
    <TableContainer sx={{ mt: 4 }}>
      <Table>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.title}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">
                {row.title === "Rating" ? (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="end"
                    gap={1}
                  >
                    <Rating
                      value={mangaDetails.rating}
                      readOnly
                      sx={{ fontSize: 19 }}
                      precision={0.5}
                    />
                    <Typography variant="caption" sx={{ fontSize: "0.875rem" }}>
                      {mangaDetails.rating} / 5
                    </Typography>
                  </Stack>
                ) : row.title === "Genre" ? (
                  <Stack
                    gap={1}
                    direction="row"
                    justifyContent="end"
                    flexWrap="wrap"
                  >
                    <GenreBadges
                      color="info"
                      size="small"
                      fontSize={10}
                      genres={mangaDetails.genres as string[]}
                    />
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
  );
}
