import {
  AppBar,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import { LANGUAGES, PAGE_URL } from "../../../const";
import { createURL } from "../../../utils/createUrl";
import Cookies from "js-cookie";
import Link from "next/link";
import MenuListItem from "../../Atoms/MenuListItem/MenuListItem";

interface HeaderProps {
  lang: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleLanguageChange = (value: string) => {
    Cookies.set("selectedLanguage", value);

    const currentPath = window.location.pathname;
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("lang", value);

    const newUrl = createURL(currentPath, currentParams);
    window.location.href = newUrl;
  };

  return (
    <>
      <AppBar position="sticky" className={styles.header}>
        <Toolbar sx={{ flexGrow: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Link href={PAGE_URL.HOME}>
            <Typography variant="h6">The Channel</Typography>
          </Link>

          <FormControl className={styles.formControl}>
            <InputLabel
              id="language-select-label"
              className={styles.inputLabel}
            >
              言語
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

      {/* メニューボタンの中身 */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <div
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            <MenuListItem
              name={"ホームページ"}
              icon={<HomeIcon />}
              link={PAGE_URL.HOME}
            />
            <MenuListItem
              name={"新規スレッド投稿"}
              icon={<AddIcon />}
              link={PAGE_URL.THREAD_CREATE}
            />
            <MenuListItem
              name={"ヘルプ"}
              icon={<HelpIcon />}
              link={PAGE_URL.HELP}
            />
          </List>
        </div>
      </Drawer>
    </>
  );
};
