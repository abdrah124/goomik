import * as React from "react";
import Button from "@mui/material/Button";
import MenuMui from "@mui/material/Menu";
import MenuMuiItem from "@mui/material/MenuItem";
import Link from "next/link";

export default function Menu({
  items,
  title,
}: {
  items: string[];
  title: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="nav-button"
        aria-controls={open ? "nav-MenuMui" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "#fff" }}
      >
        {title}
      </Button>
      <MenuMui
        id="nav-MenuMui"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "nav-button",
        }}
      >
        {items.map((item) => (
          <MenuMuiItem
            onClick={handleClose}
            key={item}
            component={Link}
            href={`/${item.toLowerCase().split(" ").join("")}`}
          >
            {item}
          </MenuMuiItem>
        ))}
      </MenuMui>
    </>
  );
}
