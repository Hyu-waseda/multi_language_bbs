import React, { useEffect, useState } from "react";
import { ThreadData } from "../interfaces/ThreadData";
import { Container } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import {
  fetchNewThreadData,
  fetchThreadCount,
  fetchUpdatedThreadData,
} from "../utils/api";
import { Header } from "../components/organisms/Header/Header";
import ThreadList from "../components/organisms/ThreadList/ThreadList";
import { DOMAIN, PAGE_URL, SORT_OPTIONS } from "../const";
import CookieBanner from "../components/organisms/CookieBanner/CookieBanner";
import Meta from "../components/organisms/Meta/Meta";
import Index_EN from "../translate/en/pages/Index_en";

interface Props {
  resultNewThreads: ThreadData[];
  resultUpdatedThreads: ThreadData[];
  threadCount: number;
  langCookie: string;
  translation: Translation;
}

interface Translation {
  meta: {
    title: string;
    description: string;
  };
  latest_update_thread: string;
  new_thread: string;
  update_date: string;
  created_date: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const langCookie = req.cookies.selectedLanguage || "original";

  // TODO: 丸め込み
  const newThreads: ThreadData[] = await fetchNewThreadData(
    1,
    5,
    false,
    langCookie
  );
  const updatedThreads: ThreadData[] = await fetchUpdatedThreadData(
    1,
    5,
    false,
    langCookie
  );
  const threadCount = await fetchThreadCount();

  let translation;
  try {
    const translationModule = await import(
      `../translate/${langCookie}/pages/Index_${langCookie}.tsx`
    );
    translation = translationModule.default;
  } catch (error) {
    console.error("Failed to load translation:", error);
    translation = Index_EN;
  }

  return {
    props: {
      resultNewThreads: newThreads,
      resultUpdatedThreads: updatedThreads,
      threadCount: threadCount,
      langCookie,
      translation: translation,
    },
  };
};

const Home: NextPage<Props> = (props) => {
  const threadListInfo = { perPage: 5 };
  const [newThreads, setNewThreads] = useState<ThreadData[]>(
    props.resultNewThreads
  );
  const [newThreadsPage, setNewThreadsPage] = useState<number>(1);
  const [updatedThreads, setUpdatedThreads] = useState<ThreadData[]>(
    props.resultUpdatedThreads
  );
  const [updatedThreadsPage, setUpdatedThreadsPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const resultNewThreads: ThreadData[] = await fetchNewThreadData(
        newThreadsPage,
        threadListInfo.perPage,
        true,
        props.langCookie
      );
      setNewThreads(resultNewThreads);
    };

    fetchData();
  }, [newThreadsPage, threadListInfo.perPage]);

  useEffect(() => {
    const fetchData = async () => {
      const resultUpdatedThreads: ThreadData[] = await fetchUpdatedThreadData(
        updatedThreadsPage,
        threadListInfo.perPage,
        true,
        props.langCookie
      );
      setUpdatedThreads(resultUpdatedThreads);
    };

    fetchData();
  }, [updatedThreadsPage, threadListInfo.perPage]);

  return (
    <>
      <Meta
        title={props.translation.meta.title}
        description={props.translation.meta.description}
        url={`${DOMAIN}${PAGE_URL.HOME}`}
      />

      <Header lang={props.langCookie} />
      <Container maxWidth="md">
        <ThreadList
          threads={updatedThreads}
          title={props.translation.latest_update_thread}
          page={updatedThreadsPage}
          totalCount={props.threadCount}
          perPage={threadListInfo.perPage}
          sortOption={SORT_OPTIONS.UPDATED}
          handlePager={(selectedPage) => setUpdatedThreadsPage(selectedPage)}
          labelForDate={props.translation.update_date}
        />
        <ThreadList
          threads={newThreads}
          title={props.translation.new_thread}
          page={newThreadsPage}
          totalCount={props.threadCount}
          perPage={threadListInfo.perPage}
          sortOption={SORT_OPTIONS.CREATED}
          handlePager={(selectedPage) => setNewThreadsPage(selectedPage)}
          labelForDate={props.translation.created_date}
        />
      </Container>
      <CookieBanner />
    </>
  );
};

export default Home;
