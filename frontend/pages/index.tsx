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
import { SORT_OPTIONS } from "../const";
import CookieBanner from "../components/organisms/CookieBanner/CookieBanner";
import Meta from "../components/organisms/Meta/Meta";
import { Index_EN } from "../translate/en/pages/Index_en";
import Footer from "../components/organisms/Footer/Footer";
import { getUserLang } from "../utils/getUserLang";
import { useRouter } from "next/router";

interface Props {
  threadCount: number;
  translation: Translation;
  userLang: string;
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
  const threadCount = await fetchThreadCount();

  const userLang: string = getUserLang(context);

  let translation;
  try {
    const translationModule = await import(
      `../translate/${userLang}/pages/Index_${userLang}.tsx`
    );
    translation = translationModule.default;
  } catch (error) {
    console.error("Failed to load translation:", error);
    translation = Index_EN;
  }

  return {
    props: {
      threadCount: threadCount,
      translation: translation,
      userLang: userLang,
    },
  };
};

const Home: NextPage<Props> = (props) => {
  const threadListInfo = { perPage: 5 };

  // 新規作成スレッド関連
  const [newThreads, setNewThreads] = useState<ThreadData[]>([]);
  const [newThreadsPage, setNewThreadsPage] = useState<number>(1);
  const [showSkeletonNewThreads, setShowSkeletonNewThreads] =
    useState<boolean>(false);

  // 最新更新スレッド関連
  const [updatedThreads, setUpdatedThreads] = useState<ThreadData[]>([]);
  const [updatedThreadsPage, setUpdatedThreadsPage] = useState<number>(1);
  const [showSkeletonUpdatedThreads, setShowSkeletonUpdatedThreads] =
    useState<boolean>(false);

  // 新規作成スレッドの更新
  useEffect(() => {
    const fetchData = async () => {
      setShowSkeletonNewThreads(false);

      // スケルトンスクリーンの遅延表示
      const skeletonTimer = setTimeout(() => {
        setShowSkeletonNewThreads(true);
      }, 500);

      const resultNewThreads: ThreadData[] = await fetchNewThreadData(
        newThreadsPage,
        threadListInfo.perPage,
        true,
        props.userLang
      );
      setNewThreads(resultNewThreads);
      setShowSkeletonNewThreads(false);
      clearTimeout(skeletonTimer);
    };

    fetchData();
  }, [newThreadsPage, threadListInfo.perPage, props.userLang]);

  // 最新更新スレッドの更新
  useEffect(() => {
    const fetchData = async () => {
      setShowSkeletonUpdatedThreads(false);

      const skeletonTimer = setTimeout(() => {
        setShowSkeletonUpdatedThreads(true);
      }, 500);
      const resultUpdatedThreads: ThreadData[] = await fetchUpdatedThreadData(
        updatedThreadsPage,
        threadListInfo.perPage,
        true,
        props.userLang
      );
      setUpdatedThreads(resultUpdatedThreads);
      setShowSkeletonUpdatedThreads(false);
      clearTimeout(skeletonTimer);
    };

    fetchData();
  }, [updatedThreadsPage, threadListInfo.perPage, props.userLang]);

  const router = useRouter();
  const currentPath = router.asPath;
  return (
    <>
      <Meta
        title={props.translation.meta.title}
        description={props.translation.meta.description}
        pagePath={currentPath}
      />

      <Header lang={props.userLang} />
      <Container maxWidth="md">
        {/* 最新更新スレッド */}
        <ThreadList
          threads={updatedThreads}
          title={props.translation.latest_update_thread}
          page={updatedThreadsPage}
          totalCount={props.threadCount}
          perPage={threadListInfo.perPage}
          sortOption={SORT_OPTIONS.UPDATED}
          handlePager={(selectedPage) => setUpdatedThreadsPage(selectedPage)}
          labelForDate={props.translation.update_date}
          lang={props.userLang}
          showSkeleton={showSkeletonUpdatedThreads}
        />
        {/* 新規作成スレッド */}
        <ThreadList
          threads={newThreads}
          title={props.translation.new_thread}
          page={newThreadsPage}
          totalCount={props.threadCount}
          perPage={threadListInfo.perPage}
          sortOption={SORT_OPTIONS.CREATED}
          handlePager={(selectedPage) => setNewThreadsPage(selectedPage)}
          labelForDate={props.translation.created_date}
          lang={props.userLang}
          showSkeleton={showSkeletonNewThreads}
        />
      </Container>
      <Footer lang={props.userLang} />
      <CookieBanner lang={props.userLang} />
    </>
  );
};

export default Home;
