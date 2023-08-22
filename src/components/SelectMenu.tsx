"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { MangaChapterFull } from "@/models/manga";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const getChapterString = (id: string) =>
  id?.[0].toUpperCase() + id?.slice(1)?.split("-").join(" ");

export default function SelectMenu({ items }: { items: MangaChapterFull[] }) {
  const params = useParams();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    router.replace(`#${params.chapterId}`);
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
        <Typography variant="button" noWrap sx={{ maxWidth: 150 }}>
          {getChapterString(params.chapterId as string)}
        </Typography>
      </Button>
      <Menu
        id="select-menu"
        MenuListProps={{
          "aria-labelledby": "select-button",
        }}
        sx={{
          zIndex: 200,
          maxWidth: 280,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {items.map((chapter) => (
          <MenuItem
            divider
            key={chapter.id}
            onClick={handleClose}
            component={Link}
            id={chapter?.id}
            className="truncate max-w-full"
            href={`/manga/${params.mangaId}/${chapter.id}`}
          >
            <Typography variant="inherit" paragraph noWrap sx={{ m: 0 }}>
              {getChapterString(chapter?.id)}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
