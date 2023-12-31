"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { orderOptionsWithLabel } from "@/lib/orderOptions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function NavTabs() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const selectedTabsIndex = orderOptionsWithLabel.findIndex(
    (e) => e.option === searchParams.get("order_by")
  );
  const index = selectedTabsIndex === -1 ? 0 : selectedTabsIndex;

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Tabs value={index} variant="scrollable" scrollButtons="auto">
        {orderOptionsWithLabel.map((option) => (
          <Tab
            LinkComponent={Link}
            key={option.label}
            label={option.label}
            href={`/search?q=${q}&order_by=${option.option}`}
          />
        ))}
      </Tabs>
    </Box>
  );
}
