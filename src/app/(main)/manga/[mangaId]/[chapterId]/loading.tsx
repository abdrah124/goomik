import PageLoader from "@/components/PageLoader";
import React from "react";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <div>
        <h1></h1>
        <PageLoader />
      </div>
    </main>
  );
}
