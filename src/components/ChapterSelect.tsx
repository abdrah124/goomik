"use client";
import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MangaChapterFull } from "@/models/manga";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name: string, chapter: string[], theme: Theme) {
  return {
    fontWeight:
      chapter.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ChapterSelect({
  items,
}: {
  items: MangaChapterFull[];
}) {
  const theme = useTheme();
  const [chapter, setChapter] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof chapter>) => {
    const {
      target: { value },
    } = event;
    setChapter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ maxWidth: 300 }}>
        <InputLabel>Chapter</InputLabel>
        <Select
          multiple
          value={chapter}
          onChange={handleChange}
          input={<OutlinedInput label="Chapter" />}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              style={getStyles("Chapter: " + item.chapter, chapter, theme)}
            >
              {item.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
