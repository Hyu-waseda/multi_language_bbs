import {
  AppBar,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import styles from "./Header.module.scss";
import { LANGUAGES } from "../../../const";
import { createURL } from "../../../utils/createUrl";
import Cookies from "js-cookie";

interface HeaderProps {
  lang: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const handleLanguageChange = (value: string) => {
    Cookies.set("selectedLanguage", value);

    const currentPath = window.location.pathname;
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("lang", value);

    const newUrl = createURL(currentPath, currentParams);
    window.location.href = newUrl;
  };

  return (
    <AppBar position="sticky" className={styles.header}>
      <Toolbar sx={{ flexGrow: 1 }}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">ヘッダータイトル</Typography>

        <FormControl className={styles.formControl}>
          <InputLabel id="language-select-label" className={styles.inputLabel}>
            Language
          </InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={props.lang}
            onChange={(event) => handleLanguageChange(event.target.value)}
            className={styles.select}
          >
            {LANGUAGES.map((option) => (
              <MenuItem
                key={option.code}
                value={option.code}
                className={styles.menuItem}
              >
                {option.languageCapitalized}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};
