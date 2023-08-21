import { config } from "@/lib/config";
import getDate from "@/lib/getDate";
import { UserBookmark } from "@/models/user";
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function UserBookmarksCard({ data }: { data: UserBookmark }) {
  return (
    <Stack
      direction="column"
      gap={2}
      component={Paper}
      elevation={6}
      p={3}
      sx={{ borderRadius: 2 }}
    >
      <Stack direction="row" gap={2}>
        <Avatar
          src={data?.image ?? ""}
          alt={data?.name ?? ""}
          sx={{ width: 70, height: 70 }}
        />
        <Stack direction="column" gap={1}>
          <Typography variant="h6" component="h2">
            {data?.name}
          </Typography>
          <Typography variant="subtitle2" component="p">
            {data?.email}
          </Typography>
        </Stack>
      </Stack>
      <List
        component="div"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full"
      >
        {data?.bookmarks?.map((bookmark) => (
          <ListItem
            component={Link}
            href={`${config.baseWebUrl}/manga/${bookmark.comicId}`}
            key={bookmark.comicId}
            alignItems="flex-start"
          >
            <ListItemText
              primary={
                bookmark.comicId[0].toUpperCase() +
                bookmark.comicId
                  .slice(1)
                  .split("-")
                  .join(" ")
                  .split("online")[0]
              }
              secondary={getDate(bookmark.createdAt as unknown as number)}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
