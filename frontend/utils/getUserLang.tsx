import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export const getUserLang = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): string => {
  const { req, query } = context;
  const userLang: string =
    req.cookies.selectedLanguage || (query.lang as string) || "original";
  return userLang;
};
