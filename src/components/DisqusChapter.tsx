"use client";
import { config } from "@/lib/config";
import React from "react";
import { Comment } from "react-disqus-components";

export default function DisqusChapter({
  mangaId,
  chapterId,
}: {
  mangaId: string;
  chapterId: string;
}) {
  const disqusShortName = "goomik";
  const disqusConfig = {
    url: `${config.baseWebUrl}/manga/${mangaId}/${chapterId}`,
    identifier: mangaId.includes("-online-reading")
      ? mangaId.split("-online-reading")[0]
      : mangaId + "/" + chapterId,
    title: mangaId[0].toUpperCase() + mangaId.slice(1).split("-").join(" "),
  };

  return (
    <Comment
      shortname={disqusShortName}
      title={disqusConfig.title}
      identifier={disqusConfig.identifier}
      url={disqusConfig.url}
    />
  );
}
