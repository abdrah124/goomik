"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MangaChapterList from "./MangaChapterList";
import { MangaDetailFull } from "@/models/manga";
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MangaDescription from "./MangaDescription";
import MangaDetailTable from "./MangaDetailTable";
import { DisqusManga } from "./Disqus";
import { useParams } from "next/navigation";
import BookmarkBtn from "./BookmarkBtn";

const tabs = ["Details", "Chapters"];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const md = useMediaQuery("(min-width:768px)");
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={md ? false : value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="md:w-full"
    >
      {(md ? true : value === index) && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MangaDetailTab({
  mangaDetails,
}: {
  mangaDetails: MangaDetailFull;
}) {
  const md = useMediaQuery("(min-width:768px)");
  const theme = useTheme();
  const params = useParams();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: 2,
          display: md ? "flex" : "block",
          gap: md ? 2 : 0,
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: md ? "none" : "flex",
            justifyContent: "space-between",
          }}
        >
          <Tabs value={value} onChange={handleChange} aria-label="manga tabs">
            {tabs.map((tab, i) => (
              <Tab label={tab} color="warning" key={tab} {...a11yProps(i)} />
            ))}
          </Tabs>
          <BookmarkBtn id={mangaDetails.id} />
        </Box>
        {md ? (
          <span
            className={`fixed top-20 right-4 z-10 ${
              theme.palette.mode === "dark" ? "bg-zinc-900" : "bg-white"
            } rounded-md px-2 py-1 shadow-md shadow-[rgba(0,0,0,.3)] pr-4`}
          >
            <BookmarkBtn id={mangaDetails?.id} />
            <Typography variant="button">Bookmark</Typography>
          </span>
        ) : (
          ""
        )}
        <CustomTabPanel value={value} index={0}>
          <Stack direction="column">
            <MangaDescription desc={mangaDetails?.description ?? ""} />
            <MangaDetailTable mangaDetails={mangaDetails} />
            {md ? "" : <DisqusManga mangaId={params.mangaId as string} />}
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {md ? (
            <div className="max-h-[600px] overflow-y-auto hide-scrollbar">
              <MangaChapterList mangaDetails={mangaDetails} />
            </div>
          ) : (
            <MangaChapterList mangaDetails={mangaDetails} />
          )}
        </CustomTabPanel>
      </Box>
      {md ? (
        <div className="w-full flex justify-center items-center">
          <DisqusManga mangaId={params.mangaId as string} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
