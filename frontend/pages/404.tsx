import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { Header } from "../components/organisms/Header/Header";
import { COOKIE, PAGE_META, PAGE_URL } from "../const";
import styles from "../styles/404.module.scss";
import { useCookie } from "../utils/useCookie";
import Meta from "../components/organisms/Meta/Meta";
import { useRouter } from "next/router";

const NotFoundPage: React.FC = () => {
  const router = useRouter();
  // 404が発生する前のページでのクエリパラメータを取得
  const previousPageQueryLang: string = router.query.lang as string;
  const userLang: string =
    useCookie(COOKIE.SELECTED_LANGUAGE) || previousPageQueryLang || "original";

  return (
    <>
      <Meta
        title={PAGE_META.NOT_FOUND.title}
        description={PAGE_META.NOT_FOUND.description}
      />

      <Header lang={userLang} />
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
