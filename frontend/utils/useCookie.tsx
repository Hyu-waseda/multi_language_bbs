import { useEffect, useState } from "react";

export const useCookie = (cookieName: string) => {
  const [cookieValue, setCookieValue] = useState<string>("");

  useEffect(() => {
    const value =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${cookieName}=`))
        ?.split("=")[1] || "original";
    setCookieValue(value);
  }, [cookieName]);

  return cookieValue;
};
