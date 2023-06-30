import React, { useEffect, useState } from "react";
import { ThreadData } from "../interfaces/ThreadData";
import Link from "next/link";
import {
  Card,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { fetchLatestThreadData, fetchThreadCount } from "../utils/api";
import { createURL } from "../utils/createUrl";
import { Header } from "../components/organisms/Header/Header";
import Pager from "../components/organisms/Pager/Pager";

interface Props {
  resultLatestThreads: ThreadData[];
  threadCount: number;
  langCookie: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const latestThreads: ThreadData[] = await fetchLatestThreadData(1, 5, false);
  const threadCount = await fetchThreadCount();
  const { req } = context;
  const langCookie = req.cookies.selectedLanguage || "original";

  return {
    props: {
      resultLatestThreads: latestThreads,
      threadCount: threadCount,
      langCookie,
    },
  };
};

const Home: NextPage<Props> = (props) => {
  const latestThreadsInfo = { perPage: 5 };
  const [latestThreads, setLatestThreads] = useState<ThreadData[]>(
    props.resultLatestThreads
  );
  const createUrlToThread = (threadId: string): string => {
    // TODO: 丸め込み
    const threadPath = "/thread";
    const currentParams = new URLSearchParams();
    // lang パラメーターを更新
    currentParams.set("threadId", threadId);
    const newUrl = createURL(threadPath, currentParams);
    return newUrl;
  };

  const [page, setPage] = useState<number>(1);
  const handlePager = (selsectedPage: number) => {
    setPage(selsectedPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      const newLatestThreads: ThreadData[] = await fetchLatestThreadData(
        page,
        latestThreadsInfo.perPage,
        true
      );
      setLatestThreads(newLatestThreads);
    };

    fetchData();
  }, [page, latestThreadsInfo.perPage]);
  return (
    <>
      <Header lang={props.langCookie} />
      <Container maxWidth="md">
        <Typography variant="h4">最新スレッド一覧</Typography>
        <Divider />
        <Card>
          <List>
            {latestThreads.map((thread) => (
              <Link
                key={thread.title}
                href={createUrlToThread(String(thread.threadID))}
              >
                <ListItem>
                  <ListItemText
                    primary={thread.title}
                    secondary={`作成日：${thread.updatedAt}`}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Card>
        <Pager
          totalCount={props.threadCount}
          perPage={latestThreadsInfo.perPage}
          page={page}
          handlePager={handlePager}
        />
      </Container>
    </>
  );
};

export default Home;
