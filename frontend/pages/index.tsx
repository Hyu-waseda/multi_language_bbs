import React from "react";
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
import { fetchThreadData } from "../utils/api";
import { createURL } from "../utils/createUrl";
import { Header } from "../components/organisms/Header/Header";

interface Props {
  resultLatestThreads: ThreadData[];
  langCookie: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const LatestThreads: ThreadData[] = await fetchThreadData(5);
  const { req } = context;
  const langCookie = req.cookies.selectedLanguage || "original";

  return {
    props: {
      resultLatestThreads: LatestThreads,
      langCookie,
    },
  };
};

const Home: NextPage<Props> = (props) => {
  const createUrlToThread = (threadId: string): string => {
    // TODO: 丸め込み
    const threadPath = "/thread";
    const currentParams = new URLSearchParams();
    // lang パラメーターを更新
    currentParams.set("threadId", threadId);
    const newUrl = createURL(threadPath, currentParams);
    return newUrl;
  };

  return (
    <>
      <Header lang={props.langCookie} />
      <Container maxWidth="md">
        <Typography variant="h4">最新スレッド一覧</Typography>
        <Divider />
        <Card>
          <List>
            {props.resultLatestThreads.map((thread) => (
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
      </Container>
    </>
  );
};

export default Home;
