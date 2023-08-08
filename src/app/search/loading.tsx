import React from "react";
import { Box, Paper, Skeleton, Stack } from "@mui/material";

const SkeletonWave = (props: any) => {
  return <Skeleton animation="wave" {...props} />;
};

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: 3,
        width: "100%",
        maxWidth: 768,
        marginX: "auto",
      }}
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <Paper
          elevation={11}
          key={item}
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
          <div className="w-[30%]">
            <SkeletonWave
              component="div"
              variant="rectangular"
              width="100%"
              sx={{
                display: "block",
                minWidth: 100,
                height: "auto",
                aspectRatio: "30 / 36",
              }}
              className="shadow-md shadow-[rgba(0,0,0,.1)] rounded-md"
            />
          </div>

          <Stack direction="column" gap={1} sx={{ flex: 1, maxWidth: "60%" }}>
            <SkeletonWave variant="text" sx={{ fontSize: 20 }}></SkeletonWave>
            <SkeletonWave width="70%"></SkeletonWave>
            <SkeletonWave width="70%"></SkeletonWave>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}
