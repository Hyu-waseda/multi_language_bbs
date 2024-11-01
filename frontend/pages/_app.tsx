import "../styles/globals.css";
import "normalize.css";
import type { AppProps } from "next/app";
import { LanguageContextData } from "../contexts/UserLanguageContext";
import { useState } from "react";
import styles from "../styles/app.module.scss";
import { Box } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <div className={styles.appContainer}>
      <Box className={styles.contentWrapper}>
        <Component {...pageProps} />
      </Box>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} />
    </div>
  );
}

export default MyApp;
