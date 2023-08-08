import {
  Box,
  Skeleton,
  SkeletonTypeMap,
  Stack,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Tabs,
  TableCell,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";

const SkeletonWave: OverridableComponent<SkeletonTypeMap<{}, "span">> = (
  props: any
) => {
  return <Skeleton animation="wave" {...props} />;
};

export default function MangaDetailLoading() {
  return (
    <>
      <Stack
        direction="column"
        alignItems="start"
        justifyContent="start"
        marginX="auto"
        width="100%"
        maxWidth={768}
      >
        <Stack
          direction="row"
          gap={2}
          paddingX={2}
          paddingY={1}
          width="100%"
          mb={3}
        >
          <SkeletonWave
            variant="rounded"
            component="div"
            sx={{ height: "auto", width: 120, aspectRatio: "30 / 42" }}
            className="rounded-md shadow-md"
          />

          <Stack direction="column" gap={1} width="70%" pr={1}>
            <SkeletonWave
              width="70%"
              height={18}
              variant="rounded"
            ></SkeletonWave>
            <SkeletonWave width="35%"></SkeletonWave>
            <SkeletonWave width="35%"></SkeletonWave>
            <SkeletonWave width="35%"></SkeletonWave>
            <SkeletonWave width="35%"></SkeletonWave>
          </Stack>
        </Stack>

        <Box
          sx={{
            overflowX: "auto",
            width: "100%",
          }}
          className="hide-scrollbar"
        >
          <Stack
            direction="row"
            gap={1}
            mt={2}
            paddingX={1}
            width="fit-content"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <SkeletonWave
                component="div"
                variant="rectangular"
                height={32}
                width={72}
                className="rounded-2xl"
                key={item}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ width: "100%", marginTop: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={0}>
              {[1, 2].map((tab, i) => (
                <Tab
                  label={<SkeletonWave width="100%" height="100%" />}
                  key={tab}
                />
              ))}
            </Tabs>
          </Box>
          <TableContainer>
            <Table>
              <TableBody>
                {[1, 2, 3, 4, 5].map((row) => (
                  <TableRow
                    key={row}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <SkeletonWave width="50%" />
                    </TableCell>
                    <TableCell align="right">
                      <SkeletonWave width="100%" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </>
  );
}
