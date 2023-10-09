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
import { PAGE_META, SORT_OPTIONS } from "../const";
import CookieBanner from "../components/organisms/CookieBanner/CookieBanner";
import Meta from "../components/organisms/Meta/Meta";

interface Props {
  resultNewThreads: ThreadData[];
  resultUpdatedThreads: ThreadData[];
  threadCount: number;
  langCookie: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO: 丸め込み
  const newThreads: ThreadData[] = await fetchNewThreadData(1, 5, false);
  const updatedThreads: ThreadData[] = await fetchUpdatedThreadData(
    1,
    5,
    false
  );
  const threadCount = await fetchThreadCount();
  const { req } = context;
  const langCookie = req.cookies.selectedLanguage || "original";

  return {
    props: {
      resultNewThreads: newThreads,
      resultUpdatedThreads: updatedThreads,
      threadCount: threadCount,
      langCookie,
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
        true
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
        true
      );
      setUpdatedThreads(resultUpdatedThreads);
    };

    fetchData();
  }, [updatedThreadsPage, threadListInfo.perPage]);

  return (
    <>
      <Meta
        title={PAGE_META.HOME.title}
        description={PAGE_META.HOME.description}
      />

      <Header lang={props.langCookie} />
      <Container maxWidth="md">
        <ThreadList
          threads={updatedThreads}
          title="最新更新スレッド"
          page={updatedThreadsPage}
          totalCount={props.threadCount}
          perPage={threadListInfo.perPage}
          sortOption={SORT_OPTIONS.UPDATED}
          handlePager={(selectedPage) => setUpdatedThreadsPage(selectedPage)}
        />
        <ThreadList
          threads={newThreads}
          title="新着スレッド"
          page={newThreadsPage}
          totalCount={props.threadCount}
          perPage={threadListInfo.perPage}
          sortOption={SORT_OPTIONS.CREATED}
          handlePager={(selectedPage) => setNewThreadsPage(selectedPage)}
        />
      </Container>
      <CookieBanner />
    </>
  );
};

export default Home;
