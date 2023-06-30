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
import { fetchNewThreadData, fetchThreadCount, fetchUpdatedThreadData } from "../utils/api";
import { createURL } from "../utils/createUrl";
import { Header } from "../components/organisms/Header/Header";
import Pager from "../components/organisms/Pager/Pager";

interface Props {
  resultNewThreads: ThreadData[];
  resultUpdatedThreads: ThreadData[];
  threadCount: number;
  langCookie: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO: 丸め込み
  const newThreads: ThreadData[] = await fetchNewThreadData(1, 5, false);
  const updatedThreads: ThreadData[] = await fetchUpdatedThreadData(1, 5, false);
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
  const createUrlToThread = (threadId: string): string => {
    // TODO: 丸め込み
    const threadPath = "/thread";
    const currentParams = new URLSearchParams();
    // TODO: 丸め込み
    currentParams.set("threadId", threadId);
    const newUrl = createURL(threadPath, currentParams);
    return newUrl;
  };

  const handlePager = (selectedPage: number, setFunction: React.Dispatch<React.SetStateAction<number>>) => {
    setFunction(selectedPage)
  }

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
      <Header lang={props.langCookie} />
      <Container maxWidth="md">
        <Typography variant="h4">最新更新スレッド</Typography>
        <Divider />
        <Card>
          <List>
            {updatedThreads.map((thread) => (
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
          perPage={threadListInfo.perPage}
          page={updatedThreadsPage}
          handlePager={(selectedPage) => handlePager(selectedPage, setUpdatedThreadsPage)}
        />
        <Typography variant="h4">新着スレッド</Typography>
        <Divider />
        <Card>
          <List>
            {newThreads.map((thread) => (
              <Link
                key={thread.title}
                href={createUrlToThread(String(thread.threadID))}
              >
                <ListItem>
                  <ListItemText
                    primary={thread.title}
                    secondary={`作成日：${thread.createdAt}`}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Card>
        <Pager
          totalCount={props.threadCount}
          perPage={threadListInfo.perPage}
          page={newThreadsPage}
          handlePager={(selectedPage) => handlePager(selectedPage, setNewThreadsPage)}
        />
      </Container>
    </>
  );
};

export default Home;
