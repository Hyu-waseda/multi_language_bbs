import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button, Snackbar } from "@mui/material";
import Link from "next/link";
import { PAGE_URL } from "../../../const";
import styles from "./CookieBanner.module.scss";
import CookieBanner_EN from "../../../translate/en/components/organisms/CookieBanner_en";

interface Props {
  lang: string;
}
interface Translation {
  message_first: string;
  link: string;
  message_second: string;
  detail: string;
  close: string;
}

const CookieBanner: React.FC<Props> = (props) => {
  const COOKIE_ACCEPTED_KEY = "cookieAccepted";

  const isCookieAccepted = () => !!Cookies.get(COOKIE_ACCEPTED_KEY);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!isCookieAccepted());
  }, []);

  const handleAccept = () => {
    Cookies.set(COOKIE_ACCEPTED_KEY, "true", { expires: 365 });
    setIsOpen(false);
  };

  const [translation, setTranslation] = useState<Translation>(CookieBanner_EN);

  useEffect(() => {
    const fetchTranslation = async () => {
      let loadedTranslation: Translation;
      try {
        const translationModule = await import(
          `../../../translate/${props.lang}/components/organisms/CookieBanner_${props.lang}.tsx`
        );
        loadedTranslation = translationModule.default;
      } catch (error) {
        console.error("Failed to load translation:", error);
        loadedTranslation = CookieBanner_EN;
      }
      setTranslation(loadedTranslation);
    };

    fetchTranslation();
  }, [props.lang]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isOpen}
      message={
        <>
          {translation.message_first}
          <Link
            href={PAGE_URL.PRIVACY_POLICY}
            className={styles.privacy_policy_link}
          >
            {translation.link}
          </Link>
          {translation.message_second}
        </>
      }
      action={
        <>
          <Button color="primary" size="small" onClick={handleAccept}>
            {translation.detail}
          </Button>
          <Button color="primary" size="small" onClick={handleAccept}>
            {translation.close}
          </Button>
        </>
      }
      sx={{ width: "96%" }}
      ContentProps={{
        sx: {
          backgroundColor: "#FFF",
          color: "black",
          border: "black 2px solid",
        },
      }}
    />
  );
};

export default CookieBanner;
