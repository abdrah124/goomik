"use client";

import {
  Box,
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
  SxProps,
  Theme,
} from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function MangaPagination({
  total,
  sx,
  path,
  query,
}: {
  total: number;
  sx?: SxProps<Theme> | undefined;
  query: Record<string, string> & { page: string };
  /**
   * start with / and end with no '/'
   */
  path: string;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const getPath: (item: PaginationRenderItemParams) => string = (
    item: PaginationRenderItemParams
  ) => {
    return `${path}?${Object.entries(query)
      .map(([key, value]) => {
        if (key === "page")
          return `${item.page === 0 ? "page=2" : `page=${item.page}`}`;
        return `${key}=${value}`;
      })
      .join("&")}`;
  };

  return (
    <Box mt={2} sx={{ ...sx }}>
      <Pagination
        page={page}
        count={Number((total / 12).toFixed(0))}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            href={getPath(item)}
            {...item}
            scroll={false}
          />
        )}
      />
    </Box>
  );
}
