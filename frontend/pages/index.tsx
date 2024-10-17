import React, { useEffect, useState } from "react";
import { ThreadData } from "../interfaces/ThreadData";
import { Box, Container, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import {
  fetchNewThreadData,
  fetchThreadCount,
  fetchUpdatedThreadData,
  fetchCommentCountThreadData,
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
import styles from "../styles/index.module.scss";

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
  welcome_message: string;
  translation_instructions: string;
  thread_creation_guide: string;
  community_impact_message: string;
  latest_update_thread: string;
  comment_count_thread: string;
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
  const threadListInfo = { perPage: 8 };

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

  // コメント数順スレッド関連
  const [commentCountThreads, setCommentCountThreads] = useState<ThreadData[]>([]);
  const [commentCountThreadsPage, setCommentCountThreadsPage] = useState<number>(1);
  const [showSkeletonCommentCountThreads, setShowSkeletonCommentCountThreads] =
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

  // コメント数順スレッドの更新
  useEffect(() => {
    const fetchData = async () => {
      setShowSkeletonCommentCountThreads(false);

      const skeletonTimer = setTimeout(() => {
        setShowSkeletonCommentCountThreads(true);
      }, 500);

      const resultCommentCountThreads: ThreadData[] = await fetchCommentCountThreadData(
        commentCountThreadsPage,
        threadListInfo.perPage,
        true,
        props.userLang
      );
      setCommentCountThreads(resultCommentCountThreads);
      setShowSkeletonCommentCountThreads(false);
      clearTimeout(skeletonTimer);
    };

    fetchData();
  }, [commentCountThreadsPage, threadListInfo.perPage, props.userLang]);

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
      {/* ウェルカムメッセージ */}
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        className={styles.welcome_message_title}
      >
        {props.translation.welcome_message}
      </Typography>
      <Box className={styles.welcome_message_text}>
        <Typography variant="body1" gutterBottom>
          {props.translation.translation_instructions}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {props.translation.thread_creation_guide}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {props.translation.community_impact_message}
        </Typography>
      </Box>

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
        {/* コメント数順スレッド(人気スレッド) */}
        <ThreadList
          threads={commentCountThreads}
          title={props.translation.comment_count_thread}
          page={commentCountThreadsPage}
          totalCount={props.threadCount}
          perPage={threadListInfo.perPage}
          sortOption={SORT_OPTIONS.COUNT}
          handlePager={(selectedPage) => setCommentCountThreadsPage(selectedPage)}
          labelForDate={props.translation.created_date}
          lang={props.userLang}
          showSkeleton={showSkeletonCommentCountThreads}
        />
      </Container>
      <Footer lang={props.userLang} />
      <CookieBanner lang={props.userLang} />
    </>
  );
};

export default Home;
