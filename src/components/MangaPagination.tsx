"use client";

import { Box, Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function MangaPagination({
  total,
  sParams,
}: {
  total: number;
  sParams: string;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get(sParams)) || 1;

  return (
    <Box mt={2}>
      <Pagination
        page={page}
        count={Number((total / 12).toFixed(0))}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            href={`/${item.page === 0 ? "?l=2" : `?l=${item.page}`}`}
            {...item}
            scroll={false}
          />
        )}
      />
    </Box>
  );
}
