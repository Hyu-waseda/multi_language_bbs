import React from "react";
import { Box, Link, Typography } from "@mui/material";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <Box className={styles.footerContainer}>
      <Link
        href="/privacy-policy"
        variant="body2"
        className={styles.footerLink}
      >
        プライバシーポリシー
      </Link>
      <Link
        href="/terms-of-service"
        variant="body2"
        className={styles.footerLink}
      >
        利用規約
      </Link>
      <Link href="/disclaimer" variant="body2" className={styles.footerLink}>
        免責事項
      </Link>
      <Link href="/contact-us" variant="body2" className={styles.footerLink}>
        お問い合わせ
      </Link>
      <Typography variant="body2" className={styles.footerCopyright}>
        Copyright © 2023 早稲田大学 西村研究室
      </Typography>
    </Box>
  );
};

export default Footer;
