"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { MangaChapterFull } from "@/models/manga";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Typography } from "@mui/material";

const getChapterString = (id: string) =>
  id?.[0].toUpperCase() + id?.slice(1)?.split("-").join(" ");

export default function SelectMenu({ items }: { items: MangaChapterFull[] }) {
  const params = useParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="select-button"
        aria-controls={open ? "select-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
      >
        <Typography variant="button" noWrap sx={{ width: 100 }}>
          {getChapterString(params.chapterId as string)}
        </Typography>
      </Button>
      <Menu
        id="select-menu"
        MenuListProps={{
          "aria-labelledby": "select-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {items.map((chapter) => (
          <MenuItem
            key={chapter.id}
            onClick={handleClose}
            component={Link}
            href={`/manga/${params.mangaId}/${chapter.id}`}
          >
            {getChapterString(chapter?.id)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}