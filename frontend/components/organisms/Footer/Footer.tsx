import React, { useEffect, useState } from "react";
import { Box, Link, Typography } from "@mui/material";
import styles from "./Footer.module.scss";
import { COOKIE, PAGE_URL } from "../../../const";
import Footer_EN from "../../../translate/en/components/organisms/Footer_en";
import { useCookie } from "../../../utils/useCookie";

interface Translation {
  privacy_policy: string;
  terms_of_service: string;
  disclaimer: string;
}

const Footer: React.FC = () => {
  const [translation, setTranslation] = useState<Translation>(Footer_EN);

  const langCookie: string = useCookie(COOKIE.SELECTED_LANGUAGE);

  useEffect(() => {
    const fetchTranslation = async () => {
      if (!langCookie) return;

      let loadedTranslation: Translation;
      try {
        const translationModule = await import(
          `../../../translate/${langCookie}/components/organisms/Footer_${langCookie}.tsx`
        );
        loadedTranslation = translationModule.default;
      } catch (error) {
        console.error("Failed to load translation:", error);
        loadedTranslation = Footer_EN;
      }
      setTranslation(loadedTranslation);
    };

    fetchTranslation();
  }, [langCookie]);

  return (
    <Box className={styles.footerContainer}>
      <Box className={styles.footer}>
        <Link
          href={PAGE_URL.PRIVACY_POLICY}
          variant="body2"
          className={styles.footerLink}
        >
          {translation.privacy_policy}
        </Link>
        <Link
          href={PAGE_URL.TERMS_OF_SERVICE}
          variant="body2"
          className={styles.footerLink}
        >
          {translation.terms_of_service}
        </Link>
        <Link
          href={PAGE_URL.DISCLAIMER}
          variant="body2"
          className={styles.footerLink}
        >
          {translation.disclaimer}
        </Link>
        {/* <Link
          href={PAGE_URL.CONTACT_US}
          variant="body2"
          className={styles.footerLink}
        >
          お問い合わせ
        </Link> */}
        <Typography variant="body2" className={styles.footerCopyright}>
          Copyright © 2023 早稲田大学 西村研究室
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
