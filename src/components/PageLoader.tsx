import { CircularProgress } from "@mui/material";
import React from "react";

export default function PageLoader() {
  return (
    <div className="w-full h-screen absolute inset-0 flex justify-center items-center">
      <CircularProgress />
    </div>
  );
}
