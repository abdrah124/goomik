import React from "react";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { mangaId: string };
}) {
  return <main className="w-full">{children}</main>;
}
