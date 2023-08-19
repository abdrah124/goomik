import React from "react";

export default function HistoryGridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-md md:max-w-none">
      {children}
    </div>
  );
}
