import { Divider, Skeleton, Typography } from "@mui/material";
import React from "react";
import CardSkeleton from "./CardSkeleton";

export default function CardSlider({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string | React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col gap-1">
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 700,
          paddingLeft: "8px",
        }}
      >
        {title}
      </Typography>
      <Divider sx={{mb:2}}/>
      <div className=" overflow-x-auto w-full flex scroll-smooth snap-mandatory gap-2 snap-x hide-scrollbar px-2">
        {children}
      </div>
    </div>
  );
}

export const CardSliderSkeleton = () => {
  return   <CardSlider title={<Skeleton width="40%" animation="wave" />}>
      {[1,2,3,4,5,6,7,8,9,10].map(item => <CardSkeleton key={item} />)}
    </CardSlider>
 
}