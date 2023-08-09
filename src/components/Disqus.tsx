"use client";
import { config } from "@/lib/config";
import React from "react";
import { Comment } from "react-disqus-components";

const disqusShortName = "goomik";

export default function DisqusChapter({
  mangaId,
  chapterId,
}: {
  mangaId: string;
  chapterId: string;
}) {
  const disqusConfig = {
    url: `${config.baseWebUrl}/manga/${mangaId}/${chapterId}`,
    identifier: mangaId + "/" + chapterId,
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

export function DisqusManga({ mangaId }: { mangaId: string }) {
  const disqusConfig = {
    url: `${config.baseWebUrl}/manga/${mangaId}`,
    identifier: mangaId,
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
