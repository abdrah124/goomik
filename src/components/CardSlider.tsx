import { Typography } from "@mui/material";
import React from "react";

export default function CardSlider({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="w-full flex flex-col gap-1">
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 700,
          paddingLeft: "8px",
          fontFamily: "var(--cabin)",
        }}
      >
        {title}
      </Typography>
      <div className=" overflow-x-auto w-full flex scroll-smooth snap-mandatory gap-2 snap-x hide-scrollbar px-2">
        {children}
      </div>
    </div>
  );
}
