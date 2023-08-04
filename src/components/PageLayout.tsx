import React, { PropsWithChildren } from "react";

export default function PageLayout({ children }: PropsWithChildren) {
  return <main className="pt-16">{children}</main>;
}
