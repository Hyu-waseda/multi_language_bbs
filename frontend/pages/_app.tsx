import "../styles/globals.css";
import "normalize.css";
import type { AppProps } from "next/app";
import { LanguageContextData } from "../contexts/UserLanguageContext";
import { useState } from "react";
import styles from "../styles/app.module.scss";
import { Box } from "@mui/material";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <div className={styles.appContainer}>
      <Box className={styles.contentWrapper}>
        <Component {...pageProps} />
      </Box>
    </div>
  );
}

export default MyApp;
