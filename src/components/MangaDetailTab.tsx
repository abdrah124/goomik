"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MangaChapterList from "./MangaChapterList";
import { MangaDetailFull } from "@/models/manga";
import { Stack } from "@mui/material";
import MangaDescription from "./MangaDescription";
import MangaDetailTable from "./MangaDetailTable";

const tabs = ["Details", "Chapters"];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="manga tabs">
          {tabs.map((tab, i) => (
            <Tab
              label={tab}
              key={tab}
              {...a11yProps(i)}
              sx={{ fontFamily: "var(--quicksand)" }}
            />
          ))}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Stack direction="column" padding={1}>
          <MangaDetailTable mangaDetails={mangaDetails} />{" "}
          <MangaDescription desc={mangaDetails.description ?? ""} />
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MangaChapterList mangaDetails={mangaDetails} />
      </CustomTabPanel>
    </Box>
  );
}
