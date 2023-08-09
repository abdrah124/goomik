import { Box, Typography } from "@mui/material";
import React from "react";

export default function Page() {
  return (
    <Box px={3}>
      <Typography
        variant="h4"
        align="center"
        component="h1"
        sx={{ fontWeight: 700, mb:5 }}
      >
        Genres
      </Typography>
    </Box>
  );
}
