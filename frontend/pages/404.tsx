import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { Header } from "../components/organisms/Header/Header";
import { PAGE_URL } from "../const";
import styles from "../styles/404.module.scss";
import { useCookie } from "../utils/useCookie";

const NotFoundPage: React.FC = () => {
  // TODO: 丸め込み
  const langCookie = useCookie("selectedLanguage");

  return (
    <>
      <Header lang={langCookie} />
      <Box className={styles.container}>
        <Typography variant="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          Oops! The page you are looking for does not exist.
        </Typography>
        <Link href={PAGE_URL.HOME} passHref>
          <Button variant="contained" className={styles.link}>
            Go Back to Home
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default NotFoundPage;
