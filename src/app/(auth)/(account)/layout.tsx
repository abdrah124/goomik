import DrawerAppBar from "@/components/AppBar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DrawerAppBar />
      <main className="w-full pt-16 sm:pt-20 pb-4">{children}</main>
    </>
  );
}
