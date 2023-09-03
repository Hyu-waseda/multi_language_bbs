import "../styles/globals.css";
import "normalize.css";
import type { AppProps } from "next/app";
import {
  UserLanguageContext,
  LanguageContextData,
} from "../contexts/UserLanguageContext";
import { useState } from "react";
import styles from "../styles/app.module.scss";
import { Box } from "@mui/material";
import Footer from "../components/organisms/Footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const [userLanguage, setUserLanguage] = useState<string>("original");

  const languageContextValue: LanguageContextData = {
    userLanguage,
    setUserLanguage,
  };

  return (
    <div className={styles.appContainer}>
      <UserLanguageContext.Provider value={languageContextValue}>
        <Box className={styles.contentWrapper}>
          <Component {...pageProps} />
        </Box>
        <Footer />
      </UserLanguageContext.Provider>
    </div>
  );
}

export default MyApp;
