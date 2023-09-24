// components/CookieBanner.tsx
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button, Snackbar } from "@mui/material";
import Link from "next/link";
import { PAGE_URL } from "../../../const";
import styles from "./CookieBanner.module.scss"

const CookieBanner: React.FC = () => {
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

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isOpen}
      message={
        <>
          本サービスではユーザーの使用言語の保持などのために、Cookieを使用しています。使用目的の詳細については
          <Link href={PAGE_URL.PRIVACY_POLICY} className={styles.privacy_policy_link}>プライバシーポリシー</Link>
          で確認できます。
        </>
      }
      // message="本サービスではユーザーの使用言語の保持などのために、Cookieを使用しています。使用目的の詳細についてはプライバシーポリシーについてのページで確認できます。"
      action={
        <>
          <Button color="primary" size="small" onClick={handleAccept}>
            詳細
          </Button>
          <Button color="primary" size="small" onClick={handleAccept}>
            閉じる
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
