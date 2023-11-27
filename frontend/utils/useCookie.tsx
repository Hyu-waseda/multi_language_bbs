import { useEffect, useState } from "react";

export const useCookie = (cookieName: string): string | undefined => {
  const [cookieValue, setCookieValue] = useState<string | undefined>("");

  useEffect(() => {
    const value =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${cookieName}=`))
        ?.split("=")[1] || undefined;
    setCookieValue(value);
  }, [cookieName]);

  return cookieValue;
};
