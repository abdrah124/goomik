import NavTabs from "@/components/NavTabs";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full">
      <NavTabs />
      {children}
    </main>
  );
}
