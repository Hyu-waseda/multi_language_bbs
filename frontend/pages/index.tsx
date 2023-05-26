import React from "react";
import { mockLatestThreads } from "../mock/mockLatestThreads";
import { ThreadData } from "../interfaces/ThreadData";
import Link from "next/link";
import { Header } from "../components/organisms/Header/Header";
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
import { fetchData } from "../utils/api";
import { API_ENDPOINSTS } from "../const";

interface Props {
  resultMessage: string;
  resultLatestThreads: ThreadData[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const message = await fetchData(API_ENDPOINSTS.DUMMY.ENDPOINT);

  const LatestThreads: ThreadData[] = mockLatestThreads;

  return {
    props: {
      resultMessage: message,
      resultLatestThreads: LatestThreads,
    },
  };
};

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Typography variant="h4">最新スレッド一覧</Typography>
        <Divider />
        <Card>
          <List>
            {props.resultLatestThreads.map((thread) => (
              <Link key={thread.title} href={`/thread/${thread.threadId}`}>
                <ListItem>
                  <ListItemText
                    primary={thread.title}
                    secondary={thread.postDate}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Card>
      </Container>

      {/* TODO: APIを叩く練習用 */}
      <p>{props.resultMessage}</p>
    </>
  );
};

export default Home;
