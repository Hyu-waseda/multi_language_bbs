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
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { COOKIE, LANGUAGES, PAGE_PATH } from "../../../const";
import { createURL } from "../../../utils/createUrl";
import Cookies from "js-cookie";
import Link from "next/link";
import MenuListItem from "../../Atoms/MenuListItem/MenuListItem";
import Header_EN from "../../../translate/en/components/organisms/Header_en";
import { useRouter } from "next/router";

interface HeaderProps {
  lang: string;
}

interface Translation {
  language: string;
  homepage: string;
  new_thread_creation: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const router = useRouter();
  const handleLanguageChange = (value: string) => {
    Cookies.set(COOKIE.SELECTED_LANGUAGE, value, { expires: 365 });

    const currentPath = window.location.pathname;
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("lang", value);

    const newUrl = createURL(currentPath, currentParams);
    router.push(newUrl);
  };

  const [translation, setTranslation] = useState<Translation>(Header_EN);

  useEffect(() => {
    const fetchTranslation = async () => {
      if (!props.lang) return;

      let loadedTranslation: Translation;
      try {
        const translationModule = await import(
          `../../../translate/${props.lang}/components/organisms/Header_${props.lang}.tsx`
        );
        loadedTranslation = translationModule.default;
      } catch (error) {
        console.error("Failed to load translation:", error);
        loadedTranslation = Header_EN;
      }
      setTranslation(loadedTranslation);
    };

    fetchTranslation();
  }, [props.lang]);

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
          <Link
            href={{ pathname: PAGE_PATH.HOME, query: { lang: props.lang } }}
          >
            <Typography variant="h6">The Channel</Typography>
          </Link>

          <FormControl className={styles.formControl}>
            <InputLabel
              id="language-select-label"
              className={styles.inputLabel}
            >
              {translation.language}
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
              name={translation.homepage}
              icon={<HomeIcon />}
              link={{ pathname: PAGE_PATH.HOME, query: { lang: props.lang } }}
            />
            <MenuListItem
              name={translation.new_thread_creation}
              icon={<AddIcon />}
              link={{
                pathname: PAGE_PATH.THREAD_CREATE,
                query: { lang: props.lang },
              }}
            />
          </List>
        </div>
      </Drawer>
    </>
  );
};
