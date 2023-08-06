import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { SxProps, Theme } from "@mui/material";

export default function PageBreadcrumbs({
  items,
  sx,
}: {
  items: { href: string; title: string }[];
  sx?: SxProps<Theme> | undefined;
}) {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ ...sx }} component="div">
      {items.map((item) => (
        <Link
          component={NextLink}
          underline="hover"
          sx={{ fontSize: { xs: 12, md: 16 }, fontWeight: 500 }}
          color="inherit"
          href={item.href}
          key={item.title + item.href}
        >
          {item.title}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
