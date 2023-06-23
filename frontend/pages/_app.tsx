import "../styles/globals.css";
import "normalize.css";
import type { AppProps } from "next/app";
import { Header } from "../components/organisms/Header/Header";
import {
  UserLanguageContext,
  LanguageContextData,
} from "../contexts/UserLanguageContext";
import { useState } from "react";


function MyApp({ Component, pageProps }: AppProps) {
  const [userLanguage, setUserLanguage] = useState<string>("original");

  const languageContextValue: LanguageContextData = {
    userLanguage,
    setUserLanguage,
  };

  return (
    <UserLanguageContext.Provider value={languageContextValue}>
      <Header />
      <Component {...pageProps} />
    </UserLanguageContext.Provider>
  );
}

export default MyApp;
