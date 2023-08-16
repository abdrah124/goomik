import React from "react";
import NextAuthProvider from "./SessionContext";
import RootTheme from "@/components/theme/RootTheme";
import { ThemePalleteMode } from "@/components/ThemeToggler";
import QueryProvider from "@/components/utils/QueryProvider";

export default function RootContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <RootTheme>
        <ThemePalleteMode>
          <QueryProvider>{children}</QueryProvider>
        </ThemePalleteMode>
      </RootTheme>
    </NextAuthProvider>
  );
}
