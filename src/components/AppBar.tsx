"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, ListItemIcon, Paper, alpha, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import SearchSelect from "./SearchSelect";
import ThemeToggler from "./ThemeToggler";
import GSVG from "/g.svg";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const drawerWidth = 240;
const navItems = ["Home", "Latest", "Popular", "Genre"];

export default function DrawerAppBar(props: Props) {
  const router = useRouter();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [input, setInput] = React.useState<string>("");

  const getHref = (str: string) => {
    if (str === "Home") return "/";
    if (["Latest", "Popular"].some((e) => e === str))
      return `/search?q=&order_by=${
        str.toLowerCase() === "popular" ? "trending" : str.toLowerCase()
      }`;
    return `/${str.toLowerCase()}`;
  };

  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    router.push(`/search?q=${input}`);
    setInput("");
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h5"
        sx={{ my: 2, fontFamily: "var(--quicksand)", fontWeight: 700 }}
      >
        Gooscans
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            disablePadding
            component={Link}
            href={getHref(item)}
            key={item}
          >
            <ListItemButton
              sx={{
                "& .MuiTypography-root": {
                  textAlign: "center",
                  fontWeight: 500,
                },
              }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontFamily: "var(--quicksand)",
              fontWeight: 700,
            }}
          >
            Gooscans
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navItems.map((item) => (
              <Link key={item} href={getHref(item)}>
                <Button sx={{ color: "#fff" }}>{item}</Button>
              </Link>
            ))}
          </Box>
          <Search
            onSubmit={(e) => handleSubmit(e)}
            style={{ position: "relative" }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
            <SearchSelect input={input} onListClick={setInput} />
          </Search>
          <ThemeToggler />
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
