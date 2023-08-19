import React from "react";

export default function BookmarkGridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
      {children}
    </div>
  );
}
