import React from "react";
import NextAuthProvider from "./SessionContext";
import RootTheme from "@/components/theme/RootTheme";
import { ThemePalleteMode } from "@/components/ThemeToggler";
import QueryProvider from "@/components/utils/QueryProvider";
import ConfirmContext from "./ConfirmContext";

export default function RootContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <RootTheme>
        <ThemePalleteMode>
          <QueryProvider>
            <ConfirmContext>{children}</ConfirmContext>
          </QueryProvider>
        </ThemePalleteMode>
      </RootTheme>
    </NextAuthProvider>
  );
}
