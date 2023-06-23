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
import React, { useContext, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { LANGUAGES } from "../../../const";
import { UserLanguageContext } from "../../../contexts/UserLanguageContext";
import { useRouter } from "next/router";
import { createURL } from "../../../utils/createUrl";

export const Header: React.FC = () => {
  const { userLanguage, setUserLanguage } = useContext(UserLanguageContext);
  const [userLanguageHeader, setUserLanguageHeader] =
    useState<string>(userLanguage);
  const router = useRouter();

  const handleLanguageChange = (value: string) => {
    localStorage.setItem("selectedLanguage", value);
    setUserLanguageHeader(value);
    setUserLanguage(value);

    const currentPath = window.location.pathname;
    const currentParams = new URLSearchParams(window.location.search);
    // lang パラメーターを更新
    currentParams.set("lang", value);

    const newUrl = createURL(currentPath, currentParams);
    router.push(newUrl, undefined, { shallow: true });
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
            value={userLanguageHeader}
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
