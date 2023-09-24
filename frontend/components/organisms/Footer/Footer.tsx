import React from "react";
import { Box, Link, Typography } from "@mui/material";
import styles from "./Footer.module.scss";
import { PAGE_URL } from "../../../const";

const Footer: React.FC = () => {
  return (
    <Box className={styles.footerContainer}>
      <Box className={styles.footer}>
        <Link
          href={PAGE_URL.PRIVACY_POLICY}
          variant="body2"
          className={styles.footerLink}
        >
          プライバシーポリシー
        </Link>
        <Link
          href={PAGE_URL.TERMS_OF_SERVICE}
          variant="body2"
          className={styles.footerLink}
        >
          利用規約
        </Link>
        <Link
          href={PAGE_URL.DISCLAIMER}
          variant="body2"
          className={styles.footerLink}
        >
          免責事項
        </Link>
        <Link
          href={PAGE_URL.CONTACT_US}
          variant="body2"
          className={styles.footerLink}
        >
          お問い合わせ
        </Link>
        <Typography variant="body2" className={styles.footerCopyright}>
          Copyright © 2023 早稲田大学 西村研究室
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
