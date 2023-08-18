import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="w-full p-4">{children}</main>;
}
