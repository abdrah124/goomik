import React from "react";

export default function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 [480]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {children}
    </div>
  );
}
