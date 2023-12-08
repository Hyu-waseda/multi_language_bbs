import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { Header } from "../components/organisms/Header/Header";
import { COOKIE, PAGE_PATH } from "../const";
import styles from "../styles/404.module.scss";
import { useCookie } from "../utils/useCookie";
import { useRouter } from "next/router";
import Footer from "../components/organisms/Footer/Footer";

const NotFoundPage: React.FC = () => {
  const router = useRouter();
  // 404が発生する前のページでのクエリパラメータを取得
  const previousPageQueryLang: string = router.query.lang as string;
  const userLang: string =
    useCookie(COOKIE.SELECTED_LANGUAGE) || previousPageQueryLang || "original";

  return (
    <>
      <Header lang={userLang} />
      <Box className={styles.container}>
        <Typography variant="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          Oops! The page you are looking for does not exist.
        </Typography>
        <Link href={PAGE_PATH.HOME} passHref>
          <Button variant="contained" className={styles.link}>
            Go Back to Home
          </Button>
        </Link>
      </Box>
      <Footer lang={userLang} />
    </>
  );
};

export default NotFoundPage;
