import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import {
  AccountCircle,
  Bookmark,
  Home,
  SupervisedUserCircle,
} from "@mui/icons-material";
import Link from "next/link";

const pages = [
  { label: "Dashboard", icon: <Home /> },
  { label: "Account", icon: <AccountCircle /> },
  { label: "User", icon: <SupervisedUserCircle /> },
];
const subPage = [""];

export const mainListItems = (
  <React.Fragment>
    {pages.map((page) => (
      <ListItemButton
        LinkComponent={Link}
        href={`/dashboard/${
          page.label === "Dashboard" ? "" : page.label.toLowerCase()
        }`}
        key={page.label}
      >
        <ListItemIcon>{page.icon}</ListItemIcon>
        <ListItemText primary={page.label} />
      </ListItemButton>
    ))}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      User Library
    </ListSubheader>
    <ListItemButton LinkComponent={Link} href="/dashboard/bookmark">
      <ListItemIcon>
        <Bookmark />
      </ListItemIcon>
      <ListItemText primary="Bookmark" />
    </ListItemButton>
  </React.Fragment>
);
