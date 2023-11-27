import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from "./Footer.module.scss";
import { PAGE_URL } from "../../../const";
import Footer_EN from "../../../translate/en/components/organisms/Footer_en";
import Link from "next/link";
interface Translation {
  privacy_policy: string;
  terms_of_service: string;
  disclaimer: string;
}

interface Props {
  lang: string;
}

const Footer: React.FC<Props> = (props) => {
  const [translation, setTranslation] = useState<Translation>(Footer_EN);

  useEffect(() => {
    const fetchTranslation = async () => {
      let loadedTranslation: Translation;
      try {
        const translationModule = await import(
          `../../../translate/${props.lang}/components/organisms/Footer_${props.lang}.tsx`
        );
        loadedTranslation = translationModule.default;
      } catch (error) {
        console.error("Failed to load translation:", error);
        loadedTranslation = Footer_EN;
      }
      setTranslation(loadedTranslation);
    };

    fetchTranslation();
  }, [props.lang]);

  return (
    <Box className={styles.footerContainer}>
      <Box className={styles.footer}>
        <Link
          href={{
            pathname: PAGE_URL.PRIVACY_POLICY,
            query: { lang: props.lang },
          }}
          className={styles.footerLink}
        >
          <Typography variant="body2">{translation.privacy_policy}</Typography>
        </Link>
        <Link
          href={{
            pathname: PAGE_URL.TERMS_OF_SERVICE,
            query: { lang: props.lang },
          }}
          className={styles.footerLink}
        >
          <Typography variant="body2">
            {translation.terms_of_service}
          </Typography>
        </Link>
      </Box>
      <Typography variant="body2" className={styles.footerCopyright}>
        Copyright © 2023 早稲田大学 西村研究室
      </Typography>
    </Box>
  );
};

export default Footer;
